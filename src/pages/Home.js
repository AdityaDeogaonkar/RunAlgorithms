import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCode, FaLaptopCode, FaProjectDiagram, FaRandom, FaRegLightbulb, FaTree } from 'react-icons/fa';
import TopicCard from '../components/TopicCard';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import { topics } from '../data';

// Map icons to topics for visual flair
const getIconForTopic = (id) => {
  switch(id) {
    case 'arrays': return <FaCode className="card-icon icon-blue" />;
    case 'graphs': return <FaProjectDiagram className="card-icon icon-purple" />;
    case 'trees': return <FaTree className="card-icon icon-teal" />;
    case 'dynamic-programming': return <FaRegLightbulb className="card-icon icon-purple" />;
    default: return <FaLaptopCode className="card-icon icon-blue" />;
  }
};

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
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="d-flex align-items-center justify-content-between mb-4 mt-5">
            <h2 className="fw-bold m-0">Explore Roadmaps</h2>
            <Link to="/cheatsheets" className="text-decoration-none text-info fw-bold">View All &rarr;</Link>
          </div>

          <Row xs={1} md={2} lg={3} className="g-4">
            {topics.map((topic, index) => (
              <Col key={topic.id}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link to={`/topic/${topic.id}`} className="text-decoration-none">
                    <div className="bento-card h-100">
                      {getIconForTopic(topic.id)}
                      <h3 className="card-title">{topic.title}</h3>
                      <p className="card-desc">
                        {topic.description.length > 80 ? topic.description.substring(0, 80) + '...' : topic.description}
                      </p>
                      <div className="d-flex align-items-center gap-2 mt-3">
                        <span className="badge bg-secondary bg-opacity-25 text-light border border-secondary border-opacity-25">
                          {topic.questions.length} Problems
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Why Us Section */}
        <div className="mt-5 py-5 border-top border-secondary border-opacity-25">
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h2 className="mb-4 fw-bold">Why RunAlgorithms?</h2>
              <p className="lead text-secondary">
                We strip away the noise. No paywalls, no clutter. Just the 
                <span className="text-info fw-bold"> highest quality </span> 
                patterns and system designs you need to land your dream job.
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default Home;