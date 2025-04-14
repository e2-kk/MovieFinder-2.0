import React from "react";

import "./MoviesList.css";
import MovieCard from "../movieCard/MovieCard";
import SortingOptions from "../../resusableComponents/MovieListSortingOptions";
import SaveIcon from "../../resusableComponents/save-icon/SaveIcon";

const MoviesList = ({
  movies,
  page,
  setPageNum,
  totalPages,
  sortingOption,
  setSortingOption,
  setMovies,
  setWatchList,
  watchList,
  handleWatchList,
}) => {
  const handleNextMoviesPage = () => {
    if (totalPages > page) {
      const pageNum = page + 1;
      setPageNum(pageNum);
    } else {
      console.log("Sorry, reached the end of movies list");
    }
  };

  return (
    <div className="movie-list container">
      <SortingOptions
        sortingOption={sortingOption}
        setSortingOption={setSortingOption}
        setMovies={setMovies}
        setPageNum={setPageNum}
      />
      <div className="movie-list-grid">
        {movies.map((movie) => (
          <div className="movie-list-item-container" key={movie.id}>
            <SaveIcon
              watchList={watchList}
              movie={movie}
              handleWatchList={handleWatchList}
            />
            <MovieCard
              key={movie.id}
              movie={movie}
              setWatchList={setWatchList}
              watchList={watchList}
            />
          </div>
        ))}
      </div>
      <button className="movie-list-btn" onClick={handleNextMoviesPage}>
        Load More
      </button>
    </div>
  );
};

export default MoviesList;
