"use client";
import React from 'react'
import Navbar from '@/app/components/Navbar';
function page() {
  return (
    <>
    <Navbar/>
    <div className="ProjectDescription">
        <div className="Text">
            <h2> NLP Flashcard toolkit</h2>
            <h3> Overview</h3>
            <p> The following project was built as the final year capstone project revolving around the use case of natural language processing in the academics
                and how it has impacted the students. The project itself was built along side a research article and was presented in 2025 at ICCSC via online mode which held in Fez, Morocco.
            </p>
            <h3> Key Learning</h3>
            <p> This Project allowed us to dive into deeper studies and understanding of ai systems and how natural language processing can be a incooperatedwith other subdomains of Artificial intelligence to intregrate with the academic system.</p>

            <h3> Project Working</h3>
            <p> The project takes the student notes and parse through it by using Natural Language processing and makes a key-value pairs from the notes by referencing what the sentence is trying to convey and what its trying to focus onto.
                By that the program makes the flashcard from the notes.
                To add more features to the project the test yourself was also added to let the user test there knowledge based on the notes they gave and the answers were judged by the system by using fuzzy matching to match the overall context rather than matching exact wordings.
            </p>
        </div>
    </div>
    </>
  )
}

export default page