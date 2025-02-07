import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
      {/* SEO Optimization */}
      <Helmet>
        <title>Top Hackathons - Galaxy of Hackathons</title>
        <meta
          name="description"
          content="Discover top hackathons across India. Join to build projects, win prizes and unlock new opportunities. Your one-stop platform for hackathon success."
        />
        <meta
          name="keywords"
          content="hackathons, india hackathons, coding competitions, tech events, student hackathons, engineering hackathons, hackathons in Bengaluru, hackathons in Karnataka, engineering hackathons, student hackathons, tech competitions, coding competitions, Bangalore hackathons, hackathon events, developer hackathons, programming contests, hackathon platform, hackathon projects, hackathon ideas, hackathon tools, hackathon resources, hackathon success, hackathon tips, hackathon prizes, hackathon winners, hackathon projects, hackathon community, hackathon network, hackathon opportunities, hackathon challenges, hackathon solutions, hackathon sponsors, hackathon partners, hackathon collaborations, hackathon registrations, hackathon schedules, hackathon dates, hackathon deadlines, hackathon results, hackathon rankings, hackathon feedback, hackathon reviews, hackathon ratings, hackathon experiences, hackathon stories, hackathon journeys, hackathon adventures, hackathon explorations, hackathon discoveries, hackathon innovations, hackathon creations, hackathon inventions, hackathon inspirations, hackathon motivations, hackathon aspirations, hackathon dreams, hackathon visions, hackathon missions, hackathon goals, hackathon objectives, hackathon purposes, hackathon values, hackathon beliefs, hackathon principles, hackathon practices, hackathon disciplines, hackathon learnings, hackathon teachings, hackathon trainings, hackathon educations, hackathon developments, hackathon progress, hackathon growth, hackathon success, hackathon achievements, hackathon victories, hackathon celebrations, hackathon experiences, hackathon stories, hackathon journeys, hackathon adventures, hackathon explorations, hackathon discoveries, hackathon innovations, hackathon creations, hackathon inventions, hackathon inspirations, hackathon motivations, hackathon aspirations, hackathon dreams, hackathon visions, hackathon missions, hackathon goals, hackathon objectives, hackathon purposes, hackathon values, hackathon beliefs, hackathon principles, hackathon practices, hackathon disciplines, hackathon learnings, hackathon teachings, hackathon trainings, hackathon educations, hackathon developments, hackathon progress, hackathon growth, hackathon success, hackathon achievements, hackathon victories, hackathon celebrations"
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
            My Story
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
