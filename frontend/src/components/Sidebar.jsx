import React from 'react';

function Sidebar({ title, tabs, activeTab, setActiveTab, onLogout }) {
  return (
    <div className="sidebar" style={{ display: 'flex', flexDirection: 'column' }}>
      <h2 className="title" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
        {tabs.map(tab => (
          <div 
            key={tab.id}
            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`} 
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="nav-item" onClick={onLogout} style={{ marginTop: 'auto', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
        Logout
      </div>
    </div>
  );
}

export default Sidebar;
