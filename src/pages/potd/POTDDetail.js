import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { FaArrowLeft } from 'react-icons/fa';
import SEO from '../../components/SEO';
import SectionWrapper from '../../components/SectionWrapper';
import { potdList } from './potdData';

function POTDDetail() {
  const { id } = useParams();
  const potd = potdList.find((item) => item.id === parseInt(id));

  if (!potd) {
    return (
      <SectionWrapper section="potd">
        <Container className="text-center py-5">
          <SEO title="Problem Not Found" />
          <h2>Problem Not Found!</h2>
          <Button as={Link} to="/potd" variant="outline-light">Back to POTD List</Button>
        </Container>
      </SectionWrapper>
    );
  }

  const getDifficultyClass = (d) => {
    if (d === 'Easy') return 'section-badge-easy';
    if (d === 'Medium') return 'section-badge-medium';
    if (d === 'Hard') return 'section-badge-hard';
    return 'section-badge';
  };

  return (
    <SectionWrapper section="potd">
      <Container style={{ paddingBottom: '4rem' }}>
        <SEO
          title={`${potd.title} - POTD Solution`}
          description={`Detailed solution and explanation for LeetCode Problem: ${potd.title}. Difficulty: ${potd.difficulty}.`}
          url={`/potd/${potd.id}`}
        />

        <div style={{ paddingTop: '2rem', position: 'relative', zIndex: 1 }}>
          <Link to="/potd" className="btn-section mb-4 d-inline-flex" style={{ fontSize: '0.85rem' }}>
            <FaArrowLeft size={12} /> Back to List
          </Link>

          <div className="potd-detail-card" style={{ padding: '2rem' }}>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-2">
              <h1 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.5px', margin: 0 }}>{potd.title}</h1>
              <span className={`section-badge ${getDifficultyClass(potd.difficulty)}`} style={{ fontSize: '0.85rem', padding: '0.35rem 1rem' }}>
                {potd.difficulty}
              </span>
            </div>

            <p style={{ color: '#64748b', marginBottom: '2rem' }}>{potd.date}</p>

            {/* Problem Statement */}
            <div className="problem-box mb-4">
              <h4 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Problem Statement</h4>
              <p style={{ color: '#94a3b8', whiteSpace: 'pre-wrap', lineHeight: 1.7, fontSize: '0.95rem', margin: 0 }}>
                {potd.problemStatement.trim()}
              </p>
              <a
                href={potd.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-section mt-3 d-inline-flex"
                style={{ fontSize: '0.85rem' }}
              >
                Solve on LeetCode
              </a>
            </div>

            <hr style={{ borderColor: 'rgba(255,255,255,0.06)', margin: '2rem 0' }} />

            {/* Approach */}
            <h2 style={{ fontWeight: 700, marginBottom: '1rem' }}>Approach & Explanation</h2>
            <div className="markdown-content" style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
              <ReactMarkdown>{potd.approach}</ReactMarkdown>
            </div>

            {/* Code */}
            <h2 style={{ fontWeight: 700, marginTop: '2.5rem', marginBottom: '1rem' }}>C++ Solution</h2>
            <div className="code-box">
              <pre style={{ margin: 0 }}>
                <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 1.7, color: '#e2e8f0' }}>
                  {potd.code.trim()}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}

export default POTDDetail;
