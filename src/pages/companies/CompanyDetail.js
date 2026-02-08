import React from 'react';
import { Container, Table, Badge, Button, Card, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { companies } from './companyData';
import SEO from '../../components/SEO';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import ProgressToggle from '../../components/ProgressToggle';

function CompanyDetail() {
  const { id } = useParams();
  const company = companies.find(c => c.id === id);

  if (!company) {
    return (
      <Container className="my-5 text-center">
        <h2>Company Not Found</h2>
        <Button as={Link} to="/companies" variant="primary">Back to List</Button>
      </Container>
    );
  }

  const getDifficultyBadge = (difficulty) => {
    let bg = 'secondary';
    if (difficulty === 'Easy') bg = 'success';
    if (difficulty === 'Medium') bg = 'warning';
    if (difficulty === 'Hard') bg = 'danger';
    
    return <Badge bg={bg}>{difficulty}</Badge>;
  };

  return (
    <Container className="my-5">
      <SEO 
        title={`${company.name} Interview Questions`} 
        description={`Top 50 most asked coding interview questions at ${company.name}. Practice now to crack the interview.`}
        url={`/companies/${company.id}`}
      />

      <Button as={Link} to="/companies" variant="outline-secondary" className="mb-4 d-inline-flex align-items-center gap-2">
        <FaArrowLeft /> Back to Companies
      </Button>

      <Card className="border-0 shadow-lg bg-dark text-light mb-5 overflow-hidden">
        <div className="bg-gradient-primary-dark p-5 text-center position-relative">
          <div className="bg-white p-3 rounded-circle shadow-lg mx-auto mb-4" style={{ width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src={company.logo} 
              alt={`${company.name} logo`} 
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          </div>
          <h1 className="display-4 fw-bold mb-2">{company.name} Interview Prep</h1>
          <p className="lead text-white-50">{company.description}</p>
        </div>

        <Card.Body className="p-0">
          <Table hover responsive variant="dark" className="mb-0 align-middle">
            <thead className="bg-black text-white text-uppercase small letter-spacing-1">
              <tr>
                <th className="p-4 border-bottom border-secondary">Status</th>
                <th className="p-4 border-bottom border-secondary">#</th>
                <th className="p-4 border-bottom border-secondary">Question</th>
                <th className="p-4 border-bottom border-secondary">Difficulty</th>
                <th className="p-4 border-bottom border-secondary text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {company.questions.map((q, index) => (
                <tr key={q.id}>
                  <td className="p-4 border-bottom border-secondary text-center">
                    <ProgressToggle questionId={`${company.id}-${q.id}`} />
                  </td>
                  <td className="p-4 border-bottom border-secondary text-secondary">{index + 1}</td>
                  <td className="p-4 border-bottom border-secondary fw-bold text-light">
                    {q.title}
                  </td>
                  <td className="p-4 border-bottom border-secondary">
                    {getDifficultyBadge(q.difficulty)}
                  </td>
                  <td className="p-4 border-bottom border-secondary text-end">
                    <Button 
                      href={q.link} 
                      target="_blank" 
                      variant="primary" 
                      size="sm" 
                      className="d-inline-flex align-items-center gap-2 rounded-pill px-3"
                    >
                      Solve <FaExternalLinkAlt size={12} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CompanyDetail;
