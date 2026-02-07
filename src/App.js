import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import TopicDetail from './pages/TopicDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        <Navigation />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/topic/:id" element={<TopicDetail />} />
          </Routes>
        </div>
        <footer className="bg-light text-center py-3 mt-auto">
          <Container>
            <p className="mb-0 text-muted">© {new Date().getFullYear()} DSA Master. All rights reserved.</p>
          </Container>
        </footer>
      </div>
    </Router>
  );
}

export default App;