import React from "react";
import { Link } from "react-router-dom";

import "./MovieCard.css";

const MovieCard = ({ movie, width }) => {
  return (
    <div className="movie-card-container">
      <div className="movie-card-visual">
        <Link
          className="movie-card"
          to={`/movie/${movie.id}`}
          target={width < 1500 ? "" : "_blank"}
        >
          <img
            className="movie-card-poster"
            src={
              movie.poster_path !== null
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/assets/missing_poster.png"
            }
            alt="movie poster"
          />
        </Link>
        <div className="movie-card-details">
          <div className="movie-card-details-date-rate">
            <p>{movie.release_date?.slice(0, 4)}</p>
            <p>
              {Math.floor(movie.vote_average * 10) / 10}
              <img
                className="movie-card-details-emoji"
                src="./assets/star.png"
                alt="rating"
              />
            </p>
          </div>
          <p className="movie-card-details-description">
            {movie?.overview
              ? movie.overview.slice(0, 100) + "..."
              : movie.overview}
          </p>
        </div>
      </div>

      <h3 className="movie-card-title">
        {movie.title.length > 14
          ? movie.title.slice(0, 14) + "..."
          : movie.title}
      </h3>
    </div>
  );
};

export default MovieCard;
