import React from 'react';

interface CardProps {
  children: React.ReactNode;
  variant?: 'white' | 'blue' | 'green' | 'red';
  className?: string;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, variant = 'white', className = '', style }) => {
  const isColored = variant !== 'white';
  
  const baseStyle: React.CSSProperties = {
    backgroundColor: isColored ? `var(--${variant === 'blue' ? 'info' : variant})` : 'white', // mapping blue to info color if needed, but I defined them in globals.css
    color: isColored ? 'white' : 'inherit',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    border: isColored ? 'none' : '1px solid var(--border)',
    boxShadow: 'var(--card-shadow)',
    width: '100%',
    ...style
  };

  // Re-adjusting color names to match my globals.css if necessary
  if (variant === 'blue') baseStyle.backgroundColor = '#0070a2';
  if (variant === 'green') baseStyle.backgroundColor = '#00a389';
  if (variant === 'red') baseStyle.backgroundColor = '#f05252';

  return (
    <div style={baseStyle} className={className}>
      {children}
    </div>
  );
};

export default Card;
