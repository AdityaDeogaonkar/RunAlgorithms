import React from 'react';
import { Container, Card, Badge, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { potdList } from './potdData';

function POTDList() {
  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h1>📅 POTD Archive</h1>
        <p className="lead text-muted">A collection of our daily LeetCode challenges.</p>
      </div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {potdList.map((potd) => (
          <Col key={potd.id}>
            <Card className="h-100 shadow-sm border-0 potd-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <Badge bg="secondary">{potd.date}</Badge>
                  <Badge bg={potd.difficulty === 'Easy' ? 'success' : potd.difficulty === 'Medium' ? 'warning' : 'danger'}>
                    {potd.difficulty}
                  </Badge>
                </div>
                <Card.Title className="mt-3 mb-3 text-primary fw-bold">
                  {potd.title}
                </Card.Title>
                <Card.Text className="text-muted small">
                  {potd.problemStatement.slice(0, 100)}...
                </Card.Text>
                <Button 
                  as={Link} 
                  to={`/potd/${potd.id}`} 
                  variant="outline-primary" 
                  className="w-100 mt-2"
                >
                  View Solution ↗
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default POTDList;
