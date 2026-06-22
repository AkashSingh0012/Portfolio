"use client";
import React from 'react'
import Navbar from "@/app/components/Navbar";
import Cardholder from '@/app/components/Cardholder';
import { Analytics } from '@vercel/analytics/next';
function page() {
  return (
    <>
    <Navbar/>
    <div className="CardSpace">
      <Cardholder
      title="RES Summit-AbstractSubmission Form (Intern work ) "
      image="/Placeholder.png"
      tags={["Internship", "RES SUMMIT 2026"]}
      route="/Projects/RESsummit"
      priority={false}
      />
    </div>
    <Analytics/>
    </>
  )
}

export default page