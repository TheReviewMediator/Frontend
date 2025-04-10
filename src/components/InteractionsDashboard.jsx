import React, { useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import axios from "axios";
import styles from "./css/reviews.module.css";
import ReviewList from "./ReviewList";
import DashboardNavbar from "./DashboardNavbar";
import Nav from "react-bootstrap/Nav";

// The actual web page
const InteractionsDashboard = ({ businessId }) => {
  let sources = [];
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        // TODO - replace this with the endpoint for getting interactions
        const response = await axios.get(
          process.env.BACKEND_URI + `/api/mock-reviews/all`
        );
        console.log("Fetched interactions");
        console.log(response);
        setInteractions(response.data);
      } catch (error) {
        console.error("Error fetching interactions:", error);
      }
    };
    fetchInteractions();
  }, [businessId]);

  // Build a list of sources
  // eg: ['Facebook', 'Yelp']
  interactions.forEach((review_item) => {
    if (sources.indexOf(review_item.platform) === -1) {
      sources.push(review_item.platform);
    }
  });

  return (
    <div>
      <DashboardNavbar
        activeLink={"/dashboard/interactions"}
        sources={sources}
      />
      <h2> TODO - Interactions Dashboard </h2>
      <ReviewList reviews={interactions} sources={sources} />
    </div>
  );
};

export default InteractionsDashboard;
