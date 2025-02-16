import { useState, useEffect } from "react";
import "./Tools.css";

const animatedWords = ["#Ideas", "#Designs", "#Innovations", "#Tips"];

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
      <div className="tools-content">
        <h1 className="tool-title">
          Winning Tools{" "}
          <span className="animated-text">{animatedWords[index]}</span>
        </h1>

        <p className="tool-description">
          Hackathons are like space adventures – to reach new heights, you need the right tools. Explore these tools, sharpen your skills and take your project to the stars!
        </p>
      </div>
    </div>
  );
}
