import { style } from '@vanilla-extract/css'

export const wrapper = style({
  display: 'flex',
  alignItems: 'center',
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

export const toggleSwitch = style({
  position: 'relative',
  display: 'inline-block',
  width: '40px',
  height: '24px',
})

export const toggleInput = style({
  opacity: 0,
  width: 0,
  height: 0,
  ':checked + span': {
    backgroundColor: '#4CAF50',
  },
  ':focus + span': {
    boxShadow: '0 0 1px #4CAF50',
  },
  ':checked + span:before': {
    transform: 'translateX(16px)',
  },
})

export const toggleSlider = style({
  position: 'absolute',
  cursor: 'pointer',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: '#ccc',
  transition: '.4s',
  borderRadius: '24px',
  '::before': {
    position: 'absolute',
    content: '""',
    height: '16px',
    width: '16px',
    left: '4px',
    bottom: '4px',
    backgroundColor: 'white',
    transition: '.4s',
    borderRadius: '50%',
  },
})
