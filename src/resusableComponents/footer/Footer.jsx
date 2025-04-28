import React from "react";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links-section">
        <h2 className="footer-links-logo">MovieFinder</h2>
      </div>
      <div className="footer-credits-section">
        <h3 className="footer-credits-section-heading">Credits</h3>
        <img
          className="footer-credits-section-tmdb-logo"
          src="/assets/tmdbLogo.svg"
          alt="TMDB logo"
        ></img>
        <h4 className="footer-credits-section-item ">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB
        </h4>
        <h4 className="footer-credits-section-item ">
          The project was developed for non-commercial purpose
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
