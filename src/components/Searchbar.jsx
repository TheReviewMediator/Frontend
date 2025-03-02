// components/Searchbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './css/reviews.module.css';
import 'bootstrap/dist/css/bootstrap.css';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

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

    <table className={styles.reviewTable}>
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
          
          
        <DropdownButton id="dropdown-basic-button" title="Dropdown button">
          <Dropdown.Item href="#/5-star"> 5 stars </Dropdown.Item>
          <Dropdown.Item href="#/4-star"> 4 stars </Dropdown.Item>
          <Dropdown.Item href="#/3-star"> 3 stars </Dropdown.Item>
          <Dropdown.Item href="#/2-star"> 2 stars </Dropdown.Item>
          <Dropdown.Item href="#/1-star"> 1 stars </Dropdown.Item>
        </DropdownButton>
      </div>
    );
};

export default Searchbar;
