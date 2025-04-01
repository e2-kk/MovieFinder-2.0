import React from "react";
import { useParams } from "react-router-dom";

import "./MoviePage.css";

const MoviePage = () => {
  const { id } = useParams();
  return <div>MoviesPage</div>;
};

export default MoviePage;
