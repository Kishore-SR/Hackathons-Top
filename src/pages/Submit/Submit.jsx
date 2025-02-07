import React, { useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./Submit.css";
import logo from "/logo.svg";
import { Helmet } from "react-helmet-async";

const Submit = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hackathonName: "",
    registrationLink: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.hackathonName ||
      !formData.registrationLink
    ) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      await addDoc(collection(db, "submitted_hackathons"), {
        ...formData,
        timestamp: serverTimestamp(),
      });

      alert("Hackathon submitted successfully!");
      setFormData({
        name: "",
        email: "",
        hackathonName: "",
        registrationLink: "",
      });
    } catch (error) {
      console.error("Error submitting hackathon:", error);
      alert("Submission failed. Try again later.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Submit Hackathon | Top Hackathons</title>
        <meta
          name="description"
          content="Submit your hackathon to Hackathons.top and help students find and participate in hackathons."
        />
        <meta
          name="keywords"
          content="submit hackathon, hackathon submission, hackathons, student hackathons, hackathon listing"
        />
        <meta name="author" content="Kishore S R" />
        <meta property="og:title" content="Submit Hackathon | Hackathons.top" />
        <meta
          property="og:description"
          content="Submit your hackathon to Hackathons.top and help students find and participate in hackathons."
        />
        <meta property="og:url" content="https://hackathons.top/submit" />
        <meta
          name="twitter:title"
          content="Submit Hackathon | Hackathons.top"
        />
        <meta
          name="twitter:description"
          content="Submit your hackathon to Hackathons.top and help students find and participate in hackathons."
        />
        <meta name="twitter:image" content="/path/to/your/image.jpg" />
      </Helmet>

      <div className="submit-page">
        <div className="banner-img"></div>

        <div className="form-container">
          <img src={logo} alt="Hackathons.top Logo" className="form-logo" />
          <h2>
            List your hackathon on{" "}
            <a
              href="https://hackathons.top"
              target="_blank"
              rel="noopener noreferrer"
            >
              hackathons.top
            </a>{" "}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                Your Name<span className="required">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                Email Address<span className="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                Hackathon Name<span className="required">*</span>
              </label>
              <input
                type="text"
                name="hackathonName"
                value={formData.hackathonName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                Website or Registration Link<span className="required">*</span>
              </label>
              <input
                type="url"
                name="registrationLink"
                value={formData.registrationLink}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Submit for Review
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Submit;
