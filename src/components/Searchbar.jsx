// components/Searchbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './css/reviews.module.css';
import 'bootstrap/dist/css/bootstrap.css';

// Keeps track of keywords given in search bar
function Keywordbox() {
  return (
    <div>
      <div> keywords </div>
      <div> 
        <div> TODO Keywords Here </div>
      </div>
    </div>
  )
}

// List of checkmarks to filter by review source
// `sources` is generated in ReviewDashboard.jsx as I don't want to re-use the get review call here
function Sourcebox({ sources }) {
  return (

    <table className={styles.reviewList}>
      <tbody> {sources} </tbody>
    </table>
  )
}

const Searchbar = ({ sources }) => {
    return (
      <div>
        <input type="search" placeholder="Search"/>
        <Keywordbox/>
        <label>
          <input type="checkbox"/>
          Flagged reviews only
        </label>
        <div>
          <b> Sources </b>
          <Sourcebox sources={ sources }/>
        </div>
          
        <label>
          <select defaultValue="5">
            <option value='5'> 5 stars </option>
            <option value='4'> 4 stars </option>
            <option value='3'> 3 stars </option>
            <option value='2'> 2 stars </option>
            <option value='1'> 1 stars </option>
          </select>
        </label>
      </div>
    );
};

export default Searchbar;
