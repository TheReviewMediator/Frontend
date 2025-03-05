import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import axios from 'axios';
import styles from './css/reviews.module.css';
import Offcanvas from 'react-bootstrap/Offcanvas';

// Much of this function was taken from the react bootstrap examples: 
// https://react-bootstrap.netlify.app/docs/components/offcanvas/

// TODO - re-write this function when we have an MVP
function FakeReviewForm({ platform }) {
  return (
    <div>
      <header>
        <h1> Coming Soon! </h1>
      </header>
    </div>
  )

}


function PolicyForm({ platform }) {
  // TODO - replace this with actual policies
  const policies = {
    "Google": ['Hate', 'Harassment', 'Off Topic', "Bullying"],
    "Yelp": ['Hate', 'Personal Information', 'Spam']
  }

  // Used to report to the review platform the offending policy
  const [selectedReason, setSelectedReason] = useState("Select One");

  const handleChange = (e) => {
    setSelectedReason(e);
  }

  // TODO - replace this with actual functionality.
  // I can't do this until we have the backend for it.
  const handleSubmit = () => {
    console.log(`Successfully submitted ${selectedReason} policy violation to ${platform}`)
  }

  return (
    <div>
      <div>
        <label> 
        Pick a policy: 
          <select 
            value = {selectedReason}
            onChange={e => handleChange(e.target.value)}
            defaultValue="Select One"
          >
            <option value="Select One">Select One </option>
            {policies[platform].map((item, index) => (
              <option value={item}> {item} </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <button 
          type="submit"
          disabled={(selectedReason == "Select One")}
          onClick={() => { handleSubmit() }}
          > 
            Submit 
        </button>
      </div>
    </div>
  )

}

// The form you fill out for a request
function FlagForm({ platform }) {
  const [selectedReason, setSelectedReason] = useState("");
  
  return (
    <div className={styles.FlagFormHeader}>
      <label> 
      Pick a reason: 
        <select 
          value = {selectedReason}
          onChange={e => setSelectedReason(e.target.value)}
          defaultValue="Select One"
        >
          <option value='Select One'> Select One </option>
          <option value='Fake Review'> Fake Review </option>
          <option value='Policy Violation'> Policy Violation </option>
        </select>
      </label>
      {(selectedReason == 'Policy Violation') ? <PolicyForm platform={platform}/> : null}
      {(selectedReason == 'Fake Review') ? <FakeReviewForm/> : null}
    </div>
  )
};

// Three inputs:
// Show - The state of the offcanvas
// handleClose - the function that will close the canvas
// review - data pertaining to the current selected review. Should be a review object (see reviewList.jsx)
function RespondOffcanvas({ show, handleClose, review }) {
  return (
    <Offcanvas placement={'end'} show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title> Flag to {review.platform} </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>

      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default RespondOffcanvas;
