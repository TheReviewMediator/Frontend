import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './css/reviews.module.css';

// The review itself - displays it's information and appropriate buttons
// TODO - make the `...` show more options
function Review({review}) {
  return (
    <div className={styles.reviewHeader}>
      {review.platform}, <b>{review.rating} stars</b>
      <div className={styles.reviewBody}>
        {review.text}
        <button className={styles.respondButton}>...</button>
        <button className={styles.respondButton}>Respond</button>
      </div>
    </div>
  )
}

// Builds a table of reviews
// We do it like this because I think it's easier to format the HTML this way
function ReviewTable({ reviews }) {
  const rows = [];

  reviews.forEach((review_item) => {
    rows.push(
      <Review review={review_item} />
    );
  })

  return (
    <table className={styles.reviewTable}>
      <tbody> {rows} </tbody>
    </table>
  )
}

// The actual web page
const ReviewDashboard = ({ businessId }) => {
    const [reviews, setReviews] = useState([]);

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
          <ReviewTable reviews={reviews}/>
        </div>
    );
};

export default ReviewDashboard;
