"use client";

import React from "react";
import Navbar from "@/app/components/Navbar";
import Cardholder from "../components/Cardholder";
import globals from "@/app/globals.css";

function Page() {
  return (
    <>
      <Navbar />

      <div className="ProjectPagehead">Projects</div>

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
          image="/TCG.jpg"
          tags={["Unity", "C#", "TCG"]}
          route="/Projects/TCGcardprototype"
        />
        <Cardholder
        title="Drag and Drop interaction "
        image="/dragdrop.png"
        tags={["unity","New Input System"]}
        route=""
        />
        <Cardholder
        title="Role-based Collaboration Sheets  "
        image="placeholder.png"
        tags={["RBAC", "Next", "Postgres", "Prisma"]}
        route=""
        />
        <Cardholder
        title="3d Models"
        image="placeholder.png"
        tags={["Blender","3d","GameAssests", ]}
        route="/Projects/blender_models"/>

        <Cardholder
        title="2d"
        image="2d.png"
        tags={["Krita", "Tiles", "Art"]}
        route=""/>

        <Cardholder
        title="Other Projects"
        image="otherProject.png"
        tags = {["Python", "Web Dev", "ML"]}
        route="/Projects/otherproject"
        />
      </div>
    </>
  );
}

export default Page;