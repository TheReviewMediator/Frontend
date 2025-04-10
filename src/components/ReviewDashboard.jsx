import React, { useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import axios from "axios";
import styles from "./css/alerts.module.css";
import DashboardNavbar from "./DashboardNavbar";
import ReviewList from "./ReviewList";
import Alert from "react-bootstrap/Alert";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

// The actual web page
const ReviewDashboard = ({ businessId }) => {
  let sources = [];
  const [reviews, setReviews] = useState([]);
  const [showAlert, setShowAlert] = useState(null); // This is drilled down to the offcanvases

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // TODO - replace with real endpoint in prod
        // const response = await axios.get(process.env.BACKEND_URI + `/api/reviews/all`);
        const response = await axios.get(
          process.env.BACKEND_URI + `/api/mock-reviews/all`
        );
        console.log("Fetched reviews");
        console.log(response);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [businessId]);

  // Build a list of sources
  // eg: ['Facebook', 'Yelp']
  // This is done here because several props need it at this high level
  reviews.forEach((review_item) => {
    if (sources.indexOf(review_item.platform) === -1) {
      sources.push(review_item.platform);
    }
  });

  return (
    <div>
      <DashboardNavbar activeLink={"/dashboard/reviews"} sources={sources} />
      <h2> Review Dashboard </h2>
      <div className={styles.successAlert}>
        {showAlert != null ? (
          <Alert className={styles.alert} key={"success"} variant="success">
            <div className={styles.alertText}> {showAlert} </div>
            <Button
              className={styles.alertButton}
              variant="outline-success"
              onClick={() => setShowAlert(null)}
            >
              {" "}
              X{" "}
            </Button>
          </Alert>
        ) : null}
      </div>
      <ReviewList
        reviews={reviews}
        sources={sources}
        setReviews={setReviews}
        alertState={{ state: showAlert, setter: setShowAlert }}
      />
    </div>
  );
};

export default ReviewDashboard;
