"use client";

import React from 'react';
import Sidebar from '@/components/Sidebar';
import AdminHistory from '@/components/admin/AdminHistory';

export default function HistoryPage() {
  return (
    <>
      <Sidebar role="admin" />
      
      <main className="dashboard-main">
        <div className="breadcrumb">
          <nav>Admin / History</nav>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1e293b', marginTop: '1rem' }}>Booking History</h1>
        </div>

        <div className="tabs-container">
          <AdminHistory />
        </div>
      </main>
    </>
  );
}
