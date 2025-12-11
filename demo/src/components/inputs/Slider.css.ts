import { style } from '@vanilla-extract/css'

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  marginBottom: '16px',
  color: 'white',
  fontFamily: 'sans-serif',
})

export const label = style({
  fontSize: '14px',
  fontWeight: 'bold',
  textTransform: 'capitalize',
})

export const slider = style({
  WebkitAppearance: 'none',
  appearance: 'none',
  width: '100%',
  height: '8px',
  borderRadius: '5px',
  background: '#d3d3d3',
  outline: 'none',
  opacity: 0.7,
  transition: 'opacity .2s',
  ':hover': {
    opacity: 1,
  },
  '::-webkit-slider-thumb': {
    WebkitAppearance: 'none',
    appearance: 'none',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: '#4CAF50',
    cursor: 'pointer',
  },
  '::-moz-range-thumb': {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: '#4CAF50',
    cursor: 'pointer',
  },
})
