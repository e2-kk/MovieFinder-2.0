import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./NavBar.css";
import { getMoviesCategories } from "../utils/api";

const NavBar = ({
  moviesCategories,
  setSelectedCategory,
  setMoviesCategories,
  setMovies,
  setSotringOption,
}) => {
  const [activeLink, setActiveLink] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getMoviesCategories();
      setMoviesCategories(data);
    };
    fetchCategories();
  }, []);

  const navigate = useNavigate();

  const handleSelectedCategoryReset = () => {
    setActiveLink("");
  };

  const openMobileMenu = () => {
    setIsOpen(true);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };
  return (
    <section className="section-nav">
      <div className="section-nav-container">
        <nav className="nav">
          <h1 className="nav-logo">MovieFinder</h1>
          <ul className="nav-list-desktop">
            <li className="nav-list-link">
              <a href="/">Films</a>
            </li>
            <li className="nav-list-link">
              <a href="#">Genres</a>
              <ul className="genres-dropdown">
                {moviesCategories.map((category) => (
                  <li
                    className={activeLink === category.name ? "active" : ""}
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setMovies([]);
                      setActiveLink(category.name);
                      setSotringOption({
                        year: "release_date",
                        rate: "rating",
                        services: "watch_providers",
                      });
                      navigate("/", { state: { category } });
                    }}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-list-link">
              <Link to="/watch-list" onClick={handleSelectedCategoryReset}>
                Watch List
              </Link>
            </li>
          </ul>
          <li className="nav-list-mobile-menu-btn">
            <img
              src="/assets/menu.svg"
              alt="menu"
              onClick={openMobileMenu}
            ></img>
          </li>
          <ul className={`nav-list-mobile ${isOpen ? "is-open" : ""}`}>
            <li>
              <img
                src="/assets/close.svg"
                alt="close button"
                className="nav-list-mobile-close-btn"
                onClick={closeMobileMenu}
              ></img>
            </li>
            <li className="nav-list-link margin-top">
              <a href="/">Films</a>
            </li>
            <li className="nav-list-link">
              <a href="#">Genres</a>
              <ul className="genres-dropdown">
                {moviesCategories.map((category) => (
                  <li
                    className={activeLink === category.name ? "active" : ""}
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setMovies([]);
                      setActiveLink(category.name);
                      setSotringOption({
                        year: "release_date",
                        rate: "rating",
                        services: "watch_providers",
                      });
                      navigate("/", { state: { category } });
                    }}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-list-link">
              <Link to="/watch-list" onClick={handleSelectedCategoryReset}>
                Watch List
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default NavBar;
