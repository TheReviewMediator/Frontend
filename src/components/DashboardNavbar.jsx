import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styles from './css/navBar.module.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ConnectOffcanvas from './ConnectOffcanvas';
import { BrandContext } from './BrandingContext';
import BrandingModal from './BrandingModal';
import GenerateReviewModal from './GenerateReviewModal';

// The actual web page
const DashboardNavbar = ({ activeLink, sources }) => {
  const { brandImage, setBrandImage, brandName, setBrandName } = useContext(BrandContext);
  const [showConnections, setShowConnections] = useState(false);
  const [showBrandingModal, setShowBrandingModal] = useState(false);
  const [showGenReviewModal, setShowGenReviewModal] = useState(false);

  return (
    <div>
      <Navbar className={styles.navBar}>
        <Navbar.Brand
          style={{ cursor: 'pointer' }}
          onClick={() => setShowBrandingModal(true)}>
          <img
            src={brandImage}
            height={64}
            width={64}
          />
          {brandName}
        </Navbar.Brand>
        <Nav className="me-auto" activeKey={activeLink}>
          <Nav.Link href="/dashboard/reviews">Reviews</Nav.Link>
          <Nav.Link href="/dashboard/cases">Cases</Nav.Link>
          <Nav.Link href="/dashboard/interactions">Interactions</Nav.Link>
        </Nav>
        <Nav variant="pills">
          <Nav.Link onClick={() => setShowGenReviewModal(true)} className={styles.actionButtons}> Generate Review Requests </Nav.Link>
          <Nav.Link onClick={() => setShowConnections(true)} className={styles.actionButtons}> Connect To Platforms </Nav.Link>
        </Nav>
      </Navbar>
      <ConnectOffcanvas class="offcanvas offcanvas-start w-400 show" show={showConnections} handleClose={() => setShowConnections(false)} />
      <GenerateReviewModal sources={sources} show={showGenReviewModal} handleClose={() => setShowGenReviewModal(false)}> </GenerateReviewModal>
      <BrandingModal show={showBrandingModal} handleClose={() => setShowBrandingModal(false)} />
    </div>
  );
};

export default DashboardNavbar;
