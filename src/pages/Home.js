import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TopicCard from '../components/TopicCard';
import { topics } from '../data';

function Home() {
  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h1>Welcome to RunAlgorithms</h1>
        <p className="lead">Master Data Structures and Algorithms with our curated magical journey.</p>
        
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
      
      <Row xs={1} md={2} lg={3} className="g-4">
        {topics.map(topic => (
          <Col key={topic.id}>
            <TopicCard topic={topic} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;