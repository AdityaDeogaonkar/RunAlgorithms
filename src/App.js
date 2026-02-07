import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ReactGA from 'react-ga4';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TopicDetail from './pages/TopicDetail';
import POTDList from './pages/potd/POTDList';
import POTDDetail from './pages/potd/POTDDetail';
import CheatSheets from './pages/cheatsheets/CheatSheets';
import './App.css';

// Initialize GA4 with your Measurement ID
ReactGA.initialize('G-ND7ZLP9KYK');

// Component to track page views
const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <PageViewTracker />
        <Navigation />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/potd" element={<POTDList />} />
            <Route path="/potd/:id" element={<POTDDetail />} />
            <Route path="/cheatsheets" element={<CheatSheets />} />
            <Route path="/topic/:id" element={<TopicDetail />} />
          </Routes>
        </div>
        <footer className="bg-light text-center py-3 mt-auto">
          <Container>
            <p className="mb-0 text-muted">© {new Date().getFullYear()} RunAlgorithms. All rights reserved.</p>
          </Container>
        </footer>
      </div>
    </Router>
  );
}

export default App;