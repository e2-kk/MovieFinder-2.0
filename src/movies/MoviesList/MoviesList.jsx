import React from "react";

import "./MoviesList.css";
import MovieCard from "../movieCard/MovieCard";

const MoviesList = ({ movies, page, setPageNum, totalPages }) => {
  const handleNextMoviesPage = () => {
    if (totalPages > page) {
      const pageNum = page + 1;
      setPageNum(pageNum);
    } else {
      console.log("Sorry, reached the end of movies list");
    }
  };
  return (
    <div className="movie-list container">
      <div className="movie-list-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <button className="movie-list-btn" onClick={handleNextMoviesPage}>
        Load More
      </button>
    </div>
  );
};

export default MoviesList;
