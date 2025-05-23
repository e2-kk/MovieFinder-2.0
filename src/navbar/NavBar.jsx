import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./NavBar.css";
import { getMovieByTitle, getMoviesCategories } from "../utils/api";

const NavBar = ({
  moviesCategories,
  setSelectedCategory,
  setMoviesCategories,
  setMovies,
  setSotringOption,
  movieTerm,
  setMovieTerm,
  setMoviesSearchList,
  moviesSearchList,
  setIsLoading,
  setTotalSearchResults,
}) => {
  const [activeLink, setActiveLink] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [movieInput, setMovieInput] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getMoviesCategories();
      setMoviesCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchMovieByTitle = async () => {
      const data = await getMovieByTitle(movieTerm);

      const filteredMoviesSearchList = data.results.filter(
        (movie) => movie.vote_count > 150 && movie.original_language === "en"
      );

      if (moviesSearchList?.length !== 0) {
        setMoviesSearchList((prevMovies) => [
          ...prevMovies,
          ...filteredMoviesSearchList,
        ]);
      } else {
        setMoviesSearchList(filteredMoviesSearchList);
      }
      setTotalSearchResults(data.total_results);
      setTimeout(setIsLoading(false), 900);
      setIsLoading(false);
    };
    fetchMovieByTitle();
  }, [movieTerm]);

  const handleSelectedCategoryReset = () => {
    setActiveLink("");
  };

  const openMobileMenu = () => {
    setIsOpen(true);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  const handleSearchInput = (event) => {
    setMovieInput(event.target.value);
  };

  const handleMovieSearchTermSubmit = (event) => {
    setMoviesSearchList([]);
    setMovieTerm(movieInput);
    event.preventDefault();
    navigate("/movies-search");
  };

  return (
    <section className="section-nav">
      <div className="section-nav-container">
        <nav className="nav">
          <h1 className="nav-logo">MovieFinder</h1>
          <form onSubmit={handleMovieSearchTermSubmit}>
            <input
              className="nav-searchbar desktop"
              type="text"
              placeholder="Search by movie title..."
              value={movieInput}
              onChange={handleSearchInput}
            ></input>
          </form>
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
                      setMovieInput("");
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
              <Link
                to="/watch-list"
                onClick={() => {
                  handleSelectedCategoryReset();
                  setMovieInput("");
                }}
              >
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
                      setMovieInput("");
                      setActiveLink(category.name);
                      setSotringOption({
                        year: "release_date",
                        rate: "rating",
                        services: "watch_providers",
                      });
                      navigate("/", { state: { category } });
                      setIsOpen(false);
                    }}
                  >
                    {category.name}
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-list-link">
              <Link
                to="/watch-list"
                onClick={() => {
                  handleSelectedCategoryReset();
                  setIsOpen(false);
                  setMovieInput("");
                }}
              >
                Watch List
              </Link>
            </li>
            <li>
              <form
                onSubmit={handleMovieSearchTermSubmit}
                className="padding-left"
              >
                <input
                  className="nav-searchbar mobile"
                  type="text"
                  placeholder="Search by movie title..."
                  value={movieInput}
                  onChange={handleSearchInput}
                ></input>
              </form>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default NavBar;
