import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ReactGA from 'react-ga4';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TopicDetail from './pages/TopicDetail';
import POTDList from './pages/potd/POTDList';
import POTDDetail from './pages/potd/POTDDetail';
import CheatSheets from './pages/cheatsheets/CheatSheets';
import SystemDesignList from './pages/system-design/SystemDesignList';
import SystemDesignArticle from './pages/system-design/SystemDesignArticle';
import CompanyList from './pages/companies/CompanyList';
import CompanyDetail from './pages/companies/CompanyDetail';
import Logo from './components/Logo';
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
    <ThemeProvider>
    <AuthProvider>
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
              <Route path="/system-design" element={<SystemDesignList />} />
              <Route path="/system-design/:articleId" element={<SystemDesignArticle />} />
              <Route path="/companies" element={<CompanyList />} />
              <Route path="/companies/:id" element={<CompanyDetail />} />
              <Route path="/topic/:id" element={<TopicDetail />} />
            </Routes>
          </div>
          <footer className="footer-magical text-center py-4 mt-auto">
            <Container>
              <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                <Logo size={22} />
                <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem' }}>RunAlgorithms</span>
              </div>
              <p className="mb-0 text-secondary" style={{ fontSize: '0.85rem' }}>© {new Date().getFullYear()} RunAlgorithms. All rights reserved.</p>
            </Container>
          </footer>
        </div>
      </Router>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;