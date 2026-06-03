"use client";
import Navbar from "@/app/components/Navbar";
import React from 'react'

function page() {
  return (
    <>
    <Navbar/>
    <div className="ProjectDescription">
  <div className="Text">
    <h2>2D Platformer</h2>

    <h3>Overview</h3>
    <p>
      This project was built as a "No Tutorial Challenge" to strengthen my problem solving and gameplay programming skills.
      The goal was to build a complete 2D platformer while minimizing reliance on step-by-step tutorials and implementing core systems independently.
    </p>

    <h3>Core Features</h3>
    <ul>
      <li>Player movement</li>
      <li>Combat mechanics</li>
      <li>Health management</li>
      <li>Animation handling</li>
      <li>Enemy interaction</li>
      <li>Tilemap-based level construction</li>
    </ul>

    <h3>Key Learnings</h3>
    <p>
      Through this project I gained practical experience with Unity’s New Input System,
      gameplay scripting, state management, and level design workflows.
    </p>c:\Users\akash\OneDrive\Desktop\AkashResume.pdf
  </div>

  <div className="Image">
    <img src="/2dplatformer.png" alt="2D Platformer" />
  </div>
</div>
    </>
  )
}

export default page