import React from 'react';
import { FaCode, FaBuilding, FaLayerGroup, FaBook, FaFire } from 'react-icons/fa';

const stats = [
  { icon: FaCode, value: '170+', label: 'DSA Problems' },
  { icon: FaBuilding, value: '20', label: 'Companies' },
  { icon: FaLayerGroup, value: '8', label: 'System Design Guides' },
  { icon: FaBook, value: '3', label: 'Cheat Sheets' },
  { icon: FaFire, value: 'Daily', label: 'POTD Challenge' },
];

function StatsBar() {
  return (
    <div className="stats-bar">
      {stats.map((stat, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="stats-dot" />}
          <div className="stat-item">
            <stat.icon className="stat-icon" />
            <span className="stat-value">{stat.value}</span>
            <span>{stat.label}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default StatsBar;
