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
        image="/otherprojects/python.png"
        tags={["Python", "Programming"]}
        route="/Projects/otherproject/PythonProjects"
        />
        <Cardholder
        title ="Web Dev"
        image = "/otherprojects/web.png"
        tags={["html", "Next", "prisma" ]}
        route="/Projects/otherproject/Webdev"/>
        <Cardholder
        title=" UnityProjects"
        image="/otherprojects/GD.png"
        
        tags ={["unity6", "unrealEngine"]}
        route="/Projects/otherproject/UnityUnrealProjects"/>
    </div>
    </>
  )
}

export default page