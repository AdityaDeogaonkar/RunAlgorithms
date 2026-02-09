import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { FaCode, FaExternalLinkAlt } from 'react-icons/fa';
import SEO from '../components/SEO';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeader from '../components/SectionHeader';
import { topics } from '../data';
import ProgressToggle from '../components/ProgressToggle';

function TopicDetail() {
  const { id } = useParams();
  const topic = topics.find(t => t.id === id);

  if (!topic) {
    return (
      <SectionWrapper section="dsa">
        <Container className="text-center py-5">
          <SEO title="Topic Not Found" />
          <h2>Topic not found</h2>
          <Button as={Link} to="/" variant="outline-light">Go Home</Button>
        </Container>
      </SectionWrapper>
    );
  }

  const getDifficultyClass = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'section-badge-easy';
      case 'medium': return 'section-badge-medium';
      case 'hard': return 'section-badge-hard';
      default: return 'section-badge';
    }
  };

  return (
    <SectionWrapper section="dsa">
      <Container style={{ paddingBottom: '4rem' }}>
        <SEO
          title={`${topic.title} Problems`}
          description={`Master ${topic.title} with curated LeetCode problems, detailed solutions, and key insights.`}
          url={`/topic/${topic.id}`}
        />
        <SectionHeader
          icon={FaCode}
          title={topic.title}
          subtitle={topic.description}
          breadcrumbs={[
            { label: 'Home', to: '/' },
            { label: 'DSA' },
            { label: topic.title }
          ]}
        />

        <div style={{ overflowX: 'auto', position: 'relative', zIndex: 1 }}>
          <table className="section-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>Status</th>
                <th style={{ width: '50px' }}>#</th>
                <th>Problem</th>
                <th style={{ width: '110px' }}>Difficulty</th>
                <th style={{ width: '100px' }}>Platform</th>
                <th style={{ width: '90px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {topic.questions.map((q, index) => (
                <tr key={q.id}>
                  <td className="text-center align-middle">
                    <ProgressToggle questionId={`${topic.id}-${q.id}`} />
                  </td>
                  <td>{index + 1}</td>
                  <td style={{ fontWeight: 500 }}>{q.title}</td>
                  <td>
                    <span className={`section-badge ${getDifficultyClass(q.difficulty)}`}>
                      {q.difficulty}
                    </span>
                  </td>
                  <td>{q.platform}</td>
                  <td>
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
      </Container>
    </SectionWrapper>
  );
}

export default TopicDetail;
