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
        image="/Placeholder.png"
        tags={["Python", "Programming"]}
        route="/Projects/otherproject/PythonProjects"
        />
        <Cardholder
        title ="Web Dev"
        image = "/Placeholder.png"
        tags={["html", "Next", "prisma" ]}
        route="/Projects/UnderDevelopment"/>

    </div>
    </>
  )
}

export default page