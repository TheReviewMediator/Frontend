import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import axios from 'axios';
import styles from './css/reviews.module.css';
import ReviewList from './ReviewList';
import DashboardNavbar from './DashboardNavbar';
import Nav from 'react-bootstrap/Nav';

// The actual web page
const CasesDashboard = ({ businessId }) => {
  const [reviews, setReviews] = useState([]);

  // TODO - replace this with a fetchCases call
  useEffect(() => {
      const fetchReviews = async () => {
          try {
              const response = await axios.get(process.env.BACKEND_URI + `/api/reviews/fetchReviews`);
              console.log('Fetched reviews');
              console.log(response);
              setReviews(response.data);
          } catch (error) {
              console.error('Error fetching reviews:', error);
          }
      };
      fetchReviews();
  }, [businessId]);

  return (
      <div>
        <DashboardNavbar activeLink={'/dashboard/cases'}/>
        <h2> TODO - Cases Dashboard </h2>
        <ReviewList reviews={reviews}/>
      </div>
  );
};

export default CasesDashboard;
