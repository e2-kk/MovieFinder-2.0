import React from "react";

import "./SortingOptions.css";

const SortingOptions = () => {
  return (
    <div className="sorting-options container">
      <select
        className="option"
        name="release_date"
        //onChange
        //value
      >
        <option value="release_date">Year</option>
        <option value="release_date_asc">Ascending</option>
        <option value="release_date_desc">Descending</option>
      </select>
      <select
        className="option"
        name="release_date"
        //onChange
        //value
      >
        <option value="release_date">Rating</option>
        <option value="release_date_asc">Ascending</option>
        <option value="release_date_desc">Descending</option>
      </select>
      <select
        className="option"
        name="watch_providers"
        //onChange
        //value
      >
        <option value="release_date">Services</option>
        <option value="release_date">Netflix</option>
        <option value="release_date_asc">Apple TV</option>
        <option value="release_date_desc">YouTube</option>
      </select>
    </div>
  );
};

export default SortingOptions;
