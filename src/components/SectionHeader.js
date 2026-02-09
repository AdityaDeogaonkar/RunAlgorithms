import React from 'react';
import { Link } from 'react-router-dom';

function SectionHeader({ icon: Icon, title, subtitle, breadcrumbs }) {
  return (
    <div className="section-header">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="section-breadcrumb">
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="separator">/</span>}
              {crumb.to ? (
                <Link to={crumb.to}>{crumb.label}</Link>
              ) : (
                <span>{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}
      {Icon && <div className="section-icon"><Icon /></div>}
      <h1>{title}</h1>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

export default SectionHeader;
