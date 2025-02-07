import React from "react";
import "./LegalPages.css";
import { Title } from "../../components/Title/Title";
import { Helmet } from "react-helmet-async";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms | Top Hackathons</title>
        <meta
          name="description"
          content="Find the best hackathons happening near you. Hackathons are great places to code quickly, learn collaboration, and celebrate your ideas."
        />
        <meta name="author" content="Kishore S R" />
      </Helmet>

      <Title />
      <div className="legal-container">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last updated: February 2025</p>
        <hr />
        <p>By using Hackathons.top, you agree to the following terms.</p>

        <h2>Use of Our Services</h2>
        <p>
          Hackathons.top is a platform to discover and submit hackathons. You
          agree not to misuse the platform, submit false information, or engage
          in harmful activities.
        </p>

        <h2>Account & Authentication</h2>
        <p>
          If you log in via Clerk authentication, you must keep your credentials
          secure. We reserve the right to suspend accounts violating our
          policies.
        </p>

        <h2>Submitted Hackathons</h2>
        <p>
          Users submitting hackathon events are responsible for ensuring
          accuracy. We may remove submissions that are misleading or
          inappropriate.
        </p>

        <h2>Liability Disclaimer</h2>
        <p>
          Hackathons.top is not responsible for third-party hackathons, events,
          or any issues arising from participation.
        </p>

        <h2>Changes to These Terms</h2>
        <p>
          We may update these terms as needed. Continued use of Hackathons.top
          signifies agreement to the latest terms.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions, contact at{" "}
          <strong>kishoresr01@gmail.com</strong>
        </p>
      </div>
    </>
  );
};

export default TermsOfService;
