"use client";
import Image from "next/image";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Socials from "@/app/components/socials"
export default function Home() {
  return (
    <>
    <div style={{background:'black'}}><Navbar/></div>    
    <div className=" NameBlock">
    <div className="Naming">
      Akash Singh
      
    </div>
    <div className="Taketoproject"></div>
    </div>
      <Socials/>
    </>
  );
}
