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
            image = "/3dmodels/leh.png"
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
            image="/3dmodels/barrel.png"
            tags={["Blender"]}
            route=""
            />
            <Cardholder
            title="brickwall model"
            image="/3dmodels/brickwallmodel.png"
            tags={["Blender"]}
            route=""
            />
            <Cardholder
            title="BlockMan Rig"
            image="/3dmodels/SimpleRigs.png"
            tags={["Blender", "Rigging", "Animation"]}
            route=""/>
        </div>
    </div>
    </>
    
  )
}

export default page