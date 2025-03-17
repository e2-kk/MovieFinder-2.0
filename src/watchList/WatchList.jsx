import React, { useEffect } from "react";

import "../movies/MoviesList/MoviesList.css";
import "./WatchList.css";
import MovieCard from "../movies/movieCard/MovieCard";

const WatchList = ({ watchList }) => {
  console.log(watchList);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);
  return (
    <div className="movie-list container height margin-top">
      <div className="movie-list-grid">
        {watchList.map((movie) => (
          <MovieCard key={movie.movie.id} movie={movie.movie} />
        ))}
      </div>
    </div>
  );
};

export default WatchList;
