"use client";
import React from 'react'
import Navbar from '@/app/components/Navbar';

function Page() {
  return (
    <>
      <Navbar />
        <div>
            To download the resume Click the button below to load the resume
            <br></br>
            <button className="DownloadResume" onClick={() => window.open('/Resume.pdf', '_blank')}>Download Resume</button>
        </div>
    </>
  )
}

export default Page