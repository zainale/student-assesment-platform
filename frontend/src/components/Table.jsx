import React from 'react';

function Table({ headers, data, renderRow }) {
  if (!data || data.length === 0) return <p className="text-muted">No data available.</p>;
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {headers.map((h, i) => <th key={i}>{h}</th>)}
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
