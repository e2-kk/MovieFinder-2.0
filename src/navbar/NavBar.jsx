import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeSwitch } from "react-toggle-dark-mode";

import "./NavBar.css";
import {
  getMovieByTitle,
  getMoviesCategories,
  getUserToken,
  createUserSession,
  deleteUserSession,
  getUserId,
} from "../utils/api";

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
  sessionId,
  setSessionId,
  userId,
  setUserId,
  setWatchList,
  setSortedWatchList,
  userName,
  setUserName,
}) => {
  const [activeLink, setActiveLink] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [movieInput, setMovieInput] = useState("");

  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);

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
    setActiveLink("");
    setTimeout(setIsOpen(false), 9000);
    event.preventDefault();
    navigate("/movies-search");
  };

  const handlePopupLogin = () => {
    const popup = window.open("", "_blank");

    if (!popup) {
      window.alert("Please enable popups in your browser settings.");
      return;
    }

    handleLogin(popup);
  };

  const handleLogin = async (popup) => {
    setIsLoggedin(true);

    const userToken = await getUserToken();
    if (userToken) {
      const redirectUrl = `https://www.themoviedb.org/authenticate/${userToken.request_token}`;

      popup.location.href = redirectUrl;
      const pollInterval = setInterval(async () => {
        if (popup?.closed) {
          clearInterval(pollInterval);
          const session = await createUserSession(userToken.request_token);
          setSessionId(session.session_id);
          if (session?.hasOwnProperty("session_id")) {
            const id = await getUserId(session?.session_id);
            setUserId(id?.id);
            setUserName(id?.username);
            if (id === null) {
              window.alert(
                "Error getting user details. Please, try again later"
              );
            }
          }
          setTimeout(setIsLoggedin(false), 4000);
        }
      }, 1000);
    } else {
      setIsLoggedin(false);
      window.alert("Error loggin in");
    }
  };

  const handleLogOut = async () => {
    const deletedSession = await deleteUserSession(sessionId);
    if (deletedSession?.success === true) {
      setSessionId("");
      setUserName("");
      setWatchList([]);
      setSortedWatchList([]);
      setUserId("");
      localStorage.removeItem("userId");
      localStorage.removeItem("sessionId");
      localStorage.removeItem("userName");
    } else {
      window.alert("Error logging out. Please, refresh the page and try again");
      localStorage.removeItem("userId");
      localStorage.removeItem("sessionId");
      localStorage.removeItem("userName");
    }
  };

  const setDarkTheme = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
  };

  const setLightTheme = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
  };

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    checked ? setDarkTheme() : setLightTheme();
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
            <li
              className="nav-list-link nav-list-link-genres"
              onClick={(event) => {
                event.preventDefault();
                setIsClicked(true);
              }}
            >
              <a href="#">Genres</a>
              <ul
                className={`genres-dropdown ${
                  isClicked ? "genres-dropdown-show" : ""
                } `}
              >
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
          <div className="nav-list-link-login">
            <div className="nav-list-link-login-container">
              <img
                src="/assets/icons8-user-64.png"
                className="nav-list-link-user"
              ></img>
              {sessionId ? (
                <span>{userName}</span>
              ) : isLoggedin ? (
                <div className="loader"></div>
              ) : (
                <button
                  onClick={handlePopupLogin}
                  className="nav-list-link-login-button"
                >
                  Log in
                </button>
              )}
            </div>
            <button
              className={`nav-list-link-login-button ${
                sessionId ? "display" : "hide"
              } `}
              onClick={handleLogOut}
            >
              Log out
            </button>
          </div>
          <DarkModeSwitch
            style={{ display: "inline-block", color: "#ffff" }}
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={20}
          />
          <img
            className="nav-list-mobile-menu-btn"
            src="/assets/menu.svg"
            alt="menu"
            onClick={openMobileMenu}
          ></img>

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
