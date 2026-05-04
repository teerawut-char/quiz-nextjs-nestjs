"use client";

import React from 'react';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
  style?: React.CSSProperties;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className = '', style }) => {
  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <div className={className} style={style}>
      {/* Tab Buttons */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {currentTab?.content}
      </div>
    </div>
  );
};

export default Tabs;
