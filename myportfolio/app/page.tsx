"use client";
import Image from "next/image";
import globals from "./globals.css";
import Navbar from "@/app/components/Navbar";
import Socials from "@/app/components/socials"
export default function Home() {
  return (
    <>
    <div style={{background:'black'}}><Navbar/></div>    
      <Socials/>
    </>
  );
}
