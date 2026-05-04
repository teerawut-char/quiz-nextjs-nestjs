"use client";

import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

interface NotificationProps {
  show: boolean;
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
  show,
  message,
  type = 'success',
  onClose,
  duration = 3000
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, onClose, duration]);

  if (!show) return null;

  const config = {
    success: { 
      bg: '#def7ec', 
      text: '#03543f', 
      border: '#bcf0da',
      icon: <CheckCircle size={16} color="#059669" />
    },
    error: { 
      bg: '#fde8e8', 
      text: '#9b1c1c', 
      border: '#fbd5d5',
      icon: <XCircle size={16} color="#dc2626" />
    },
    info: { 
      bg: '#e1effe', 
      text: '#1e429f', 
      border: '#c3ddfd',
      icon: <Info size={16} color="#3b82f6" />
    }
  };

  const current = config[type];

  return (
    <div 
      className="notification-toast"
      style={{
        backgroundColor: current.bg,
        color: current.text,
        border: `1px solid ${current.border}`
      }}
    >
      {current.icon}
      <span>{message}</span>
      <button 
        onClick={onClose}
        style={{
          marginLeft: '0.5rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'inherit',
          display: 'flex',
          alignItems: 'center',
          opacity: 0.6
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default Notification;
