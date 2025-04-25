'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import './Navbar.css';

const Navbar = () => {

    return (
        <nav className = "navbar">
            <div className="logo-container">
                <div className="logo">
                    <Image 
                        src="/nav-logo.png"
                        width={75}
                        height={75}
                        alt="tabsy.ai"
                    />
                </div>
                <div className="tabsy"> 
                        Tabsy
                </div>
            </div>
            <div 
                className = "navbar-contact"
            >
                <a href = "mailto::contact@tabsy.com">Contact Us</a>
            </div>
        </nav>
    );
};

export default Navbar;