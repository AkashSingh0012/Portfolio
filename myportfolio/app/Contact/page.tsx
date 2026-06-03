"use client";
import React from 'react'
import Navbar from '@/app/components/Navbar'
function Page() {
  return (
    <>
      <Navbar />
      <div>Contact me
        <p> Feel free to reach out regarding opportunity, collaboration or project discussions.</p>
        <br></br>
        <div >
        Mobile Number: 8377954041<br/>
        email: akashsingh.as.pb@gmail.com   
        </div>

      </div>
      <br/>
      <div> Want To get in Touch</div> 
        <br/>
        <br/>
        <div>
          <fieldset className="ContactMefield">
            <label>Name</label><br/>
            <input type="text" placeholder='Name'></input><br/>
            <label>Email Address</label><br/>
            <input type="text" placeholder='Email'/><br/>
            <label>Message</label><br/>
            <textarea placeholder="Enter message here" rows={10} className="ContactMefield_messagebox" /> <br/>
            <input type="button" value="Submit"/>
          </fieldset>
        </div>
      
    </>
  )
}

export default Page