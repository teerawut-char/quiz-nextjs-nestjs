"use client";

import React, { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  icon?: string;
  suffixIcon?: string;
  isTextArea?: boolean;
  rows?: number; // Explicitly support rows for textarea
}

const Input: React.FC<InputProps> = ({
  label,
  icon,
  suffixIcon,
  isTextArea = false,
  id,
  type,
  rows,
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === 'password';
  const currentType = isPasswordType ? (showPassword ? 'text' : 'password') : type;

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const currentSuffixIcon = isPasswordType 
    ? (showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash')
    : suffixIcon;

  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <div className="input-with-icon" style={{ position: 'relative' }}>
        {icon && (
          <span style={{ position: 'absolute', left: '0.75rem', top: isTextArea ? '1rem' : '50%', transform: isTextArea ? 'none' : 'translateY(-50%)', color: '#94a3b8' }}>
            <i className={icon}></i>
          </span>
        )}
        
        {isTextArea ? (
          <textarea
            id={id}
            rows={rows}
            className={`input-control ${className}`}
            style={{ paddingLeft: icon ? '2.5rem' : '0.75rem' }}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={id}
            type={currentType}
            className={`input-control ${className}`}
            style={{ 
              paddingLeft: icon ? '2.5rem' : '0.75rem',
              paddingRight: currentSuffixIcon ? '2.5rem' : '0.75rem'
            }}
            {...props}
          />
        )}

        {currentSuffixIcon && (
          <span 
            onClick={isPasswordType ? handleTogglePassword : undefined}
            style={{ 
              position: 'absolute', 
              right: '0.75rem', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#94a3b8', 
              cursor: isPasswordType ? 'pointer' : 'default' 
            }}
          >
            <i className={currentSuffixIcon}></i>
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
