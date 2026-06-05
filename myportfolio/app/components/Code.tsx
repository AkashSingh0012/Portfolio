"use client";
import React from 'react'

interface CodeBlockProps {
  code: string;
  language?: string;
  FileName?:string;
}

function CodeBlock({ code, language = "csharp",FileName }: CodeBlockProps) {
  return (
    <div className="CodeBlock">
      <div className="CodeHeader">
        <span>{FileName}</span>
        <span>{language}</span>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default CodeBlock