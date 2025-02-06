import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./Explore.css";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import { Title } from "../../components/Title/Title";
import { Helmet } from "react-helmet-async";
import { Loading } from "../../components/Loading/Loading";
import { useUser } from "@clerk/clerk-react"; // Clerk Auth Hook

const Explore = () => {
  const { isSignedIn } = useUser(); // Check if user is logged in
  const navigate = useNavigate(); // For redirecting
  const [hackathons, setHackathons] = useState([]);
  const [filteredHackathons, setFilteredHackathons] = useState([]);
  const [sortOption, setSortOption] = useState("nearest");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visibleHackathons, setVisibleHackathons] = useState(9); // Show 9 initially

  useEffect(() => {
    const fetchHackathons = async () => {
      const querySnapshot = await getDocs(collection(db, "hackathons"));
      let hackathonList = [];
      querySnapshot.forEach((doc) => {
        hackathonList.push({ id: doc.id, ...doc.data() });
      });

      let ongoingHackathons = [];
      let closedHackathons = [];

      hackathonList.forEach((hackathon) => {
        const isClosed = new Date(hackathon.end) < new Date();
        if (isClosed) {
          closedHackathons.push(hackathon);
        } else {
          ongoingHackathons.push(hackathon);
        }
      });

      ongoingHackathons.sort((a, b) => new Date(a.date) - new Date(b.date));
      const finalHackathonList = [...ongoingHackathons, ...closedHackathons];

      setHackathons(finalHackathonList);
      setFilteredHackathons(finalHackathonList);
      setLoading(false);
    };

    fetchHackathons();
  }, []);

  const handleSort = (option) => {
    let sortedHackathons = [...hackathons];
    const closedHackathons = sortedHackathons.filter(
      (hackathon) => new Date(hackathon.end) < new Date()
    );
    let ongoingHackathons = sortedHackathons.filter(
      (hackathon) => new Date(hackathon.end) >= new Date()
    );

    if (option === "nearest") {
      ongoingHackathons.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (option === "farthest") {
      ongoingHackathons.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (option === "highestPrize") {
      ongoingHackathons.sort(
        (a, b) =>
          parseInt(b.prize.replace(/[^0-9]/g, "")) -
          parseInt(a.prize.replace(/[^0-9]/g, ""))
      );
    }

    setFilteredHackathons([...ongoingHackathons, ...closedHackathons]);
    setSortOption(option);
    setShowSortOptions(false);
  };

  const handleParticipateClick = (isClosed, hackathonUrl) => {
    if (isClosed) return;
    if (!isSignedIn) {
      navigate("/login");
    } else {
      window.open(hackathonUrl, "_blank");
    }
  };

  // Function to load more hackathons
  const handleViewMore = () => {
    if (!isSignedIn) {
      navigate("/login");
    } else {
      setVisibleHackathons(visibleHackathons + 9);
    }
  };

  return (
    <main>
      <Helmet>
        <title>Explore | Hackathons.top</title>
        <meta
          name="description"
          content="Find the best hackathons happening near you. Hackathons are great places to code quickly, learn collaboration, and celebrate your ideas."
        />
        <meta name="author" content="Kishore S R" />
      </Helmet>

      <Title />
      <div className="explore">
        <div className="explore-header">
          <div className="explore-heading">
            <h1>Explore Hackathons</h1>
            <p>
              Hackathons are great places to code quickly, learn collaboration
              and celebrate your ideas.
              <span className="extra-text">
                Start participating, winning hackathons is actually easier if
                you have the{" "}
                <Link to="/tools" className="strategy-link">
                  right strategy.
                </Link>
              </span>
            </p>
          </div>

          <div className="sort-container">
            <button
              className="sort-button"
              onClick={() => setShowSortOptions(!showSortOptions)}
            >
              <i className="ri-sort-asc"></i> Sort
            </button>
            {showSortOptions && (
              <div className="sort-options">
                <div
                  className={sortOption === "nearest" ? "active" : ""}
                  onClick={() => handleSort("nearest")}
                >
                  Upcoming Soon
                </div>
                <div
                  className={sortOption === "farthest" ? "active" : ""}
                  onClick={() => handleSort("farthest")}
                >
                  Happening Later
                </div>
                <div
                  className={sortOption === "highestPrize" ? "active" : ""}
                  onClick={() => handleSort("highestPrize")}
                >
                  Highest Prize Money
                </div>
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <Loading />
          </div>
        ) : (
          <div className="hackathon-list">
            {filteredHackathons.slice(0, visibleHackathons).map((hackathon) => {
              const isClosed = new Date(hackathon.end) < new Date();
              return (
                <div
                  key={hackathon.id}
                  className="hackathon-card"
                  style={{ opacity: isClosed ? 0.7 : 1 }}
                >
                  <img
                    src={hackathon.posterUrl}
                    alt="Poster"
                    className="hackathon-poster"
                  />
                  <div className="hackathon-details">
                    <h2>{hackathon.name}</h2>
                    <p>
                      <i className="ri-calendar-2-line"></i> {hackathon.date}
                    </p>
                    <p>
                      <i className="ri-map-pin-2-line"></i> {hackathon.location}
                    </p>
                    <p>
                      <i className="ri-trophy-line"></i> Prizes Worth{" "}
                      <span className="prize-highlight">{hackathon.prize}</span>
                    </p>
                    <div className="status-container">
                      <span
                        className={`status-text ${getStatusClass(
                          hackathon.end,
                          isClosed
                        )}`}
                      >
                        {isClosed
                          ? "Registration Closed"
                          : getDaysLeftText(hackathon.end)}
                      </span>

                      <button
                        className={`participate-btn ${isClosed ? "closed" : ""}`}
                        style={{
                          backgroundColor: isClosed ? "#b5b5b5" : "#01b72f",
                        }}
                        onClick={() =>
                          handleParticipateClick(isClosed, hackathon.website)
                        }
                      >
                        Participate
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {filteredHackathons.length > visibleHackathons && (
          <button className="view-more" onClick={handleViewMore}>
            View More
          </button>
        )}
      </div>
      <Footer />
    </main>
  );
};

const getStatusClass = (endDate, isClosed) => {
  if (isClosed) return "grey";
  const daysLeft = Math.ceil(
    (new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24)
  );
  if (daysLeft > 7) return "green";
  if (daysLeft >= 4) return "orange";
  return "red";
};

const getDaysLeftText = (endDate) => {
  const daysLeft = Math.ceil(
    (new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24)
  );
  return `Registration Ends in ${daysLeft} Days`;
};

export default Explore;
