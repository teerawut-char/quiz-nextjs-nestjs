"use client";

import React from 'react';
import Button from '@/components/Button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const navItems = [
    { id: 'home', label: 'Home', icon: 'fa-solid fa-house', href: '/admin' },
    { id: 'history', label: 'History', icon: 'fa-solid fa-clock-rotate-left', href: '/admin/history' },
    { id: 'switch', label: 'Switch to user', icon: 'fa-solid fa-arrows-rotate', href: '/' },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ padding: '1.5rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>Admin</h1>
        </div>
        
        <nav className="sidebar-section">
          <ul style={{ listStyle: 'none' }}>
            {navItems.map((item) => (
              <li key={item.id}>
                <Link 
                  href={item.href} 
                  className={`nav-item ${pathname === item.href ? 'active' : ''}`}
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <Button 
            variant="ghost" 
            size="sm" 
            style={{ width: '100%', justifyContent: 'flex-start', color: '#64748b' }} 
            icon="fa-solid fa-right-from-bracket"
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
