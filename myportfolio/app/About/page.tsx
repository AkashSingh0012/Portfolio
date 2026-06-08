"use client";
import React from 'react'
import Navbar from '@/app/components/Navbar'
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
          
          </div>
          <div className="Image">
            <img src="/Placeholder.png"/>
          </div>
          
    </div>
    <div className="ProjectDescription">
      <div className="Text">
        <h2> Experience</h2>
        <p></p>
      </div>
      <div className="Image">
        <img src="/Placeholder.png"/>
      </div>
    </div>
    </>
  )
}

export default Page