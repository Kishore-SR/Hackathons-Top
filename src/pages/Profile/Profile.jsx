import React from "react";
import { SignInButton, SignUpButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <div className="profile-box">
        {!isSignedIn ? (
          <>
            <button onClick={() => navigate("/Login")}>Login</button>
            <button onClick={() => navigate("/Register")}>Register</button>
            <p>Login to access more features</p>
          </>
        ) : (
          <>
            <h2>Welcome!</h2>
            
            <button onClick={() => navigate("/submit")}>Submit Hackathon</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
