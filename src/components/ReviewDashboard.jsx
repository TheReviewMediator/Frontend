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
const ReviewDashboard = ({ businessId }) => {
  const [reviews, setReviews] = useState([]);
  const [showAlert, setShowAlert] = useState(null); // This is drilled down to the offcanvases

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
        <DashboardNavbar activeLink={'/dashboard/reviews'}/>
        <h2> Review Dashboard </h2>
        <div className={styles.successAlert}>
          {(showAlert != null) ? 
            <Alert className={styles.alert} key={'success'} variant='success'>
              <div className={styles.alertText}> {showAlert} </div> 
              <Button className={styles.alertButton} variant="outline-success" onClick={() => setShowAlert(null)}> X </Button>
            </Alert>        
          : null}
        </div>
        <ReviewList reviews={reviews} alertState={{state: showAlert, setter: setShowAlert}}/>
      </div>
  );
};

export default ReviewDashboard;
