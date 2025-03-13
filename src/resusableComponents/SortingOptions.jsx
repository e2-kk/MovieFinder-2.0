import React from "react";

import "./SortingOptions.css";

const SortingOptions = ({
  sortingOption,
  setSortingOption,
  setMovies,
  setPageNum,
}) => {
  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    setSortingOption((prev) => {
      return { ...prev, [name]: value };
    });

    setMovies([]);
    setPageNum(1);
  };

  return (
    <div className="sorting-options container">
      <select
        className="option"
        name="year"
        onChange={(event) => {
          setSortingOption((prev) => {
            return { ...prev, services: "watch_providers", rate: "rating" };
          });
          handleOptionChange(event);
        }}
        value={sortingOption.year}
      >
        <option value="release_date">Year</option>
        <option value="primary_release_date.asc">Ascending</option>
        <option value="primary_release_date.desc">Descending</option>
      </select>
      <select
        className="option"
        name="rate"
        onChange={(event) => {
          setSortingOption((prev) => {
            return {
              ...prev,
              services: "watch_providers",
              year: "release_date",
            };
          });
          handleOptionChange(event);
        }}
        value={sortingOption.rate}
      >
        <option value="rating">Rating</option>
        <option value="vote_average.asc">Ascending</option>
        <option value="vote_average.desc">Descending</option>
      </select>
      <select
        className="option"
        name="services"
        onChange={(event) => {
          setSortingOption((prev) => {
            return {
              ...prev,
              rate: "rating",
              year: "release_date",
            };
          });
          handleOptionChange(event);
        }}
        value={sortingOption.services}
      >
        <option value="watch_providers">Services</option>
        <option value="Netflix">Netflix</option>
        <option value="Apple TV">Apple TV</option>
        <option value="YouTube">YouTube</option>
      </select>
    </div>
  );
};

export default SortingOptions;
