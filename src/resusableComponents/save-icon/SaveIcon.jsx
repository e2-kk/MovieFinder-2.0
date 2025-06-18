import React from "react";

import "./SaveIcon.css";

const SaveIcon = ({ watchList, movie, handleWatchList }) => {
  return (
    <img
      className="movie-card-save-icon"
      src={
        watchList?.some((savedMovie) => savedMovie?.id === movie?.id)
          ? "/assets/red-heart.png"
          : "/assets/like.png"
      }
      alt="save icon"
      onClick={() => {
        handleWatchList(movie);
      }}
    ></img>
  );
};

export default SaveIcon;
