import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styles from './css/reviews.module.css';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { BrandContext } from './BrandingContext';

// Three inputs:
// Show - The state of the offcanvas
// handleClose - the function that will close the canvas
// review - data pertaining to the current selected review. Should be a review object (see reviewList.jsx)
function BrandingModal({ show, handleClose }) {
  // This context is the overall branding data
  // These variables are handled in app.js and BrandingContext.jsx
  const { brandImage, setBrandImage, brandName, setBrandName } = useContext(BrandContext);

  // These two states keep track of the form
  // it may be tempting have the defaults of these be brandImage and brandName from the context
  // but it doesn't work. don't try it. the results will upset you
  const [ uploadedImage, setUploadedImage ] = useState(null);
  const [ uploadedName, setUploadedName ] = useState(null);

  const handleImage = (imgData) => {
    setUploadedImage(imgData.target.value)
    console.log(uploadedImage);
  }

  const handleName = (nameData) => {
    setUploadedName(nameData.target.value)
    console.log(uploadedName);
 }

  // Save the results
  const updateBrandContext = (e) => {
    e.preventDefault(); // Stops the page from refreshing when submiting via 'enter' key
    if (!(uploadedImage == null)) {
      setBrandImage(uploadedImage);
    }
    if (!(uploadedName == null)) {
      setBrandName(uploadedName);
    }
    console.log(`business name is now: ${brandName}`)
    handleClose();
    // TODO - save results to backend DB
  }
  
  return (
    <Modal size="lg" show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header> <b>Edit your branding</b> </Modal.Header>
      <Modal.Body>
        <div>
          <img src={brandImage}/>
          <Form onSubmit={(e) => updateBrandContext(e)}>
            <Form.Group controlId="formfile">
              <Form.Label>Upload a new image file <b>(Coming Soon!)</b>: </Form.Label>
              <Form.Control type="file" value={uploadedImage} onChange={(e) => handleImage(e)} disabled/>
            </Form.Group>
            <Form.Group> 
              <Form.Label> Business Name: </Form.Label>
              <Form.Control type="text" value={uploadedName} onChange={(e) => handleName(e)}/>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose()}> 
          Cancel
        </Button>
      <Button variant="primary" type="submit" onClick={() => updateBrandContext() }>
        Submit Changes
      </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BrandingModal;
