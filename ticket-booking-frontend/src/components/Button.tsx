"use client";

import React from 'react';

type ButtonVariant = 'solid' | 'outline' | 'ghost';
type ButtonColor = 'primary' | 'success' | 'danger' | 'white';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  icon?: string;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  icon,
  isLoading,
  className = '',
  ...props
}) => {
  const baseClass = 'btn-base';
  const variantClass = `btn-${variant}-${color}`;
  const sizeClass = `btn-${size}`;
  
  const combinedClasses = `${baseClass} ${variantClass} ${sizeClass} ${className}`.trim();

  return (
    <button className={combinedClasses} disabled={isLoading} {...props}>
      {isLoading ? (
        <i className="fa-solid fa-spinner fa-spin mr-2"></i>
      ) : icon ? (
        <i className={`${icon} mr-2`}></i>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
