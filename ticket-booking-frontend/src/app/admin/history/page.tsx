"use client";

import React from 'react';

export default function AdminHistory() {
  const historyData = [
    {
      id: 1,
      dateTime: '12/09/2024 15:00:00',
      username: 'Sara John',
      concertName: 'The festival Int 2024',
      action: 'Cancel'
    },
    {
      id: 2,
      dateTime: '12/09/2024 10:39:20',
      username: 'Sara John',
      concertName: 'The festival Int 2024',
      action: 'Reserve'
    }
  ];

  return (
    <main style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>History</h1>
      </div>

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date time</th>
              <th>Username</th>
              <th>Concert name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((row) => (
              <tr key={row.id}>
                <td style={{ color: '#64748b' }}>{row.dateTime}</td>
                <td style={{ fontWeight: 500 }}>{row.username}</td>
                <td>{row.concertName}</td>
                <td>
                  <span className={`badge badge-${row.action.toLowerCase()}`}>
                    {row.action}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
