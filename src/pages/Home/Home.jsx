import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import flyingRocket from "../../assets/astronaut/hero.gif";
import step1 from "../../assets/astronaut/searching.svg";
import step2 from "../../assets/astronaut/all-resources.svg";
import step3 from "../../assets/astronaut/winner.svg";
import { Title } from "../../components/Title/Title";
import { Footer } from "../../components/Footer/Footer";

export const Home = () => {
  return (
    <div className="home-container">
      {/* Header */}
      <Title />
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="left-content">
            <h1>Code. Collaborate. Celebrate.</h1>
            <h2>All Top Hackathons in One Place</h2>
            <p>
              Discover top hackathons across India, build projects, win prizes
              and unlock new opportunities.
            </p>
            <Link to="/explore" className="cta-button">
              Find Hackathons
            </Link>
          </div>
          <div className="right-content">
            <img src={flyingRocket} alt="HERO" className="cartoon-image" />
          </div>
        </section>

        {/* Journey Section */}
        <section className="getting-started">
          <h2 className="section-title">Your Journey</h2>
          <div className="steps-grid">
            {journeySteps.map((step, index) => (
              <div className="step" key={index}>
                <div className="step-number">{index + 1}</div>
                <h3 className="curved-underline">{step.title}</h3>
                <div className="step-img">
                  <img src={step.image} alt={step.alt} />
                </div>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
          <Link to="/about" className="secondary-button">
            Our Story
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const journeySteps = [
  {
    title: "Find Hackathons",
    description:
      "Explore hackathons that spark your creativity and send your ideas to new heights",
    image: step1,
    alt: "Find perfect hackathon matches",
  },
  {
    title: "Get Ready",
    description:
      "Get ready with our tools and tips to launch your ideas into the universe of possibilities",
    image: step2,
    alt: "Prepare for hackathon success",
  },
  {
    title: "Build & Win",
    description:
      "Build projects, win prizes and let your idea take off as the next big startup in this galaxy!",
    image: step3,
    alt: "Win hackathon prizes",
  },
];
