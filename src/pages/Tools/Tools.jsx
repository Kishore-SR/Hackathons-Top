import "./Tools.css";

import bulbGif from "../../assets/icons/bulb.gif";
import proGif from "../../assets/icons/pro.gif";
import apiGif from "../../assets/icons/api.gif";
import designGif from "../../assets/icons/design.gif";
import crownGif from "../../assets/icons/crown.gif";
import diamondGif from "../../assets/icons/diamond.gif";
import thunderGif from "../../assets/icons/thunder.gif";

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
    description: "To design high quality PPTs for your idea submissions.",
    link: "https://whatsapp.com/channel/0029Va8PdHQ6BIEeXbMhNm1R",
  },
  {
    id: 3,
    gif: apiGif,
    title: "Free APIs",
    description: "List of free APIs to build powerful projects.",
    link: "https://github.com/public-apis/public-apis",
  },
  {
    id: 4,
    gif: designGif,
    title: "Design Inspiration",
    description:
      "Find creative design ideas and inspiration for your projects.",
    link: "https://calltoinspiration.com/",
  },
  {
    id: 5,
    gif: crownGif,
    title: "Animated Components",
    description: "A collection of animated React components with source code.",
    link: "https://www.reactbits.dev/",
  },

  {
    id: 6,
    gif: diamondGif,
    title: "Free UI Components",
    description: "Explore a vast collection of free buttons & loaders.",
    link: "https://uiverse.io/",
  },
  {
    id: 7,
    gif: thunderGif,
    title: "API Testing",
    description: "A fast and open-source website based API testing.",
    link: "https://hoppscotch.io/",
  },
];

export default function Tools() {
  return (
    <div className="tools-container">
      <div className="tools-content">
        <h1 className="tool-title">Toolbox</h1>

        <p className="tool-description">
          Hackathons are like space adventures – to reach new heights, you need
          the right tools. Explore these tools, sharpen your skills and take
          your project to the stars!
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
                  <h3 className="card-title">
                    {card.title} <i className="ri-arrow-right-up-line"></i>
                  </h3>
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
