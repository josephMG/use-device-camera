import { style } from '@vanilla-extract/css';

export const button = style({
  background: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '50%',
  width: '48px',
  height: '48px',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: 'white',
  transition: 'all 0.2s',
  outline: 'none',
  ':hover': {
    background: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(1.05)',
  },
  ':active': {
    transform: 'scale(0.95)',
  },
  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
    transform: 'none',
  },
  selectors: {
    '&:focus-visible': {
      boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.5)',
    }
  }
});
