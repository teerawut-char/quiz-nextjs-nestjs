"use client";

import React from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';

interface ConcertListProps {
    onDelete: (id: string) => void;
}

const ConcertList: React.FC<ConcertListProps> = ({ onDelete }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
            {[1, 2].map((i) => (
                <Card key={i}>
                    <h3 style={{ color: '#3b82f6', fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
                        Concert Name {i}
                    </h3>
                    <hr style={{ border: 'none', borderBottom: '1px solid #e2e8f0', marginBottom: '1.5rem' }} />
                    <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.5rem', maxWidth: '800px' }}>
                        Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non. Fusce dignissim turpis sed non est orci sed in. Blandit ut purus nunc sed donec commodo morbi diam scelerisque.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.875rem' }}>
                            <i className="fa-regular fa-user"></i>
                            <span>{i === 1 ? '500' : '200'}</span>
                        </div>
                        <Button color="danger" size="sm" icon="fa-solid fa-trash-can" onClick={() => onDelete(i.toString())}>
                            Delete
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default ConcertList;
