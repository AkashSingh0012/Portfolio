"use client";
import React from 'react'
import Navbar from '@/app/components/Navbar';
import Cardholder from '@/app/components/Cardholder';
function page() {
  return (
    <>
    <Navbar/>
    <div>
        <div className="CardSpace">
            <Cardholder
            title ="Leh"
            image = "/leh.png"
            tags={["QGIS" , "Blender", "OSM","satellite imaging" ]}
            route=""/>
            <Cardholder
            title="India Subcontinent"
            image="/India3dModelpng.png"
            tags={[]}
            route=""
            />
            <Cardholder
            title="Barrel "
            image="/Placeholder.png"
            tags={["Blender"]}
            route=""
            />
            <Cardholder
            title="brickwall model"
            image="/brickwallmodel.png"
            tags={["Blender"]}
            route=""
            />
        </div>
    </div>
    </>
    
  )
}

export default page