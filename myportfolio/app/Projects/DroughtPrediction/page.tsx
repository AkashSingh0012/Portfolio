"use client";
import React from 'react'
import Navbar from "@/app/components/Navbar";
import CodeBlock from '@/app/components/Code'
function page() {
  return (<>
  <div className=" ProjectDescription">
    <div className="Text">
        <h2> Drought Prediction Model</h2>
        <h3> Overview</h3>
        <p> The following project was built to make a drought predicition model using multiple parameters which have a direct impact on the drought.
            For the following project the data was taken from NASA earthUser and Celcius data was taken.
            Soil data was allso taken from the  </p>
  <CodeBlock
  FileName="Train.py"
  language='Python'
  code={`"""
Drought Early Warning System — Model Training Pipeline
=======================================================
Phase 3 : Random Forest baseline  (scikit-learn)
Phase 4 : LSTM with dual heads     (PyTorch)
          - Regression head  → continuous DSI score  (-10 to +10)
          - Classification head → drought class (0=None, 1=Moderate, 2=Severe)

Expected input DataFrame columns
---------------------------------
  Feature columns (X):
    rainfall_avg      - R(T)   rolling mean rainfall
    AET               - actual evapotranspiration (Hargreaves)
    drainage          - D(t)   soil-type adjusted drainage
    H                 - H(t)   human usage (seasonal avg x beta)
    soil_moisture     - S(t)   current soil moisture
    SMA_1             - 1-month soil moisture anomaly
    SMA_3             - 3-month soil moisture anomaly
    SMA_6             - 6-month soil moisture anomaly
    GWA               - groundwater anomaly (set to 0 if unavailable)
    month_sin / month_cos - cyclic encoding of calendar month

  Target columns (y):
    DSI_score         - continuous drought severity score
    drought_class     - 0 = None, 1 = Moderate, 2 = Severe

FIXES APPLIED
-------------
  FIX-1  : RF now uses temporal split (consistent with LSTM) — no shuffle leak
  FIX-2  : StandardScaler fitted only on train split, not full dataset
  FIX-3  : SMA_1 replaced with lag-1 difference (rolling(1) was a no-op)
  FIX-4  : MC Dropout enables only nn.Dropout layers, not BN/other layers
  FIX-5  : Combined loss uses explicit weights (0.3 * reg + 0.7 * cls)
  FIX-6  : DroughtSequenceDataset stores numpy, converts to tensor in __getitem__
  FIX-7  : LR scheduler changes are logged to MLflow each epoch
  FIX-8  : Early stopping added (patience=10)
  FIX-9  : classification_report targets cast to int explicitly
  FIX-10 : mc_dropout_predict uses np.concatenate instead of fragile squeeze()
  FIX-11 : MLflow runs nested under a parent "full_pipeline" run
  FIX-12 : Real data loaded via build_features() instead of synthetic load_data()
           SEQ_LEN reduced to 6 to suit 192-row real dataset
  FIX-13 : FORECAST_HORIZON=6 — model now predicts 6 months ahead, not current month
           Dataset indexing shifted: y[t+SEQ_LEN+HORIZON] instead of y[t+SEQ_LEN]
"""

import sys
from pathlib import Path

# Make datafetch/ importable when running train.py directly from
# DroughtPredictionModel/ or from the project root
sys.path.insert(0, str(Path(__file__).resolve().parent))

import numpy as np
import pandas as pd
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import (classification_report, mean_absolute_error,
                             r2_score, f1_score)
import mlflow
import mlflow.sklearn
import mlflow.pytorch
import warnings
warnings.filterwarnings("ignore")

# Real data pipeline — swap back to load_data() for synthetic baseline
from datafetch.feature_engineer import build_features

# ─────────────────────────────────────────────
# 0. CONFIG
# ─────────────────────────────────────────────
FEATURE_COLS = [
    "rainfall_avg", "AET", "drainage", "H",
    "soil_moisture", "SMA_1", "SMA_3", "SMA_6",
    "GWA", "month_sin", "month_cos"
]
REG_TARGET   = "DSI_score"
CLS_TARGET   = "drought_class"

# FIX-12: reduced from 12 to 6 — with only 192 real rows,
# SEQ_LEN=12 leaves too few training sequences (153-12=141 train, 39-12=27 test)
# SEQ_LEN=6 gives more sequences and is still meaningful for monthly data
SEQ_LEN           = 6        # months of history fed as input
FORECAST_HORIZON  = 6        # months ahead to predict
BATCH_SIZE        = 8
LSTM_EPOCHS       = 150
LSTM_LR           = 1e-3
HIDDEN_SIZE       = 128
NUM_LAYERS        = 2
DROPOUT           = 0.3
NUM_CLASSES       = 3
LOSS_WEIGHT_REG   = 0.3
LOSS_WEIGHT_CLS   = 0.7
EARLY_STOP_PATIENCE = 20
CLS_WEIGHTS       = torch.tensor([1.0, 3.0, 1.8])
DEVICE            = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ─────────────────────────────────────────────
# MLflow persistent storage
# Points to D:\DroughtPrediction\mlflow.db and
# D:\DroughtPrediction\mlruns\ where data already exists
# ─────────────────────────────────────────────
_TRAIN_FILE       = Path(__file__).resolve()
_PROJECT_ROOT     = _TRAIN_FILE.parents[1]   # D:\DroughtPrediction

MLFLOW_TRACKING_URI = "sqlite:///" + str(_PROJECT_ROOT / "mlflow.db").replace("\\", "/")
MLFLOW_ARTIFACT_URI = str(_PROJECT_ROOT / "mlruns")

# ─────────────────────────────────────────────
# LSTM checkpoint — saves best weights to disk
# so training can resume if interrupted
# ─────────────────────────────────────────────
CHECKPOINT_DIR  = _TRAIN_FILE.parent / "checkpoints"
CHECKPOINT_PATH = CHECKPOINT_DIR / "lstm_best.pt"


# ─────────────────────────────────────────────
# 1. DATA LOADER
#    Uses real ERA5 + soil moisture data via
#    build_features(). Drops the 'time' period
#    column which is not a model feature.
# ─────────────────────────────────────────────
def load_data() -> pd.DataFrame:
    """
    Loads real ERA5 + soil moisture features via feature_engineer.py.
    Drops the 'time' column (PeriodIndex — not a numeric feature).
    """
    df = build_features()
    if "time" in df.columns:
        df = df.drop(columns=["time"])
    return df


# ─────────────────────────────────────────────
# 2. SHARED TEMPORAL SPLIT HELPER
# ─────────────────────────────────────────────
def temporal_split(df: pd.DataFrame, test_size: float = 0.2):
    """
    Chronological train/test split — no shuffling.
    """
    split_idx = int(len(df) * (1 - test_size))
    return df.iloc[:split_idx].copy(), df.iloc[split_idx:].copy()


# ─────────────────────────────────────────────
# 3. PHASE 3 — RANDOM FOREST BASELINE
# ─────────────────────────────────────────────
def train_random_forest(df: pd.DataFrame, parent_run_id: str):
    print("\n" + "="*55)
    print("  PHASE 3 — Random Forest Baseline")
    print("="*55)

    train_df, test_df = temporal_split(df, test_size=0.2)

    # FIX-13: shift targets by FORECAST_HORIZON so RF also forecasts 6 months ahead
    # Features from rows 0..N-H, targets from rows H..N
    X_all  = df[FEATURE_COLS].values
    yr_all = df[REG_TARGET].values
    yc_all = df[CLS_TARGET].values
    n      = len(X_all) - FORECAST_HORIZON

    split_idx = int(n * 0.8)
    X_train = X_all[:split_idx]
    X_test  = X_all[split_idx:n]
    yr_train = yr_all[FORECAST_HORIZON : split_idx + FORECAST_HORIZON]
    yr_test  = yr_all[split_idx + FORECAST_HORIZON : n + FORECAST_HORIZON]
    yc_train = yc_all[FORECAST_HORIZON : split_idx + FORECAST_HORIZON]
    yc_test  = yc_all[split_idx + FORECAST_HORIZON : n + FORECAST_HORIZON]

    scaler  = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test  = scaler.transform(X_test)

    with mlflow.start_run(run_name="RandomForest_baseline", nested=True):

        # Regression
        rf_reg = RandomForestRegressor(
            n_estimators=200, max_depth=12, min_samples_leaf=4,
            n_jobs=-1, random_state=42
        )
        rf_reg.fit(X_train, yr_train)
        pred_reg = rf_reg.predict(X_test)
        mae = mean_absolute_error(yr_test, pred_reg)
        r2  = r2_score(yr_test, pred_reg)

        print(f"\n[Regression]  MAE: {mae:.3f}   R²: {r2:.3f}")
        mlflow.log_params({"model": "RF", "n_estimators": 200, "max_depth": 12, "forecast_horizon": FORECAST_HORIZON})
        mlflow.log_metrics({"RF_reg_MAE": mae, "RF_reg_R2": r2})

        # Classification
        rf_cls = RandomForestClassifier(
            n_estimators=200, max_depth=12, min_samples_leaf=4,
            class_weight="balanced", n_jobs=-1, random_state=42
        )
        rf_cls.fit(X_train, yc_train)
        pred_cls = rf_cls.predict(X_test)
        f1 = f1_score(yc_test, pred_cls, average="macro")

        print(f"\n[Classification]  Macro F1: {f1:.3f}")
        print(classification_report(
            yc_test.astype(int), pred_cls.astype(int),
            labels=[0, 1, 2],
            target_names=["None", "Moderate", "Severe"],
            zero_division=0
        ))
        mlflow.log_metric("RF_cls_F1_macro", f1)

        importance = pd.Series(rf_cls.feature_importances_, index=FEATURE_COLS)
        print("\n[Feature Importance — top 5]")
        print(importance.sort_values(ascending=False).head())

        mlflow.sklearn.log_model(rf_cls, "rf_classifier")
        mlflow.sklearn.log_model(rf_reg, "rf_regressor")

    return rf_reg, rf_cls, scaler, X_test, yr_test, yc_test


# ─────────────────────────────────────────────
# 4. LSTM DATASET
# ─────────────────────────────────────────────
class DroughtSequenceDataset(Dataset):
    def __init__(self, X: np.ndarray, y_reg: np.ndarray, y_cls: np.ndarray,
                 stride: int = 1):
        self.X      = X
        self.y_reg  = y_reg
        self.y_cls  = y_cls
        # All valid start indices given stride
        max_start   = len(X) - SEQ_LEN - FORECAST_HORIZON
        self.indices = list(range(0, max_start, stride))

    def __len__(self):
        return len(self.indices)

    def __getitem__(self, idx):
        start      = self.indices[idx]
        x_seq      = torch.tensor(self.X[start : start + SEQ_LEN], dtype=torch.float32)
        target_idx = start + SEQ_LEN + FORECAST_HORIZON
        yr         = torch.tensor(self.y_reg[target_idx], dtype=torch.float32)
        yc         = torch.tensor(int(self.y_cls[target_idx]), dtype=torch.long)
        return x_seq, yr, yc
# ─────────────────────────────────────────────
# 5. LSTM MODEL — DUAL HEAD
# ─────────────────────────────────────────────
class DroughtLSTM(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, num_classes, dropout):
        super().__init__()
        self.lstm = nn.LSTM(
            input_size=input_size, hidden_size=hidden_size,
            num_layers=num_layers, batch_first=True,
            dropout=dropout if num_layers > 1 else 0.0
        )
        self.shared = nn.Sequential(
            nn.Linear(hidden_size, 64), nn.ReLU(), nn.Dropout(p=dropout)
        )
        self.regression_head = nn.Sequential(
            nn.Linear(64, 32), nn.ReLU(), nn.Linear(32, 1)
        )
        self.classification_head = nn.Sequential(
            nn.Linear(64, 32), nn.ReLU(), nn.Linear(32, num_classes)
        )

    def enable_mc_dropout(self):
        self.eval()
        for module in self.modules():
            if isinstance(module, nn.Dropout):
                module.train()

    def forward(self, x):
        lstm_out, _ = self.lstm(x)
        last_hidden  = lstm_out[:, -1, :]
        shared       = self.shared(last_hidden)
        dsi_pred     = self.regression_head(shared).squeeze(-1)
        cls_logits   = self.classification_head(shared)
        return dsi_pred, cls_logits


# ─────────────────────────────────────────────
# 6. PHASE 4 — LSTM TRAINING
# ─────────────────────────────────────────────
def train_lstm(df: pd.DataFrame, parent_run_id: str):
    print("\n" + "="*55)
    print("  PHASE 4 — LSTM with Dual Heads")
    print("="*55)
    print(f"  Device  : {DEVICE}")
    print(f"  SEQ_LEN : {SEQ_LEN}  HIDDEN: {HIDDEN_SIZE}  LAYERS: {NUM_LAYERS}")
    print(f"  Loss weights — reg: {LOSS_WEIGHT_REG}  cls: {LOSS_WEIGHT_CLS}\n")

    X     = df[FEATURE_COLS].values
    y_reg = df[REG_TARGET].values
    y_cls = df[CLS_TARGET].values

    split = int(len(X) * 0.8)
    X_train_raw, X_test_raw = X[:split], X[split:]
    yr_train, yr_test       = y_reg[:split], y_reg[split:]
    yc_train, yc_test       = y_cls[:split], y_cls[split:]

    scaler  = StandardScaler()
    X_train = scaler.fit_transform(X_train_raw)
    X_test  = scaler.transform(X_test_raw)

    train_ds = DroughtSequenceDataset(X_train, yr_train, yc_train, stride=1)
    test_ds  = DroughtSequenceDataset(X_test,  yr_test,  yc_test,  stride=1)

    print(f"  Train sequences: {len(train_ds)}  Test sequences: {len(test_ds)}")
    print(f"  Forecast horizon: {FORECAST_HORIZON} months ahead")

    train_loader = DataLoader(train_ds, batch_size=BATCH_SIZE, shuffle=True)
    test_loader  = DataLoader(test_ds,  batch_size=BATCH_SIZE, shuffle=False)

    model = DroughtLSTM(
        input_size=len(FEATURE_COLS), hidden_size=HIDDEN_SIZE,
        num_layers=NUM_LAYERS, num_classes=NUM_CLASSES, dropout=DROPOUT
    ).to(DEVICE)

    reg_loss_fn = nn.MSELoss()
    cls_loss_fn = nn.CrossEntropyLoss(weight=CLS_WEIGHTS.to(DEVICE))
    optimiser   = torch.optim.Adam(model.parameters(), lr=LSTM_LR)
    # CosineAnnealing decays LR smoothly — avoids the ReduceLROnPlateau
    # + early stopping conflict that fired too early before
    scheduler   = torch.optim.lr_scheduler.CosineAnnealingLR(
                    optimiser, T_max=LSTM_EPOCHS, eta_min=1e-5)

    # Resume from checkpoint if one exists
    best_loss        = float('inf')
    patience_counter = 0
    best_model_state = None
    start_epoch      = 1

    if CHECKPOINT_PATH.exists():
        print(f"  Found checkpoint at {CHECKPOINT_PATH} — resuming...")
        ckpt = torch.load(CHECKPOINT_PATH, map_location=DEVICE, weights_only=False)
        model.load_state_dict(ckpt["model_state"])
        optimiser.load_state_dict(ckpt["optimizer_state"])
        best_loss        = ckpt["best_loss"]
        start_epoch      = ckpt["epoch"] + 1
        best_model_state = ckpt["model_state"]
        print(f"  Resuming from epoch {start_epoch}  (best loss so far: {best_loss:.4f})")
    else:
        print("  No checkpoint found — training from scratch")

    with mlflow.start_run(run_name="LSTM_dual_head", nested=True):
        mlflow.log_params({
            "model": "LSTM", "seq_len": SEQ_LEN, "forecast_horizon": FORECAST_HORIZON,
            "hidden_size": HIDDEN_SIZE, "num_layers": NUM_LAYERS,
            "dropout": DROPOUT, "epochs": LSTM_EPOCHS, "lr": LSTM_LR,
            "loss_weight_reg": LOSS_WEIGHT_REG, "loss_weight_cls": LOSS_WEIGHT_CLS,
            "early_stop_patience": EARLY_STOP_PATIENCE,
            "data_source": "real_ERA5_soil_moisture",
        })

        for epoch in range(start_epoch, LSTM_EPOCHS + 1):
            model.train()
            total_loss = 0.0

            for x_batch, yr_batch, yc_batch in train_loader:
                x_batch  = x_batch.to(DEVICE)
                yr_batch = yr_batch.to(DEVICE)
                yc_batch = yc_batch.to(DEVICE)

                optimiser.zero_grad()
                dsi_pred, cls_logits = model(x_batch)
                loss = (LOSS_WEIGHT_REG * reg_loss_fn(dsi_pred, yr_batch)
                      + LOSS_WEIGHT_CLS * cls_loss_fn(cls_logits, yc_batch))
                loss.backward()
                nn.utils.clip_grad_norm_(model.parameters(), 1.0)
                optimiser.step()
                total_loss += loss.item()

            avg_loss   = total_loss / len(train_loader)
            scheduler.step()   # CosineAnnealingLR: no argument needed
            current_lr = optimiser.param_groups[0]['lr']

            if epoch % 10 == 0:
                print(f"  Epoch {epoch:>3}/{LSTM_EPOCHS}  loss: {avg_loss:.4f}  lr: {current_lr:.6f}")

            mlflow.log_metrics({"train_loss": avg_loss, "learning_rate": current_lr}, step=epoch)

            if avg_loss < best_loss:
                best_loss        = avg_loss
                patience_counter = 0
                best_model_state = {k: v.cpu().clone() for k, v in model.state_dict().items()}
                # Save best checkpoint to disk so training can resume if interrupted
                CHECKPOINT_DIR.mkdir(parents=True, exist_ok=True)
                torch.save({
                    "epoch":           epoch,
                    "model_state":     best_model_state,
                    "optimizer_state": optimiser.state_dict(),
                    "best_loss":       best_loss,
                    "scaler":          scaler,
                }, CHECKPOINT_PATH)
            else:
                patience_counter += 1
                if patience_counter >= EARLY_STOP_PATIENCE:
                    print(f"\n  Early stopping at epoch {epoch} (patience={EARLY_STOP_PATIENCE})")
                    break

        if best_model_state is not None:
            model.load_state_dict({k: v.to(DEVICE) for k, v in best_model_state.items()})
            print(f"  Restored best model (loss: {best_loss:.4f})")

        # Evaluation
        print("\n[Evaluating on test set...]")
        model.eval()
        all_dsi_pred, all_cls_pred = [], []
        all_dsi_true, all_cls_true = [], []

        with torch.no_grad():
            for x_batch, yr_batch, yc_batch in test_loader:
                x_batch = x_batch.to(DEVICE)
                dsi_pred, cls_logits = model(x_batch)
                cls_pred = torch.argmax(cls_logits, dim=1)
                all_dsi_pred.extend(dsi_pred.cpu().numpy())
                all_cls_pred.extend(cls_pred.cpu().numpy())
                all_dsi_true.extend(yr_batch.numpy())
                all_cls_true.extend(yc_batch.numpy())

        mae = mean_absolute_error(all_dsi_true, all_dsi_pred)
        r2  = r2_score(all_dsi_true, all_dsi_pred)
        f1  = f1_score(all_cls_true, all_cls_pred, average="macro", zero_division=0)

        print(f"\n[Regression]     MAE: {mae:.3f}   R²: {r2:.3f}")
        print(f"[Classification] Macro F1: {f1:.3f}")
        print(classification_report(
            [int(x) for x in all_cls_true],
            [int(x) for x in all_cls_pred],
            labels=[0, 1, 2],
            target_names=["None", "Moderate", "Severe"],
            zero_division=0
        ))

        mlflow.log_metrics({"LSTM_reg_MAE": mae, "LSTM_reg_R2": r2, "LSTM_cls_F1": f1})
        mlflow.pytorch.log_model(model, "lstm_dual_head")

    return model, scaler, test_loader


# ─────────────────────────────────────────────
# 7. MC DROPOUT INFERENCE
# ─────────────────────────────────────────────
def mc_dropout_predict(model: DroughtLSTM,
                       x_input: torch.Tensor,
                       n_passes: int = 50) -> dict:
    model.enable_mc_dropout()
    dsi_samples = []

    with torch.no_grad():
        for _ in range(n_passes):
            dsi_pred, _ = model(x_input)
            dsi_samples.append(dsi_pred.cpu().numpy().reshape(-1))

    samples  = np.concatenate(dsi_samples, axis=0)
    mean_dsi = samples.mean()
    ci_low   = np.percentile(samples, 2.5)
    ci_high  = np.percentile(samples, 97.5)

    if mean_dsi < -5:   severity = "Severe drought"
    elif mean_dsi < -1: severity = "Moderate drought"
    elif mean_dsi < 3:  severity = "Stable"
    elif mean_dsi < 7:  severity = "Healthy"
    else:               severity = "Excess water"
    
    return {
        "DSI_mean":    round(float(mean_dsi), 3),
        "DSI_CI_low":  round(float(ci_low),   3),
        "DSI_CI_high": round(float(ci_high),  3),
        "severity":    severity,
        "n_passes":    n_passes,
    }


# ─────────────────────────────────────────────
# 8. MAIN
# ─────────────────────────────────────────────
if __name__ == "__main__":
    # Persist all runs to D:\DroughtPrediction\mlflow.db
    # so they survive between sessions and show in the UI
    mlflow.set_tracking_uri(MLFLOW_TRACKING_URI)
    mlflow.set_experiment("drought_early_warning")

    # FIX-12: load real data
    print("Loading real ERA5 + soil moisture data...")
    df = load_data()
    print(f"Dataset shape : {df.shape}")
    print(f"Class balance :\n{df[CLS_TARGET].value_counts().to_string()}\n")

    with mlflow.start_run(run_name="full_pipeline") as parent_run:
        parent_run_id = parent_run.info.run_id
        mlflow.log_params({
            "n_samples":   len(df),
            "data_source": "real_ERA5_soil_moisture",
            "date_range":  "2010-01 to 2025-12",
        })

        # Phase 3
        rf_reg, rf_cls, rf_scaler, X_test, yr_test, yc_test = train_random_forest(
            df, parent_run_id
        )

        # Phase 4
        lstm_model, lstm_scaler, test_loader = train_lstm(df, parent_run_id)

    # MC Dropout demo
    print("\n" + "="*55)
    print("  MC DROPOUT INFERENCE DEMO")
    print("="*55)

    # Use the LAST SEQ_LEN months of real data to forecast 6 months ahead
    last_seq = lstm_scaler.transform(df[FEATURE_COLS].values[-SEQ_LEN:])
    sample_seq = torch.tensor(last_seq, dtype=torch.float32).unsqueeze(0).to(DEVICE)

    result = mc_dropout_predict(lstm_model, sample_seq, n_passes=100)
    last_known_month = df.index[-1] if hasattr(df.index, "month") else "latest"
    print(f"\n  Input     : last {SEQ_LEN} months of real data")
    print(f"  Forecast  : {FORECAST_HORIZON} months ahead")
    print(f"  DSI Score : {result['DSI_mean']}")
    print(f"  95% CI    : [{result['DSI_CI_low']}, {result['DSI_CI_high']}]")
    print(f"  Condition : {result['severity']}")

    print("\n  All runs logged. View with:  mlflow ui")`}
    />
    </div>
    </div>
  </>
  )
} 

export default page