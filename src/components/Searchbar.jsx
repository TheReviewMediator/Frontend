import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./css/reviews.module.css";
import "bootstrap/dist/css/bootstrap.css";

// List of checkmarks to filter by review source
// `sources` is generated in ReviewDashboard.jsx as I don't want to re-use the get review call here
function Sourcebox({ sources }) {
  return (
    <table className={styles.reviewList}>
      <tbody> {sources} </tbody>
    </table>
  );
}

// Searchbar HTML + Filter handling
/* Filter structure:
 [
  {platformName1: true, // True/false indicates to show reviews from platform
  platformName2: false,
  ...
  platformNameN: true,
  search: query, // Filter reviews based on search content
  stars: 2} // Filter reviews based on X stars or above
] // Array because we can technically update array states
*/
// this whole component is spicy spaghetti. sorry :)
const Searchbar = ({ reviews, filter, setFilter, sources }) => {
  let sourceCheckboxes = [];
  console.log(filter);

  // UseState variables
  const [search, setSearch] = useState("");
  const [stars, setStars] = useState(1);

  sources.forEach((source) => {
    // Handle creating checkboxes for search function
    // This should probably be refactored to Searchbar.jsx
    if (sourceCheckboxes.indexOf(source) === -1) {
      sourceCheckboxes.push(
        <div className={styles.sourceBoxes}>
          <label>
            <input
              type="checkbox"
              name="checkbox"
              value={source}
              defaultChecked={true}
              onChange={() => togglePlatform(source)}
            />
            {source}
          </label>
        </div>
      );
    }
  });

  // Add or edits a search to the current filter
  function updateSearch(search) {
    setSearch(search.target.value); // We need this to update the bar visually
    let out = filter.slice()[0];
    out.search = search.target.value;
    setFilter([out]);
  }

  // Add or edits a search to the current filter
  function updateStars(stars) {
    setStars(stars.target.value); // We need this to update the bar visually
    let out = filter.slice()[0];
    out.stars = stars.target.value;
    setFilter([out]);
  }

  // Removes a platform from our useState
  const togglePlatform = (platform) => {
    console.log(typeof filter);
    const out = filter.slice()[0];
    out[platform] = !out[platform];
    setFilter([out]);
  };

  return (
    <div>
      <div className={styles.searchTextbox}>
        <input
          type="search"
          placeholder="Search"
          value={search}
          onChange={updateSearch}
        />
      </div>
      <label>
        <input type="checkbox" />
        Flagged reviews only
      </label>
      <div>
        <b> Sources </b>
        <Sourcebox sources={sourceCheckboxes} />
      </div>
      <div>
        <label className={styles.starDropdown}>
          <select defaultValue="1" value={stars} onChange={updateStars}>
            <option value="5"> 5 stars </option>
            <option value="4"> 4 stars or more </option>
            <option value="3"> 3 stars or more </option>
            <option value="2"> 2 stars or more </option>
            <option value="1"> 1 stars or more </option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Searchbar;
