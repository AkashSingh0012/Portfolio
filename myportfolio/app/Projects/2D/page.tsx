"use client";
import Cardholder from '@/app/components/Cardholder';
import Navbar from '@/app/components/Navbar';
import React from 'react';
import { Analytics } from "@vercel/analytics/next";

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
    
    <Analytics/>
    </>
  )
}

export default page