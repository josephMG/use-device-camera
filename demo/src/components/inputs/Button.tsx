import React, { type ButtonHTMLAttributes } from 'react';
import * as styles from './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, icon, className, ...props }) => {
  return (
    <button className={`${styles.button} ${className || ''} swiper-no-swiping`} {...props}>
      {icon || children}
    </button>
  );
};

export default Button;
