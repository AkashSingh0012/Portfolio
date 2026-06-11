"use client";
import React from 'react'
import UnderDevelopement from "@/app/Projects/UnderDevlopment/page";
function page() {
  return (
    <>
    <UnderDevelopement/>
    <div className="ProjectDescription">
      <div className="Text">
        <h2>3D Model Viewer</h2>
        <h3>Overview</h3>
        <p>3D model Viewer was a project build during the internship in ICARS(IIT Roorkee)
          during working on the knowledge platform for the climate knowledge forum.
          The original project was made so that a 3D interactivity can be provided to the user landing on the page
          of the platform.
           </p>
           <h2> Additional Details</h2>
           <p> The following project was written on Next.js and React framework.
            Furthermore the model was designed by me as well using Blender.
            the major focus of the project was on customizability.
           </p>
           <ul>
            <li> The project should be fast</li>
            <li> Adding or Removing CoE from the Map should be done without remodeling the 3d Model</li>
            <li> Compatible with the already present stack on which website was built on.(Next and React)</li>
           </ul>
           <p></p>
           <div className="Image"></div>
      </div>
    </div>
    </>
  )
}

export default page