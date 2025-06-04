import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import NavBar from "./navbar/NavBar";
import MoviesList from "./movies/MoviesList/MoviesList";
import {
  getMoviesWithinCategory,
  getAllMovies,
  getSortedMoviesByYear,
  getSortedMoviesByRating,
  getSortedMoviesByServices,
  getSortedMoviesByServicesWithinCategory,
  getSortedMoviesByRatingWithinCategory,
  getSortedMoviesByYearWithinCategory,
  addMovieToWatchList,
  getWatchList,
} from "./utils/api";
import WatchList from "./watchList/WatchList";
import MoviePage from "./movies/moviesPage/MoviePage";
import MoviesSearchList from "./movies/moviesSearchList/MoviesSearchList";

function App() {
  const [moviesCategories, setMoviesCategories] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortingOption, setSortingOption] = useState({
    year: "release_date",
    rate: "rating",
    services: "watch_providers",
  });

  const [watchList, setWatchList] = useState([]);
  const [sortedWatchList, setSortedWatchList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [movieTerm, setMovieTerm] = useState("");
  const [moviesSearchList, setMoviesSearchList] = useState([]);
  const [totalSearchResults, setTotalSearchResults] = useState(1);
  const [sessionId, setSessionId] = useState("");
  const [userId, setUserId] = useState(0);

  let width = window.innerWidth;

  const fetchFullWatchList = async (userId, sessionId) => {
    let allResults = [];
    let currentPage = 1;
    let totalPages = 1;

    while (currentPage <= totalPages) {
      const response = await getWatchList(userId, sessionId, currentPage);
      if (response?.results) {
        allResults = [...allResults, ...response.results];
        totalPages = response.total_pages;
        currentPage = currentPage + 1;
      } else {
        break;
      }
    }

    return allResults;
  };

  useEffect(() => {
    setIsLoading(true);

    if (
      selectedCategory !== 0 &&
      sortingOption.services === "watch_providers" &&
      sortingOption.rate === "rating" &&
      sortingOption.year === "release_date"
    ) {
      const fetchMoviesWithinCategory = async () => {
        const data = await getMoviesWithinCategory(selectedCategory, pageNum);

        if (movies.length !== 0) {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
        } else {
          setMovies(data.results);
        }
        setTotalPages(data.total_pages);
        setTimeout(setIsLoading(false), 900);
      };
      fetchMoviesWithinCategory();
    } else if (
      sortingOption.year !== "release_date" &&
      selectedCategory !== 0
    ) {
      const fetchSortedMoviesByYearWithinCategory = async () => {
        const data = await getSortedMoviesByYearWithinCategory(
          pageNum,
          sortingOption,
          selectedCategory
        );
        if (movies.length !== 0) {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
        } else {
          setMovies(data.results);
        }
        setTotalPages(data.total_pages);
        setTimeout(setIsLoading(false), 900);
      };

      fetchSortedMoviesByYearWithinCategory();
    } else if (sortingOption.year !== "release_date") {
      const fetchSortedMoviesByYear = async () => {
        const data = await getSortedMoviesByYear(pageNum, sortingOption);
        if (movies.length !== 0) {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
        } else {
          setMovies(data.results);
        }
        setTotalPages(data.total_pages);
        setTimeout(setIsLoading(false), 900);
      };
      fetchSortedMoviesByYear();
    } else if (
      sortingOption.services !== "watch_providers" &&
      selectedCategory !== 0
    ) {
      const fetchSortedMoviesByServicesWithinCategory = async () => {
        const data = await getSortedMoviesByServicesWithinCategory(
          pageNum,
          sortingOption,
          selectedCategory
        );
        if (movies.length !== 0) {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
        } else {
          setMovies(data.results);
        }
        setTotalPages(data.total_pages);
        setTimeout(setIsLoading(false), 900);
      };
      fetchSortedMoviesByServicesWithinCategory();
    } else if (sortingOption.services !== "watch_providers") {
      const fetchSortedMoviesByServices = async () => {
        const data = await getSortedMoviesByServices(pageNum, sortingOption);
        if (movies.length !== 0) {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
        } else {
          setMovies(data.results);
        }
        setTotalPages(data.total_pages);
        setTimeout(setIsLoading(false), 900);
      };
      fetchSortedMoviesByServices();
    } else if (sortingOption.rate !== "rating" && selectedCategory !== 0) {
      const fetchSortedMoviesByRatingWithinCategory = async () => {
        const data = await getSortedMoviesByRatingWithinCategory(
          pageNum,
          sortingOption,
          selectedCategory
        );
        if (movies.length !== 0) {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
        } else {
          setMovies(data.results);
        }
        setTotalPages(data.total_pages);
        setTimeout(setIsLoading(false), 900);
      };
      fetchSortedMoviesByRatingWithinCategory();
    } else if (sortingOption.rate !== "rating") {
      const fetchSortedMoviesByRating = async () => {
        const data = await getSortedMoviesByRating(pageNum, sortingOption);
        if (movies.length !== 0) {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
        } else {
          setMovies(data.results);
        }
        setTotalPages(data.total_pages);
        setTimeout(setIsLoading(false), 900);
      };
      fetchSortedMoviesByRating();
    } else {
      const fetchMovies = async () => {
        const data = await getAllMovies(pageNum);
        if (movies.length !== 0) {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
        } else {
          setMovies(data.results);
        }
        setTotalPages(data.total_pages);
        setTimeout(setIsLoading(false), 900);
      };

      fetchMovies();
    }
  }, [selectedCategory, pageNum, sortingOption]);

  useEffect(() => {
    if (userId && sessionId) {
      const refetchWatchList = async () => {
        const savedMovies = await fetchFullWatchList(userId, sessionId);
        setWatchList(savedMovies);
      };
      refetchWatchList();
    }
  }, [userId, sessionId]);

  const handleWatchList = async (movie) => {
    const saveMovieToWatchList = await addMovieToWatchList(
      userId,
      sessionId,
      movie?.id
    );
    if (saveMovieToWatchList?.data?.success === true) {
      setWatchList((prevWatchList) => {
        const updatedWatchList = [...(prevWatchList || [])];

        const movieIndex = updatedWatchList.findIndex(
          (item) => item.id === movie?.id
        );

        if (movieIndex === -1) {
          updatedWatchList.push(movie);
        }

        return updatedWatchList;
      });
    } else {
      window.alert("Error adding movie to watch list. Please, try again later");
    }
  };

  return (
    <div>
      <NavBar
        moviesCategories={moviesCategories}
        setSelectedCategory={setSelectedCategory}
        setMoviesCategories={setMoviesCategories}
        setMovies={setMovies}
        setSotringOption={setSortingOption}
        selectedCategory={selectedCategory}
        movieTerm={movieTerm}
        setMovieTerm={setMovieTerm}
        setMoviesSearchList={setMoviesSearchList}
        moviesSearchList={moviesSearchList}
        setIsLoading={setIsLoading}
        setTotalSearchResults={setTotalSearchResults}
        sessionId={sessionId}
        setSessionId={setSessionId}
        userId={userId}
        setUserId={setUserId}
        setWatchList={setWatchList}
        setSortedWatchList={setSortedWatchList}
      />
      <Routes>
        <Route
          path="/"
          element={
            <MoviesList
              movies={movies}
              page={pageNum}
              setPageNum={setPageNum}
              totalPages={totalPages}
              sortingOption={sortingOption}
              setSortingOption={setSortingOption}
              setMovies={setMovies}
              setWatchList={setWatchList}
              watchList={watchList}
              handleWatchList={handleWatchList}
              isLoading={isLoading}
              width={width}
              pageNum={pageNum}
            />
          }
        />
        <Route
          path="/movies-search"
          element={
            <MoviesSearchList
              moviesSearchList={moviesSearchList}
              watchList={watchList}
              handleWatchList={handleWatchList}
              width={width}
              isLoading={isLoading}
              setWatchList={setWatchList}
              movieTerm={movieTerm}
              totalSearchResults={totalSearchResults}
            />
          }
        />
        <Route
          path="/movie/:id"
          element={
            <MoviePage
              watchList={watchList}
              handleWatchList={handleWatchList}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        ></Route>
        <Route
          path="/watch-list"
          element={
            <WatchList
              watchList={watchList}
              setWatchList={setWatchList}
              setSortingOption={setSortingOption}
              sortingOption={sortingOption}
              setSortedWatchList={setSortedWatchList}
              sortedWatchList={sortedWatchList}
              isLoading={isLoading}
              width={width}
              userId={userId}
              sessionId={sessionId}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
