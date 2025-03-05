import React from "react";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card-container">
      <img
        className="movie-card-save-icon"
        src="./assets/like.png"
        alt="save icon"
      ></img>
      <a className="movie-card" href="#">
        <img
          className="movie-card-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt="movie poster"
        />

        <div className="movie-card-details">
          <div className="movie-card-details-date-rate">
            <p>{movie.release_date.slice(0, 4)}</p>
            <p>
              {Math.round(movie.vote_average * 10) / 10}
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
      </a>
      <h3 className="movie-card-title">
        {movie.title.length > 14
          ? movie.title.slice(0, 14) + "..."
          : movie.title}
      </h3>
    </div>
  );
};

export default MovieCard;
