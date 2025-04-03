import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./MoviePage.css";
import { getMovieDetails } from "../../utils/api";

const MoviePage = () => {
  const { id } = useParams();
  const [selectedMovie, setSelectedMovie] = useState(0);

  useEffect(() => {
    const getMovie = async () => {
      const movie = await getMovieDetails(id);
      setSelectedMovie(movie);
      console.log(movie);
    };
    getMovie();
  }, [id]);

  //console.log(movie.backdrop_path);

  return (
    <div className="movie-details-page container">
      <div className="movie-details-backdrop-img-container">
        <img
          className="movie-details-backdrop-img"
          src={`https://image.tmdb.org/t/p/original${selectedMovie?.backdrop_path}`}
          alt="backdrop poster image"
        ></img>
      </div>
      <div className="movie-details">
        <div className="movie-details-poster-container"></div>
        <div className="movie-details-info"></div>
      </div>
    </div>
  );
};

export default MoviePage;
