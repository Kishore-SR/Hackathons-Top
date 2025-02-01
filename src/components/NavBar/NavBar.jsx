import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file

export const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-item">Home</Link>
      <Link to="/explore" className="nav-item">Explore</Link>
      <Link to="/tools" className="nav-item">Tools</Link>
      <Link to="/profile" className="nav-item">Profile</Link>
    </nav>
  );
};
