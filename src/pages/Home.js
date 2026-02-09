import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import TopicCard from '../components/TopicCard';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import BentoGrid from '../components/BentoGrid';
import { topics } from '../data';

function Home() {
  return (
    <>
      <SEO
        title="Master Data Structures, Algorithms & System Design"
        description="RunAlgorithms is your free guide to mastering Data Structures, Algorithms, and System Design."
        url="/"
      />

      <Hero />

      <Container className="pb-5">
        <StatsBar />

        {/* Bento Section Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="d-flex align-items-center justify-content-between mb-2 mt-4">
            <h2 className="fw-bold m-0" style={{ letterSpacing: '-0.5px' }}>Explore Everything</h2>
          </div>
          <BentoGrid />
        </motion.div>

        {/* DSA Topic Grid */}
        <div data-section="dsa">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="d-flex align-items-center justify-content-between mb-4 mt-5">
              <h2 className="section-heading m-0">DSA Roadmaps</h2>
              <Link to="/cheatsheets" className="btn-section" style={{ fontSize: '0.85rem' }}>
                View Cheat Sheets &rarr;
              </Link>
            </div>

            <Row xs={1} md={2} lg={3} className="g-4">
              {topics.map((topic) => (
                <Col key={topic.id}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Link to={`/topic/${topic.id}`} className="text-decoration-none">
                      <TopicCard topic={topic} />
                    </Link>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </div>

      </Container>
    </>
  );
}

export default Home;
