"use client";
import CodeBlock from '@/app/components/Code';
import Navbar from '@/app/components/Navbar';
import Link from 'next/link';
import React from 'react'

function page() {
  return (
    <>
    <Navbar/>
    <div className="ProjectDescription">
        <div className="Text">
            <h2> Encryption Script</h2>
            <h3> Overview</h3>
            <p> The following project was written as a hypothetical whatif the message could be stateless and the keys become more dynamic by changes to key built over a semantic meaning from the conversation itself
                . The project itself isnt a secure system and has shotcomings but this was one of the fun projects.
            </p>
            <h3> Key Learning </h3>
            <p> This project let me dive into the encryptions systems and also let me understand more on the messaging and how encryption works.</p>
            <h3> Project Repository</h3>  
            <Link href="https://github.com/AkashSingh0012/Encryption_hypothesis.git"> Project Repo</Link>
            
    </div>
    </div>
    </>
  )
}

export default page