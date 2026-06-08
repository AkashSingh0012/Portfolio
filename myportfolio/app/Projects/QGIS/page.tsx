"use client";
import React from 'react'
import Navbar from '@/app/components/Navbar';
import CodeBlock from '@/app/components/Code';
function page() {
  return (

    <>
    <Navbar/>

    <div>
    <div>QGIS Scripts</div>

    <CodeBlock
    code ={``}
    language='Python'
    FileName="As i even named them Properly all named SCRIPTS1.py"/>
    </div>
    </>
  )
}

export default page