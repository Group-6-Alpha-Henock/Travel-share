import React from "react";
import { Link } from "react-router-dom";




function Navbar() {
  return (
    <div className="navbar">
      
      <div className="navbarLogo navbar">
        <nav className="logo"><Link to='/userPosts' >Travel Share</Link></nav>
      </div>

      <ul className="navbarMenu navbar">
        <li><Link to="/blogs">User</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>

    </div>
  );
}

export default Navbar;
