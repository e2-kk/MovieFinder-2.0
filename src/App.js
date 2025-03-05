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

  useEffect(() => {
    if (selectedCategory !== 0) {
      const fetchMoviesWithinCategory = async () => {
        const data = await getMoviesWithinCategory(selectedCategory, pageNum);

        setMovies(data);
      };
      fetchMoviesWithinCategory();
    } else {
      const fetchMovies = async () => {
        const data = await getAllMovies(pageNum);
        setMovies(data);
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
      />
      <MoviesList movies={movies} page={pageNum} setPageNum={setPageNum} />
    </div>
  );
}

export default App;
