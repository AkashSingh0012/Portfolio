"use client";
import { useRouter } from "next/navigation"
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Socials from "@/app/components/socials"

export default function Home() {
  const router= useRouter();
  return (
    <>

    <div style={{background:'black'}}><Navbar/></div>    
    <div className=" NameBlock">
    <div className="Naming">
     <h2> Akash Singh</h2>
     <br/>
    </div>
   
    <div className="Taketoproject">
      
      <button  onClick={() => router.push("/Projects")}>To Projects</button>
    </div>
    
    </div>
      <Socials/>
    </>
  );
}
