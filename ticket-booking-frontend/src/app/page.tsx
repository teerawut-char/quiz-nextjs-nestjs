"use client";

import React from 'react';
import Button from '@/components/Button';
import Link from 'next/link';

export default function Home() {
    return (
        <main style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
            {/* Header */}
            <header style={{ padding: '1.5rem 2.5rem' }}>
                <div className="brand-logo" style={{ fontSize: '0.875rem', letterSpacing: '0.1em' }}>
                    <div className="logo-dot" style={{ width: '0.75rem', height: '0.75rem' }}></div>
                    <span>BRAND</span>
                </div>
            </header>

            {/* Main Content */}
            <section className="container" style={{ textAlign: 'center', paddingTop: '2rem', paddingBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(1.5rem, 8vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem', color: '#1e293b', lineHeight: 1.2 }}>
                    Select Access Level
                </h1>
                <p className="text-muted" style={{ maxWidth: '400px', margin: '0 auto 4rem', fontSize: '0.875rem', padding: '0 1rem' }}>
                    Lorem ipsum dolor sit amet consectetur. Elit purus nam.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 450px))',
                    gap: '2.5rem',
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    padding: '0 1rem'
                }}>
                    {/* User Card */}
                    <div style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '1rem',
                        padding: '4rem 3rem',
                        border: '1px solid #f1f5f9',
                        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'left'
                    }}>
                        <div style={{ color: '#0071ad', marginBottom: '2rem' }}>
                            <svg fill="none" height="64" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="64" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                <circle cx="12" cy="11" r="3"></circle>
                                <path d="M17 17v-1a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1"></path>
                            </svg>
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#0071ad', marginBottom: '1.5rem' }}>User</h2>
                        <p className="text-muted" style={{ fontSize: '0.875rem', lineHeight: '1.8', marginBottom: '4rem' }}>
                            Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non
                        </p>
                        <div style={{ marginTop: 'auto' }}>
                            <Button
                                style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
                                onClick={() => window.location.href = '/login'}
                            >
                                Enter Workspace <span style={{ marginLeft: '0.5rem' }}>→</span>
                            </Button>
                        </div>
                    </div>

                    {/* Administrator Card */}
                    <div style={{
                        backgroundColor: '#0071ad',
                        borderRadius: '1rem',
                        padding: '4rem 3rem',
                        color: '#ffffff',
                        boxShadow: '0 15px 35px -5px rgba(0, 113, 173, 0.3)',
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'left'
                    }}>
                        <div style={{ color: '#ffffff', marginBottom: '2rem' }}>
                            <svg fill="none" height="64" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="64" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M15 13l2 2"></path>
                                <path d="M22 13l-2 2"></path>
                                <path d="M17 18l2 2"></path>
                                <path d="M22 18l-2-2"></path>
                                <circle cx="18.5" cy="15.5" r="3.5"></circle>
                            </svg>
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem' }}>Administrator</h2>
                        <p style={{ fontSize: '0.875rem', lineHeight: '1.6', opacity: 0.8, marginBottom: '4rem' }}>
                            Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non
                        </p>
                        <div style={{ marginTop: 'auto' }}>
                            <Button
                                color="white"
                                style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
                                onClick={() => window.location.href = '/login'}
                            >
                                Enter Portal <span style={{ marginLeft: '0.5rem' }}>→</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
