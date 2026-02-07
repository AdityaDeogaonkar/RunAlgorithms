import React from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { systemDesignTopics } from './systemDesignData';

function SystemDesign() {
  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h1>🏗️ System Design</h1>
        <p className="lead text-muted">Master the art of designing scalable, reliable, and efficient systems.</p>
      </div>

      {systemDesignTopics.map((topic, index) => (
        <div key={index} className="mb-5">
          <h2 className="mb-4 border-bottom pb-2 text-primary">{topic.title}</h2>
          <p className="lead mb-4 text-secondary">{topic.description}</p>
          
          <Row xs={1} md={1} lg={1} className="g-4">
            <Col>
              <Accordion defaultActiveKey="0">
                {topic.items.map((item, idx) => (
                  <Accordion.Item eventKey={idx.toString()} key={idx}>
                    <Accordion.Header>
                      <strong className="me-2">{item.title}</strong>
                      <span className="text-muted small"> - {item.description}</span>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="markdown-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.content}</ReactMarkdown>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>
        </div>
      ))}
    </Container>
  );
}

export default SystemDesign;
