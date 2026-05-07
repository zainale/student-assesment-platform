import React from 'react';

function Sidebar({ title, tabs, activeTab, setActiveTab, onLogout }) {
  return (
    <div className="sidebar">
      <h2 className="title">{title}</h2>
      <div className="nav-container">
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
      <div className="nav-item logout" onClick={onLogout}>
        Logout
      </div>
    </div>
  );
}

export default Sidebar;
