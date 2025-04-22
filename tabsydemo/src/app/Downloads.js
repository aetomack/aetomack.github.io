'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import './Downloads.css';

const DownloadButton = ({href, label, className}) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`download-link ${className}`}
    >
        {label}
    </a>
);

const Downloads = () => {
    return (
      <div className="download-buttons">
        <DownloadButton
          href="https://tabsy-updates.s3.us-east-2.amazonaws.com/Tabsy+Setup+0.1.5.exe"
          label="Windows Download"
          className="windows-download"
        />
        <DownloadButton
          href="https://tabsy-updates.s3.us-east-2.amazonaws.com/Tabsy-0.1.5-arm64.dmg"
          label="Mac Download"
          className="mac-download"
        />
      </div>
    );
  };

export default Downloads;