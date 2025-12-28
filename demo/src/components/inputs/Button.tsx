import React, { type ButtonHTMLAttributes } from 'react';
import * as styles from './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, icon, className, ...props }) => {
  return (
    <button className={`${styles.button} ${className || ''} swiper-no-swiping`} {...props}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {icon}
        {children && <span style={{ fontSize: '10px', marginTop: '4px' }}>{children}</span>}
      </div>
    </button>
  );
};

export default Button;
