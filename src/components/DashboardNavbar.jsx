import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import axios from 'axios';
import styles from './css/navBar.module.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import ConnectOffcanvas from './ConnectOffcanvas';
import ReviewDashboard from './ReviewDashboard';

// The actual web page
const DashboardNavbar = ({ activeLink }) => {
  const [showConnections, setShowConnections] = useState(false);

  return (
    <div>
      <Navbar className={styles.navBar}>
        <Navbar.Brand> BRAND GOES HERE </Navbar.Brand>
        <Nav className="me-auto" activeKey={activeLink}>
          <Nav.Link href="/dashboard/reviews">Reviews</Nav.Link>
          <Nav.Link href="/dashboard/cases">Cases</Nav.Link>
          <Nav.Link href="/dashboard/interactions">Interactions</Nav.Link>
        </Nav>
        <Nav variant="pills">
          <Nav.Link href="/generate-review" className={styles.actionButtons}> Generate Review Requests </Nav.Link>
          <Nav.Link onClick={() => setShowConnections(true)} className={styles.actionButtons}> Connect To Platforms </Nav.Link>
        </Nav>
        <Navbar.Text> User: <b> USER_NAME </b> </Navbar.Text>
      </Navbar>
      <ConnectOffcanvas show={showConnections} handleClose={() => setShowConnections(false)}/>    
    </div>
  );
};

export default DashboardNavbar;
