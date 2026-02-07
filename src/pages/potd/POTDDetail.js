import React from 'react';
import { Container, Card, Badge, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { potdList } from './potdData';

function POTDDetail() {
  const { id } = useParams();
  const potd = potdList.find((item) => item.id === parseInt(id));

  if (!potd) {
    return (
      <Container className="my-5 text-center">
        <h2>Problem Not Found!</h2>
        <Button as={Link} to="/potd" variant="primary">Back to POTD List</Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Button as={Link} to="/potd" variant="outline-secondary" className="mb-4">
        &larr; Back to List
      </Button>

      <Card className="shadow-lg border-0 mb-5 potd-detail-card">
        <Card.Body className="p-4 p-md-5">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <h1 className="mb-0 text-primary display-4 fw-bold">{potd.title}</h1>
            <Badge bg={potd.difficulty === 'Easy' ? 'success' : potd.difficulty === 'Medium' ? 'warning' : 'danger'} className="fs-5 mt-2 mt-md-0 px-3 py-2">
              {potd.difficulty}
            </Badge>
          </div>
          
          <h5 className="text-muted mb-4">{potd.date}</h5>
          
          <div className="mb-4 bg-light p-4 rounded-3 border">
            <h4 className="fw-bold mb-3">Problem Statement</h4>
            <p className="lead fs-6" style={{ whiteSpace: 'pre-wrap' }}>{potd.problemStatement.trim()}</p>
            <Button variant="outline-primary" href={potd.link} target="_blank" size="sm" className="mt-2">
              Solve on LeetCode ↗
            </Button>
          </div>

          <hr className="my-5" />

          <h2 className="mb-4">💡 Approach & Explanation</h2>
          <div className="markdown-content lead fs-6">
            <ReactMarkdown>{potd.approach}</ReactMarkdown>
          </div>

          <h2 className="mt-5 mb-4">💻 C++ Solution</h2>
          <div className="bg-dark text-white p-4 rounded-3 position-relative shadow-sm" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <pre className="mb-0">
              <code className="language-cpp">
{potd.code.trim()}
              </code>
            </pre>
          </div>

        </Card.Body>
      </Card>
    </Container>
  );
}

export default POTDDetail;
