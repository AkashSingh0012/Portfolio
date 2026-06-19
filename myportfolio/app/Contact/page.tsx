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

      <div className="ProjectDescription">
        <div className="Text">
          <h2>Contact me</h2>
        <p> Feel free to reach out regarding opportunity, collaboration or project discussions.</p>        
        <div>
  Email:{" "}
  <a
    href="mailto:akashsingh.as.pb@gmail.com"
    style={{ color: "#b388ff" }}
  >
    akashsingh.as.pb@gmail.com
  </a>
</div>
        </div>

      </div>
      <br/>
      <h3 className="ContactHeading">Want To Get In Touch?</h3>
      <div className="ContactMe">
    <fieldset className="ContactForm">
      <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email Address</label>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Message</label>
        <textarea
          placeholder="Enter message here"
          rows={10}
          className="ContactMefield_messagebox"
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </fieldset>
    </div>
    </>
  )
}

export default Page