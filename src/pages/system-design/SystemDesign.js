import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Tab, Card } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';
import { motion } from 'framer-motion';
import { FaServer, FaBuilding, FaMicrochip } from 'react-icons/fa';
import SEO from '../../components/SEO';
import { systemDesignTopics } from './systemDesignData';

// Mermaid Component
const MermaidChart = ({ chart }) => {
  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true, 
      theme: 'dark',
      securityLevel: 'loose',
    });
    mermaid.contentLoaded();
  }, [chart]);

  return <div className="mermaid d-flex justify-content-center bg-dark p-3 rounded border border-secondary">{chart}</div>;
};

function SystemDesign() {
  const [activeTab, setActiveTab] = useState('concepts');

  return (
    <Container className="my-5">
      <SEO 
        title="System Design Architect Guide" 
        description="Master scalable system design with interactive diagrams. CAP Theorem, Load Balancing, TinyURL, and WhatsApp architecture."
        url="/system-design"
      />

      <div className="text-center mb-5">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="fw-bold display-4 mb-3">
            <FaServer className="text-primary me-3" />
            System Design Architect
          </h1>
          <p className="lead text-secondary">
            Visualize and master the architecture of large-scale distributed systems.
          </p>
        </motion.div>
      </div>

      <Tab.Container id="system-design-tabs" defaultActiveKey="concepts" onSelect={(k) => setActiveTab(k)}>
        <Nav variant="pills" className="justify-content-center mb-5 gap-3">
          <Nav.Item>
            <Nav.Link eventKey="concepts" className="px-4 py-2 fw-bold d-flex align-items-center gap-2">
              <FaMicrochip /> Core Concepts
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="case-studies" className="px-4 py-2 fw-bold d-flex align-items-center gap-2">
              <FaBuilding /> Case Studies
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          {systemDesignTopics.map((topic) => (
            <Tab.Pane eventKey={topic.id} key={topic.id}>
              <Row xs={1} md={1} lg={1} className="g-5">
                {topic.items.map((item, idx) => (
                  <Col key={idx}>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="shadow-lg border-0 bg-dark text-light overflow-hidden">
                        <Card.Header className="bg-gradient-primary-dark p-4 border-bottom border-secondary">
                          <h2 className="mb-0 fw-bold text-white">{item.title}</h2>
                          <p className="text-white-50 mb-0 mt-1">{item.description}</p>
                        </Card.Header>
                        <Card.Body className="p-0">
                          <Row className="g-0">
                            {/* Diagram Column (Desktop: Left, Mobile: Top) */}
                            {item.diagram && (
                              <Col lg={5} className="bg-black d-flex align-items-center justify-content-center p-4 border-end border-secondary">
                                <MermaidChart chart={item.diagram} />
                              </Col>
                            )}
                            
                            {/* Content Column */}
                            <Col lg={item.diagram ? 7 : 12} className="p-4 p-md-5">
                              <div className="markdown-content system-design-content">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.content}</ReactMarkdown>
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
}

export default SystemDesign;