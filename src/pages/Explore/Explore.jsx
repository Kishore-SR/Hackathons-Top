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
  const [visibleHackathons, setVisibleHackathons] = useState(9); 
  const [states, setStates] = useState([]); 
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

      sortHackathons(hackathonList, "nearest");
      setHackathons(hackathonList);
      setLoading(false);
    };

    fetchHackathons();
  }, []);

  // Function to sort hackathons
  const sortHackathons = (hackathonList, option) => {
    let sortedHackathons = [...hackathonList];

    const closedHackathons = sortedHackathons.filter((hackathon) =>
      isHackathonClosed(hackathon)
    );

    let ongoingHackathons = sortedHackathons.filter(
      (hackathon) => !isHackathonClosed(hackathon)
    );

    if (option === "nearest") {
      ongoingHackathons.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (option === "farthest") {
      ongoingHackathons.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (option === "highestPrize") {
      ongoingHackathons.sort((a, b) => {
        const prizeA = parseInt(a.prize.replace(/[^0-9]/g, "") || "0");
        const prizeB = parseInt(b.prize.replace(/[^0-9]/g, "") || "0");
        return prizeB - prizeA;
      });
    } else if (option === "recentlyAdded") {
      ongoingHackathons.sort((a, b) => {
        const numA = parseInt(a.id.split("_")[0] || "0");
        const numB = parseInt(b.id.split("_")[0] || "0");
        return numB - numA;
      });
    }

    const finalHackathons = [...ongoingHackathons, ...closedHackathons];
    return finalHackathons;
  };

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
      setFilteredHackathons(sortHackathons(hackathons, sortOption));
    } else {
      setSelectedState(state);
      const filtered = hackathons.filter(
        (hackathon) => hackathon.state === state
      );
      setFilteredHackathons(sortHackathons(filtered, sortOption));
    }
  };

  const handleSort = (option) => {
    const sortedHackathons = sortHackathons(
      selectedState ? filteredHackathons : hackathons,
      option
    );

    setFilteredHackathons(sortedHackathons);
    setSortOption(option);
    setShowSortOptions(false);
  };

  // Function to check if a hackathon is closed
  const isHackathonClosed = (hackathon) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const endDate = new Date(hackathon.end_date || hackathon.end_date);
    endDate.setHours(23, 59, 59, 999); 

    return now > endDate;
  };

  const handleParticipateClick = (isClosed, hackathonUrl) => {
    if (isClosed) return;
    if (!isSignedIn) {
      navigate("/login");
    } else {
      window.open(hackathonUrl, "_blank");
    }
  };

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

  useEffect(() => {
    if (hackathons.length > 0) {
      setFilteredHackathons(sortHackathons(hackathons, sortOption));
    }
  }, [hackathons, sortOption]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSortOptions && !event.target.closest(".sort-container")) {
        setShowSortOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSortOptions]);

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
                  const isClosed = isHackathonClosed(hackathon);
                  return (
                    <div
                      key={hackathon.id}
                      className="hackathon-card"
                      style={{ opacity: isClosed ? 0.6 : 1 }}
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
                              hackathon.end_date || hackathon.end,
                              isClosed
                            )}`}
                          >
                            {isClosed
                              ? "Registration Closed"
                              : getDaysLeftText(
                                  hackathon.end_date || hackathon.end
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

  const now = new Date();
  const end = new Date(endDate);
  const diffMs = end - now;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays > 7) return "egreen";
  if (diffDays >= 4) return "eorange";
  return "ered";
};

const getDaysLeftText = (endDate) => {
  const now = new Date();
  const end = new Date(endDate);
  const diffMs = end - now;

  if (diffMs <= 0) {
    return "Registration Closed";
  }

  if (diffMs < 24 * 60 * 60 * 1000) {
    const hoursLeft = Math.ceil(diffMs / (1000 * 60 * 60));
    return `Registration Ends in ${hoursLeft} ${
      hoursLeft === 1 ? "Hour" : "Hours"
    }`;
  }

  // Default to days
  const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return `Registration Ends in ${daysLeft} ${daysLeft === 1 ? "Day" : "Days"}`;
};

export default Explore;
