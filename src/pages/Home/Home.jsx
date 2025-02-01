import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import flyingRocket from "../../assets/astronaut/flying-rocket.gif";

export const Home = () => {
  return (
    <div className="home-container">
      <div className="home-title">
        <img src="/logo.gif" alt="Logo" className="logo" />
        <span className="title">Top Hackathons</span>
      </div>

      <main className="hero-section">
        <div className="left-content">
          <h1>Find. Plan. Win.</h1>
          <h2>All in one place</h2>
          <p>
            Join hackathons to sharpen your skills, meet like-minded people, and
            win big!
          </p>
          <Link to="/explore" className="cta-button">Get Started</Link>
        </div>

        <div className="right-content">
          <img src={flyingRocket} alt="Flying Rocket" className="cartoon-image" />
        </div>
      </main>
    </div>
  );
};
