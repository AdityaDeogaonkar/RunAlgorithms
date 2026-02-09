import React from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaLayerGroup, FaBuilding, FaBook, FaFire } from 'react-icons/fa';

const cells = [
  {
    to: '/topic/arrays',
    accent: 'dsa',
    icon: FaCode,
    title: 'DSA Roadmaps',
    desc: '13 topics covering arrays, trees, graphs, DP and more. Curated problems with solutions.',
    count: '170+ Problems',
    span: 'span-2',
  },
  {
    to: '/system-design',
    accent: 'system-design',
    icon: FaLayerGroup,
    title: 'System Design',
    desc: 'From CAP theorem to designing TinyURL and WhatsApp.',
    count: '5 Guides',
    span: '',
  },
  {
    to: '/companies',
    accent: 'companies',
    icon: FaBuilding,
    title: 'Company Prep',
    desc: 'Top interview questions for Google, Amazon, Meta and 15+ more companies.',
    count: '18 Companies',
    span: '',
  },
  {
    to: '/cheatsheets',
    accent: 'cheatsheets',
    icon: FaBook,
    title: 'Cheat Sheets',
    desc: 'Time complexity tables, sorting algorithms, graph algorithm reference.',
    count: 'Quick Reference',
    span: '',
  },
  {
    to: '/potd',
    accent: 'potd',
    icon: FaFire,
    title: 'Problem of the Day',
    desc: 'Daily LeetCode challenges with detailed C++ solutions and explanations.',
    count: 'Updated Daily',
    span: '',
  },
];

function BentoGrid() {
  return (
    <div className="bento-grid">
      {cells.map((cell, i) => (
        <Link
          key={i}
          to={cell.to}
          className={`bento-cell ${cell.span}`}
          data-accent={cell.accent}
        >
          <div className="bento-accent" />
          <div>
            <cell.icon className="bento-icon" />
            <div className="bento-title">{cell.title}</div>
            <div className="bento-desc">{cell.desc}</div>
          </div>
          <div className="bento-count">{cell.count}</div>
        </Link>
      ))}
    </div>
  );
}

export default BentoGrid;
