"use client";

import React, { useState } from "react";
import CodeBlock from "@/app/components/Code"; 

interface FileEntry {
  filename?: string;
  language?: string;
  code: string;
}

interface FileExplorerProps {
  files: FileEntry[];
}

function FileExplorer({ files }: FileExplorerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = files[selectedIndex];

  return (
    <div className="FileExplorer">
      <div className="FileList">
        {files.map((file, index) => (
          <div
            key={file.filename}
            className={`FileListItem ${index === selectedIndex ? "active" : ""}`}
            onClick={() => setSelectedIndex(index)}
          >
            {file.filename}
          </div>
        ))}
      </div>

      <div className="FileContent">
        <CodeBlock
          FileName={selected.filename}
          language={selected.language}
          code={selected.code}
        />
      </div>
    </div>
  );
}

export default FileExplorer;