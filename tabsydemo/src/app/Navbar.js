import React from 'react'
import Image from 'next/image'
import './Navbar.css';

const Navbar = () => {
    return (
<nav className = "navbar">
    <div className="navbar-left">
        <ul className="navbar-left-links">
            <li><a href="#Demo">Demo</a></li>
            <li><a href="#About">About</a></li>
            <li><a href="#Features">Features</a></li>
            <li><a href="#Testimonials">Testimonials</a></li>
        </ul>
    </div>
    <div className="navbar-center">
        <div className="navbar-logo">
            <Image 
                    src="/favicon.ico"
                    width={50}
                    height={50}
                    alt="tabsy.ai"
                />
        </div>
    </div>
    <div className="navbar-right">
        <ul className="navbar-right-links">
            <li><a href="#Contact">Contact Us</a></li>
        </ul>
    </div>
</nav>
    )
}

export default Navbar;