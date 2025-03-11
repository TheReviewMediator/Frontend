import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import axios from 'axios';
import styles from './css/reviews.module.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';



// The form you fill out for a request
function ConnectionCards({ platform }) {
  // These states mock a connection to Google, Yelp, etc. The actual implementation will probably use a Context.
  const [googleConnected, setGoogleConnected] = useState(false);
  const [yelpConnected, setYelpConnected] = useState(false);
  const [facebookConnected, setFacebookConnected] = useState(false);

  // TODO - replace these functions with real stuff
  const googleFunction = () => {setGoogleConnected(true)};
  const yelpFunction = () => {setYelpConnected(true)};
  const facebookFunction = () => {setFacebookConnected(true)};

  // The cards that will be displayed in the connection form
  // Format: {name, func, connected}
  // PlatformFunction may just be a redirect - but that's a problem for the API boys
  var cards = [];
  cards.push({name: "Google", func: googleFunction, isConnected: googleConnected});
  cards.push({name: "Yelp", func: yelpFunction, isConnected: yelpConnected});
  cards.push({name: "Facebook", func: facebookFunction, isConnected: facebookConnected});

  
  return (
    <div>
      {cards.map((platform) => (
        <Card>
          <Card.Header> {platform.name} </Card.Header>
          <Card.Body>
            {platform.isConnected ? 
            <Button disabled> Connected! </Button> :
            <Button onClick={platform.func}> Connect </Button> 
            }
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
        <ConnectionCards/>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ConnectOffcanvas;
