"use client";

import React, { useState } from 'react';
import Card from '@/components/Card';
import Tabs, { Tab } from '@/components/Tabs';
import Modal from '@/components/Modal';
import Notification from '@/components/Notification';
import CreateConcertForm from '@/components/admin/CreateConcertForm';
import ConcertList from '@/components/admin/ConcertList';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setNotificationMsg('Created successfully');
    setShowNotification(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    setNotificationMsg('Deleted successfully');
    setShowNotification(true);
  };

  const adminTabs: Tab[] = [
    { 
      id: 'overview', 
      label: 'Overview', 
      content: <ConcertList onDelete={handleDeleteClick} /> 
    },
    { 
      id: 'create', 
      label: 'Create', 
      content: <CreateConcertForm onSave={handleSave} /> 
    }
  ];

  return (
    <main style={{ padding: '2rem' }}>
      {showNotification && (
        <Notification 
          message={notificationMsg} 
          onClose={() => setShowNotification(false)} 
        />
      )}

      <Modal 
        isOpen={showDeleteModal}
        title="Are you sure to delete?"
        message='"Concert Name 1"'
        confirmText="Yes, Delete"
        type="danger"
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />

      {/* Stats Cards */}
      <div className="stats-grid">
        <Card variant="blue" style={{ textAlign: 'center' }}>
          <i className="fa-regular fa-user" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}></i>
          <p style={{ fontSize: '0.875rem', fontWeight: 500, opacity: 0.9 }}>Total of seats</p>
          <p className="stats-value">500</p>
        </Card>
        <Card variant="green" style={{ textAlign: 'center' }}>
          <i className="fa-solid fa-award" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}></i>
          <p style={{ fontSize: '0.875rem', fontWeight: 500, opacity: 0.9 }}>Reserve</p>
          <p className="stats-value">120</p>
        </Card>
        <Card variant="red" style={{ textAlign: 'center' }}>
          <i className="fa-regular fa-circle-xmark" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}></i>
          <p style={{ fontSize: '0.875rem', fontWeight: 500, opacity: 0.9 }}>Cancel</p>
          <p className="stats-value">12</p>
        </Card>
      </div>

      {/* Tab Navigation with Integrated Content */}
      <Tabs 
        activeTab={activeTab} 
        onChange={setActiveTab}
        tabs={adminTabs}
      />
    </main>
  );
}
