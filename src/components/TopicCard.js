import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function TopicCard({ topic }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title>{topic.title}</Card.Title>
        <Card.Text>
          {topic.description}
        </Card.Text>
        <Button as={Link} to={`/topic/${topic.id}`} variant="primary">
          Start Learning
        </Button>
      </Card.Body>
    </Card>
  );
}

export default TopicCard;
