import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import axios from 'axios';
import styles from './css/reviews.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FlagReviewOffcanvas from './FlagReviewOffcanvas';
import RespondOffcanvas from './RespondOffcanvas';

// The review itself - displays it's information and appropriate buttons
// Also serves as the parent class for the offcanvases
function Review({review, alertState}) {
  const [showFlag, setShowFlag] = useState(false);
  const [showRespond, setShowRespond] = useState(false);

  const handleShowFlag = () => setShowFlag(true);
  const handleCloseFlag = () => setShowFlag(false);
  const handleShowRespond = () => setShowRespond(true);
  const handleCloseRespond = () => setShowRespond(false);
  
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
        <button className={styles.respondButton} onClick={handleShowRespond}>Respond</button>
      </div>
      <RespondOffcanvas show={showRespond} handleClose={handleCloseRespond} review={review} alertState={alertState}></RespondOffcanvas>
      <FlagReviewOffcanvas show={showFlag} handleClose={handleCloseFlag} review={review} alertState={alertState}></FlagReviewOffcanvas>
    </div>
  )
}

// Builds a list of reviews
// We do it like this because I think it's easier to format the HTML this way
function ReviewList({ reviews, alertState }) {
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
      <Review review={review_item} alertState={alertState} />
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
