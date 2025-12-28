import { style } from '@vanilla-extract/css'

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginBottom: '20px',
  color: 'white',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
})

export const label = style({
  fontSize: '13px',
  fontWeight: '500',
  color: 'rgba(255, 255, 255, 0.8)',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  display: 'flex',
  justifyContent: 'space-between',
})

export const slider = style({
  WebkitAppearance: 'none',
  appearance: 'none',
  width: '100%',
  height: '4px',
  borderRadius: '2px',
  background: 'rgba(255, 255, 255, 0.2)',
  outline: 'none',
  transition: 'background .2s',
  ':hover': {
    background: 'rgba(255, 255, 255, 0.3)',
  },
  '::-webkit-slider-thumb': {
    WebkitAppearance: 'none',
    appearance: 'none',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    background: '#ffffff',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
    transition: 'transform 0.1s',
  },
  '::-moz-range-thumb': {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    background: '#ffffff',
    cursor: 'pointer',
    border: 'none',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
  },
  selectors: {
    '&:active::-webkit-slider-thumb': {
      transform: 'scale(1.2)',
    }
  }
})
