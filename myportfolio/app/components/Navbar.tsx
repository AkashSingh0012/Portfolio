import React from 'react'
function Navbar() {
  return (
    <>
    <div className= "Navigation" >
      
              
        <nav >
            <a href="/" className="NavComponent"> Home  </a>
            <a href="/About" className="NavComponent"> About Me  </a>
            <a href="/Projects"className="NavComponent"> Projects   </a>
            <a href="/Contact"className="NavComponent"> Contact   </a>
            
            <button  className="DownloadResume" onClick={() => window.open('/resume.pdf', '_blank')}> Resume </button> 
            
        </nav>
    </div>
    </>
  )
}

export default Navbar