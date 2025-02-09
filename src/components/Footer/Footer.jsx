import React from "react";
import "./Footer.css";
import star from "../../assets/astronaut/footer-star.svg";
import logo from "../../assets/icons/Top-Hackathons.svg";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="footer-container">
      <main className="footer-text">
        <div className="footer-about">
          <h4>Your Win. Our Mission.</h4>
          <p>
            Beginner looking for your first hackathon or an experienced hacker
            aiming to achieve more, Top Hackathons is here to support you at
            every step. Let's build, learn and win together!
          </p>
          <div className="social-icons">
            <div className="ksr-link">
              <a
                href="https://bento.me/ksr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="ri-flashlight-fill"></i>Built by KSR
              </a>
            </div>
            <div className="wa-link">
              <a
                href="https://whatsapp.com/channel/0029VazgcfQ6buMRvpvZ2y1V"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="ri-whatsapp-fill"></i>WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="footer-img">
          <img src={star} alt="star" />
        </div>
      </main>

      <main className="quick-links">
        <h1>Quick Links</h1>
        <div className="footer-links">
          <section className="left-links">
            <p>
              <Link to="/about" className="footer-link">
                About
              </Link>
            </p>
            <p>
              <Link to="/submit" className="footer-link">
                Submit
              </Link>
            </p>
            <p>
              <Link to="/tools" className="footer-link">
                Tools
              </Link>
            </p>
            <p>
              <a href="mailto:kishoresr01@gmail.com" className="footer-link">
                Contact
              </a>
            </p>
          </section>

          <section className="right-links">
            <p>
              <Link to="/privacy" className="footer-link">
                Privacy
              </Link>
            </p>
            <p>
              <Link to="/terms" className="footer-link">
                Terms
              </Link>
            </p>
          </section>
        </div>
      </main>

      <main className="footer-bottom">
        <img src={logo} alt="logo" />
        <p>Top Hackathons &copy; 2025</p>
      </main>
    </footer>
  );
};
