import React, { useEffect, useState } from "react";
import Searchbar from "./Searchbar";
import axios from "axios";
import styles from "./css/reviews.module.css";
import Dropdown from "react-bootstrap/Dropdown";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import FlagReviewOffcanvas from "./FlagReviewOffcanvas";
import RespondModal from "./RespondModal";

// The review itself - displays it's information and appropriate buttons
// Also serves as the parent class for the offcanvases
function Review({ review, alertState }) {
  const [showFlag, setShowFlag] = useState(false);
  const [showRespond, setShowRespond] = useState(false);
  const [preview, setPreview] = useState(",\xa0" + review.content);

  const handleShowFlag = () => setShowFlag(true);
  const handleCloseFlag = () => setShowFlag(false);
  const handleShowRespond = () => setShowRespond(true);
  const handleCloseRespond = () => setShowRespond(false);

  const handlePreview = () => {
    if (preview === "") {
      setPreview(",\xa0" + review.content);
    } else {
      setPreview("");
    }
  };

  return (
    <Accordion defaultActiveKey="0" onSelect={() => handlePreview()}>
      <Accordion.Item>
        <Accordion.Header>
          {review.platform}, <b> {"\xa0" + review.rating} stars </b>,
          <i> {"\xa0" + review.timestamp.substring(0, 10)} </i>
          {preview}
        </Accordion.Header>
        <Accordion.Body>
          <Container fluid>
            <Row>
              <Col className={styles.reviewContent}>{review.content}</Col>
            </Row>
            <Row>
              <Col> </Col>
              <Col xs lg="2" className={styles.accordionButtons}>
                <Dropdown className={styles.respondButton}>
                  <Dropdown.Toggle variant="success" id="more_options">
                    More
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Request Outreach</Dropdown.Item>
                    <Dropdown.Item onClick={handleShowFlag}>Flag</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button
                  className={styles.respondButton}
                  onClick={handleShowRespond}
                >
                  Respond
                </Button>
              </Col>
            </Row>
          </Container>
        </Accordion.Body>
        <RespondModal
          show={showRespond}
          handleClose={handleCloseRespond}
          review={review}
          alertState={alertState}
        ></RespondModal>
        <FlagReviewOffcanvas
          show={showFlag}
          handleClose={handleCloseFlag}
          review={review}
          alertState={alertState}
        ></FlagReviewOffcanvas>
      </Accordion.Item>
    </Accordion>
  );
}

// Builds a list of reviews
// We do it like this because I think it's easier to format the HTML this way
function ReviewList({ reviews, setReviews, alertState, sources }) {
  const rows = [];
  const [filter, setFilter] = useState([
    {
      search: "",
      stars: -1, // -1 indicates show all results
    },
  ]);

  // Populate filter with platformName: boolean pairs
  useEffect(() => {
    const tempFilter = { ...filter[0] };
    reviews.forEach((review_item) => {
      if (!(review_item.platform in tempFilter)) {
        tempFilter[review_item.platform] = true;
      }
    });
    setFilter([tempFilter]);
  }, [reviews]);

  // Build review list with filter
  reviews.forEach((review) => {
    if (
      filter[0][review.platform] &&
      review.content.includes(filter[0].search) &&
      review.rating > filter[0].stars
    ) {
      rows.push(<Review review={review} alertState={alertState} />);
    }
  });

  return (
    <div className={styles.dashboard}>
      <div className={styles.searchBar}>
        <Searchbar
          reviews={reviews}
          filter={filter}
          setFilter={setFilter}
          sources={sources}
        />
      </div>
      <ol className={styles.reviewList}>
        {rows.map((review) => {
          return <li> {review} </li>;
        })}
      </ol>
    </div>
  );
}

export default ReviewList;
