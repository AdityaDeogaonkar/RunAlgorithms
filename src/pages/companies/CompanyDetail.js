import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { companies } from './companyData';
import SEO from '../../components/SEO';
import SectionWrapper from '../../components/SectionWrapper';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import ProgressToggle from '../../components/ProgressToggle';

function CompanyLogo({ company, size = 90 }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="company-logo-wrapper mx-auto mb-3"
        style={{ width: size, height: size, borderRadius: 16 }}
      >
        <div className="company-letter-avatar" style={{ fontSize: size * 0.35 }}>
          {company.name.charAt(0)}
        </div>
      </div>
    );
  }

  return (
    <div
      className="company-logo-wrapper mx-auto mb-3"
      style={{ width: size, height: size, borderRadius: 16 }}
    >
      <img
        src={company.logo}
        alt={`${company.name} logo`}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function CompanyDetail() {
  const { id } = useParams();
  const company = companies.find(c => c.id === id);

  if (!company) {
    return (
      <SectionWrapper section="companies">
        <Container className="text-center py-5">
          <h2>Company Not Found</h2>
          <Button as={Link} to="/companies" variant="outline-light">Back to List</Button>
        </Container>
      </SectionWrapper>
    );
  }

  const getDifficultyClass = (difficulty) => {
    if (difficulty === 'Easy') return 'section-badge-easy';
    if (difficulty === 'Medium') return 'section-badge-medium';
    if (difficulty === 'Hard') return 'section-badge-hard';
    return 'section-badge';
  };

  return (
    <SectionWrapper section="companies">
      <Container style={{ paddingBottom: '4rem' }}>
        <SEO
          title={`${company.name} Interview Questions`}
          description={`Top 50 most asked coding interview questions at ${company.name}. Practice now to crack the interview.`}
          url={`/companies/${company.id}`}
        />

        <div style={{ paddingTop: '2rem', position: 'relative', zIndex: 1 }}>
          <Link to="/companies" className="btn-section mb-4 d-inline-flex" style={{ fontSize: '0.85rem' }}>
            <FaArrowLeft size={12} /> Back to Companies
          </Link>

          {/* Banner */}
          <div className="company-banner" style={{ borderRadius: '16px 16px 0 0', marginBottom: 0 }}>
            <CompanyLogo company={company} size={90} />
            <h1 className="fw-bold mb-2" style={{ fontSize: '2rem' }}>{company.name} Interview Prep</h1>
            <p style={{ color: '#a1a1aa' }}>{company.description}</p>
            <span className="section-badge">{company.questions.length} Questions</span>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto', background: 'var(--bg-card)', borderRadius: '0 0 16px 16px', border: '1px solid var(--border-subtle)', borderTop: 'none' }}>
            <table className="section-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>Status</th>
                  <th style={{ width: '50px' }}>#</th>
                  <th>Question</th>
                  <th style={{ width: '110px' }}>Difficulty</th>
                  <th style={{ width: '90px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {company.questions.map((q, index) => (
                  <tr key={q.id}>
                    <td className="text-center align-middle">
                      <ProgressToggle questionId={`${company.id}-${q.id}`} />
                    </td>
                    <td style={{ color: '#52525b' }}>{index + 1}</td>
                    <td style={{ fontWeight: 500, color: '#fafafa' }}>{q.title}</td>
                    <td>
                      <span className={`section-badge ${getDifficultyClass(q.difficulty)}`}>
                        {q.difficulty}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <a
                        href={q.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-section"
                        style={{ fontSize: '0.8rem', padding: '4px 12px' }}
                      >
                        Solve <FaExternalLinkAlt size={10} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

export default CompanyDetail;
