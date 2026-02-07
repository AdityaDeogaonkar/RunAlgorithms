import React from 'react';
import { Container, Card, Badge, Button } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { potdList } from './potdData';

function POTD() {
  const today = potdList[0];

  if (!today) {
    return (
      <Container className="my-5 text-center">
        <h2>No Problem of the Day yet!</h2>
        <p>Check back tomorrow for the latest challenge.</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h1>🚀 LeetCode Problem of the Day</h1>
        <p className="lead text-muted">Daily dose of coding challenges with detailed explanations.</p>
      </div>

      <Card className="shadow-lg border-0 mb-5">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <h2 className="mb-0 text-primary">{today.title}</h2>
            <Badge bg={today.difficulty === 'Easy' ? 'success' : today.difficulty === 'Medium' ? 'warning' : 'danger'} className="fs-6 mt-2 mt-md-0">
              {today.difficulty}
            </Badge>
          </div>
          
          <h5 className="text-muted mb-4">{today.date}</h5>
          
          <div className="mb-4 bg-light p-3 rounded">
            <strong>Problem Statement:</strong>
            <p className="mt-2" style={{ whiteSpace: 'pre-wrap' }}>{today.problemStatement.trim()}</p>
            <Button variant="outline-primary" href={today.link} target="_blank" size="sm" className="mt-2">
              View on LeetCode ↗
            </Button>
          </div>

          <hr />

          <h3 className="mt-4 mb-3">💡 Approach & Explanation</h3>
          <div className="markdown-content">
            <ReactMarkdown>{today.approach}</ReactMarkdown>
          </div>

          <h3 className="mt-5 mb-3">💻 C++ Solution</h3>
          <div className="bg-dark text-white p-3 rounded position-relative" style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <pre className="mb-0">
              <code className="language-cpp">
{today.code.trim()}
              </code>
            </pre>
          </div>

        </Card.Body>
      </Card>
    </Container>
  );
}

export default POTD;