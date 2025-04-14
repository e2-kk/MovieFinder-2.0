import React from "react";

import "./DeleteIcon.css";

const DeleteIcon = ({ handleMovieDeletion, movie }) => {
  return (
    <img
      className="movie-list-iem-delete-btn"
      src="./assets/delete.png"
      alt="delete icon"
      onClick={() => {
        handleMovieDeletion(movie);
      }}
    />
  );
};

export default DeleteIcon;
