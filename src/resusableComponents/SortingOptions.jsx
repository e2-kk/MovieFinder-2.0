import React, { useState } from "react";

import "./SortingOptions.css";

const SortingOptions = ({ sortingOption, setSortingOption, setMovies }) => {
  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    setSortingOption((prev) => {
      return { ...prev, [name]: value };
    });

    setMovies([]);
  };

  return (
    <div className="sorting-options container">
      <select
        className="option"
        name="year"
        onChange={handleOptionChange}
        value={sortingOption.year}
      >
        <option value="release_date">Year</option>
        <option value="primary_release_date.asc">Ascending</option>
        <option value="primary_release_date.desc">Descending</option>
      </select>
      <select
        className="option"
        name="rate"
        onChange={handleOptionChange}
        value={sortingOption.rate}
      >
        <option value="rating">Rating</option>
        <option value="vote_average.asc">Ascending</option>
        <option value="vote_average.desc">Descending</option>
      </select>
      <select
        className="option"
        name="services"
        onChange={handleOptionChange}
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
