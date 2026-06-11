"use client";
import React from 'react';
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';
function page() {
  return (
    <>
    <Navbar/>
    <div className="ProjectDescription">
      <div className="Text">
        <h2>3D Model Viewer</h2>
        <h3>Overview</h3>
        <p>3D model Viewer was a project build during the internship in ICARS(IIT Roorkee)
          during working on the knowledge platform for the climate knowledge forum.
          The original project was made so that a 3D interactivity can be provided to the user landing on the page
          of the platform.
           </p>
           <br/>
           <div style={{color:"#b388ff"}}>
           <Link href="https://3dmodel-viewer-ten.vercel.app" >ProjectdemoLive </Link>           
           </div>
           <span> The Link has the model removed please procede as it is it going to load a sample model of cube instead of actual indian model</span>
           
           <h3> Additional Details</h3>
           <p> The following project was written on Next.js and React framework.
            Furthermore the model was designed by me as well using Blender.
            the major focus of the project was on customizability.
           </p>
           <ul>
            <li> The project should be fast</li>
            <li> Adding or Removing CoE from the Map should be done without remodeling the 3d Model</li>
            <li> Compatible with the already present stack on which website was built on.(Next and React)</li>
           </ul>
           <p>As such the Project was built by making the subcontinent model using the Heightmap and the satellite imaging while for the markers a rendering was made real time on top of the model
            and by using a JSON file which stored the data of the marker position on the 3d scene a application was made to have it extendable and editable application where marker addition and removal are as simple as deleting entry from the JSON
           </p>
           </div>
           <div className="Image">
            <img src="/3dModelViewer.png"/>
      </div>
      </div>
      <div className="ProjectDescription">
      <div className="Text">
        <div className="Image">
          <img src="/India3dModelpng.png"/>
        </div>
        <p style={{display:"flex",justifyContent:"center"}}> Indian Model which was made for the project.</p>
        </div>
    </div>


    </>
  )
}

export default page