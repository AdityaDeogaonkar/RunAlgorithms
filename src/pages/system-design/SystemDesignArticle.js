import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { FaChevronDown, FaChevronRight, FaCopy, FaCheck, FaInfoCircle, FaLightbulb, FaExclamationTriangle, FaLock, FaArrowLeft, FaArrowRight, FaDatabase } from 'react-icons/fa';
import SectionWrapper from '../../components/SectionWrapper';
import SEO from '../../components/SEO';
import { systemDesignArticles } from './systemDesignArticles';
import { systemDesignIndex } from './systemDesignData';

// Icon map
const iconMap = {
  BookOpen: () => <span>&#128214;</span>,
  Code: () => <span>&#60;/&#62;</span>,
  TrendingUp: () => <span>&#128200;</span>,
  Globe: () => <span>&#127760;</span>,
  Database: () => <FaDatabase />,
  Server: () => <span>&#9881;</span>,
  Zap: () => <span>&#9889;</span>,
  AlertCircle: () => <FaExclamationTriangle />,
  Lightbulb: () => <FaLightbulb />,
};

// Sub-components

const CodeBlock = ({ code, language, id, copiedCode, onCopy }) => (
  <div className="sd-code-block">
    <div className="sd-code-header">
      <span className="sd-code-lang">{language}</span>
      <button className="sd-code-copy" onClick={() => onCopy(code, id)}>
        {copiedCode === id ? <><FaCheck size={12} /> Copied!</> : <><FaCopy size={12} /> Copy</>}
      </button>
    </div>
    <pre><code>{code}</code></pre>
  </div>
);

const CollapsibleSection = ({ title, children, id, icon, defaultOpen, expandedSections, onToggle }) => {
  const isExpanded = expandedSections[id] ?? defaultOpen;
  const IconComp = icon && iconMap[icon];
  return (
    <div className="sd-collapsible">
      <button className="sd-collapsible-trigger" onClick={() => onToggle(id)}>
        <div className="trigger-left">
          {IconComp && <span className="trigger-icon"><IconComp /></span>}
          <h3>{title}</h3>
        </div>
        {isExpanded ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}
      </button>
      {isExpanded && <div className="sd-collapsible-body">{children}</div>}
    </div>
  );
};

const InfoBox = ({ type = 'info', title, text, items }) => {
  const icons = { info: FaInfoCircle, tip: FaLightbulb, warning: FaExclamationTriangle, key: FaLock };
  const Icon = icons[type] || icons.info;
  return (
    <div className={`sd-info-box type-${type}`}>
      <Icon className="info-icon" size={18} />
      <div className="info-content">
        {title && <div className="info-title">{title}</div>}
        <div className="info-body">
          {text && <p style={{ margin: 0 }}>{text}</p>}
          {items && (
            <ul>
              {items.map((item, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

const ArchitectureDiagram = () => (
  <div className="sd-architecture">
    <svg viewBox="0 0 800 500">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#818cf8" />
        </marker>
      </defs>
      {/* Client */}
      <g transform="translate(50, 50)">
        <rect width="120" height="80" rx="8" fill="#161618" stroke="#818cf8" strokeWidth="2"/>
        <text x="60" y="35" textAnchor="middle" fill="#fafafa" fontSize="14" fontWeight="600">Client</text>
        <text x="60" y="55" textAnchor="middle" fill="#a1a1aa" fontSize="11">Browser/App</text>
      </g>
      {/* Load Balancer */}
      <g transform="translate(280, 50)">
        <rect width="140" height="80" rx="8" fill="#161618" stroke="#3b82f6" strokeWidth="2"/>
        <text x="70" y="35" textAnchor="middle" fill="#fafafa" fontSize="14" fontWeight="600">Load Balancer</text>
        <text x="70" y="55" textAnchor="middle" fill="#a1a1aa" fontSize="11">NGINX/ALB</text>
      </g>
      {/* App Servers */}
      <g transform="translate(260, 180)">
        <rect width="80" height="70" rx="8" fill="#161618" stroke="#8b5cf6" strokeWidth="2"/>
        <text x="40" y="30" textAnchor="middle" fill="#fafafa" fontSize="12" fontWeight="600">API</text>
        <text x="40" y="48" textAnchor="middle" fill="#a1a1aa" fontSize="10">Server 1</text>
      </g>
      <g transform="translate(360, 180)">
        <rect width="80" height="70" rx="8" fill="#161618" stroke="#8b5cf6" strokeWidth="2"/>
        <text x="40" y="30" textAnchor="middle" fill="#fafafa" fontSize="12" fontWeight="600">API</text>
        <text x="40" y="48" textAnchor="middle" fill="#a1a1aa" fontSize="10">Server 2</text>
      </g>
      {/* Cache */}
      <g transform="translate(520, 50)">
        <rect width="120" height="80" rx="8" fill="#161618" stroke="#fbbf24" strokeWidth="2"/>
        <text x="60" y="35" textAnchor="middle" fill="#fafafa" fontSize="14" fontWeight="600">Redis</text>
        <text x="60" y="55" textAnchor="middle" fill="#a1a1aa" fontSize="11">Cache Layer</text>
      </g>
      {/* Database */}
      <g transform="translate(520, 180)">
        <rect width="120" height="70" rx="8" fill="#161618" stroke="#ec4899" strokeWidth="2"/>
        <text x="60" y="30" textAnchor="middle" fill="#fafafa" fontSize="14" fontWeight="600">PostgreSQL</text>
        <text x="60" y="48" textAnchor="middle" fill="#a1a1aa" fontSize="11">Primary DB</text>
      </g>
      {/* Replica */}
      <g transform="translate(520, 280)">
        <rect width="120" height="70" rx="8" fill="#161618" stroke="#ec4899" strokeWidth="2" strokeDasharray="4"/>
        <text x="60" y="30" textAnchor="middle" fill="#fafafa" fontSize="14" fontWeight="600">PostgreSQL</text>
        <text x="60" y="48" textAnchor="middle" fill="#a1a1aa" fontSize="11">Read Replica</text>
      </g>
      {/* Analytics */}
      <g transform="translate(520, 380)">
        <rect width="120" height="70" rx="8" fill="#161618" stroke="#818cf8" strokeWidth="2"/>
        <text x="60" y="30" textAnchor="middle" fill="#fafafa" fontSize="14" fontWeight="600">Analytics</text>
        <text x="60" y="48" textAnchor="middle" fill="#a1a1aa" fontSize="11">Clickstream</text>
      </g>
      {/* Arrows */}
      <line x1="170" y1="90" x2="280" y2="90" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowhead)"/>
      <line x1="420" y1="90" x2="520" y2="90" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowhead)"/>
      <line x1="350" y1="130" x2="320" y2="180" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowhead)"/>
      <line x1="350" y1="130" x2="380" y2="180" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowhead)"/>
      <line x1="440" y1="215" x2="520" y2="215" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowhead)"/>
      <line x1="580" y1="250" x2="580" y2="280" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowhead)"/>
      <line x1="440" y1="230" x2="520" y2="415" stroke="#818cf8" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrowhead)"/>
    </svg>
    <div className="diagram-caption">High-level system architecture for URL shortener service</div>
  </div>
);

const DatabaseSchema = () => (
  <div className="sd-schema-grid">
    <div className="sd-schema-table">
      <div className="schema-header">
        <FaDatabase className="schema-icon" size={14} /> urls
      </div>
      <table>
        <thead>
          <tr><th>Column</th><th>Type</th><th>Notes</th></tr>
        </thead>
        <tbody>
          {[
            ['id', 'BIGINT', 'PK, Auto'],
            ['short_code', 'VARCHAR(10)', 'Unique, Indexed'],
            ['original_url', 'TEXT', 'Required'],
            ['user_id', 'BIGINT', 'FK, Nullable'],
            ['created_at', 'TIMESTAMP', 'Default NOW()'],
            ['expires_at', 'TIMESTAMP', 'Nullable'],
          ].map(([col, type, notes], i) => (
            <tr key={i}>
              <td className="col-name">{col}</td>
              <td>{type}</td>
              <td>{notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="sd-schema-table">
      <div className="schema-header">
        <FaDatabase className="schema-icon" size={14} /> url_clicks
      </div>
      <table>
        <thead>
          <tr><th>Column</th><th>Type</th><th>Notes</th></tr>
        </thead>
        <tbody>
          {[
            ['id', 'BIGINT', 'PK, Auto'],
            ['url_id', 'BIGINT', 'FK'],
            ['clicked_at', 'TIMESTAMP', 'Indexed'],
            ['ip_address', 'INET', '-'],
            ['user_agent', 'TEXT', '-'],
            ['referrer', 'TEXT', 'Nullable'],
          ].map(([col, type, notes], i) => (
            <tr key={i}>
              <td className="col-name">{col}</td>
              <td>{type}</td>
              <td>{notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Content renderer — renders each content block by type
const ContentRenderer = ({ blocks, copiedCode, onCopy, expandedSections, onToggle }) => {
  return blocks.map((block, idx) => {
    switch (block.type) {
      case 'paragraph':
        return block.text ? <p key={idx}>{block.text}</p> : null;

      case 'heading':
        if (block.level === 3) return <h3 key={idx}>{block.text}</h3>;
        if (block.level === 4) return <h4 key={idx} style={{ fontWeight: 600, color: '#fafafa', marginTop: '1.5rem', marginBottom: '0.5rem' }}>{block.text}</h4>;
        return <h3 key={idx}>{block.text}</h3>;

      case 'code':
        return <CodeBlock key={idx} code={block.code} language={block.language} id={block.id} copiedCode={copiedCode} onCopy={onCopy} />;

      case 'info-box':
        return <InfoBox key={idx} type={block.boxType} title={block.title} text={block.text} items={block.items} />;

      case 'requirements':
        return (
          <div key={idx} className="sd-req-grid">
            <div className="sd-req-box">
              <h3 style={{ color: block.functional.color === 'emerald' ? '#34d399' : '#818cf8' }}>
                {block.functional.title}
              </h3>
              <ul>
                {block.functional.items.map((item, i) => (
                  <li key={i}>
                    <span className="bullet" style={{ color: block.functional.color === 'emerald' ? '#34d399' : '#818cf8' }}>&#8226;</span>
                    <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="sd-req-box">
              <h3 style={{ color: block.nonFunctional.color === 'purple' ? '#818cf8' : '#34d399' }}>
                {block.nonFunctional.title}
              </h3>
              <ul>
                {block.nonFunctional.items.map((item, i) => (
                  <li key={i}>
                    <span className="bullet" style={{ color: block.nonFunctional.color === 'purple' ? '#818cf8' : '#34d399' }}>&#8226;</span>
                    <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'stats':
        const colorMap = { emerald: { bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.2)', text: '#34d399' }, blue: { bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)', text: '#3b82f6' }, purple: { bg: 'rgba(129,140,248,0.08)', border: 'rgba(129,140,248,0.2)', text: '#818cf8' } };
        return (
          <div key={idx} className="sd-stat-grid">
            {block.items.map((stat, i) => {
              const c = colorMap[stat.color] || colorMap.blue;
              return (
                <div key={i} className="sd-stat-card" style={{ background: c.bg, borderColor: c.border }}>
                  <div className="stat-label" style={{ color: c.text }}>{stat.label}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-desc">{stat.desc}</div>
                </div>
              );
            })}
          </div>
        );

      case 'collapsible':
        return (
          <CollapsibleSection
            key={idx}
            id={block.id}
            title={block.title}
            icon={block.icon}
            defaultOpen={block.defaultOpen}
            expandedSections={expandedSections}
            onToggle={onToggle}
          >
            <ContentRenderer blocks={block.content} copiedCode={copiedCode} onCopy={onCopy} expandedSections={expandedSections} onToggle={onToggle} />
          </CollapsibleSection>
        );

      case 'architecture-diagram':
        return <ArchitectureDiagram key={idx} />;

      case 'database-schema':
        return <DatabaseSchema key={idx} />;

      case 'tradeoff':
        return (
          <div key={idx} className="sd-tradeoff-card">
            <h3 style={{ color: block.titleColor === 'emerald' ? '#34d399' : block.titleColor === 'blue' ? '#3b82f6' : '#818cf8' }}>
              {block.title}
            </h3>
            {block.comparisons && (
              <div className="sd-compare-grid">
                {block.comparisons.map((comp, i) => (
                  <div key={i} className="sd-compare-box">
                    <h4>{comp.title}</h4>
                    <ul>{comp.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
                  </div>
                ))}
              </div>
            )}
            {block.table && (
              <div style={{ overflowX: 'auto' }}>
                <table className="section-table" style={{ marginTop: '0.5rem' }}>
                  <thead>
                    <tr>{block.table.headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {block.table.rows.map((row, i) => (
                      <tr key={i}>{row.map((cell, j) => (
                        <td key={j} style={j === 0 ? { fontFamily: 'var(--font-mono)', color: '#818cf8' } : {}}>
                          {cell}
                        </td>
                      ))}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );

      case 'takeaways':
        return (
          <div key={idx} className="sd-takeaways">
            <div className="sd-takeaways-grid">
              {block.columns.map((col, i) => (
                <div key={i}>
                  <h3>{col.title}</h3>
                  <ul>{col.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cache-layers':
        return (
          <div key={idx} className="sd-cache-grid">
            {block.layers.map((layer, i) => (
              <div key={i} className="sd-cache-card">
                <h4 style={{ color: layer.color === 'emerald' ? '#34d399' : '#3b82f6' }}>{layer.title}</h4>
                <ul>{layer.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  });
};

// Navigation helpers
function getArticleNav(currentId) {
  const sorted = [...systemDesignIndex].sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex(a => a.id === currentId);
  return {
    prev: idx > 0 ? sorted[idx - 1] : null,
    next: idx < sorted.length - 1 ? sorted[idx + 1] : null,
  };
}

function getRelatedArticles(currentId) {
  const current = systemDesignIndex.find(a => a.id === currentId);
  if (!current || !current.relatedArticles) return [];
  return current.relatedArticles
    .map(id => systemDesignIndex.find(a => a.id === id))
    .filter(Boolean);
}

// Main component
function SystemDesignArticle() {
  const { articleId } = useParams();
  const article = systemDesignArticles[articleId];
  const [activeSection, setActiveSection] = useState('');
  const [expandedSections, setExpandedSections] = useState({});
  const [copiedCode, setCopiedCode] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [markedRead, setMarkedRead] = useState(false);
  const contentRef = useRef(null);
  const sectionRefs = useRef({});

  // Mark as read when user scrolls past 80%
  useEffect(() => {
    if (!articleId) return;
    const isAlreadyRead = localStorage.getItem(`sd-read-${articleId}`) === 'true';
    setMarkedRead(isAlreadyRead);
  }, [articleId]);

  useEffect(() => {
    if (readingProgress >= 80 && !markedRead && articleId) {
      localStorage.setItem(`sd-read-${articleId}`, 'true');
      setMarkedRead(true);
    }
  }, [readingProgress, markedRead, articleId]);

  // IntersectionObserver scroll-spy for TOC
  useEffect(() => {
    if (!article) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    // Observe all section elements
    article.sections.forEach(section => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [article]);

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setReadingProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = useCallback((id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const copyToClipboard = useCallback((text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  }, []);

  if (!article) {
    return (
      <SectionWrapper section="system-design">
        <Container className="text-center py-5" style={{ marginTop: '80px' }}>
          <SEO title="Article Not Found" />
          <h2>Article not found</h2>
          <Button as={Link} to="/system-design" variant="outline-light" className="mt-3">Back to System Design</Button>
        </Container>
      </SectionWrapper>
    );
  }

  const { prev, next } = getArticleNav(articleId);
  const related = getRelatedArticles(articleId);
  const indexEntry = systemDesignIndex.find(a => a.id === articleId);

  return (
    <SectionWrapper section="system-design">
      <SEO
        title={`${article.title} — System Design`}
        description={article.subtitle}
        url={`/system-design/${articleId}`}
      />

      {/* Fixed reading progress bar at top */}
      <div className="sd-reading-progress-bar">
        <div className="sd-reading-progress-fill" style={{ width: `${readingProgress}%` }} />
      </div>

      <Container style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
        {/* Breadcrumb */}
        <div className="sd-breadcrumb">
          <Link to="/system-design" className="sd-breadcrumb-link">
            <FaArrowLeft size={11} /> System Design
          </Link>
          <span className="sd-breadcrumb-sep">/</span>
          <span className="sd-breadcrumb-current">{article.title}</span>
        </div>

        {/* Header */}
        <header className="sd-article-header">
          <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
            <span className="section-badge">{article.category}</span>
            <span className={`section-badge ${
              article.difficulty === 'Beginner' ? 'section-badge-easy' :
              article.difficulty === 'Intermediate' ? 'section-badge-medium' :
              'section-badge-hard'
            }`}>{article.difficulty}</span>
            {indexEntry?.interviewFrequency && (
              <span className={`sd-interview-freq-inline ${indexEntry.interviewFrequency === 'Must Know' ? 'must-know' : ''}`}>
                {indexEntry.interviewFrequency}
              </span>
            )}
            {markedRead && (
              <span className="sd-read-badge">
                <FaCheck size={9} /> Read
              </span>
            )}
          </div>
          <h1 className="sd-article-title">
            {article.title}
          </h1>
          <p className="sd-article-subtitle">
            {article.subtitle}
          </p>
          <div className="sd-article-meta">
            <span>{article.readTime} read</span>
            <span className="sd-meta-dot" />
            <span>{article.sections.length} sections</span>
            {indexEntry?.tags && (
              <>
                <span className="sd-meta-dot" />
                <div className="sd-article-tags">
                  {indexEntry.tags.map(tag => (
                    <span key={tag} className="sd-tag">{tag}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        </header>

        {/* Layout: content + TOC */}
        <div className="sd-article-layout">
          <main className="sd-article-content" ref={contentRef}>
            {article.sections.map((section) => {
              const IconComp = iconMap[section.icon];
              return (
                <section
                  key={section.id}
                  id={section.id}
                  ref={el => { sectionRefs.current[section.id] = el; }}
                >
                  <h2>
                    {IconComp && <span className="section-icon-inline"><IconComp /></span>}
                    {section.title}
                  </h2>
                  <ContentRenderer
                    blocks={section.content}
                    copiedCode={copiedCode}
                    onCopy={copyToClipboard}
                    expandedSections={expandedSections}
                    onToggle={toggleSection}
                  />
                </section>
              );
            })}

            {/* Related Articles */}
            {related.length > 0 && (
              <div className="sd-related-section">
                <h3 className="sd-related-title">Related Articles</h3>
                <div className="sd-related-grid">
                  {related.map(r => (
                    <Link key={r.id} to={`/system-design/${r.id}`} className="sd-related-card">
                      <span className="sd-related-category">{r.category}</span>
                      <span className="sd-related-name">{r.title}</span>
                      <span className="sd-related-meta">
                        {r.difficulty} &middot; {r.readTime}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Previous / Next Navigation */}
            <div className="sd-article-nav">
              {prev ? (
                <Link to={`/system-design/${prev.id}`} className="sd-nav-card sd-nav-prev">
                  <span className="sd-nav-label"><FaArrowLeft size={11} /> Previous</span>
                  <span className="sd-nav-title">{prev.title}</span>
                </Link>
              ) : <div />}
              {next ? (
                <Link to={`/system-design/${next.id}`} className="sd-nav-card sd-nav-next">
                  <span className="sd-nav-label">Next <FaArrowRight size={11} /></span>
                  <span className="sd-nav-title">{next.title}</span>
                </Link>
              ) : <div />}
            </div>
          </main>

          {/* TOC Sidebar */}
          <aside>
            <div className="sd-toc">
              <div className="sd-toc-label">Reading Progress</div>
              <div className="sd-toc-progress">
                <div className="sd-toc-progress-fill" style={{ width: `${readingProgress}%` }} />
              </div>
              <div className="sd-toc-label">On This Page</div>
              {article.sections.map(({ id, title, icon }) => {
                const IconComp = iconMap[icon];
                return (
                  <button
                    key={id}
                    className={`sd-toc-item ${activeSection === id ? 'active' : ''}`}
                    onClick={() => {
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {IconComp && <span className="toc-icon"><IconComp /></span>}
                    <span>{title}</span>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      </Container>
    </SectionWrapper>
  );
}

export default SystemDesignArticle;
