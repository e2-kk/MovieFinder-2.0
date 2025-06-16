import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./MoviePage.css";
import { getMovieDetails } from "../../utils/api";
import { getMovieTrailers } from "../../utils/api";
import { getMovieWatchProviders } from "../../utils/api";
import SaveIcon from "../../resusableComponents/save-icon/SaveIcon";
import MoviesPageSkeleton from "../moviesPageSkeleton/MoviesPageSkeleton";
import Footer from "../../resusableComponents/footer/Footer";
import MissingContent from "../../resusableComponents/error-message/MissingContentMessage";
import MissingContentMessage from "../../resusableComponents/error-message/MissingContentMessage";

const MoviePage = ({ watchList, handleWatchList, isLoading, setIsLoading }) => {
  const { id } = useParams();
  const [selectedMovie, setSelectedMovie] = useState(0);
  const [trailers, setTrailers] = useState([]);
  const [watchProviders, setWatchProviders] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
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

    const getWatchProviders = async () => {
      const movieWatchProviders = await getMovieWatchProviders(id);
      setWatchProviders(
        movieWatchProviders?.GB?.rent
          ? movieWatchProviders?.GB?.rent
          : movieWatchProviders?.GB?.flatrate
      );

      setIsLoading(false);
    };

    getWatchProviders();
  }, []);

  return (
    <div className="movie-details-page container">
      {isLoading && <MoviesPageSkeleton watchProviders={watchProviders} />}
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
            <SaveIcon
              movie={selectedMovie}
              watchList={watchList}
              handleWatchList={handleWatchList}
            />
            <img
              className="movie-details-media-poster"
              src={
                selectedMovie?.poster_path !== null
                  ? `https://image.tmdb.org/t/p/w500${selectedMovie?.poster_path}`
                  : "/assets/missing_poster.png"
              }
              alt="poster"
            ></img>
          </div>
          <div className="movie-details-media-trailer-container mobile-hidden">
            <iframe
              className="movie-details-media-trailer"
              allow="encrypted-media"
              allowFullScreen
              src={`https://www.youtube.com/embed/${trailers[0]?.key}`}
            ></iframe>
          </div>
        </div>
        <div className="movie-details-info">
          <h2 className="movie-details-info-title">{selectedMovie?.title}</h2>
          <h3
            className={`movie-details-info-tagline ${
              selectedMovie?.tagline === "" ? "hidden" : ""
            }`}
          >
            {selectedMovie?.tagline}
          </h3>

          <ul className="movie-details-info-list">
            <li>
              <span className="movie-details-info-list-item-title">
                Genres:&nbsp;
              </span>{" "}
              {selectedMovie?.genres?.map((genre) => (
                <span key={genre.id} className="movie-details-info-genres">
                  {genre.name}
                </span>
              ))}
            </li>
            <li>
              <span className="movie-details-info-list-item-title">
                Release Date:&nbsp;
              </span>{" "}
              {new Date(selectedMovie?.release_date).toDateString()}
            </li>
            <li>
              <span className="movie-details-info-list-item-title">
                Rating TMDB:&nbsp;
              </span>{" "}
              {Math.floor(selectedMovie?.vote_average * 10) / 10}
            </li>
            <li>
              <span className="movie-details-info-list-item-title">
                Run Time:&nbsp;
              </span>{" "}
              <span>
                {Math.round(selectedMovie?.runtime / 60) + "h"}&nbsp;
                {Math.round((selectedMovie?.runtime / 60) % 60) + "m"}
              </span>
            </li>
            <li>
              <span className="movie-details-info-list-item-title mobile-hidden">
                {selectedMovie?.production_companies?.length === 1
                  ? "Production Company:"
                  : "Production Companies:"}
                &nbsp;
              </span>{" "}
              {selectedMovie?.production_companies?.map((company) => (
                <span
                  key={company.id}
                  className="movie-details-info-genres mobile-hidden"
                >
                  {company.name}
                </span>
              ))}
            </li>
            <li>
              <span className="movie-details-info-list-item-title mobile-hidden">
                {selectedMovie?.production_countries?.length === 1
                  ? "Production Country:"
                  : "Production Countries:"}
                &nbsp;
              </span>{" "}
              {selectedMovie?.production_countries?.map((country) => (
                <span
                  key={country.id}
                  className="movie-details-info-genres mobile-hidden"
                >
                  {country.name}
                </span>
              ))}
            </li>
          </ul>
          <h4 className="movie-details-info-subh display">Overview</h4>
          <p className="movie-details-info-subh-desc display">
            {selectedMovie?.overview}
          </p>
          <h4 className="movie-details-info-subh display">Watch Providers</h4>
          <div className="movie-details-info-provider-container display">
            {watchProviders ? (
              watchProviders?.map((provider) => (
                <div
                  key={provider.provider_id}
                  className="movie-details-info-provider"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original/${provider?.logo_path}`}
                    className="movie-details-info-provider-img"
                  ></img>

                  <h5 className="movie-details-info-provider-title">
                    {provider.provider_name}
                  </h5>
                </div>
              ))
            ) : (
              <MissingContentMessage
                message={"Sorry, Information Unavailable"}
              />
            )}
          </div>
        </div>
      </div>
      <div className="movie-details-overview-providers">
        <div className="movie-details-media-trailer-container">
          <iframe
            className="movie-details-media-trailer"
            allow="encrypted-media"
            allowFullScreen
            src={`https://www.youtube.com/embed/${trailers[0]?.key}`}
          ></iframe>
        </div>
        <h4 className="movie-details-info-subh">Overview</h4>
        <p className="movie-details-info-subh-desc">
          {selectedMovie?.overview}
        </p>
        <h4 className="movie-details-info-subh">Watch Providers</h4>
        <div className="movie-details-info-provider-container">
          {watchProviders ? (
            watchProviders?.map((provider) => (
              <div
                key={provider.provider_id}
                className="movie-details-info-provider"
              >
                <img
                  src={`https://image.tmdb.org/t/p/original/${provider?.logo_path}`}
                  className="movie-details-info-provider-img"
                ></img>

                <h5 className="movie-details-info-provider-title">
                  {provider.provider_name}
                </h5>
              </div>
            ))
          ) : (
            <MissingContent message={"Sorry, Information Unavailable"} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MoviePage;
