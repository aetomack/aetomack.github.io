'use client';

import React from 'react'
import ReactPlayer from 'react-player'
import './DemoCarousel.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const DemoCarousel = () => {
    const responsive = {
        all: {
            breakpoint: { max: 4000, min: 0 },
            items: 1,
            slidesToSlide: 1,
        }
    };

    return (
        <Carousel
            responsive={responsive}
            showDots={true}
            ssr={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={14000}
            keyBoardControl={true}
            transitionDuration={500}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
            <div className="carousel-card">
                <ReactPlayer 
                    url="https://framerusercontent.com/assets/Q2oM4Rq1HAs1s9vnS4SMqnD1BI.mp4" 
                    playing={true}
                    width="100%"
                    height="100%"
                    controls={false}
                    loop={true}
                    muted={true}
                />
            </div>
            <div className="carousel-card">
                <ReactPlayer 
                    url="https://framerusercontent.com/assets/bVEPDDPeHOySLk1pGLJTkgFFII.mp4" 
                    playing={true}
                    width="100%"
                    height="100%"
                    controls={false}
                    loop={true}
                    muted={true}
                />
            </div>
            <div className="carousel-card">
                <ReactPlayer 
                    url="https://framerusercontent.com/assets/s8nUnHo8nh4AYHAjR5LLtVuXopk.mp4" 
                    playing={true}
                    width="100%"
                    height="100%"
                    controls={false}
                    loop={true}
                    muted={true}
                /></div>
        </Carousel>
    );
};


export default DemoCarousel;
