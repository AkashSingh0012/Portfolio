"use client";

import React from 'react'
import Navbar from "@/app/components/Navbar";
import Cardholder from '@/app/components/Cardholder';

function page() {
  return (
    <>
    <Navbar/>
    <div className="CardSpace">
        <Cardholder
        title ="QGIS Scripts"
        image = "/Placeholder.jpg"
        tags={["Python", "QGIS" ]}
        route="Projects/QGIS"/>
        <Cardholder
        title="Drought Prediction Model"
        image="/Placeholder.png"
        tags={["ML", "Python"]}
        route="/"/>
    </div>
    </>
  )
}

export default page