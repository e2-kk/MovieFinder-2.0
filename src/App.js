import React, { useState, useEffect } from "react";

import "./App.css";
import NavBar from "./navbar/NavBar";
import MoviesList from "./movies/MoviesList/MoviesList";
import { getMoviesWithinCategory } from "./utils/api";
import { getAllMovies } from "./utils/api";

function App() {
  const [moviesCategories, setMoviesCategories] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

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
  }, [selectedCategory, pageNum]);

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
      />
    </div>
  );
}

export default App;
