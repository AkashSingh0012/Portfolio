"use client";
import React from 'react'
import Navbar from "@/app/components/Navbar";
import Cardholder from '@/app/components/Cardholder';
function page() {
  return (
    <>
    <div className="CardSpace">
      <Cardholder
      title="RES Summit-AbstractSubmission Form (Intern work ) "
      image="/Placeholder.png"
      tags={["Internship", "RES SUMMIT 2026"]}
      route="/Projects/RESsummit"
      priority={false}
      />
    </div>
    </>
  )
}

export default page