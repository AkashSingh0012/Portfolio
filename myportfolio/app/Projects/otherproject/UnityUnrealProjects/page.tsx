"use client";
import Cardholder from '@/app/components/Cardholder';
import Navbar from '@/app/components/Navbar'
import React from 'react'
import { Analytics } from "@vercel/analytics/next"
function page() {
  return (
    <>
    <Navbar/>
    <div className="CardSpace">
    <Cardholder
        title="Drag and Drop interaction "
        image="/dragdrop.png"
        tags={["unity","New Input System"]}
        route="/Projects/DragNdrop"
        priority={false}
        />
        </div>
        <Analytics/>

    </>
  )
}

export default page