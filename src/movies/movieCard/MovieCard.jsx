import React from "react";
import { Link } from "react-router-dom";

import "./MovieCard.css";

const MovieCard = ({ movie, width }) => {
  console.log(width);
  return (
    <div className="movie-card-container">
      <Link
        className="movie-card"
        to={`/movie/${movie.id}`}
        target={width < 1200 ? "" : "_blank"}
      >
        <img
          className="movie-card-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt="movie poster"
        />

        <div className="movie-card-details">
          <div className="movie-card-details-date-rate">
            <p>{movie.release_date.slice(0, 4)}</p>
            <p>
              {Math.floor(movie.vote_average * 10) / 10}
              <img
                className="movie-card-details-emoji"
                src="./assets/star.png"
                alt="rating image"
              />
            </p>
          </div>
          <p className="movie-card-details-description">
            {movie?.overview
              ? movie.overview.slice(0, 100) + "..."
              : movie.overview}
          </p>
        </div>
      </Link>
      <h3 className="movie-card-title">
        {movie.title.length > 14
          ? movie.title.slice(0, 14) + "..."
          : movie.title}
      </h3>
    </div>
  );
};

export default MovieCard;
