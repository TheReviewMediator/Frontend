import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import axios from 'axios';
import styles from './css/alerts.module.css';
import DashboardNavbar from './DashboardNavbar';
import ReviewList from './ReviewList';
import Alert from 'react-bootstrap/Alert';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

// The actual web page
const GenerateReviewPage = ({ businessId }) => {
  const [reviews, setReviews] = useState([]);
  const [showAlert, setShowAlert] = useState(null); // This is drilled down to the offcanvases


  return (
      <div>
        <DashboardNavbar activeLink={'/dashboard/reviews'}/>
        <h2> Generate Reviews </h2>
        <h3> Coming Soon! </h3>
      </div>
  );
};

export default GenerateReviewPage;
