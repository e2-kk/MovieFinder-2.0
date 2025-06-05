import React, { useEffect } from "react";
import _ from "lodash";

import "../movies/MoviesList/MoviesList.css";
import "./WatchList.css";
import "../movies/moviesSearchList/MoviesSearchList.css";
import MovieCard from "../movies/movieCard/MovieCard";
import FilteringOptions from "../resusableComponents/filtering-options/WatchListFilteringOptions";
import DeleteIcon from "../resusableComponents/delete-icon/DeleteIcon";
import MovieCardSkeleton from "../movies/movieCardSkeleton/MovieCardSkeleton";
import Footer from "../resusableComponents/footer/Footer";
import { removeMovieToWatchList } from "../utils/api";
import MissingContentMessage from "../resusableComponents/error-message/MissingContentMessage";

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
  const user = userId;
  const session = sessionId;

  useEffect(() => {
    if (sortingOption.year === "asc") {
      const sortedWatchList = _.sortBy(watchList, ["release_date"]);
      setSortedWatchList(sortedWatchList);
    } else if (sortingOption.year === "desc") {
      const sortedWatchList = _.orderBy(watchList, ["release_date"], ["desc"]);
      setSortedWatchList(sortedWatchList);
    } else if (sortingOption.rate === "asc") {
      const sortedWatchList = _.sortBy(watchList, ["vote_average"]);
      setSortedWatchList(sortedWatchList);
    } else if (sortingOption.rate === "desc") {
      const sortedWatchList = _.orderBy(watchList, ["vote_average"], ["desc"]);
      setSortedWatchList(sortedWatchList);
    }
  }, [sortingOption]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (user && session && watchList.length >= 0) {
      setSortedWatchList(watchList);
    }
  }, [user, session, watchList]);

  const handleMovieDeletion = async (movie) => {
    const removedMovie = await removeMovieToWatchList(user, session, movie?.id);

    if (removedMovie?.data?.success === true) {
      const savedMovies = [...watchList];
      const updatedWatchList = savedMovies?.filter((item) => item !== movie);
      setWatchList(updatedWatchList);
    } else {
      window.alert(
        "Error removing movie from watchlist. Please, try again later"
      );
    }
  };

  return (
    <div className="movie-list container">
      <FilteringOptions
        sortingOption={sortingOption}
        setSortingOption={setSortingOption}
        setSortedWatchList={setSortedWatchList}
        watchList={watchList}
      />
      {isLoading && watchList.map((n) => <MovieCardSkeleton key={n} />)}
      {!user ? (
        <div className="movie-list-message-container height margin-top">
          <MissingContentMessage message={"Please, login to view watch list"} />
        </div>
      ) : (
        <div className="movie-list-grid margin-bottom height">
          {sortedWatchList?.map((movie) => (
            <div className="movie-list-item-container" key={movie?.id}>
              <DeleteIcon
                handleMovieDeletion={handleMovieDeletion}
                movie={movie}
              />
              <MovieCard movie={movie} watchList={watchList} width={width} />
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default WatchList;
