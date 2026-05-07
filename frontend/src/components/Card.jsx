import React from 'react';

function Card({ title, children, style }) {
  return (
    <div className="card" style={style}>
      {title && <h3 className="card-title">{title}</h3>}
      {children}
    </div>
  );
}

export default Card;
