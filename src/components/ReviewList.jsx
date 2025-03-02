import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import axios from 'axios';
import styles from './css/reviews.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FlagReviewOffcanvas from './FlagReviewOffcanvas';

// The review itself - displays it's information and appropriate buttons
// TODO - make the `...` show more options
function Review({review}) {
  const [showFlag, setShowFlag] = useState(false);

  const handleCloseFlag = () => {
    setShowFlag(false);
    console.log("CLOSED THE CANVAS");
  }
  
  const handleShowFlag = () => setShowFlag(true);
  
  return (
    <div className={styles.reviewHeader}>
      {review.platform}, <b>{review.rating} stars</b>
      <div className={styles.reviewBody}>
        {review.text}
        <Dropdown className={styles.respondButton}>
          <Dropdown.Toggle variant="success" id="more_options">
            More
          </Dropdown.Toggle>
          
          <Dropdown.Menu>
            <Dropdown.Item>Request Outreach</Dropdown.Item>
            <Dropdown.Item onClick={handleShowFlag}>Flag</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <button className={styles.respondButton}>Respond</button>
      </div>

      <FlagReviewOffcanvas show={showFlag} handleClose={handleCloseFlag} review={review}></FlagReviewOffcanvas>
    </div>
  )
}

// Builds a table of reviews
// We do it like this because I think it's easier to format the HTML this way
function ReviewList({ reviews }) {
  const rows = [];
  const sources = [];

  reviews.forEach((review_item) => {
    // Handle creating checkboxes for search function
    // This should probably be refactored to Searchbar.jsx 
    if (sources.indexOf(review_item.platform) === -1) {
      sources.push(
        <div className={styles.sourceBoxes}>
          <label>
            <input type="checkbox" name="checkbox" value="value"/>
            {review_item.platform}
          </label>
        </div>
      );
    }
    rows.push(
      <Review review={review_item} />
    );
  });

  return (
    <div className={styles.dashboard}>
      <div className={styles.searchBar}>
        <Searchbar sources={ sources }/>
      </div>
      <ol className={styles.reviewList}>
        <li> {rows} </li>
      </ol>
    </div>
  )
}

export default ReviewList;
