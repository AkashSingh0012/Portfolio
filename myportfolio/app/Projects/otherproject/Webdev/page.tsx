"use client";
import React from 'react'
import Navbar from "@/app/components/Navbar";
import Cardholder from '@/app/components/Cardholder';
function page() {
  return (
    <>
    <div className="CardSpace">
      <Cardholder
      title="ResSummit-AbstractSubmission Form (Intern work ) "
      image=""
      tags={["Internship", "RES SUMMIT 2026"]}
      route=""
      priority={false}
      />
    </div>
    </>
  )
}

export default page