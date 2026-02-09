import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { systemDesignIndex } from '../pages/system-design/systemDesignData';
import Logo from './Logo';

const coreArticles = systemDesignIndex
  .filter(a => a.category === 'Core Concept')
  .sort((a, b) => a.order - b.order);

const caseStudies = systemDesignIndex
  .filter(a => a.category === 'Case Study')
  .sort((a, b) => a.order - b.order);

function ArticleSidebar({ currentArticleId }) {
  const isRead = (id) => localStorage.getItem(`sd-read-${id}`) === 'true';

  return (
    <nav className="sd-article-sidebar">
      <Link to="/" className="sd-sidebar-brand">
        <Logo size={20} />
        <span>RunAlgorithms</span>
      </Link>
      <div className="sd-sidebar-group-label">Core Concepts</div>
      {coreArticles.map(article => (
        <Link
          key={article.id}
          to={`/system-design/${article.id}`}
          className={`sd-sidebar-item ${article.id === currentArticleId ? 'active' : ''}`}
        >
          <span>{article.title}</span>
          {isRead(article.id) && (
            <span className="sd-sidebar-read-check"><FaCheck size={9} /></span>
          )}
        </Link>
      ))}

      <div className="sd-sidebar-group-label">Case Studies</div>
      {caseStudies.map(article => (
        <Link
          key={article.id}
          to={`/system-design/${article.id}`}
          className={`sd-sidebar-item ${article.id === currentArticleId ? 'active' : ''}`}
        >
          <span>{article.title}</span>
          {isRead(article.id) && (
            <span className="sd-sidebar-read-check"><FaCheck size={9} /></span>
          )}
        </Link>
      ))}
    </nav>
  );
}

export default ArticleSidebar;
