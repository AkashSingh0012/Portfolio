"use client";
import React from 'react'
import Navbar from '@/app/components/Navbar'
import Image from "next/image";
function Page() {
  return (
    <>
      <Navbar />
    <div className="ProjectDescription">
      <div className="Text">
        <h2>About Me</h2>
        
        <p> Hey, I'm Akash Singh  - a game developer and programmer based in Greater Noida, India. I
          graduated with B.Tech in Computer Science and Engineering(Game Technology) from Galgotias University
          in 2025.
          I specialize in Unity and C# with focus on gameplay systems  and interactive experince. Beyond games, I worked
          across 3D asset creation in Blender, backend developement and Python tooling.

          I enjoy building things that are technically intersting or objectively dumb.

          </p>
          <h2> Skills</h2>
          <ul className="SkillList">
            <li className="Tag"> Unity</li>
            <li className="Tag"> Blender</li>
            <li className="Tag"> C# </li>
            <li className="Tag"> Unreal Engine 5</li>
            <li className="Tag"> Python</li>
            <li className="Tag"> React</li>
            <li className="Tag"> Prisma ORM</li>
            <li className="Tag"> Postgres</li>
            <li className="Tag"> Git</li>
            <li className="Tag"> QGIS</li>
            <li className="Tag"> Nextjs</li>
            <li className="Tag"> TypeScript</li>
            <li className="Tag"> Machine Learning</li>
            
          </ul>

          <h2> Experience</h2>
          <ul>
            <li> IIT Roorkee Feb 2026- Present</li>
            <ul>
              <li>Designed database schema and backend APIs using Prisma ORM and TypeScript for the summit's delegate management system</li>
              <li>
                Built abstract submission portal and admin panel that handled 181 delegate registrations across a 3-day, 385+ attendee summit
              </li>
            </ul>

            <li> We Attach Tech Nov2025- Dec 2025</li>
            <ul>
              <li>Developed YOLOv6 object detection model for real-time monkey detection over RTSP video streams during the evaluation period</li>
            </ul>

          </ul>

          
          
          </div>
          <div className="Image">  
        <Image src={"/Placeholder.png"} alt={"Placeholder.png"} width={240} height={240}/>  
          </div>
    </div>
    </>
  )
}

export default Page