import { createVar, style } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'

export const ratio = createVar()
export const container = style({
  bottom: 0,
  top: 0,
  left: 0,
  right: 0,
  position: !ratio ? 'absolute' : 'relative',
  paddingBottom: !ratio ? undefined : `${calc(ratio).toString()}`,
  '@media': {
    '(orientation: landscape)': {
      width: '80%',
      margin: '0 auto',
      // Override for mobile landscape (narrow height or specific width) could be added if needed,
      // but for now keeping the 50% for general landscape.
      // Wait, user asked for "Landscape: video 80vw, controls 20vw". 
      // I will prioritize the user's explicit request for "Landscape version" which likely implies the mobile context.
    },
    '(orientation: portrait)': {
      width: '100vw',
      height: '80vh', // Updated to 80vh
      position: 'fixed', // Fix to top
      top: 0,
    },
    // Adding specific rule for mobile landscape to match request
    'screen and (orientation: landscape) and (max-width: 900px)': {
      width: '80vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      margin: 0,
    }
  }
})

export const mirrored = createVar()
// ({
//   user: { transform: 'rotateY(0deg)' },
//   environment: { transform: 'rotateY(180deg)' },
// })
export const video = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex: 0,
  transform: mirrored,
})

export const controlBarContainer = style({
  background: 'rgba(20, 20, 20, 0.8)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  marginTop: '16px',
  // maxWidth: '360px',
  width: '100%',
  maxHeight: '20vh',
  overflowY: 'auto',
  color: '#ffffff',
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
  '::-webkit-scrollbar': {
    width: '6px',
  },
  '::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '3px',
  },
  '@media': {
    '(orientation: portrait)': {
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100vw',
      height: '20vh', // Updated to 20vh
      maxHeight: 'none',
      maxWidth: 'none',
      marginTop: 0,
      borderRadius: '16px 16px 0 0',
      border: 'none',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      zIndex: 10,
    },
    'screen and (orientation: landscape) and (max-width: 900px)': {
      position: 'fixed',
      right: 0,
      top: 0,
      width: '20vw',
      height: '100vh',
      maxHeight: 'none',
      maxWidth: 'none',
      marginTop: 0,
      borderRadius: '0',
      border: 'none',
      borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '12px',
      zIndex: 10,
    }
  }
});

export const sectionHeader = style({
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '24px',
  color: '#fff',
  letterSpacing: '0.5px',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
  paddingBottom: '12px',
});
