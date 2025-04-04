import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import axios from 'axios';
import styles from './css/reviews.module.css';
import ReviewList from './ReviewList';
import DashboardNavbar from './DashboardNavbar';
import Nav from 'react-bootstrap/Nav';

// The actual web page
const CasesDashboard = ({ businessId }) => {
    let sources = [];
    const [cases, setCases] = useState([])

    // TODO - replace this with a fetchCases call
    useEffect(() => {
        const fetchCases = async () => {
            try {
                // TODO - replace this with the endpoint for getting cases
                const response = await axios.get(process.env.BACKEND_URI + `/api/mock-reviews/all`);
                console.log('Fetched cases');
                console.log(response);
                setCases(response.data);
            } catch (error) {
                console.error('Error fetching Cases:', error);
            }
        };
        fetchCases();
    }, [businessId]);

  // Build a list of sources
  // eg: ['Facebook', 'Yelp']
  cases.forEach((review_item) => {
    if (sources.indexOf(review_item.platform) === -1) {
      sources.push(review_item.platform);
    }
  });

    return (
        <div>
            <DashboardNavbar activeLink={'/dashboard/cases'} sources={sources} />
            <h2> TODO - Cases Dashboard </h2>
            <ReviewList reviews={cases} sources={sources} />
        </div>
    );
};

export default CasesDashboard;
