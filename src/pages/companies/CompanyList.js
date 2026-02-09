import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBuilding, FaSearch } from 'react-icons/fa';
import { companies } from './companyData';
import SEO from '../../components/SEO';
import SectionWrapper from '../../components/SectionWrapper';
import SectionHeader from '../../components/SectionHeader';
import { useAuth } from '../../context/AuthContext';

function CompanyLogo({ company }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="company-logo-wrapper mx-auto mb-3">
        <div className="company-letter-avatar">
          {company.name.charAt(0)}
        </div>
      </div>
    );
  }

  return (
    <div className="company-logo-wrapper mx-auto mb-3">
      <img
        src={company.logo}
        alt={`${company.name} logo`}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function CompanyList() {
  const [search, setSearch] = useState('');
  const { solvedQuestions } = useAuth();

  const filtered = companies.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const getSolvedCount = (company) => {
    return company.questions.filter(
      q => solvedQuestions.includes(`${company.id}-${q.id}`)
    ).length;
  };

  return (
    <SectionWrapper section="companies">
      <Container style={{ paddingBottom: '4rem' }}>
        <SEO
          title="Company-Wise Interview Questions"
          description="Top 50 interview questions for Google, Amazon, Meta, Microsoft, and more. Crack your dream company with RunAlgorithms."
          url="/companies"
        />
        <SectionHeader
          icon={FaBuilding}
          title="Target Your Dream Job"
          subtitle="Curated lists of the most frequently asked interview questions for top tech companies."
        />

        {/* Search */}
        <div className="d-flex justify-content-center mb-4" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
            <FaSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#a1a1aa' }} />
            <input
              type="text"
              className="company-search"
              placeholder="Search companies..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: '40px' }}
            />
          </div>
        </div>

        <Row xs={1} md={2} lg={4} className="g-4" style={{ position: 'relative', zIndex: 1 }}>
          {filtered.map((company) => {
            const solved = getSolvedCount(company);
            const total = company.questions.length;
            return (
              <Col key={company.id}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link to={`/companies/${company.id}`} className="text-decoration-none">
                    <div className="company-card h-100 d-flex flex-column align-items-center text-center p-4">
                      <CompanyLogo company={company} />
                      <h3 className="h5 fw-bold mb-1" style={{ color: '#fafafa' }}>{company.name}</h3>
                      <p className="small mb-2" style={{ color: '#a1a1aa' }}>
                        {total} Questions
                      </p>
                      {solved > 0 && (
                        <span className="section-badge" style={{ fontSize: '0.7rem' }}>
                          {solved}/{total} solved
                        </span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </SectionWrapper>
  );
}

export default CompanyList;
