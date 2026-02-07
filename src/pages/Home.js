import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TopicCard from '../components/TopicCard';
import SEO from '../components/SEO';
import { topics } from '../data';

function Home() {
  return (
    <Container className="my-5">
      <SEO 
        title="Master Data Structures, Algorithms & System Design"
        description="RunAlgorithms is your free guide to mastering Data Structures, Algorithms, and System Design. Access curated LeetCode problems, cheatsheets, and interview prep resources."
        url="/"
      />
      <div className="text-center mb-5">
        <h1>Welcome to RunAlgorithms</h1>
        <p className="lead">Explore Data Structures and Algorithms with RunAlgorithms.</p>
        
        {/* Prominent Button for POTD */}
        <div className="mt-4">
          <Button 
            as={Link} 
            to="/potd" 
            variant="success" 
            size="lg" 
            className="shadow-lg px-4 py-2"
          >
            🔥 Solve Today's Challenge
          </Button>
        </div>
      </div>
      
      <h2 className="text-center mb-4">DSA Topics & Roadmaps</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {topics.map(topic => (
          <Col key={topic.id}>
            <TopicCard topic={topic} />
          </Col>
        ))}
      </Row>

      <div className="mt-5 text-center">
        <h2 className="mb-3">Why RunAlgorithms?</h2>
        <Row className="justify-content-center">
            <Col md={8}>
                <p className="text-muted">
                    We provide a structured path to crack technical interviews. From <strong>Array manipulation</strong> to complex <strong>System Design</strong> case studies, everything is curated for efficiency.
                </p>
            </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Home;