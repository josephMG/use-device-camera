import { style } from '@vanilla-extract/css';

export const debugInfo = style({
  fontSize: '10px',
  color: 'rgba(255, 255, 255, 0.4)',
  marginBottom: '8px',
  fontFamily: 'monospace',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const testContainer = style({
  padding: '12px',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  background: 'rgba(0, 0, 0, 0.2)',
});

export const viewerWrapper = style({
  marginBottom: '16px',
});

export const viewerLabel = style({
  fontWeight: 'bold',
  marginBottom: '4px',
  fontSize: '11px',
  color: 'rgba(255, 255, 255, 0.6)',
  textTransform: 'uppercase',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
});

export const viewerPre = style({
  margin: 0,
  padding: '8px',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  borderRadius: '4px',
  overflow: 'auto',
  maxHeight: '300px',
  fontSize: '10px',
  lineHeight: '1.4',
  fontFamily: 'monospace',
  color: 'white',
  textAlign: 'left',
});

