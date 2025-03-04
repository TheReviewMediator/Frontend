import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import axios from 'axios';
import styles from './css/reviews.module.css';
import ReviewDashboard from './ReviewDashboard';
import Nav from 'react-bootstrap/Nav';

// The actual web page
const DashboardNavbar = ({ activeLink }) => {
  return (
    <Nav variant='tabs' activeKey={activeLink}>
      <Nav.Item>
        <Nav.Link href="/dashboard/reviews">Reviews</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/cases">Cases</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/interactions">Interactions</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default DashboardNavbar;
