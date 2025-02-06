import React from "react";
import { useUser, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import astronautImg from "../../assets/astronaut/winner.svg"; // Ensure this image exists

const Profile = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <div className="profile-box">
        <img src={astronautImg} alt="Astronaut" className="profile-image" />
        {!isSignedIn ? (
          <>
            <h2>Join the Hackathon Community!</h2>
            <p>Login or Sign Up to unlock all features and track your hackathons.</p>
            <div className="button-group">
              <SignInButton mode="redirect">
                <button className="primary-btn">Login</button>
              </SignInButton>
              <SignUpButton mode="redirect">
                <button className="secondary-btn">Register</button>
              </SignUpButton>
            </div>
          </>
        ) : (
          <>
            <h2>Welcome, {user?.firstName} 🚀</h2>
            <p>Explore, save, and submit hackathons with ease.</p>
            <UserButton afterSignOutUrl="/" />
            <button className="primary-btn" onClick={() => navigate("/submit")}>
              Submit Hackathon
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
