"use client";

import React from "react";
import "../public/assets/css/main.css";
import "../public/assets/css/noscript.css";
import DecryptedText from "./lib/Decrypt";
import Particles from './lib/Particles.js';

const Page: React.FC = () => {
  return (
    <div className="is-preload " >
      <div id="bg">
        <Particles 
          className = 'any'
          particleColors={['#ffffff', '#ffffff']}
          particleCount = {200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
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
                text="Full Stack | ML | Product"
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
                  text="Bridging the gap between"
                  speed={108}
                  sequential={true}
                  animateOn="view"
                  revealDirection="start"
                  maxIterations={13}
                  characters="ABCD1234!?"
                  className="revealed"
                  parentClassName="all-letters"
                  encryptedClassName="encrypted"/>
                 
                  <DecryptedText 
                  text=" excellent code and customer service."
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
            <p>
              Across the stack and at a Michelin Key private club
            </p>
            <p>
              Currently building a platform for pre-seed startups on campuses and delivering exceptional service at Soho House Nashville. 
            </p>
            <p>
              Recently, I worked at a mental health startup, Arrowz, revamping their backend ML implementation and launching a revenue model; at a local org delivering thousands of datasets to hundreds of parishes and schools; and at an ML startup in South Africa in collaboration with Western Sydney University implementing prototype unsupervised semantic segmentation models for sky observations.
            </p>
            <p>
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
            <form method="POST" action="../send_email.php">
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
                  href = "https://www.linkedin.com/in/alex-tomack/"
                  className = "fa-square-linkedin" 
                  aria-hidden = "true"
                  target = "_blank"
                  rel = "noreferrer"
                >
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
