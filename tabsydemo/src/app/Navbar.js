import React from 'react'
import Image from 'next/image'

const Navbar = () => {
    return (
<nav className = "navbar">
    <div className="navbar-left">
        <Image 
            src="/favicon.ico"
            width={500}
            height={500}
            alt="tabsy.ai"
        />
    </div>
</nav>
    )
}

export default Navbar;