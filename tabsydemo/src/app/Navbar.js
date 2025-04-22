'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import './Navbar.css';

function HoverComponent() {
    const [isHovering, setIsHovering] = useState(false);
}

const Navbar = () => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <nav className = "navbar">
            <div className="logo">
                <Image 
                    src="/Tabsy_AI_archivo.png"
                    width={200}
                    height={400}
                    alt="tabsy.ai"
                />
            </div>
            <div 
                className = "navbar-contact"
                onMouseEnter={()=>setIsHovering(true)}
                onMouseLeave={()=>setIsHovering(false)}
                style={{
                    color: isHovering ? 'rgb(255, 179, 138)' : '#494949'
                }}
            >
                <a href = "mailto:contact@tabsy.com">Contact Us</a>
            </div>
        </nav>
    );
};

export default Navbar;