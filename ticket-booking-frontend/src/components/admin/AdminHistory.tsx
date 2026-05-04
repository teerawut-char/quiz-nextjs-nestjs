"use client";

import React, { useState, useEffect } from 'react';
import { getBookingsAction } from '@/actions/admin';
import { Clock, User as UserIcon, Ticket, Tag } from 'lucide-react';

const AdminHistory: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await getBookingsAction();
      if (res.code === "000") {
        setBookings(res.data || []);
      }
      setLoading(false);
    };
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Concert</th>
            <th>Seats</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ padding: '0.5rem', backgroundColor: '#f1f7ff', borderRadius: '0.5rem', color: '#3b82f6' }}>
                      <UserIcon size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#1e293b' }}>{booking.user?.name || 'Unknown'}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{booking.user?.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontWeight: 500 }}>
                    <Ticket size={16} color="#94a3b8" />
                    {booking.concert?.name}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                    <Tag size={14} color="#94a3b8" />
                    <span>{booking.numSeats} seats</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${booking.status === 'RESERVED' ? 'status-reserved' : 'status-cancelled'}`}>
                    {booking.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right', color: '#64748b', fontSize: '0.875rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <Clock size={14} color="#cbd5e1" />
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
                No booking history found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHistory;
