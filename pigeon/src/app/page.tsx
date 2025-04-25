'use client'

import Navbar from "./Navbar.js";
import {Row, Col, Carousel, Button } from 'antd';
import Image from "next/image"
import ReactPlayer from 'react-player'
import "./page.css"

export default function Home() {
  return (
    <div>
      <main>
        <Navbar />
        <Row justify="space-evenly" align="middle" style={{ height: "80vh" }}>
          <Col>
            <div className="tagline-text">
              <div className="tagline-header">
                Help Yourself Get Ahead. 
              </div>
              <div className="tagline-para">
                Tabsy is a file explorer that uses natural language processing<br></br>to search all your files in one place. Want to get ahead? Get Tabsy.
              </div>
            </div>
          </Col>
          <Col>
            <Image 
              src="/nav-logo.png"
              width={500}
              height={500}
              alt="tabsy.ai"
            />
          </Col>
        </Row>
        <Row justify="space-evenly" align="middle">
          <Col>
            <div className="download-buttons">
              <a href="https://tabsy-updates.s3.us-east-2.amazonaws.com/Tabsy+Setup+0.1.5.exe">
                Download for Windows
              </a>
            </div>
          </Col>
          <Col>
          <div className="download-buttons">
            <a href="https://tabsy-updates.s3.us-east-2.amazonaws.com/Tabsy+Setup+0.1.5.exe">
              Download for Mac
            </a>
          </div>
          </Col>
        </Row>
        <Row justify = "space-evenly" align="middle" style={{ height: "40vh" }}>
          <Col >
            <div className="carousel-card">
              <ReactPlayer 
                url="https://framerusercontent.com/assets/Q2oM4Rq1HAs1s9vnS4SMqnD1BI.mp4" 
                playing={true}
                controls={false}
                loop={true}
                muted={true}
              />
            </div>
          </Col>
          <Col >
            <div className="tagline-text">
                <div className="tagline-header">
                  By Researchers, For Researchers
                </div>
                <div className="tagline-para">
                  Made in collaboration with Vanderbilt Researchers
                </div>
              </div>
          </Col>
        </Row>
      </main>
      <footer>
        
      </footer>
    </div>
  );
}
