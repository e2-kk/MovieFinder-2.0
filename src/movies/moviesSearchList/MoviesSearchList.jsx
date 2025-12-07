import React, { useEffect } from "react";

import "../MoviesList/MoviesList.css";
import "./MoviesSearchList.css";
import MovieCard from "../movieCard/MovieCard";
import SaveIcon from "../../resusableComponents/save-icon/SaveIcon";
import MovieCardSkeleton from "../movieCardSkeleton/MovieCardSkeleton";
import Footer from "../../resusableComponents/footer/Footer";
import MissingContentMessage from "../../resusableComponents/error-message/MissingContentMessage";

const MoviesSearchList = ({
  moviesSearchList,
  watchList,
  handleWatchList,
  width,
  isLoading,
  setWatchList,
  movieTerm,
  totalSearchResults,
}) => {
  const skeletons = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(moviesSearchList.length);
  return (
    <div className="movie-list container margin-top ">
      {isLoading && moviesSearchList.length === 0 ? (
        <div className="movie-list-grid height">
          {skeletons.map((n) => (
            <MovieCardSkeleton key={n} />
          ))}
        </div>
      ) : moviesSearchList.length === 0 &&
        totalSearchResults === 0 &&
        movieTerm ? (
        <div className="movie-list-message-container height margin-top">
          <MissingContentMessage
            message={`Sorry, no movies containing "${movieTerm}" were found.`}
          />
        </div>
      ) : (
        <div className="movie-list-grid height">
          {moviesSearchList.map((movie, index) => (
            <div
              className="movie-list-item-container"
              key={`${movie.id}-${index}`}
            >
              <SaveIcon
                watchList={watchList}
                movie={movie}
                handleWatchList={handleWatchList}
              />
              <MovieCard
                movie={movie}
                setWatchList={setWatchList}
                watchList={watchList}
                width={width}
              />
            </div>
          ))}
          {isLoading && skeletons.map((n) => <MovieCardSkeleton key={n} />)}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MoviesSearchList;
