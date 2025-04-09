import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import axios from 'axios';
import styles from './css/reviews.module.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// The form you fill out for a request
function ConnectionCards({ platform }) {
  // These states mock a connection to Google, Yelp, etc. The actual implementation will probably use a Context.
  // These states are also forgotten when we close out of the offcanvas. We will definitely use Context for these.
  const [googleConnected, setGoogleConnected] = useState(false);
  const [yelpConnected, setYelpConnected] = useState(false);
  const [facebookConnected, setFacebookConnected] = useState(false);
  const [trustpilotConnected, setTrustpilotConnected] = useState(false);

  // Keeps track of the form
  const [googleId, setGoogleId] = useState('');
  const [yelpId, setYelpId] = useState('');
  const [facebookId, setFacebookId] = useState();
  const [trustpilotId, setTrustpilotId] = useState();

  // API calls
  const googleFunction = async () => {
    try {
      const response = await axios.get(process.env.BACKEND_URI + `/api/reviews/google/${googleId}`);
      console.log(response)
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }
  const yelpFunction = async () => {
    try {
      const response = await axios.get(process.env.BACKEND_URI + `/api/reviews/yelp/${yelpId}`);
      console.log(response)
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }
  const facebookFunction = async () => {
    try {
      const response = await axios.get(process.env.BACKEND_URI + `/api/reviews/facebook/${facebookId}`);
      console.log(response)
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }
  const trustpilotFunction = async () => {
    try {
      const response = await axios.get(process.env.BACKEND_URI + `/api/reviews/trustpilot/${trustpilotId}`);
      console.log(response)
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }

  // Update form responses
  const updateGoogle = (e) => {
    setGoogleId(e.target.value);
  }
  const updateYelp = (e) => {
    setYelpId(e.target.value);
  }
  const updateFacebook = (e) => {
    setFacebookId(e.target.value);
  }
  const updateTrustpilot = (e) => {
    setTrustpilotId(e.target.value);
  }

  // The cards that will be displayed in the connection form
  // Format: {name, func, connected}
  // PlatformFunction may just be a redirect - but that's a problem for the API boys
  var cards = [];
  cards.push({ name: "Google", func: googleFunction, updateFunc: updateGoogle, isConnected: googleConnected });
  cards.push({ name: "Yelp", func: yelpFunction, updateFunc: updateYelp, isConnected: yelpConnected });
  cards.push({ name: "Facebook", func: facebookFunction, updateFunc: updateFacebook, isConnected: facebookConnected });
  cards.push({ name: "Trustpilot", func: trustpilotFunction, updateFunc: updateTrustpilot, isConnected: facebookConnected });

  return (
    <div>
      {cards.map((platform) => (
        <Card>
          <Card.Header> {platform.name} </Card.Header>
          <Card.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Control
                      required
                      type="text"
                      placeholder="Business ID"
                      onChange={e => platform.updateFunc(e)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button type="submit" onClick={() => platform.func}>Submit</Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      ))}
    </div>
  )
};

// Three inputs:
// Show - The state of the offcanvas
// handleClose - the function that will close the canvas
// review - data pertaining to the current selected review. Should be a review object (see reviewList.jsx)
function ConnectOffcanvas({ show, handleClose }) {
  return (
    <Offcanvas placement={'end'} show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title> Connections </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ConnectionCards />
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ConnectOffcanvas;
