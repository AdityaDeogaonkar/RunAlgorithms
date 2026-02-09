import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaBook, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import SEO from '../../components/SEO';
import SectionWrapper from '../../components/SectionWrapper';
import SectionHeader from '../../components/SectionHeader';
import { cheatSheets } from './cheatSheetData';

function CheatSheets() {
  const [expanded, setExpanded] = useState({});

  const toggleSheet = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SectionWrapper section="cheatsheets">
      <Container style={{ paddingBottom: '4rem' }}>
        <SEO
          title="DSA Cheat Sheets"
          description="Comprehensive Data Structures and Algorithms Cheat Sheets. Time Complexity, Graph Templates, Sliding Window, and more."
          url="/cheatsheets"
        />
        <SectionHeader
          icon={FaBook}
          title="DSA Cheat Sheets"
          subtitle="Essential templates, patterns, and complexity charts for quick revision."
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {cheatSheets.map((sheet) => {
            const isOpen = expanded[sheet.id] !== false; // default open
            return (
              <div key={sheet.id} className="cheat-sheet-card">
                <div className="cheat-sheet-header" onClick={() => toggleSheet(sheet.id)}>
                  <h3>{sheet.title}</h3>
                  <span className="toggle-icon">
                    {isOpen ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}
                  </span>
                </div>
                {isOpen && (
                  <div className="cheat-sheet-body">
                    <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.9rem' }}>{sheet.description}</p>
                    <div className="markdown-content">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{sheet.content}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}

export default CheatSheets;
