import React from "react";

import "./SaveIcon.css";

const SaveIcon = ({ watchList, movie, handleWatchList }) => {
  console.log(movie);
  console.log("This is watchList", watchList);
  let isAdded = watchList?.some(
    (savedMovie) => savedMovie.movie.id === movie.id
  );
  console.log("Is added", isAdded);
  return (
    <img
      className="movie-card-save-icon"
      src={
        watchList?.some((savedMovie) => savedMovie.movie.id === movie.id)
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
