"use client";

import React from 'react'
import Navbar from "@/app/components/Navbar";
import Cardholder from '@/app/components/Cardholder';

function page() {
  return (
    <>
    <Navbar/>
    <div className="CardSpace">
        <Cardholder
        title ="QGIS Script"
        image = "/Placeholder.png"
        tags={["Python", "QGIS" ]}
        route="/Projects/QGIS"/>
        <Cardholder
        title="Drought Prediction Model"
        image="/Placeholder.png"
        tags={["ML", "Python"]}
        route="/Projects/DroughtPrediction"/>
        <Cardholder
        title="Encryption Hypothesis"
        image="/Placeholder.png"
        tags={["Python"]}
        route="/Project/Encryptionhypo"
        />
    </div>
    </>
  )
}

export default page