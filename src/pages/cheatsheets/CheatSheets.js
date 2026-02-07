import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SEO from '../../components/SEO';
import { cheatSheets } from './cheatSheetData';

function CheatSheets() {
  return (
    <Container className="my-5">
      <SEO 
        title="DSA Cheat Sheets" 
        description="Comprehensive Data Structures and Algorithms Cheat Sheets. Time Complexity, Graph Templates, Sliding Window, and more."
        url="/cheatsheets"
      />
      <div className="text-center mb-5">
        <h1>📚 DSA Cheat Sheets</h1>
        <p className="lead text-muted">Essential templates, patterns, and complexity charts for quick revision.</p>
      </div>

      <Row xs={1} md={1} lg={1} className="g-4">
        {cheatSheets.map((sheet) => (
          <Col key={sheet.id}>
            <Card className="h-100 shadow-sm border-0 cheat-sheet-card">
              <Card.Header className="bg-primary text-white py-3">
                <h5 className="mb-0 fw-bold">{sheet.title}</h5>
              </Card.Header>
              <Card.Body className="p-4 bg-light">
                <p className="text-muted mb-3">{sheet.description}</p>
                <div className="markdown-content cheat-sheet-content bg-white p-3 rounded border">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{sheet.content}</ReactMarkdown>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CheatSheets;
