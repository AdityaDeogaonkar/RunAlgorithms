import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import Logo from './Logo';

function Hero() {
  return (
    <section className="hero-section text-center">
      <div className="hero-orb" />
      <Container style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="hero-logo-wrapper"
        >
          <Logo size={72} glow />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="hero-social-proof">
            170+ problems &middot; 20 companies &middot; System design guides
          </div>
        </motion.div>

        <motion.h1
          className="hero-headline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Ship code. <br />
          Not <span className="hero-accent">leetcode anxiety.</span>
        </motion.h1>

        <motion.p
          className="hero-subtext"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          Curated DSA problems, system design deep-dives, and company-specific
          prep — everything you need to land the offer, nothing you don't.
        </motion.p>

        <motion.div
          className="d-flex justify-content-center gap-3 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Button as={Link} to="/potd" className="btn-magical d-flex align-items-center gap-2">
            Start Solving <FaArrowRight size={14} />
          </Button>
          <Button as={Link} to="/system-design" className="btn-ghost">
            System Design
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

export default Hero;
