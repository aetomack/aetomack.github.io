'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import './Downloads.css';

const DownloadButton = ({href, label, className}) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-4 download-link ${className}`}
    >
      <span className="flex-grow text-center">{label}</span>
      <p className="text-sm ml-auto">v0.15</p>
      <Image 
        src={`/${className}.png`} 
        width={25} 
        height={25} 
        alt={label} 
        className="ml-auto" 
      />
    </a>
);

const Downloads = () => {
  const [isHovering, setIsHovering] = useState(false);
    return (
      <div className="download-buttons">
        <DownloadButton
          href="https://tabsy-updates.s3.us-east-2.amazonaws.com/Tabsy+Setup+0.1.5.exe"
          label="Download for Windows"
          className="windows-download"
        />
        <DownloadButton
          href="https://tabsy-updates.s3.us-east-2.amazonaws.com/Tabsy-0.1.5-arm64.dmg"
          label="Download for Mac"
          className="mac-download"
        />
      </div>
    );
  };

export default Downloads;