import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Table, Badge, Button } from 'react-bootstrap';
import SEO from '../components/SEO';
import { topics } from '../data';
import ProgressToggle from '../components/ProgressToggle';

function TopicDetail() {
  const { id } = useParams();
  const topic = topics.find(t => t.id === id);

  if (!topic) {
    return (
      <Container className="text-center my-5">
        <SEO title="Topic Not Found" />
        <h2>Topic not found</h2>
        <Button as={Link} to="/" variant="primary">Go Home</Button>
      </Container>
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'success';
      case 'medium': return 'warning';
      case 'hard': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <Container className="my-5">
      <SEO 
        title={`${topic.title} Problems`} 
        description={`Master ${topic.title} with curated LeetCode problems, detailed solutions, and key insights.`}
        url={`/topic/${topic.id}`}
      />
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h1>{topic.title}</h1>
        <Button as={Link} to="/" variant="outline-primary">Back to Topics</Button>
      </div>
      <p className="lead">{topic.description}</p>
      
      <Table hover responsive className="mt-4 shadow-sm">
        <thead className="bg-light">
          <tr>
            <th>Status</th>
            <th>#</th>
            <th>Problem</th>
            <th>Difficulty</th>
            <th>Platform</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {topic.questions.map((q, index) => (
            <tr key={q.id}>
              <td className="text-center align-middle">
                <ProgressToggle questionId={`${topic.id}-${q.id}`} />
              </td>
              <td>{index + 1}</td>
              <td>{q.title}</td>
              <td>
                <Badge bg={getDifficultyColor(q.difficulty)}>
                  {q.difficulty}
                </Badge>
              </td>
              <td>{q.platform}</td>
              <td>
                <Button 
                  href={q.link} 
                  target="_blank" 
                  variant="primary" 
                  size="sm"
                >
                  Solve
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default TopicDetail;
