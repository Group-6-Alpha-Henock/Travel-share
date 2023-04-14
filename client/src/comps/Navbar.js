import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar'>
        <div className='navbarLogo'>
        <Link to="/">Travel Share</Link>
        </div>
        <ul className='navbarMenu'>
          <li ><Link to="/blogs">Blogs</Link></li>
          <li ><Link to="/about">About Us</Link></li>
        </ul>
    





    </div>
  )
}

export default Navbar