import React, { useEffect, useState } from "react";
import "./Tools.css";
import { Helmet } from "react-helmet-async";
import { Title } from "../../components/Title/Title";

export const Tools = () => {
  const [timeLeft, setTimeLeft] = useState({});

  const calculateTimeLeft = () => {
    const eventDate = new Date("2025-02-16T00:00:00"); // Tools page launch date
    const now = new Date();
    const difference = eventDate - now;

    if (difference <= 0) return {};

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });
  };

  useEffect(() => {
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Title />
      <Helmet>
        <title>Tools | Top Hackathons</title>
        <meta
          name="description"
          content="Find the best hackathons happening near you. Hackathons are great places to code quickly, learn collaboration, and celebrate your ideas."
        />
        <meta name="author" content="Kishore S R" />
      </Helmet>

      <div className="tools-container">
        <div className="tools-content">
          <img src="/gift.gif" alt="Treasure" className="tools-img" />
          <div className="countdown-timer">
            <div className="timer">
              {timeLeft.days !== undefined ? (
                <>
                  <div className="time">
                    <p>{timeLeft.days}</p>
                    <span>Days</span>
                  </div>
                  <div className="time">
                    <p>{timeLeft.hours}</p>
                    <span>Hours</span>
                  </div>
                  <div className="time">
                    <p>{timeLeft.minutes}</p>
                    <span>Minutes</span>
                  </div>
                  <div className="time">
                    <p>{timeLeft.seconds}</p>
                    <span>Seconds</span>
                  </div>
                </>
              ) : (
                <p>Please wait some more time!</p>
              )}
            </div>
          </div>
          <p className="unlocking-text">Unlocking Soon</p>
        </div>
      </div>
    </>
  );
};
