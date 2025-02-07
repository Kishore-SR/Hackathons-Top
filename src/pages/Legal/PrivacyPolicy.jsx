import React from "react";
import "./LegalPages.css";
import { Title } from "../../components/Title/Title";

const PrivacyPolicy = () => {
  return (
    <>
    <Title/>
      <div className="legal-container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: February 2025</p>
        <hr />
        <p>
          Welcome to Hackathons.top! Your privacy is important to us. This
          Privacy Policy explains how we handle your data.
        </p>

        <h2>What Data We Collect</h2>
        <p>
          We collect information you provide when submitting hackathons, such as
          event details and contact information. If you create an account via
          Clerk authentication (Google, GitHub, or email), we may store your
          basic profile details.
        </p>

        <h2>How We Use Your Data</h2>
        <p>
          We use collected data to display hackathons, improve user experience,
          and provide relevant updates. We do not sell your data.
        </p>

        <h2>Your Rights</h2>
        <ul>
          <li>You can request to view, edit, or delete your data.</li>
          <li>You can disable cookies in your browser settings.</li>
          <li>For any privacy concerns, contact us.</li>
        </ul>

        <h2>Children’s Privacy</h2>
        <p>
          We do not knowingly collect data from children under 13. If you
          believe we have, please contact us for removal.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. Please check back
          periodically.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions, reach out at{" "}
          <strong>kishoresr01@gmail.com</strong>
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;
