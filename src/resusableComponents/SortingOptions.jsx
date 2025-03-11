import React, { useState } from "react";

import "./SortingOptions.css";

const SortingOptions = () => {
  const [sortingOption, setSortingOption] = useState({
    year: "release_date",
    rate: "rating",
    services: "watch_providers",
  });
  return (
    <div className="sorting-options container">
      <select
        className="option"
        name="year"
        //onChange
        //value
      >
        <option value="release_date">Year</option>
        <option value="release_date_asc">Ascending</option>
        <option value="release_date_desc">Descending</option>
      </select>
      <select
        className="option"
        name="rate"
        //onChange
        //value
      >
        <option value="rating">Rating</option>
        <option value="rating_asc">Ascending</option>
        <option value="rating_desc">Descending</option>
      </select>
      <select
        className="option"
        name="services"
        //onChange
        //value
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
