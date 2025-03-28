import React from "react";

import "../SortingOptions.css";

const FilteringOptions = ({
  sortingOption,
  setSortingOption,
  setSortedWatchList,
  watchList,
}) => {
  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    setSortingOption((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleFilteringOptionsReset = () => {
    setSortingOption((prev) => {
      return { ...prev, year: "release_date", rate: "rating" };
    });
    setSortedWatchList(watchList);
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
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
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
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <button className="option" onClick={handleFilteringOptionsReset}>
        Reset Filters
      </button>
    </div>
  );
};

export default FilteringOptions;
