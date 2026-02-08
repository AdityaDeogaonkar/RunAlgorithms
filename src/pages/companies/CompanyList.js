import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { companies } from './companyData';
import SEO from '../../components/SEO';

function CompanyList() {
  return (
    <Container className="my-5">
      <SEO 
        title="Company-Wise Interview Questions" 
        description="Top 50 interview questions for Google, Amazon, Meta, Microsoft, and more. Crack your dream company with RunAlgorithms."
        url="/companies"
      />

      <div className="text-center mb-5">
        <h1 className="fw-bold display-4 mb-3">
          <span className="text-gradient-purple">Target Your Dream Job</span>
        </h1>
        <p className="lead text-secondary">
          Curated lists of the most frequently asked interview questions for top tech companies.
        </p>
      </div>

      <Row xs={1} md={2} lg={4} className="g-4">
        {companies.map((company, index) => (
          <Col key={company.id}>
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to={`/companies/${company.id}`} className="text-decoration-none">
                <Card className="h-100 shadow-lg border-0 bg-dark text-light company-card overflow-hidden">
                  <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                    <div className="bg-white p-3 rounded-circle mb-3 shadow-sm" style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img 
                        src={company.logo} 
                        alt={`${company.name} logo`} 
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      />
                    </div>
                    <h3 className="h5 fw-bold mb-2 text-white">{company.name}</h3>
                    <p className="small text-secondary mb-0">
                      {company.questions.length} Top Questions
                    </p>
                  </Card.Body>
                  <div className="card-footer bg-transparent border-top border-secondary border-opacity-25 text-center p-3">
                    <span className="text-accent fw-bold small">View Questions &rarr;</span>
                  </div>
                </Card>
              </Link>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CompanyList;
