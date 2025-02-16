import { useState, useEffect } from "react";
import "./Tools.css";

const animatedWords = ["Ideas", "Designs", "Inspirations", "Tips"];

export default function Tools() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % animatedWords.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tools-container">
      <div className="tools-box">
        {/* HACKATHONS Title */}
        <h1 className="tool-title">HACKATHONS</h1>

        {/* Animated Text */}
        <p className="animated-text">{animatedWords[index]}</p>

        {/* TOOL BOX Title */}
        <h2 className="title">TOOL BOX</h2>

        {/* Info Box */}
        <div className="info-box">
          <span className="icon">🛠️</span>
          <p className="info-text">
            Find all essential resources to ace your hackathons!
          </p>
        </div>
      </div>
    </div>
  );
}
