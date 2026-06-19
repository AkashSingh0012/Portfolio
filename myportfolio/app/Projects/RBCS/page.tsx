"use client";

import React from 'react'
import Navbar from '@/app/components/Navbar';
function page() {
  return (
    <>
    <Navbar/>
    <div> 
        <div className="ProjectDescription">
           <div className="Text">
            <h2> Role-Based Collaborative Sheet</h2>
            <h3> Overview</h3>
            <p> 
              The following Project was made as a side project to make a system of Central repository and for the issue i faced during the event timeline.
              Where i was working with Central Repository and had to coordinate across multiple departments to get the right and correct data.
              so i made this project to work in a single team without half time running around for correct data and updated data.

            </p>
            <h3> How Project works</h3>
            <p> In the project there are multiple user and a Admin user. 
              Admin user are given permission to have access to all the sheet made within the system.
              While each user has access to there own sheets.
              A user is given permission to edit update delete and create any sheet they want under the constraint they should be owner of the sheet.
              While Admin has access to all the sheets, While admin also having access to the audit Log which is the log of showing the log of whatever was done during on the system.
              the particular description are kept minimum to
              " What happened " , "Where Happened", "When Happen", " Who did it".
              In what happened is  CRUD operation log it  shows which operation was performed
              Where is mainly Sheet where changes were made.
              Who did it this showcased by the username.
            </p>
            <h3>Features</h3>
            <p> Other than just being CRUD application it also served with a Excel sheet ui for data and with availability of  excel formulas using fortune sheets.
              While other features of the application are.
            </p>
              <ul>
                <li>Sheet sharing with permission </li>
                <li>Sheet versioning</li>
                <li>Live Sheet working</li>
                <li>Soft Delete and Hard delete</li>
              </ul>
              <p>
              Sheet sharing: Within organisation a user can permit other user using there username to a particular sheet. With either
              Editor, Viewer
              Sheet versioning: This functionality let user or admin to make a snapshot of the sheet and let them revert to the sheet state when snapshot was made
              Live Sheet Working: By using Socket the sheets were made to broadcast so that multiple person can be on the single sheet.
              To prevent the lock states and multiple editing of same cell by multiple user. Whenever a user is on the cell hovering the cell is locked to the specific 
              user making it non editable for other user during the session.
            </p>
           </div>
           <div className="Image">
          <img src="/Sheets.png"/>
          
        </div>
        </div>
        <div className="ProjectDescription">
        <div className="Image"> 
          <img src="/RBCS.png"/>
        </div>
        </div>
        
    </div>
    </>
  )
}

export default page