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
        title =""
        image = "/Placeholder.jpg"
        tags={["Python", "QGIS" ]}
        route=""/>
    </div>
    </>
  )
}

export default page