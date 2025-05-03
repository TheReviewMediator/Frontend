import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./css/reviews.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// You know, when I was creating this frontend, I thought I was doing a good job organizing things.
// but I didn't realize the spaghetti monster will not make itself known until it is too late....

// Three inputs:
// Show - The state of the offcanvas
// handleClose - the function that will close the canvas
// review - data pertaining to the current selected review. Should be a review object (see reviewList.jsx)
function RespondModal({ show, handleClose, review }) {
  const [showResponse, setShowResponse] = useState(false);
  const [reply, setReply] = useState("");

  // API calls
  const submitForm = async () => {
    console.log(review.review_ID);
    console.log(reply);
    try {
      const response = await axios({
        method: "post",
        url: process.env.BACKEND_URI + "/api/interactions/respond",
        headers: localStorage.getItem('auth_headers'),
        data: {
          reviewId: review.review_ID,
          responseText: reply,
        },
      });
      console.log(response);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      backdrop="static"
      centered
    >
      <Modal.Header> Respond to this review </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label> Upload your reply: </Form.Label>
          <Form.Control
            required
            as="textarea"
            type="text"
            placeholder=""
            onChange={(e) => setReply(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={submitForm}>
          Submit Response
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RespondModal;
