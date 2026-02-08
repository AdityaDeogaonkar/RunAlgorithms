import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaRocket } from 'react-icons/fa';

function Hero() {
  return (
    <section className="hero-section text-center">
      <div className="hero-glow"></div>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill border border-secondary mb-4" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <span className="badge bg-primary rounded-pill">New</span>
            <span className="text-secondary small">System Design Guide is live!</span>
          </div>
          
          <h1 className="display-3 fw-bold mb-4" style={{ letterSpacing: '-2px', lineHeight: '1.1' }}>
            Master the Art of <br />
            <span style={{ 
              background: 'linear-gradient(to right, #60a5fa, #a855f7, #ec4899)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}>
              Algorithms & Systems
            </span>
          </h1>
          
          <p className="lead text-secondary mb-5 mx-auto" style={{ maxWidth: '600px' }}>
            The definitive platform for cracking technical interviews. 
            Curated DSA problems, architectural patterns, and daily coding challenges.
          </p>

          <div className="d-flex justify-content-center gap-3">
            <Button as={Link} to="/potd" className="btn-magical d-flex align-items-center gap-2">
              <FaRocket /> Start Solving
            </Button>
            <Button as={Link} to="/cheatsheets" variant="outline-light" className="rounded-pill px-4 fw-bold" style={{ borderWidth: '2px' }}>
              View Cheat Sheets
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default Hero;
