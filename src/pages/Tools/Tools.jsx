import "./Tools.css";
import { Title } from "../../components/Title/Title";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/icons/Top-Hackathons.svg";

import bulbGif from "../../assets/icons/bulb.gif";
import proGif from "../../assets/icons/pro.gif";
import apiGif from "../../assets/icons/api.gif";
import designGif from "../../assets/icons/design.gif";
import crownGif from "../../assets/icons/crown.gif";
import diamondGif from "../../assets/icons/diamond.gif";
import thunderGif from "../../assets/icons/thunder.gif";
import tickGif from "../../assets/icons/tick.gif";

import ShinyText from "../../components/ShinyText/ShinyText";

// Cards data
const cards = [
  {
    id: 1,
    gif: bulbGif,
    title: "Winning Ideas",
    description: "Discover top hackathon projects that have won before!",
    link: "https://github.com/Olanetsoft/awesome-hackathon-projects",
  },
  {
    id: 2,
    gif: proGif,
    title: "Canva Premium",
    description: "To design high-quality PPTs for your idea submissions.",
    link: "https://whatsapp.com/channel/0029Va8PdHQ6BIEeXbMhNm1R",
  },
  {
    id: 3,
    gif: thunderGif, 
    title: "AI Chatroom",
    description: "Chat and compare all powerful AI models at once.",
    link: "https://chathub.gg/",
  },  
  {
    id: 4,
    gif: apiGif,
    title: "Free APIs",
    description: "List of free APIs to build powerful projects.",
    link: "https://github.com/public-apis/public-apis",
  },
  {
    id: 5,
    gif: designGif,
    title: "Design Inspiration",
    description:
      "Find creative design ideas and inspiration for your projects.",
    link: "https://calltoinspiration.com/",
  },
  {
    id: 6,
    gif: crownGif,
    title: "Animated Components",
    description: "A collection of animated React components with source code.",
    link: "https://www.reactbits.dev/",
  },
  {
    id: 7,
    gif: diamondGif,
    title: "UI Components",
    description: "Explore a vast collection of free buttons & loaders.",
    link: "https://uiverse.io/",
  },
  {
    id: 8,
    gif: tickGif,
    title: "API Testing",
    description: "A fast and open-source website based API testing tool.",
    link: "https://hoppscotch.io/",
  },
];

export default function Tools() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  return (
    <>
      <Title />
      <div className="tools-container">
        <div className="tools-content">
          <h1 className="tool-title">Toolbox</h1>
          <p className="tool-description">
            Winning a hackathon is easier when you have the right tools and
            strategy.
          </p>

          {/* Cards Section with Blur Effect */}
          <div className="cards-section">
            <div className={`cards-container ${!isSignedIn ? "blurred" : ""}`}>
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
                      <img src={card.gif} alt="icon" className="card-gif" />
                    </div>
                    <div className="card-right">
                      <h3 className="card-title">
                        {card.title} <i className="ri-arrow-right-up-line"></i>
                      </h3>
                      <p className="card-description">{card.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Overlay - Only on Cards Section */}
            {!isSignedIn && (
              <div className="cards-overlay" onClick={() => navigate("/login")}>
                <i class="ri-lock-2-fill lock-icon"></i>
                <p className="overlay-text">Login to Unlock</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {(isSignedIn) && (
      <ShinyText  text="More tools soon..." speed={5} className="more-text" /> 
     )}

      <main className="footer-bottom" style={{ marginTop: "10px" }}>
        <img src={logo} alt="logo" />
        <p style={{ color: "#5e5d5d", }}>Top Hackathons &copy; 2025</p>
      </main>
    </>
  );
}
