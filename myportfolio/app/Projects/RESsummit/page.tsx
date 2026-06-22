"use client";

import Navbar from '@/app/components/Navbar';
import React from 'react'
import Link from 'next/link';
import { Analytics } from "@vercel/analytics/next"
function page() {
  return (
    <>
    <Navbar/>
    <div className="ProjectDescription">
        <div className="Text">
            <h2> RES Summit - Abstract Submission Page</h2>
            <h3>Overview</h3>
            <p>The following taskwas assigned to me during the RES summit work in the IIT Roorkee as a intern. 
                Where i had to make a form for delegates to submit there abstracts only if the prerequesties were fullfilled.
                While working on the following i was coordinating with the mentor closely and also working with him on the same repository for the project duration</p>

                <h3> Project Repository</h3>
                <p> <Link href="https://github.com/AkashSingh0012/res_db_chk.git" > Go to Github Project</Link></p>
                <h3>My Contribution</h3>
                <p> In the following Project my Contribution were</p>
                <ul>
                    <li> Frontend designing</li>
                    <li>Schema Designing</li>
                    <li> API design for queerying the database for the delegate details for crosschecking</li>
                </ul>
        </div>
    </div>
    <Analytics/>
    </>
  )
}

export default page