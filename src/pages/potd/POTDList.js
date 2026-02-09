import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFire } from 'react-icons/fa';
import SEO from '../../components/SEO';
import SectionWrapper from '../../components/SectionWrapper';
import SectionHeader from '../../components/SectionHeader';
import { potdList } from './potdData';

function POTDList() {
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
          title="LeetCode Problem of the Day Archive"
          description="Daily LeetCode challenges solved with detailed explanations and C++ code."
          url="/potd"
        />
        <SectionHeader
          icon={FaFire}
          title="POTD Archive"
          subtitle="A collection of our daily LeetCode challenges with detailed solutions."
        />

        <Row xs={1} md={2} lg={3} className="g-4" style={{ position: 'relative', zIndex: 1 }}>
          {potdList.map((potd) => (
            <Col key={potd.id}>
              <Link to={`/potd/${potd.id}`} className="text-decoration-none">
                <div className="potd-card h-100">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <span className="section-badge">{potd.date}</span>
                    <span className={`section-badge ${getDifficultyClass(potd.difficulty)}`}>
                      {potd.difficulty}
                    </span>
                  </div>
                  <h3 style={{ color: '#f8fafc', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                    {potd.title}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5 }}>
                    {potd.problemStatement.slice(0, 100)}...
                  </p>
                  <div className="btn-section w-100 justify-content-center mt-auto" style={{ fontSize: '0.85rem' }}>
                    View Solution
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </SectionWrapper>
  );
}

export default POTDList;
