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

  return (
    <section className="section-nav">
      <div className="section-nav-container">
        <nav className="nav">
          <h1 className="nav-logo">MovieFinder</h1>
          <ul className="nav-list">
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
        </nav>
      </div>
    </section>
  );
};

export default NavBar;
