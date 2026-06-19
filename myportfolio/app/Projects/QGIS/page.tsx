"use client";
import React from 'react'
import Navbar from '@/app/components/Navbar';
import CodeBlock from '@/app/components/Code';
function page() {
  return (
    <>
    <Navbar/>

    <div className="Project Description">
    <div className="Text">
      <h2>QGIS Scripts </h2>
      <h3> Overview</h3>
      <p> The Following scripts were made during my time using QGIS software. While there are multiple script as such the </p>


      </div>
    <CodeBlock
    code ={``}
    language='Python'
    FileName="As i even named them Properly all named SCRIPTS1.py"/>
    </div>
    </>
  )
}

export default page 