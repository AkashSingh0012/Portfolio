"use client";
import React from 'react'
import Navbar from "@/app/components/Navbar";
function page() {
   return (
    <>
    <Navbar/>
    <div className="ProjectDescription">
  <div className="Text">
    <h2>TCG card Prototype</h2>

    <h3>Overview</h3>
    <p>
      The following Project is a prototype of a Card Based game with Board Placing game with Capture the flag type of design. 
      The game originally was build as a assignment given during the interview.
      Which required to build a unique mechanic within the game with a theme of war. 

      So during that i leaned to a more TCG style game. To add a unique mechanic i went with Odd/ Even. 
      Where Odd/Even Pairty was chosen before throwing the dice rolling. And based on the selected pairty player was given additional charges.

      These charges when used allowed player to do in game changes during game.
      which included moving there Camp(The objective) which they placed by two squares.
      while other use of charges were also there. 
      One of my favourate was a shared card where one side chooses from 4 face down card and selected card now is a shared card both player got.
      and at given time only 1 shared card can be there.
    </p>

    <h3 >Core Features</h3>
    <ul>
      <li>State Management</li>
      <li>Board Game </li>
      <li>Capture the Flag</li>
      
    </ul>

    <h3>Key Learnings</h3>
    <p>
       In this Project I learnt more on how to quick prototype a board and learned more on the State management in a game. With fast prototyping and working under a time preasure.
    </p>
  </div>

  <div className="Image">
    <img src="/" alt="" />
  </div>
</div>
    </>
  )
}

export default page