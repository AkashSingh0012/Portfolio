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
        title =""
        image = "/Placeholder.png"
        tags={[]}
        route=""/>
    </div>
    </>
  )
}

export default page