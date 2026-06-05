"use client";
import Cardholder from '@/app/components/Cardholder';
import Navbar from '@/app/components/Navbar';
import React from 'react'

function page() {
  return (
    <>
    <Navbar/>
    <div className="CardSpace">
        <Cardholder
        title ="Web Dev"
        image = "/Placeholder.png"
        tags={["html", "Next", "prisma" ]}
        route=""/>
    </div>
    </>
  )
}

export default page