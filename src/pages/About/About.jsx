import React from "react";
import "./About.css";
import logo from "../../assets/icons/Top-Hackathons.svg";
import { Title } from "../../components/Title/Title";
import { Helmet } from "react-helmet-async";

export const About = () => {
  return (
    <>
      <Helmet>
        <title>About | Top Hackathons</title>
        <meta
          name="description"
          content="Hackathons.top is a one-stop platform to discover, participate, and win hackathons. Explore hackathons from all sources, plan better, and launch your ideas!"
        />
        <meta
          name="keywords"
          content="hackathons, hackathon finder, student hackathons, coding competitions, tech events, hackathons India, online hackathons, engineering projects"
        />
        <meta property="og:title" content="About | Hackathons.top" />
        <meta
          property="og:description"
          content="Hackathons.top helps students discover and participate in hackathons easily. A platform built by an engineering student for students!"
        />
        <meta property="og:url" content="https://hackathons.top/about" />
        <link rel="canonical" href="https://hackathons.top/about" />
      </Helmet>

      <Title />
      <div className="about-container">
        <h1 className="page-title">About</h1>

        <section className="section yellow">
          <h2>Hackathons are launchpads</h2>
          <p>
            Building a project in{" "}
            <span className="highlight yellow">24-48 hours</span>, collaborating
            with new people and pushing limits - hackathons turn ideas into
            reality. More than just coding, they teach you how to
            <span className="highlight yellow">
              think, create and innovate.
            </span>
          </p>
        </section>

        <section className="section orange">
          <h2>Discover what’s possible</h2>
          <p>
            Many engineering students{" "}
            <span className="highlight orange">
              never hear about hackathons
            </span>{" "}
            happening in their cities. The big platforms{" "}
            <span className="highlight orange">Devfolio, Unstop</span> focus on
            their own events, but what about the countless college-hosted
            hackathons? They remain{" "}
            <span className="highlight orange">undiscovered</span> and students
            miss out.
          </p>
        </section>

        <section className="section red">
          <h2>I faced this problem too</h2>
          <p>
            When I started, I had no idea where to find hackathons. I had to{" "}
            search through{" "}
            <span className="highlight red">
              websites, WhatsApp groups and random social media posts
            </span>
            . After winning two hackathons, I realized: there needs to be a
            <span className="highlight red">simple, all-in-one place</span> for
            students to explore and plan hackathons.
          </p>
        </section>

        <section className="section green">
          <h2>So, I built Hackathons.top</h2>
          <ul>
            <li>
              <span className="highlight green">Lists all hackathons</span> -
              big and small.
            </li>
            <li>
              Helps you{" "}
              <span className="highlight green">sort and discover</span> the
              best for you.
            </li>
            <li>
              Lets students{" "}
              <span className="highlight green">submit hackathons</span> from
              their colleges, making it community driven.
            </li>
            <li>
              Provides <span className="highlight green">tools & tips</span> to
              help beginners generate ideas, plan and win.
            </li>
          </ul>
        </section>

        <section className="section blue">
          <h2>Giving back to the community</h2>
          <p>
            Hackathons have given me so much - learning fast, collaborating with
            my team
            <span className="highlight blue">Cosmic</span>, handling deadlines
            and expressing ideas. I’ve seen{" "}
            <span className="highlight blue">
              small wins (₹7.5K) and big wins (₹75K at IIIT Bengaluru)
            </span>
            and now, I want to help more students experience this journey.
          </p>
        </section>

        <section className="section purple">
          <h2>Explore. Compete. Launch.</h2>
          <p>
            Hackathons aren’t just competitions they’re where{" "}
            <span className="highlight purple">startups begin</span>, careers
            take shape and lifelong skills develop. Whether you’re a beginner or
            an experienced hacker,{" "}
            <span className="highlight purple">Hackathons.top</span> is here to
            help you explore, participate and let your ideas take off. 🚀
          </p>
        </section>

        <section className="section cyan">
          <h2>Code behind Hackathons.top</h2>
          <p>
            I built this using{" "}
            <span className="highlight cyan">React, Firebase</span> &{" "}
            <span className="highlight cyan">pure CSS</span> - no frameworks or
            UI libraries, because I love{" "}
            <span className="highlight cyan">building from scratch</span>. More
            features will be added over time!
          </p>
          <p>
            Connect with me on{" "}
            <a
              href="https://linkedin.com/in/kishore-sr"
              target="_blank"
              rel="noopener noreferrer"
              className="cyan-link"
            >
              LinkedIn
            </a>{" "}
            for feature updates and to know how I am building this project. 👨‍💻
          </p>
        </section>
      </div>

      <main className="footer-bottom">
        <img src={logo} alt="logo" />
        <p style={{ color: "#252525" }}>Top Hackathons &copy; 2025</p>
      </main>
    </>
  );
};
