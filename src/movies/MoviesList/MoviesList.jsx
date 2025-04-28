import React from "react";

import "./MoviesList.css";
import MovieCard from "../movieCard/MovieCard";
import SortingOptions from "../../resusableComponents/MovieListSortingOptions";
import SaveIcon from "../../resusableComponents/save-icon/SaveIcon";
import MovieCardSkeleton from "../movieCardSkeleton/MovieCardSkeleton";
import Footer from "../../resusableComponents/footer/Footer";

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
  isLoading,
  width,
}) => {
  const handleNextMoviesPage = () => {
    if (totalPages > page) {
      const pageNum = page + 1;
      setPageNum(pageNum);
    } else {
      console.log("Sorry, reached the end of movies list");
    }
  };

  const skeletons = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  return (
    <div className="movie-list container">
      <SortingOptions
        sortingOption={sortingOption}
        setSortingOption={setSortingOption}
        setMovies={setMovies}
        setPageNum={setPageNum}
      />
      <div className="movie-list-grid">
        {isLoading && skeletons.map((n) => <MovieCardSkeleton key={n} />)}

        {movies.map((movie) => (
          <div className="movie-list-item-container" key={movie.id}>
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
      </div>
      {!isLoading && (
        <button className="movie-list-btn" onClick={handleNextMoviesPage}>
          Load More
        </button>
      )}
      <Footer />
    </div>
  );
};

export default MoviesList;
