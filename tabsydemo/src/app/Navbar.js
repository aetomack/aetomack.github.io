import React from 'react'
import Image from 'next/image'
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className = "navbar">
            <div className="logo">
                <Image 
                    src="/Tabsy_AI.png"
                    width={200}
                    height={400}
                    alt="tabsy.ai"
                />
            </div>
            <div className = "navbar-contact">CONTACT US</div>
        </nav>
    )
}

export default Navbar;