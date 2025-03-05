import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import axios from 'axios';
import styles from './css/reviews.module.css';
import ReviewList from './ReviewList';
import Alert from 'react-bootstrap/Alert';

// The actual web page
const ReviewDashboard = ({ businessId }) => {
  const [reviews, setReviews] = useState([]);
  const [showAlert, setShowAlert] = useState(null); // This is drilled down to the offcanvases

  const handleCloseAlert = () => setShowAlert(null); 

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
        <h2> Review Dashboard </h2>
        <ReviewList reviews={reviews} alertState={{state: showAlert, setter: setShowAlert}}/>
        <div className={styles.successAlert}>
          {(showAlert != null) ? 
              <Alert key={'success'} variant='success' dismissable={true} onClose={() => setShowAlert(null)}>
                {showAlert}
              </Alert> : null}
        </div>
      </div>
  );
};

export default ReviewDashboard;
