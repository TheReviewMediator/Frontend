import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './css/reviews.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// Three inputs:
// Show - The state of the offcanvas
// handleClose - the function that will close the canvas
// review - data pertaining to the current selected review. Should be a review object (see reviewList.jsx)
function RespondModal({ show, handleClose }) {
  const [showResponse, setShowResponse] = useState(false);

  const submitForm = (formData) => {
    data = formData.get("content");
    console.log(`Submitting "${data}" to server`);
    handleClose();
  }

  return (
    <Modal size="lg" show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header> Respond to this review </Modal.Header>
      <Modal.Body>
        <form action={submitForm} autofocus placeholder="Your response here!">
          <textarea name="content" rows={4} cols={40} />
          <br />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}> 
          Cancel
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Submit Response
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RespondModal;
