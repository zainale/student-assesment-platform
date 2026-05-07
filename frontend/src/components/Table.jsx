import React from 'react';

function Table({ headers, data, renderRow }) {
  if (!data || data.length === 0) return <p style={{color: 'var(--text-muted)'}}>No data available.</p>;
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {headers.map((h, i) => <th key={i} style={{ padding: '1rem', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)' }}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => renderRow(row, i))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
