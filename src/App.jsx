import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import DashboardNavbar from './components/DashboardNavbar';
import ReviewDashboard from './components/ReviewDashboard';
import InteractionsDashboard from './components/InteractionsDashboard';
import CasesDashboard from './components/CasesDashboard';
import GenerateReviewPage from './components/GenerateReviewPage.jsx';
import ReviewRequestForm from './components/ReviewRequestForm';
import Navbar from './components/Navbar'; // Optional: Add a navigation bar
import { BrandContext } from './components/BrandingContext.jsx';
import './App.css';

function App() {
  // Login stuff goes HERE!
  const { defaultBrandImage, defaultBrandName } = useContext(BrandContext);
  const [brandImage, setBrandImage] = useState(defaultBrandImage);
  const [brandName, setBrandName] = useState(defaultBrandName);

  return (
      <BrandContext.Provider value={{ brandImage, setBrandImage, brandName, setBrandName }}>
        <Router>
          <div className="App">
            {/* Optional: Add a navigation bar */}
            <Navbar />

            {/* Define routes for different components */}
            <Routes>
              <Route path="/" element={<h1>Welcome to Mediator Portal</h1>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/request-review" element={<ReviewRequestForm />} />
              <Route path="/dashboard/reviews" element={<ReviewDashboard />} />
              <Route path="/dashboard/cases" element={<CasesDashboard />} />
              <Route path="/dashboard/interactions" element={<InteractionsDashboard />} />
              <Route path="/generate-review" element={<GenerateReviewPage />} />
            </Routes>
          </div>
        </Router>
      </BrandContext.Provider>
  );
}

export default App;
