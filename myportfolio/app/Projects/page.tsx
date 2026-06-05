"use client";

import React from "react";
import Navbar from "@/app/components/Navbar";
import Cardholder from "../components/Cardholder";
import globals from "@/app/globals.css";

function Page() {
  return (
    <>
      <Navbar />

      <div className="ProjectPagehead">PROJECTS</div>

      <div className="CardSpace">
      

        <Cardholder
          title="Voxel World Generator"
          image="/Voxelworld.png"
          tags={["Unity", "Procedural Generation"]}
          route="/Projects/voxelworld"
        />

        <Cardholder
          title="2d Platformer"
          image="/2dplatformer.png"
          tags={["Unity2d", "Sprite","Platformer"]}
          route="/Projects/2dplatformer"
        />
          <Cardholder
          title="TCG Style Card Prototype"
          image="/TCG.png"
          tags={["Unity", "C#", "TCG"]}
          route="/Projects/TCGcardprototype"
        />
        <Cardholder
        title="Drag and Drop interaction "
        image="/dragdrop.png"
        tags={["unity","New Input System"]}
        route="/Projects/DragNdrop"
        />
        <Cardholder
        title="Role-based Collaboration Sheets  "
        image="/RBCS.png"
        tags={["RBAC", "Next", "Postgres", "Prisma"]}
        route="/Projects/RBCS" // ROLE BASED COLLABORATIVE SHEETS 
        />
        <Cardholder
        title="3d Models"
        image="India3dModelpng.png"
        tags={["Blender","3d","GameAssests", ]}
        route="/Projects/3DModels"/>

        <Cardholder
        title="2d"
        image="2d.png"
        tags={["Krita", "Tiles", "Art"]}
        //route="/Projects/2D"
        route="/Projects/UnderDeveopment"
        />

        <Cardholder
        title="Other Projects"
        image="otherProject.png"
        tags = {["Python", "Web Dev", "ML"]}
        //route="/Projects/otherproject"
        route = "/Projects/UnderDevelopment"
        />
      </div>
    </>
  );
}

export default Page;