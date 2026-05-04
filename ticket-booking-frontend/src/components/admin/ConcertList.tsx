"use client";

import React from 'react';
import Card from '@/components/Card';
import { IConcert } from '@/types/concert.types';
import { Trash2, Users, User as UserIcon } from 'lucide-react';

interface ConcertListProps {
  concerts: IConcert[];
  onDelete: (concert: IConcert) => void;
  loading: boolean;
}

const ConcertList: React.FC<ConcertListProps> = ({ concerts, onDelete, loading }) => {
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (concerts.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem', color: '#94a3b8' }}>
        <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No concerts found</div>
        <p>Create one to get started!</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {concerts.map((concert) => (
        <Card key={concert.id} style={{ padding: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderRadius: '0.5rem' }}>
          <div className="concert-card-body">
            <div className="concert-card-header">
              <h2 className="concert-title">{concert.name}</h2>
            </div>
            
            <p className="concert-description">{concert.description}</p>
            
            <div className="concert-footer">
              <div className="concert-stats-info">
                <UserIcon size={20} strokeWidth={1.5} />
                <span>{concert.totalSeats}</span>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={() => onDelete(concert)}
                  className="concert-action-btn"
                >
                  <Trash2 size={18} strokeWidth={2} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ConcertList;
