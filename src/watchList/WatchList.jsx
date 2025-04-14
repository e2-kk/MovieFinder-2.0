import React, { useEffect, useState } from "react";
import _ from "lodash";

import "../movies/MoviesList/MoviesList.css";
import "./WatchList.css";
import MovieCard from "../movies/movieCard/MovieCard";
import FilteringOptions from "../resusableComponents/filtering-options/WatchListFilteringOptions";
import DeleteIcon from "../resusableComponents/delete-icon/DeleteIcon";

const WatchList = ({
  watchList,
  setWatchList,
  sortingOption,
  setSortingOption,
  setSortedWatchList,
  sortedWatchList,
}) => {
  useEffect(() => {
    if (sortingOption.year === "asc") {
      const sortedWatchList = _.sortBy(watchList, ["movie.release_date"]);
      setSortedWatchList(sortedWatchList);
    } else if (sortingOption.year === "desc") {
      const sortedWatchList = _.orderBy(
        watchList,
        ["movie.release_date"],
        ["desc"]
      );
      setSortedWatchList(sortedWatchList);
    } else if (sortingOption.rate === "asc") {
      const sortedWatchList = _.sortBy(watchList, ["movie.vote_average"]);
      setSortedWatchList(sortedWatchList);
    } else if (sortingOption.rate === "desc") {
      const sortedWatchList = _.orderBy(
        watchList,
        ["movie.vote_average"],
        ["desc"]
      );
      setSortedWatchList(sortedWatchList);
    }
  }, [sortingOption]);

  const handleMovieDeletion = (movie) => {
    console.log(movie);
    const savedMovies = [...watchList];
    const updatedWatchList = savedMovies.filter((item) => item !== movie);

    console.log(updatedWatchList);

    setWatchList(updatedWatchList);
  };

  return (
    <div className="movie-list container height">
      <FilteringOptions
        sortingOption={sortingOption}
        setSortingOption={setSortingOption}
        setSortedWatchList={setSortedWatchList}
        watchList={watchList}
      />
      <div className="movie-list-grid">
        {sortedWatchList.map((movie) => (
          <div className="movie-list-item-container" key={movie.movie.id}>
            <DeleteIcon
              handleMovieDeletion={handleMovieDeletion}
              movie={movie}
            />
            <MovieCard movie={movie.movie} watchList={watchList} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchList;
