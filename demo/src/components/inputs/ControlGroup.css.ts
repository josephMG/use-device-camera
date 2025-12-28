import { style } from '@vanilla-extract/css';

export const groupWrapper = style({
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '12px',
  padding: '16px',
  marginBottom: '16px',
});

export const groupTitle = style({
  color: 'rgba(255, 255, 255, 0.9)',
  fontSize: '14px',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '16px',
});

export const dependentControl = style({
  paddingLeft: '12px',
  borderLeft: '2px solid rgba(255, 255, 255, 0.1)',
  marginTop: '16px',
});
