import React, { useEffect, useState } from "react";
import { supabase } from "../../server/supabaseClient";
import "./Explore.css";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import { Title } from "../../components/Title/Title";
import { Helmet } from "react-helmet-async";
import { Loading } from "../../components/Loading/Loading";
import { useUser } from "@clerk/clerk-react";

const Explore = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  const [hackathons, setHackathons] = useState([]);
  const [filteredHackathons, setFilteredHackathons] = useState([]);
  const [sortOption, setSortOption] = useState("nearest");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visibleHackathons, setVisibleHackathons] = useState(9); // Show 9 initially
  const [states, setStates] = useState([]); // State for storing state filters
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    const fetchHackathons = async () => {
      // Fetch hackathons from Supabase
      const { data, error } = await supabase.from("hackathons").select("*");

      if (error) {
        console.error("Error fetching hackathons:", error);
        setLoading(false);
        return;
      }

      let hackathonList = data || [];

      hackathonList = hackathonList.map((hackathon) => {
        return {
          ...hackathon,
          poster_url: hackathon.poster_url || hackathon.posterUrl,
          end_date: hackathon.end_date || hackathon.end,
          date: hackathon.date,
          formattedDate: formatDateString(hackathon.date),
        };
      });

      const stateCounts = {};
      hackathonList.forEach((hackathon) => {
        const state = hackathon.state || "Online";
        stateCounts[state] = (stateCounts[state] || 0) + 1;
      });

      const sortedStates = Object.keys(stateCounts).sort(
        (a, b) => stateCounts[b] - stateCounts[a]
      );

      const formattedStates = sortedStates.map((state) => ({
        name: state,
        count: stateCounts[state],
      }));

      setStates(formattedStates);

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

  const formatDateString = (dateStr) => {
    if (!dateStr) return "";

    try {
      const date = new Date(dateStr);

      const day = date.getDate();
      const month = date.toLocaleString("en-US", { month: "long" });
      const year = date.getFullYear();

      return `${day} ${month}, ${year}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateStr;
    }
  };

  const handleStateFilter = (state) => {
    if (!isSignedIn) {
      navigate("/login");
      return;
    }

    if (selectedState === state) {
      setSelectedState(null);
      setFilteredHackathons(hackathons);
    } else {
      setSelectedState(state);
      const filtered = hackathons.filter(
        (hackathon) => hackathon.state === state
      );
      setFilteredHackathons(filtered);
    }
  };

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
    } else if (option === "recentlyAdded") {
      ongoingHackathons.sort((a, b) => {
        const numA = parseInt(a.id.split("_")[0]);
        const numB = parseInt(b.id.split("_")[0]);
        return numB - numA;
      });
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

  const totalHackathons = 15;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!loading) {
      setCount(0);
      let start = 0;
      const interval = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= totalHackathons) clearInterval(interval);
      }, 50);

      return () => clearInterval(interval);
    }
  }, [loading]);

  return (
    <main>
      <Helmet>
        <title>Explore | Top Hackathons</title>
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
              In this galaxy of hackathons, you are the astronaut - find your
              stars and launch your ideas into orbit.{" "}
              <span className="extra-text">
                Your journey to victory begins now! Submit a hackathon and help
                fellow explorers discover new opportunities.
              </span>{" "}
              <Link to="/submit" className="strategy-link">
                Submit Hackathon
              </Link>
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
                <div
                  className={sortOption === "recentlyAdded" ? "active" : ""}
                  onClick={() => handleSort("recentlyAdded")}
                >
                  Recently Added
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
          <>
            {/* Animated Hackathons Count */}
            <div className="hackathon-count">
              <div className="bgcolour">
                <span className="blink-dot"></span>
                <p>{count}+ Hackathons added recently </p>
              </div>
            </div> 

            {/* State Filters */}
            <div className="state-filters">
              {states.map((state) => (
                <button
                  key={state.name}
                  className={`state-filter ${
                    selectedState === state.name ? "active" : ""
                  }`}
                  onClick={() => handleStateFilter(state.name)}
                >
                  {state.name} ({state.count})
                </button>
              ))}
            </div>

            <div className="hackathon-list">
              {filteredHackathons
                .slice(0, visibleHackathons)
                .map((hackathon) => {
                  const isClosed = new Date(hackathon.end) < new Date();
                  return (
                    <div
                      key={hackathon.id}
                      className="hackathon-card"
                      style={{ opacity: isClosed ? 0.7 : 1 }}
                    >
                      <img
                        src={hackathon.poster_url || hackathon.posterUrl} 
                        alt="Poster"
                        className="hackathon-poster"
                      />

                      <div className="hackathon-details">
                        <h2>{hackathon.name}</h2>
                        <p>
                          <i className="ri-calendar-2-line"></i>{" "}
                          {hackathon.formattedDate ||
                            formatDateString(hackathon.date)}
                        </p>
                        <p>
                          <i className="ri-map-pin-2-line"></i>{" "}
                          {hackathon.location}
                        </p>
                        <p>
                          <i className="ri-trophy-line"></i> Prizes Worth{" "}
                          <span className="prize-highlight">
                            {hackathon.prize}
                          </span>
                        </p>
                        <div className="status-container">
                          <span
                            className={`status-text ${getStatusClass(
                              hackathon.end || hackathon.end_date,
                              isClosed
                            )}`}
                          >
                            {isClosed
                              ? "Registration Closed"
                              : getDaysLeftText(
                                  hackathon.end || hackathon.end_date
                                )}
                          </span>

                          <button
                            className={`participate-btn ${
                              isClosed ? "closed" : ""
                            }`}
                            style={{
                              backgroundColor: isClosed ? "#b5b5b5" : "#01b72f",
                            }}
                            onClick={() =>
                              handleParticipateClick(
                                isClosed,
                                hackathon.website
                              )
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
          </>
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
  if (daysLeft > 7) return "egreen";
  if (daysLeft >= 4) return "eorange";
  return "ered";
};

const getDaysLeftText = (endDate) => {
  const daysLeft = Math.ceil(
    (new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24)
  );
  return `Registration Ends in ${daysLeft} Days`;
};

export default Explore;
