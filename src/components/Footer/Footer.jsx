import React from "react";
import "./Footer.css";
import star from "../../assets/astronaut/footer-star.svg";

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
                href="https://www.whatsapp.com/"
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
    </footer>
  );
};
