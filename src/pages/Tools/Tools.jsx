import { useState, useEffect } from "react";
import "./Tools.css";

import bulbGif from "../../assets/icons/bulb.gif";

const animatedWords = ["#Ideas", "#Designs", "#Innovations", "#Tips"];

// Card data
const cards = [
  {
    id: 1,
    gif: bulbGif, 
    title: "Idea Validation",
    description: "Validate your hackathon ideas quickly with these tools.",
    link: "https://example.com/idea-validation", 
  },
  {
    id: 2,
    gif: "https://app.testmyskills.ai/gifs/dashboard-achievement.gif", 
    title: "Design Tools",
    description: "Create stunning designs with Figma, Canva, and more.",
    link: "https://example.com/design-tools", 
  },
  {
    id: 3,
    gif: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif", 
    title: "APIs & Libraries",
    description: "Find APIs and libraries to power your project.",
    link: "https://example.com/apis-libraries", 
  },
  {
    id: 4,
    gif: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif", 
    title: "Hosting & Deployment",
    description: "Deploy your project for free with Vercel, Netlify, etc.",
    link: "https://example.com/hosting-deployment", 
  },
  {
    id: 5,
    gif: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif", 
    title: "AI Tools",
    description: "Use AI tools like OpenAI and Hugging Face.",
    link: "https://example.com/ai-tools", 
  },
  {
    id: 6,
    gif: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif", 
    title: "Time Management",
    description: "Stay productive with Pomodoro timers and task managers.",
    link: "https://example.com/time-management", 
  },
];

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

        {/* Cards Section */}
        <div className="cards-container">
          {cards.map((card) => (
            <a
              key={card.id}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
            >
              <div className="card">
                <div className="card-left">
                  <img src={card.gif} alt="GIF" className="card-gif" />
                </div>
                <div className="card-right">
                  <h3 className="card-title">{card.title} {" "}<i class="ri-arrow-right-up-line"></i></h3>
                  <p className="card-description">{card.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}