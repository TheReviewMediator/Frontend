import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import axios from 'axios';
import styles from './css/reviews.module.css';
import ReviewList from './ReviewList';

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
          <ReviewList reviews={reviews}/>
        </div>
    );
};

export default ReviewDashboard;
