import React from "react";
import "./MoviesList.css";
import MovieCard from "../movieCard/MovieCard";

const MoviesList = ({ movies, page, setPageNum }) => {
  const handleNextMoviesPage = () => {
    const pageNum = page + 1;
    setPageNum(pageNum);
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
