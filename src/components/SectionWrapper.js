import React from 'react';

function SectionWrapper({ section, children }) {
  return (
    <div data-section={section} className="section-wrapper">
      {children}
    </div>
  );
}

export default SectionWrapper;
