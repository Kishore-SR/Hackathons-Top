import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig"; 
import { collection, getDocs } from "firebase/firestore";
import "./Explore.css"

const Explore = () => {
  const [hackathons, setHackathons] = useState([]);

  useEffect(() => {
    const fetchHackathons = async () => {
      const querySnapshot = await getDocs(collection(db, "hackathons"));
      const hackathonList = [];
      querySnapshot.forEach((doc) => {
        hackathonList.push(doc.data());
      });
      setHackathons(hackathonList);
    };

    fetchHackathons();
  }, []);

  return (
    <div className="explore">
      <h1>Upcoming Hackathons</h1>
      <div className="hackathon-list">
        {hackathons.map((hackathon, index) => (
          <div key={index} className="hackathon-item">
            <h2>{hackathon.name}</h2>
            <p>{hackathon.date}</p>
            <p>{hackathon.location}</p>
            <p>{hackathon.prize}</p>
            <a href={hackathon.website} target="_blank" rel="noopener noreferrer">
              Visit Website
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
