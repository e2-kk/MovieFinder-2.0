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
} from "./utils/api";
import WatchList from "./watchList/WatchList";
import MoviePage from "./movies/moviesPage/MoviePage";

const savedMovies = localStorage.getItem("watchList");

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
  const [watchList, setWatchList] = useState(JSON.parse(savedMovies));
  const [sortedWatchList, setSortedWatchList] = useState([]);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
    setSortedWatchList(watchList);
  }, [watchList]);

  useEffect(() => {
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
      };

      fetchMovies();
    }
  }, [selectedCategory, pageNum, sortingOption]);

  return (
    <div className="App">
      <NavBar
        moviesCategories={moviesCategories}
        setSelectedCategory={setSelectedCategory}
        setMoviesCategories={setMoviesCategories}
        setMovies={setMovies}
        setSotringOption={setSortingOption}
        selectedCategory={selectedCategory}
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
            />
          }
        />
        <Route path="/movie/:id" element={<MoviePage />}></Route>
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
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
