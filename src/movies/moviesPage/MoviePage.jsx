import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./MoviePage.css";
import { getMovieDetails } from "../../utils/api";
import { getMovieTrailers } from "../../utils/api";

const MoviePage = () => {
  const { id } = useParams();
  const [selectedMovie, setSelectedMovie] = useState(0);
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    const getMovie = async () => {
      const movie = await getMovieDetails(id);
      setSelectedMovie(movie);
    };
    getMovie();

    const getTrailers = async () => {
      const movieTrailers = await getMovieTrailers(id);
      setTrailers(movieTrailers?.filter((video) => video.type === "Trailer"));
    };

    getTrailers();
  }, [id]);

  return (
    <div className="movie-details-page container">
      <div className="movie-details-backdrop-img-container">
        <img
          className="movie-details-backdrop-img"
          src={`https://image.tmdb.org/t/p/original${selectedMovie?.backdrop_path}`}
          alt="backdrop poster"
        ></img>
      </div>
      <div className="movie-details">
        <div className="movie-details-media">
          <div className="movie-details-media-poster-container">
            <img
              className="movie-details-media-poster"
              src={`https://image.tmdb.org/t/p/w500${selectedMovie?.poster_path}`}
              alt="poster"
            ></img>
          </div>
          <div className="movie-details-media-trailer-container">
            <iframe
              className="movie-details-media-trailer"
              allow="encrypted-media"
              allowFullScreen
              src={`https://www.youtube.com/embed/${trailers[0]?.key}`}
            ></iframe>
          </div>
        </div>
        <div className="movie-details-info"></div>
      </div>
    </div>
  );
};

export default MoviePage;
