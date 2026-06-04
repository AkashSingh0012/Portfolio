"use client";
import React from 'react'
import Navbar from "@/app/components/Navbar"
function page() {
   return (
    <>
    <Navbar/>
    <div className="ProjectDescription">
  <div className="Text">
    <h2>Voxel</h2>

    <h3>Overview</h3>
    <p>
      This project is the current project i am working on and it all started from making a minecraft similar game.
      Which originally was going great while in the middle of project when it came to random world generation i started facing the performance
      issues as such i looked into method to make it more efficient and then came to the voxel engine. And voxel engine project is a project which came to born because 
      i wanted to make a minecraft clone. 
      
    </p>

    <h3 >Core Features</h3>
    <ul>
      <li>Custom mesh generation</li>
      <li>Custom Shaders scripts</li>
      
    </ul>

    <h3>Key Learnings</h3>
    <p>
      Generating mesh using C# and How shaders are written 
    </p>
  </div>

  <div className="Image">
    <img src="/voxelworld.png" alt="voxelworld" />
  </div>
</div>
    </>
  )
}

export default page