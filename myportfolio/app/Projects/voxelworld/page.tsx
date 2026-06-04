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

    <h3 >Overview</h3>
    <p>
      A procedural voxel engine built in Unity 6, born from an attempt to build a Minecraft-style game. When performance issues hit during world generation, I rebuilt the system from the ground up — leading to custom mesh generation, compute shaders, and chunk-based rendering using Perlin noise
      
    </p>

    <h3 >Core Features</h3>
    <ul>
      <li>Seeded world generation with Perlin noise</li>
      <li>Chunk-based rendering system</li>
      <li>Custom vertex and compute shaders</li>
      <li>Real-time chunk loading and unloading (Working on it)</li>
      
    </ul>

    <h3>Key Learnings</h3>
    <p>
      The project let me into deep understanding on how to make meshes using c# in unity while also giving me a look into scripting shaders 
    </p>
    <p> To learn more on the journey scroll below</p>
  </div>

  <div className="Image">
    <img src="/voxelworld.png" alt="voxelworld" />
  
  </div>
</div>


<div className='ProjectDescription'>
  <div className="Text">
    <h3> About Project </h3>
  <p> The original project revolved around building a Minecraft-style sandbox game.
     The first chunk was built by instantiating GameObjects across a 16X16X255 grid — which hit the system hard due to the sheer number of objects being rendered simultaneously. Rather than abandon the project, I researched performance optimization methods and discovered voxel-based rendering. That deep dive eventually became its own standalone engine, which I'm now building out before returning to the original game.  
     </p>
  </div>
<div className="Image">
<img src="/worldGenNaive.png" alt="worldGenNaive"/>
</div>
</div>
    </>
  )
}

export default page