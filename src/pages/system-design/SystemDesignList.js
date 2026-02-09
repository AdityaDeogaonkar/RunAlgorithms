import React, { useState, useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaServer, FaBookOpen, FaFlask, FaArrowRight, FaCheck } from 'react-icons/fa';
import SectionWrapper from '../../components/SectionWrapper';
import SectionHeader from '../../components/SectionHeader';
import SEO from '../../components/SEO';
import { systemDesignIndex } from './systemDesignData';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'Core Concept', label: 'Core Concepts' },
  { key: 'Case Study', label: 'Case Studies' },
];

function ComplexityMeter({ value, max = 5 }) {
  return (
    <div className="sd-complexity-meter" title={`Complexity: ${value}/${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`sd-complexity-dot ${i < value ? 'filled' : ''}`} />
      ))}
    </div>
  );
}

function ReadBadge({ articleId }) {
  const key = `sd-read-${articleId}`;
  const isRead = localStorage.getItem(key) === 'true';
  if (!isRead) return null;
  return (
    <span className="sd-read-badge">
      <FaCheck size={9} /> Read
    </span>
  );
}

function PrerequisiteChain({ prerequisites }) {
  if (!prerequisites || prerequisites.length === 0) return null;
  const names = prerequisites.map(id => {
    const found = systemDesignIndex.find(a => a.id === id);
    return found ? found.title : id;
  });
  return (
    <div className="sd-prereq-chain">
      {names.map((name, i) => (
        <span key={i}>
          {i > 0 && <span className="sd-prereq-arrow">&rarr;</span>}
          <span className="sd-prereq-item">{name}</span>
        </span>
      ))}
      <span className="sd-prereq-arrow">&rarr;</span>
      <span className="sd-prereq-current">This</span>
    </div>
  );
}

function SystemDesignList() {
  const [activeFilter, setActiveFilter] = useState('all');

  const sorted = useMemo(() => {
    return [...systemDesignIndex].sort((a, b) => a.order - b.order);
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return sorted;
    return sorted.filter(t => t.category === activeFilter);
  }, [activeFilter, sorted]);

  const totalArticles = systemDesignIndex.length;
  const readCount = systemDesignIndex.filter(
    a => localStorage.getItem(`sd-read-${a.id}`) === 'true'
  ).length;

  return (
    <SectionWrapper section="system-design">
      <SEO
        title="System Design Architect Guide"
        description="Master scalable system design with interactive guides. CAP Theorem, Load Balancing, Consistent Hashing, Database Sharding, TinyURL, WhatsApp, and Rate Limiter architecture."
        url="/system-design"
      />
      <Container style={{ paddingBottom: '4rem' }}>
        <SectionHeader
          icon={FaServer}
          title="System Design Architect"
          subtitle="Visualize and master the architecture of large-scale distributed systems."
        />

        {/* Progress + Filter Bar */}
        <div className="sd-list-toolbar">
          <div className="sd-list-progress-info">
            <div className="sd-list-progress-bar">
              <div
                className="sd-list-progress-fill"
                style={{ width: `${totalArticles > 0 ? (readCount / totalArticles) * 100 : 0}%` }}
              />
            </div>
            <span className="sd-list-progress-text">
              {readCount}/{totalArticles} completed
            </span>
          </div>

          <div className="sd-filter-tabs">
            {FILTERS.map(f => (
              <button
                key={f.key}
                className={`sd-filter-tab ${activeFilter === f.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(f.key)}
              >
                {f.key === 'Core Concept' && <FaBookOpen size={12} />}
                {f.key === 'Case Study' && <FaFlask size={12} />}
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Article Grid */}
        <div className="sd-list-grid">
          {filtered.map((topic, idx) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
            >
              <Link to={`/system-design/${topic.id}`} className="sd-list-card">
                {/* Top row: category + read badge */}
                <div className="sd-card-top-row">
                  <span className={`sd-card-category ${topic.category === 'Case Study' ? 'case-study' : ''}`}>
                    {topic.category === 'Core Concept' ? <FaBookOpen size={10} /> : <FaFlask size={10} />}
                    {topic.category}
                  </span>
                  <ReadBadge articleId={topic.id} />
                </div>

                {/* Title + description */}
                <div className="card-title">{topic.title}</div>
                <div className="card-desc">{topic.description}</div>

                {/* Tags */}
                {topic.tags && topic.tags.length > 0 && (
                  <div className="sd-card-tags">
                    {topic.tags.map(tag => (
                      <span key={tag} className="sd-tag">{tag}</span>
                    ))}
                  </div>
                )}

                {/* Prerequisites path */}
                <PrerequisiteChain prerequisites={topic.prerequisites} />

                {/* Bottom meta row */}
                <div className="sd-card-meta-row">
                  <div className="sd-card-meta-left">
                    <span className={`section-badge ${
                      topic.difficulty === 'Beginner' ? 'section-badge-easy' :
                      topic.difficulty === 'Intermediate' ? 'section-badge-medium' :
                      'section-badge-hard'
                    }`}>
                      {topic.difficulty}
                    </span>
                    <span className="sd-card-readtime">{topic.readTime}</span>
                    <ComplexityMeter value={topic.complexity} />
                  </div>
                  <span className="sd-card-arrow">
                    <FaArrowRight size={12} />
                  </span>
                </div>

                {/* Interview frequency indicator */}
                {topic.interviewFrequency && (
                  <div className={`sd-interview-freq ${topic.interviewFrequency === 'Must Know' ? 'must-know' : ''}`}>
                    {topic.interviewFrequency}
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}

export default SystemDesignList;
