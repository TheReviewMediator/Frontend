import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styles from "./css/reviews.module.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import QRCode from "react-qr-code";

// Three inputs:
// Show - The state of the offcanvas
// handleClose - the function that will close the canvas
// review - data pertaining to the current selected review. Should be a review object (see reviewList.jsx)
function GenerateReviewModal({ show, handleClose, sources }) {
  const [linkQRCode, setLinkQRCode] = useState(
    <QRCode value={"TODO! HEHE:)"} />
  );
  const [url, setUrl] = useState(sources[0]); // default URL is currently arbitrary

  const updateUrl = (source) => {
    // TODO - put review URL logic here
    console.log(`got the source: ${source.target.value}`);
    setUrl(source.target.value); // temp - url is just the platform name
    setLinkQRCode(<QRCode value={source.target.value} />);
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      backdrop="static"
      centered
    >
      <Modal.Header>
        {" "}
        <b>Generate Your Review</b>{" "}
      </Modal.Header>
      <Modal.Body>
        <div>
          <Form onSubmit={(e) => updateBrandContext(e)} value={url}>
            <div> Choose a platform: </div>
            <Form.Select onChange={updateUrl}>
              {sources.map((source) => {
                return <option value={source}> {source} </option>;
              })}
            </Form.Select>
          </Form>
          <Container>
            <Row>
              <Col> {url} </Col>
            </Row>
          </Container>
        </div>
        <div>{linkQRCode}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={() => updateBrandContext()}
        >
          Submit Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GenerateReviewModal;
