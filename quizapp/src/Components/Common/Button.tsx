import React from 'react';
import { Button as ReactStrapButton } from 'reactstrap';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  size?: 'sm' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  color = 'primary',
  disabled = false,
  type = 'button',
  className = '',
  size,
}) => {
  return (
    <ReactStrapButton
      color={color}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={className}
      size={size}
    >
      {children}
    </ReactStrapButton>
  );
};