"use client";
import React from 'react'
import Navbar from '@/app/components/Navbar';
import { Analytics } from "@vercel/analytics/next"
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


            <h3> Publication</h3>
            <p>A. Singh, A. Singh and H. Kumar, "Natural Language Processing and its Impact on Academics and on Student's Efficiency and Effectiveness,"
            2025 International Conference on Circuit, Systems and Communication (ICCSC), Fez, Morocco, 
            2025, pp. 1-5, doi: 10.1109/ICCSC66714.2025.11135378. 
            keywords: (Technological innovation;Reviews;Education;Semantics;Knowledge graphs;Manuals;Parallel processing;
            Natural language processing;Libraries;Real-time systems;NLP;FUzzyWuzzy;SpaCy;Joblib;Parallel Processing;Education System),</p>
        </div>
        <div className="Image"></div>
    </div>
    <Analytics/>
    </>
  )
}

export default page