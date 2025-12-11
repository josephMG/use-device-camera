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

export const select = style({
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  backgroundColor: '#333',
  color: 'white',
  fontSize: '14px',
})
