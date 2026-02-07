import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TopicCard from '../components/TopicCard';
import { topics } from '../data';

function Home() {
  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h1>Welcome to DSA Master</h1>
        <p className="lead">Master Data Structures and Algorithms with curated questions and resources.</p>
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
