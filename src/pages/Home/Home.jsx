import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./Home.css";
import flyingRocket from "../../assets/astronaut/flying-rocket.gif";
import step1 from "../../assets/astronaut/searching.svg";
import step2 from "../../assets/astronaut/all-resources.svg";
import step3 from "../../assets/astronaut/winner.svg";
import { Title } from "../../components/Title/Title";

export const Home = () => {
  return (
    <div className="home-container">
      {/* SEO Optimization */}
      <Helmet>
        <title>Top Hacks - Find, Plan and Win Hackathons in India</title>
        <meta
          name="description"
          content="Discover top hackathons across India. Join to build projects, win prizes, and unlock new opportunities. Your one-stop platform for hackathon success."
        />
        <meta
          name="keywords"
          content="hackathons, india hackathons, coding competitions, tech events, student hackathons, engineering hackathons"
        />
        <meta
          property="og:title"
          content="Top Hackathons - Your one-stop platform for hackathon success."
        />
        <meta
          property="og:description"
          content="Find and join the best hackathons in India. Build projects, win prizes, and grow your skills."
        />
      </Helmet>

      {/* Header */}
      <Title/>
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="left-content">
            <h1>Code. Collaborate. Celebrate.</h1>
            <h2>All Top Hackathons in One Place</h2>
            <p>
              Discover top hackathons across India, build projects, win prizes,
              and unlock new opportunities.
            </p>
            <Link to="/explore" className="cta-button">
              Find Hackathons
            </Link>
          </div>
          <div className="right-content">
            <img
              src={flyingRocket}
              alt="Innovative Hackathon Projects"
              className="cartoon-image"
            />
          </div>
        </section>

        {/* Journey Section */}
        <section className="getting-started">
          <h2 className="section-title">Your Hackathon Journey</h2>
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
          <Link to="/tools" className="secondary-button">
            Our Features
          </Link>
        </section>
      </main>
    </div>
  );
};

const journeySteps = [
  {
    title: "Find Hackathons",
    description:
      "Discover exciting hackathons that match your interests and skills",
    image: step1,
    alt: "Find perfect hackathon matches",
  },
  {
    title: "Get Ready",
    description: "Use our tools, tips and resources to get hackathon-ready",
    image: step2,
    alt: "Prepare for hackathon success",
  },
  {
    title: "Build & Win",
    description:
      "Create impactful projects, win prizes, and unlock new opportunities",
    image: step3,
    alt: "Win hackathon prizes",
  },
];
