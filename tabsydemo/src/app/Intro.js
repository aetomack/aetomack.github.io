'use client'

import React, { useState, useEffect } from 'react';
import './Intro.css';

const words = [
  'Give Yourself a Photographic Memory.',
  'Use Natural Language to Search All Your Files.',
  'By Researchers, For Researchers.',
  'Get Ahead. Get Tabsy.',
];

const Intro = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [word, setWord] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[currentWordIndex];
    const speed = isDeleting ? 50 : 100;
    const pauseTime = 2000;

    let timeout;

    if (!isDeleting && word === current) {
      // pause at full word
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && word === '') {
      // move to next word
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    } else {
      // continue typing or deleting
      timeout = setTimeout(() => {
        const updated = isDeleting
          ? current.slice(0, word.length - 1)
          : current.slice(0, word.length + 1);
        setWord(updated);
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [word, isDeleting, currentWordIndex]);

  return (
    <div className="tagline">
      <h1>
        <span className="typewriter">{word}</span>
      </h1>
    </div>
  );
};

export default Intro;
