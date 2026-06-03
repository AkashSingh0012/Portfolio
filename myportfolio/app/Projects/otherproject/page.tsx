"use client"
import React from 'react'
import Navbar from "@/app/components/Navbar";
import Cardholder from '@/app/components/Cardholder';
function page() {
  return (
    <>
    <Navbar/>
    <div className="CardSpace">
        <Cardholder
        title="Python Projects"
        image="/Placeholder.jpg"
        tags={["Python", "Programming"]}
        route="/Projects/otherproject/PythonProjects"
        />
    </div>
    </>
  )
}

export default page