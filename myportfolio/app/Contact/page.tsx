"use client";
import React, { useState }from 'react'
import Navbar from '@/app/components/Navbar'
function Page() {
   const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Message sent successfully!");
      } else {
        alert(data.error || "Failed to send message");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    }
  }
  return (

    <>
      <Navbar />

      <div className="ProjectDescripton">
        <div className="Text">
          <h2>Contact me</h2>
        <p> Feel free to reach out regarding opportunity, collaboration or project discussions.</p>
        <br></br>
        <div >
        email: akashsingh.as.pb@gmail.com   
        </div>
        </div>

      </div>
      <br/>
      <div> Want To get in Touch</div> 
        <br/>
        <br/>
        <div className="Tag">
          <fieldset className="ContactMefield">
            <label>Name</label><br/>
            <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)}></input><br/>
            <label>Email Address</label><br/>
            <input type="text" placeholder='Email'   onChange={(e) => setEmail(e.target.value)}/><br/>
            <label>Message</label><br/>
            <textarea placeholder="Enter message here" rows={10} className="ContactMefield_messagebox" onChange={(e) => setMessage(e.target.value)}/> <br/>
            <button type="submit" onClick={handleSubmit} >Submit </button>
          </fieldset>
        </div>
      
    </>
  )
}

export default Page