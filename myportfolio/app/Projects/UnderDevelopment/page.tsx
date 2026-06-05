"use client";
import React from 'react'
import { useRouter } from 'next/navigation'
function page() {
    const router = useRouter();
  return (
    <>
    <div className="ProjectDescription">
        <div className="Text">
            <h2> PAGE UNDER PROGRESS </h2>
            
            <div className="Taketoproject"><button onClick={() => router.push("/Projects")}> Take me Back</button></div>
        </div>
    </div>
    <img src ="/UnderDev.png"/>
    </>
  )
}

export default page