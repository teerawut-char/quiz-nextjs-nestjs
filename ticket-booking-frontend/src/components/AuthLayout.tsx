import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="auth-container">
      {/* Left Panel: Branding */}
      <div className="auth-panel-left">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white"></div>
            <span className="font-bold tracking-[0.2em] text-xl" style={{ marginLeft: '1rem' }}>BRAND</span>
          </div>
        </div>
        
        <div style={{ maxWidth: '450px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 600, marginBottom: '2rem', lineHeight: '1.2' }}>
            “Powering the tools that power the team.”
          </h2>
          <p style={{ opacity: 0.7, fontSize: '0.875rem', lineHeight: '1.6' }}>
            Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non
          </p>
        </div>
      </div>

      {/* Right Panel: Form */}
      <div className="auth-panel-right">
        <div style={{ width: '100%', maxWidth: '400px' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
