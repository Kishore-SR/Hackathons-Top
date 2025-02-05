import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./Explore.css";

const Explore = () => {
  const [hackathons, setHackathons] = useState([]);
  const [filteredHackathons, setFilteredHackathons] = useState([]);
  const [sortOption, setSortOption] = useState("nearest");
  const [showSortOptions, setShowSortOptions] = useState(false);

  // Fetch all hackathons from Firestore
  useEffect(() => {
    const fetchHackathons = async () => {
      const querySnapshot = await getDocs(collection(db, "hackathons"));
      const hackathonList = [];
      querySnapshot.forEach((doc) => {
        hackathonList.push({ id: doc.id, ...doc.data() });
      });
      setHackathons(hackathonList);
      setFilteredHackathons(hackathonList);
    };
    fetchHackathons();
  }, []);

  // Handle sorting of hackathons
  const handleSort = (option) => {
    let sortedHackathons = [...hackathons];
    if (option === "nearest") {
      sortedHackathons.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (option === "farthest") {
      sortedHackathons.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (option === "highestPrize") {
      sortedHackathons.sort(
        (a, b) =>
          parseInt(b.prize.replace(/[^0-9]/g, "")) - parseInt(a.prize.replace(/[^0-9]/g, ""))
      );
    }
    setFilteredHackathons(sortedHackathons);
    setSortOption(option);
    setShowSortOptions(false);
  };

  return (
    <div className="explore">
      <div className="explore-header">
        <h1>Explore Hackathons</h1>
        <div className="sort-container">
          <button className="sort-button" onClick={() => setShowSortOptions(!showSortOptions)}>
            <i className="ri-sort-asc"></i> Sort
          </button>
          {showSortOptions && (
            <div className="sort-options">
              <div className={`sort-option ${sortOption === "nearest" ? "active" : ""}`} onClick={() => handleSort("nearest")}>
                Upcoming Soon
              </div>
              <div className={`sort-option ${sortOption === "farthest" ? "active" : ""}`} onClick={() => handleSort("farthest")}>
                Happening Later
              </div>
              <div className={`sort-option ${sortOption === "highestPrize" ? "active" : ""}`} onClick={() => handleSort("highestPrize")}>
                Highest Prize Money
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="hackathon-list">
        {filteredHackathons.slice(0, 9).map((hackathon) => (
          <div key={hackathon.id} className="hackathon-card">
            <img src={hackathon.posterUrl} alt="Poster" className="hackathon-poster" />
            <div className="hackathon-details">
              <h2>{hackathon.name}</h2>
              <p><i className="ri-calendar-2-line"></i> {hackathon.date}</p>
              <p><i className="ri-map-pin-2-line"></i> {hackathon.location}</p>
              <p><i className="ri-trophy-fill" style={{ color: "#FFD700" }}></i> Prizes Worth <span className="prize-highlight">{hackathon.prize}</span></p>
              <div className="status-container">
                <span className={`status-dot ${getStatusClass(hackathon.date)}`}></span>
                <span className={`status-text ${getStatusClass(hackathon.date)}`}>{getDaysLeftText(hackathon.date)}</span>
                <a href={hackathon.website} className="participate-btn">Participate</a>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredHackathons.length > 9 && <button className="view-more">View More</button>}
    </div>
  );
};

const getStatusClass = (date) => {
  const daysLeft = (new Date(date) - new Date()) / (1000 * 60 * 60 * 24);
  if (daysLeft > 10) return "green";
  if (daysLeft >= 5) return "orange";
  return "red";
};

const getDaysLeftText = (date) => {
  const daysLeft = Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));
  return `${daysLeft} Days Left`;
};

export default Explore;
