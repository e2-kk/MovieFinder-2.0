import React, { useEffect } from "react";

import "./NavBar.css";
import { getMoviesCategories } from "../utils/api";

const NavBar = ({
  moviesCategories,
  setSelectedCategory,
  setMoviesCategories,
  setMovies,
}) => {
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getMoviesCategories();
      setMoviesCategories(data); // Updates the state with API response
    };
    fetchCategories();
  }, []);
  return (
    <section className="section-nav">
      <div className="section-nav-container">
        <nav className="nav">
          <h1 className="nav-logo">MovieFinder</h1>
          <ul className="nav-list">
            <li className="nav-list-link">
              <a href="#">Films</a>
            </li>
            <li className="nav-list-link">
              <a href="#">Genres</a>
              <ul className="genres-dropdown">
                {moviesCategories.map((category) => (
                  <li
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setMovies([]);
                    }}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-list-link">
              <a href="#">Watch List</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default NavBar;
