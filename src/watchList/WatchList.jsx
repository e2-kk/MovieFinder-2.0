import React, { useEffect } from "react";
import _ from "lodash";

import "../movies/MoviesList/MoviesList.css";
import "./WatchList.css";
import MovieCard from "../movies/movieCard/MovieCard";
import FilteringOptions from "../resusableComponents/filtering-options/WatchListFilteringOptions";
import DeleteIcon from "../resusableComponents/delete-icon/DeleteIcon";
import MovieCardSkeleton from "../movies/movieCardSkeleton/MovieCardSkeleton";
import Footer from "../resusableComponents/footer/Footer";
import { getWatchList } from "../utils/api";

const WatchList = ({
  watchList,
  setWatchList,
  sortingOption,
  setSortingOption,
  setSortedWatchList,
  sortedWatchList,
  isLoading,
  width,
  userId,
  sessionId,
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

  const user = userId;
  const session = sessionId;

  const getUserWatchList = async () => {
    const savedMovies = await getWatchList(user, session);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      getUserWatchList();
    }
  }, []);

  const handleMovieDeletion = (movie) => {
    const savedMovies = [...watchList];
    const updatedWatchList = savedMovies.filter((item) => item !== movie);

    setWatchList(updatedWatchList);
  };

  return (
    <div className="movie-list container">
      <FilteringOptions
        sortingOption={sortingOption}
        setSortingOption={setSortingOption}
        setSortedWatchList={setSortedWatchList}
        watchList={watchList}
      />
      <div className="movie-list-grid margin-bottom height">
        {isLoading && watchList.map((n) => <MovieCardSkeleton key={n} />)}
        {sortedWatchList?.map((movie) => (
          <div className="movie-list-item-container" key={movie.movie.id}>
            <DeleteIcon
              handleMovieDeletion={handleMovieDeletion}
              movie={movie}
            />
            <MovieCard
              movie={movie.movie}
              watchList={watchList}
              width={width}
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default WatchList;
