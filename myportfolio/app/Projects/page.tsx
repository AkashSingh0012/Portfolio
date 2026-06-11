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
          priority={true}
        />

        <Cardholder
          title="2d Platformer"
          image="/2dplatformer.png"
          tags={["Unity2d", "Sprite","Platformer"]}
          route="/Projects/2dplatformer"
          priority={true}
        />
          <Cardholder
          title="TCG Style Card Prototype"
          image="/TCG.png"
          tags={["Unity", "C#", "TCG"]}
          route="/Projects/TCGcardprototype"
          priority={true}
        />
        
        <Cardholder
        title="Role-based Collaboration Sheets  "
        image="/RBCS.png"
        tags={["RBAC", "Next", "Postgres", "Prisma"]}
        route="/Projects/RBCS" // ROLE BASED COLLABORATIVE SHEETS 
        priority={true}
        />
        <Cardholder
        title="3d Models"
        image="/India3dModelpng.png"
        tags={["Blender","3d","GameAssests", ]}
        route="/Projects/3DModels"
        priority={false}
        />
        <Cardholder
        title=""
        image="/3dModelViewer.png"
        tags={["Next", "Three.js","JSON Config"]}
        route="/Projects/3DmodelViewer"
        priority={false}/>
        <Cardholder
        title="NLP Flashcard Tool"
        image="/Placeholder.png"
        tags={["Python", "NLP", "Research Project","IEEE paper"]}
        route="/Projects/UnderDevlopment"
        priority={false}
        />

        <Cardholder
        title="2d"
        image="/2d.png"
        tags={["Krita", "Tiles", "Art"]}
        route="/Projects/UnderDevlopment"
        priority={false}
        />
        <Cardholder
        title="Horror Game Prototype"
        image="/Placeholder.png"
        tags = {["UE5",""]}
        route=""
        />

        <Cardholder
        title="Other Projects"
        image="/otherProject.png"
        tags = {["Python", "Web Dev", "ML"]}
        route = "/Projects/otherproject"
        priority={false}
        />
        

      </div>
    </>
  );
}

export default Page;