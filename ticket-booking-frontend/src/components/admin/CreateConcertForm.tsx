"use client";

import React, { useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { createConcertAction } from '@/actions/admin';
import { ICreateConcert } from '@/types/concert.types';
import { Save } from 'lucide-react';

interface CreateConcertFormProps {
  onCreated: () => void;
  onError: (msg: string) => void;
}

const CreateConcertForm: React.FC<CreateConcertFormProps> = ({ onCreated, onError }) => {
  const [formData, setFormData] = useState<ICreateConcert>({
    name: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    price: 1000,
    totalSeats: 500
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'totalSeats' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const submissionData = {
      ...formData,
      date: new Date(formData.date).toISOString()
    };

    const res = await createConcertAction(submissionData);
    setLoading(false);

    if (res.code === '000') {
      onCreated();
    } else {
      onError(res.message || 'Failed to create concert');
    }
  };

  return (
    <div className="form-container tabs-container" style={{ padding: '1.5rem' }}>
      <h2 className="form-title">Create</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <Input 
            label="Concert Name" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Please input concert name" 
            required
          />
          <Input 
            label="Total of seat" 
            name="totalSeats"
            type="number" 
            value={formData.totalSeats.toString()}
            onChange={handleChange}
            placeholder="500" 
            suffixIcon="fa-regular fa-user" 
            required
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <Input 
            label="Description" 
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Please input description" 
            isTextArea={true} 
            rows={4} 
            required
          />
        </div>

        <div className="form-footer">
          <Button 
            type="submit" 
            disabled={loading}
            style={{ 
              backgroundColor: '#1c92f2', 
              padding: '0.75rem 2.5rem',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer'
            }}
          >
            {loading ? (
              <span className="spinner"></span>
            ) : (
              <>
                <Save size={18} />
                <span>Save</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateConcertForm;
