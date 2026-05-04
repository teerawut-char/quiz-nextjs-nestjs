"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from '@/components/Sidebar';
import Card from '@/components/Card';
import Tabs, { Tab } from '@/components/Tabs';
import Modal from '@/components/Modal';
import Notification from '@/components/Notification';
import CreateConcertForm from '@/components/admin/CreateConcertForm';
import ConcertList from '@/components/admin/ConcertList';
import { getConcertsAction, deleteConcertAction, getDashboardStatsAction } from '@/actions/admin';
import { IConcert, IDashboardStats } from '@/types/concert.types';
import { User as UserIcon, Award, XCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedConcert, setSelectedConcert] = useState<IConcert | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');
  const [notificationType, setNotificationType] = useState<'success' | 'error'>('success');
  
  const [concerts, setConcerts] = useState<IConcert[]>([]);
  const [stats, setStats] = useState<IDashboardStats>({
    totalSeats: 0,
    reservedSeats: 0,
    cancelledSeats: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [concertsRes, statsRes] = await Promise.all([
      getConcertsAction(),
      getDashboardStatsAction()
    ]);

    if (concertsRes.code === '000') {
      setConcerts(concertsRes.data || []);
    }
    if (statsRes.code === '000') {
      setStats(statsRes.data || { totalSeats: 0, reservedSeats: 0, cancelledSeats: 0 });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCreated = () => {
    setNotificationMsg('Create successfully');
    setNotificationType('success');
    setShowNotification(true);
    setActiveTab('overview');
    fetchData();
  };

  const handleError = (msg: string) => {
    setNotificationMsg(msg);
    setNotificationType('error');
    setShowNotification(true);
  };

  const handleDeleteClick = (concert: IConcert) => {
    setSelectedConcert(concert);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedConcert) return;

    const res = await deleteConcertAction(selectedConcert.id);
    if (res.code === '000') {
      setNotificationMsg('Deleted successfully');
      setNotificationType('success');
      fetchData();
    } else {
      setNotificationMsg(res.message || 'Failed to delete');
      setNotificationType('error');
    }
    
    setShowDeleteModal(false);
    setShowNotification(true);
  };

  const adminTabs: Tab[] = [
    { 
      id: 'overview', 
      label: 'Overview', 
      content: <ConcertList concerts={concerts} onDelete={handleDeleteClick} loading={loading} /> 
    },
    { 
      id: 'create', 
      label: 'Create', 
      content: <CreateConcertForm onCreated={handleCreated} onError={handleError} /> 
    }
  ];

  return (
    <div className="dashboard-container">
      <Sidebar role="admin" />
      
      <main className="dashboard-main">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <nav>
            Admin / Home / {activeTab === 'create' ? 'Create' : 'Overview'}
          </nav>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <Card variant="blue">
            <div className="stats-card-content">
              <UserIcon size={32} />
              <p className="stats-label">Total of seats</p>
              <p className="stats-value">{stats.totalSeats}</p>
            </div>
          </Card>
          
          <Card variant="green">
            <div className="stats-card-content">
              <Award size={32} />
              <p className="stats-label">Reserve</p>
              <p className="stats-value">{stats.reservedSeats}</p>
            </div>
          </Card>
          
          <Card variant="red">
            <div className="stats-card-content">
              <XCircle size={32} />
              <p className="stats-label">Cancel</p>
              <p className="stats-value">{stats.cancelledSeats}</p>
            </div>
          </Card>
        </div>

        {/* Tabs Container */}
        <div>
          <Tabs 
            activeTab={activeTab} 
            onChange={setActiveTab}
            tabs={adminTabs}
          />
        </div>

        <Modal 
          isOpen={showDeleteModal}
          title="Are you sure to delete?"
          message={selectedConcert?.name || ''}
          confirmText="Yes, Delete"
          type="danger"
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />

        <Notification 
          show={showNotification}
          message={notificationMsg} 
          type={notificationType}
          onClose={() => setShowNotification(false)} 
        />
      </main>
    </div>
  );
}
