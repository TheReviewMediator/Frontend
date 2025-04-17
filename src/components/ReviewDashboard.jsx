import React, { useEffect, useState } from "react";
import axios from "axios";
import review_styles from "./css/reviews.module.css";
import alert_styles from "./css/alerts.module.css";
import DashboardNavbar from "./DashboardNavbar";
import ReviewList from "./ReviewList";
import Alert from "react-bootstrap/Alert";
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

  console.log("Review styles:");
  console.log(review_styles);

  return (
    <flex className={review_styles.centeredFlex}>
      <DashboardNavbar activeLink={"/dashboard/reviews"} sources={sources} />
      <h2> Review Dashboard </h2>
      <div className={alert_styles.successAlert}>
        {showAlert != null ? (
          <Alert
            className={alert_styles.alert}
            key={"success"}
            variant="success"
          >
            <div className={alert_styles.alertText}> {showAlert} </div>
            <Button
              className={alert_styles.alertButton}
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
    </flex>
  );
};

export default ReviewDashboard;
