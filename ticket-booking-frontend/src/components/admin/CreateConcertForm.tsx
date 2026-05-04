"use client";

import React from 'react';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';

interface CreateConcertFormProps {
	onSave: (e: React.FormEvent) => void;
}

const CreateConcertForm: React.FC<CreateConcertFormProps> = ({ onSave }) => {
	return (
		<Card style={{ marginTop: '1rem' }}>
			<div style={{ marginBottom: '2rem' }}>
				<h2 style={{ color: '#3b82f6', fontSize: '1.5rem', fontWeight: 700 }}>Create</h2>
			</div>
			<form onSubmit={onSave}>
				<div style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
					gap: '2rem',
					marginBottom: '1.5rem'
				}}>
					<Input label="Concert Name" placeholder="Please input concert name" />
					<Input label="Total of seat" type="number" placeholder="500" suffixIcon="fa-regular fa-user" />
				</div>
				<Input label="Description" placeholder="Please input description" isTextArea={true} rows={4} />
				<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
					<Button type="submit" icon="fa-solid fa-floppy-disk" style={{ backgroundColor: '#1c92f2' }}>
						Save
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default CreateConcertForm;
