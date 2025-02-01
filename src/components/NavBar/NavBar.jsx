import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const location = useLocation();

  return (
    <>
      {/* Desktop Top Navbar */}
      <nav className="top-navbar">
        <div className="logo-title">
          <img src="/logo.png" alt="Logo" className="logo" />
          <span className="title">Top Hackathons</span>
        </div>
        <div className="nav-links">
          <Link to="/" className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
          <i class="ri-home-5-fill"></i>
            <span>Home</span>
          </Link>
          <Link to="/explore" className={`nav-item ${location.pathname === "/explore" ? "active" : ""}`}>
            <i className="ri-search-line"></i>
            <span>Explore</span>
          </Link>
          <Link to="/tools" className={`nav-item ${location.pathname === "/tools" ? "active" : ""}`}>
            <i className="ri-tools-line"></i>
            <span>Tools</span>
          </Link>
          <Link to="/profile" className={`nav-item ${location.pathname === "/profile" ? "active" : ""}`}>
            <i className="ri-user-star-line"></i>
            <span>Profile</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Bottom Navbar */}
      <nav className="bottom-navbar">
        <Link to="/" className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
        <i class="ri-home-5-fill"></i>
          <span>Home</span>
        </Link>
        <Link to="/explore" className={`nav-item ${location.pathname === "/explore" ? "active" : ""}`}>
          <i className="ri-search-line"></i>
          <span>Explore</span>
        </Link>
        <Link to="/tools" className={`nav-item ${location.pathname === "/tools" ? "active" : ""}`}>
          <i className="ri-tools-line"></i>
          <span>Tools</span>
        </Link>
        <Link to="/profile" className={`nav-item ${location.pathname === "/profile" ? "active" : ""}`}>
          <i className="ri-user-star-line"></i>
          <span>Profile</span>
        </Link>
      </nav>
    </>
  );
};
