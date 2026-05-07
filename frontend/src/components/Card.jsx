import React from 'react';

function Card({ title, children, style }) {
  return (
    <div className="card" style={style}>
      {title && <h3 className="card-title" style={{ marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>{title}</h3>}
      {children}
    </div>
  );
}

export default Card;
