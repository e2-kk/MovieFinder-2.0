import React, { useState, useEffect } from "react";

import "./App.css";
import NavBar from "./navbar/NavBar";
import MoviesList from "./movies/MoviesList/MoviesList";
import {
  getMoviesWithinCategory,
  getAllMovies,
  getSortedMoviesByYear,
  getSortedMoviesByRating,
  getSortedMoviesByServices,
} from "./utils/api";

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

  useEffect(() => {
    if (selectedCategory !== 0) {
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
      sortingOption.rate === "rating"
    ) {
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
      console.log("Sorting by year is executed!");
    } else if (sortingOption.rate !== "watch_providers") {
      //setSortingOption({ year: "release_date" });
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
      console.log("Sorting by services is executed!");
    } else if (sortingOption.services !== "rating") {
      //setSortingOption({ year: "release_date" });
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
      console.log("Sorting by rate is executed!");
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

  console.log(sortingOption);

  return (
    <div className="App">
      <NavBar
        moviesCategories={moviesCategories}
        setSelectedCategory={setSelectedCategory}
        setMoviesCategories={setMoviesCategories}
        setMovies={setMovies}
      />

      <MoviesList
        movies={movies}
        page={pageNum}
        setPageNum={setPageNum}
        totalPages={totalPages}
        sortingOption={sortingOption}
        setSortingOption={setSortingOption}
        setMovies={setMovies}
      />
    </div>
  );
}

export default App;
