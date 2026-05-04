"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '@/components/Sidebar';
import Card from '@/components/Card';
import Notification from '@/components/Notification';
import { getConcertsAction } from '@/actions/admin';
import { createBookingAction, cancelBookingAction, getMyBookingsAction } from '@/actions/user';
import { IConcert } from '@/types/concert.types';
import { Users, Ticket, User as UserIcon, XCircle, CreditCard } from 'lucide-react';

export default function UserDashboard() {
  const [concerts, setConcerts] = useState<IConcert[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
  
  const [userBookings, setUserBookings] = useState<{ concertId: number; bookingId: number }[]>([]);
  const [processingId, setProcessingId] = useState<number | null>(null);

  const fetchData = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    const userId = user?.id;

    const [concertsRes, bookingsRes] = await Promise.all([
      getConcertsAction(),
      getMyBookingsAction(userId)
    ]);

    if (concertsRes.code === "000") {
      setConcerts(concertsRes.data || []);
    }

    if (bookingsRes.code === "000" && userId) {
      const data = Array.isArray(bookingsRes.data) ? bookingsRes.data : [];
      
      const sortedBookings = [...data].sort((a: any, b: any) => 
        Number(b.id) - Number(a.id)
      );

      const allMyBookings = sortedBookings.filter((b: any) => Number(b.userId) === Number(userId));
      
      const latestBookingForConcert: Record<number, any> = {};
      allMyBookings.forEach(b => {
        if (!latestBookingForConcert[b.concertId]) {
          latestBookingForConcert[b.concertId] = b;
        }
      });

      const myActiveBookings = Object.values(latestBookingForConcert)
        .filter(b => b.status === 'RESERVED')
        .map(b => ({ concertId: Number(b.concertId), bookingId: Number(b.id) }));
      
      setUserBookings(myActiveBookings);
    }
    
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleReserve = async (concertId: number) => {
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    if (!user) {
      setNotificationMsg('Please login first');
      setNotificationType('error');
      setShowNotification(true);
      return;
    }

    setProcessingId(concertId);
    const res = await createBookingAction({
      userId: user.id,
      concertId: concertId,
      numSeats: 1
    });

    if (res.code === '000') {
      setNotificationMsg(res.message || 'Action successful!');
      setNotificationType('success');
      setTimeout(() => {
        fetchData(true);
        setProcessingId(null);
      }, 500);
    } else {
      setNotificationMsg(res.message || 'Failed to reserve');
      setNotificationType('error');
      setProcessingId(null);
    }
    setShowNotification(true);
  };

  const handleCancel = async (concertId: number) => {
    const booking = userBookings.find(b => b.concertId === concertId);
    if (!booking) return;

    setProcessingId(concertId);
    const res = await cancelBookingAction(booking.bookingId);
    if (res.code === '000') {
      setNotificationMsg('Reservation cancelled.');
      setNotificationType('success');
      setTimeout(() => {
        fetchData(true);
        setProcessingId(null);
      }, 500);
    } else {
      setNotificationMsg(res.message || 'Failed to cancel');
      setNotificationType('error');
      setProcessingId(null);
    }
    setShowNotification(true);
  };

  return (
    <>
      <Sidebar role="user" />
      
      <main className="dashboard-main">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <div className="spinner"></div>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1.5rem', width: '100%' }}>
            {concerts.length > 0 ? (
              concerts.map((concert) => {
                const booking = userBookings.find(b => Number(b.concertId) === Number(concert.id));
                const isReserved = !!booking;
                
                return (
                  <Card key={concert.id} style={{ padding: 0 }}>
                    <div className="concert-card-body">
                      <div className="concert-card-header">
                        <h2 className="concert-title">{concert.name}</h2>
                      </div>
                      
                      <p className="concert-description">{concert.description}</p>
                      
                      <div className="concert-footer" style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        marginTop: '1.5rem',
                        flexWrap: 'wrap',
                        gap: '1rem'
                      }}>
                        <div style={{ display: 'flex', gap: '1.5rem', minWidth: 'fit-content' }}>
                          <div className="concert-stats-info">
                            <Users size={16} />
                            <span>{concert.totalSeats.toLocaleString('en-US')}</span>
                          </div>
                        </div>

                        {isReserved ? (
                          <button
                            onClick={() => handleCancel(concert.id)}
                            disabled={processingId === concert.id}
                            className="btn-responsive"
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: '12px 16px',
                              gap: '10px',
                              height: '60px',
                              background: processingId === concert.id ? '#94a3b8' : '#F96464',
                              borderRadius: '4px',
                              border: 'none',
                              color: 'white',
                              fontWeight: '600',
                              cursor: processingId === concert.id ? 'not-allowed' : 'pointer'
                            }}
                          >
                            {processingId === concert.id ? (
                              <div className="spinner-small"></div>
                            ) : (
                              <>
                                <XCircle size={20} />
                                Cancel
                              </>
                            )}
                          </button>
                        ) : (
                          <button
                            onClick={() => handleReserve(concert.id)}
                            disabled={concert.reservedSeats >= concert.totalSeats || processingId === concert.id}
                            className="btn-responsive"
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: '12px 16px',
                              gap: '10px',
                              height: '60px',
                              background: (concert.reservedSeats >= concert.totalSeats || processingId === concert.id) ? '#cbd5e1' : '#3b82f6',
                              borderRadius: '4px',
                              border: 'none',
                              color: 'white',
                              fontWeight: '600',
                              cursor: (concert.reservedSeats >= concert.totalSeats || processingId === concert.id) ? 'not-allowed' : 'pointer'
                            }}
                          >
                            {processingId === concert.id ? (
                              <div className="spinner-small"></div>
                            ) : (
                              <>
                                <Ticket size={20} />
                                Reserve
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
                <Ticket size={48} color="#cbd5e1" style={{ margin: '0 auto 1.5rem' }} />
                <p>No concerts available at the moment.</p>
              </div>
            )}
          </div>
        )}

        <Notification
          show={showNotification}
          message={notificationMsg}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      </main>
    </>
  );
}
