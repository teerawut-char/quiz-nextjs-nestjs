"use client";

import React from 'react';
import AuthLayout from '@/components/AuthLayout';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Link from 'next/link';

export default function SignupPage() {
    return (
        <AuthLayout>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '2.5rem', color: '#1e293b' }}>Sign Up</h1>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <Input
                    label="Full name"
                    id="fullname"
                    type="text"
                    placeholder="Enter your Full Name"
                    icon="fa-solid fa-user"
                />

                <Input
                    label="Email"
                    id="email"
                    type="email"
                    placeholder="Enter your Email Address"
                    icon="fa-solid fa-envelope"
                />

                <Input
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="Create a Password"
                    icon="fa-solid fa-lock"
                    suffixIcon="fa-solid fa-eye-slash"
                />

                <Input
                    label="Confirm Password"
                    id="confirm-password"
                    type="password"
                    placeholder="Re-enter your Password"
                    icon="fa-solid fa-shield-halved"
                    suffixIcon="fa-solid fa-eye-slash"
                />

                <div style={{ marginTop: '1.5rem' }}>
                    <Button
                        type="submit"
                        style={{ width: '100%', padding: '0.875rem', backgroundColor: '#1e95e8' }}
                    >
                        Create an account
                    </Button>
                </div>

                <div style={{ textAlign: 'center', fontSize: '0.75rem', marginTop: '2rem' }}>
                    <span style={{ color: '#64748b' }}>Already have an account?</span>
                    <Link href="/login" style={{ color: '#3b82f6', fontWeight: 600, marginLeft: '0.5rem', textDecoration: 'none' }}>
                        Login
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}
