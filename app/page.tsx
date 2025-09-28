"use client";

import React from "react";
import "../public/assets/css/main.css";
import "../public/assets/css/noscript.css";
import Dither from "./lib/Dither";
import dynamic from "next/dynamic";
import DecryptedText from "./lib/Decrypt";

const FaultyTerminal = dynamic(() => import("./lib/FaultyTerminal"), { ssr: false });

const Page: React.FC = () => {
  return (
    <div className="is-preload " >
      {/*Dither background*/}
      <div id="bg">
        <Dither
          waveSpeed={0.05}
          waveFrequency={3}
          waveAmplitude={0.3}
          waveColor={[0.5, 0.5, 0.5]}
          colorNum={4}
          pixelSize={2}
          enableMouseInteraction={true}
          mouseRadius={1}
        />
      </div>
      {/* Wrapper */}
      <div id="wrapper">
        {/* Header */}
        <header id="header">
          <div className="logo">
            <span className="icon fa-gem"></span>
          </div>
          <div className="content">
            <div className="inner">
              <h1>
                <DecryptedText 
                text="Alexander Tomack"
                speed={100}
                sequential={true}
                animateOn="view"
                revealDirection="start"
                maxIterations={20}
                characters="ABCD1234!?"
                className="revealed"
                parentClassName="all-letters"
                encryptedClassName="encrypted"/>
              </h1>
              <p>
                <DecryptedText 
                text="CS & Econ Vanderbilt Alum"
                speed={110}
                sequential={true}
                animateOn="view"
                revealDirection="start"
                maxIterations={13}
                characters="ABCD1234!?"
                className="revealed"
                parentClassName="all-letters"
                encryptedClassName="encrypted"/>
              </p>
              <p>
                <DecryptedText 
                text="Full Stack & ML Engineer"
                speed={106}
                sequential={true}
                animateOn="view"
                revealDirection="start"
                maxIterations={13}
                characters="ABCD1234!?"
                className="revealed"
                parentClassName="all-letters"
                encryptedClassName="encrypted"/>
                <br />
                <p>
                  <DecryptedText 
                  text="Most of my "
                  speed={108}
                  sequential={true}
                  animateOn="view"
                  revealDirection="start"
                  maxIterations={13}
                  characters="ABCD1234!?"
                  className="revealed"
                  parentClassName="all-letters"
                  encryptedClassName="encrypted"/>
                  <a 
                    href="https://github.com/aetomack" 
                    target="_blank" 
                    rel="noreferrer"
                  >
                    GitHub
                  </a> 
                  <DecryptedText 
                  text=" work is private, but feel free to ask about it!"
                  speed={115}
                  sequential={true}
                  animateOn="view"
                  revealDirection="start"
                  maxIterations={13}
                  characters="ABCD1234!?"
                  className="revealed"
                  parentClassName="all-letters"
                  encryptedClassName="encrypted"/>
                </p>
                
                </p>
            </div>
          </div>
          <nav>
            <ul>
              <li>
                <a href="#intro">Intro</a>
              </li>
              <li>
                <a href="#work">Work</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
        </header>

        {/* Main */}
        <div id="main">
          {/* Intro */}
          <article id="intro">
            <h2 className="major">Intro</h2>
            <span className="image main">
              <img src="/public/images/pic01.jpg" alt="" />
            </span>
            <p>Good code, for good people, for good purpose.</p>
            <p>
              I’m a software engineer with a strong belief that writing good code starts with
              understanding why it’s written. I’m not just driven by technical challenges, I’m driven
              by clarity of purpose. My work is always informed by the bigger picture: what the
              company is building, who it serves, and how each line of code contributes to that
              mission.
            </p>
          </article>

          {/* Work */}
          <article id="work">
            <h2 className="major">Work</h2>
            <span className="image main">
              <img src="/public/images/pic02.jpg" alt="" />
            </span>
            <p>I've worked all across the stack.</p>
            <p>
              Recently, I worked at a mental health startup, Arrowz, revamping their backend ML implementation and launching a revenue model; at a local org delivering thousands of datasets to hundreds of parishes and schools; and at an ML startup in South Africa in collaboration with Western Sydney University implementing prototype unsupervised semantic segmentation models for sky observations.

In my research, I've continued to explore semantic segmentation models @ Vanderbilt's digital lab in collaboration with our archives, training few-shot semantic segmentation models on antique stereoscopic images for VR viewing. I'm fascinated by machine learning methods and low-level programming, and as artificial intelligence development ramps up and permeates every layer of our lives, it's increasingly important to understand the science-- both as an engineer and as a citizen.
            </p>
          </article>

          {/* About */}
          <article id="about">
            <h2 className="major">About</h2>
            <span className="image main">
              <img src="/public/images/bwheadshot.jpg" alt="" />
            </span>
            <p>
              On top of engineering, I'm also an avid musician, actor, painter, and photographer.
              I've performed on stage for the past decade in plays and musicals, and starred in
              student/amateur films. My photography work is mostly for fun, although has been
              displayed at Vanderbilt's expo for the arts in Chicago.
            </p>
          </article>

          {/* Contact */}
          <article id="contact">
            <h2 className="major">Contact</h2>
            <form method="post" action="#">
              <div className="fields">
                <div className="field half">
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" id="name" />
                </div>
                <div className="field half">
                  <label htmlFor="email">Email</label>
                  <input type="text" name="email" id="email" />
                </div>
                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea name="message" id="message" rows={4}></textarea>
                </div>
              </div>
              <ul className="actions">
                <li>
                  <input type="submit" value="Send Message" className="primary" />
                </li>
                <li>
                  <input type="reset" value="Reset" />
                </li>
              </ul>
            </form>
            <ul className="icons">
              <li>
                <a
                  href="https://github.com/aetomack"
                  className="icon brands fa-github"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="label">GitHub</span>
                </a>
              </li>
              <li>html send email link
                <a
                  href="https://www.linkedin.com/in/alex-tomack/"
                  className="icon brands fa-linkedin"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="label">LinkedIn</span>
                </a>
              </li>
            </ul>
          </article>
        </div>

        {/* Footer */}
        <footer id="footer">
          <p className="copyright">&copy; Alexander Tomack</p>
        </footer>
      </div>
    </div>
  );
};

export default Page;
