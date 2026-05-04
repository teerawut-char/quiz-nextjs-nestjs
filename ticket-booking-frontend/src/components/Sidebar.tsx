"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, LogOut, Clock, Users } from 'lucide-react';

import { useAuthStore } from '@/store/useAuthStore';

interface SidebarProps {
  role: 'user' | 'admin';
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { clearSession } = useAuthStore();

  const menuItems = [
    { name: 'Home', path: role === 'admin' ? '/dashboard/admin' : '/dashboard/user', icon: Home },
    ...(role === 'admin' ? [{ name: 'History', path: '/dashboard/admin/history', icon: Clock }] : []),
    { 
      name: role === 'admin' ? 'Switch to User' : 'Switch to Admin', 
      path: role === 'admin' ? '/dashboard/user' : '/dashboard/admin', 
      icon: Users 
    },
  ];

  const handleLogout = () => {
    clearSession();
    router.push('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>{role === 'admin' ? 'Admin' : 'User'}</h1>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`sidebar-link ${isActive ? 'active' : 'inactive'}`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button
          onClick={handleLogout}
          className="sidebar-link inactive"
          style={{ width: '100%', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', textAlign: 'left' }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
