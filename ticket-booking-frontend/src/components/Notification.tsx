"use client";

import React, { useEffect } from 'react';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type = 'success',
  onClose,
  duration = 3000
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const colors = {
    success: { bg: '#def7ec', text: '#03543f', icon: 'fa-circle-check' },
    error: { bg: '#fde8e8', text: '#9b1c1c', icon: 'fa-circle-xmark' },
    info: { bg: '#e1effe', text: '#1e429f', icon: 'fa-circle-info' }
  };

  const current = colors[type];

  return (
    <div style={{
      position: 'fixed',
      top: '1.5rem',
      right: '1.5rem',
      backgroundColor: current.bg,
      color: current.text,
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      zIndex: 2000,
      fontSize: '0.8125rem',
      fontWeight: 500,
      minWidth: '200px',
      border: `1px solid rgba(0,0,0,0.05)`
    }}>
      <i className={`fa-solid ${current.icon}`}></i>
      <span style={{ flex: 1 }}>{message}</span>
      <button 
        onClick={onClose}
        style={{ 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer', 
          color: 'inherit', 
          opacity: 0.5,
          padding: '0.25rem'
        }}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

export default Notification;
