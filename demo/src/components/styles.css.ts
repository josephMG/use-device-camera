import { createVar, style } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'

export const ratio = createVar()
export const container = style({
  position: !ratio ? 'absolute' : 'relative',
  paddingBottom: !ratio ? undefined : `${calc(ratio).toString()}`,
  top: 0,
  left: 0,
  width: '100vw',
  height: '80vh',
  backgroundColor: '#000',
  '@media': {
    'screen and (orientation: landscape) and (max-width: 1024px)': {
      width: '80vw',
      height: '100vh',
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
  
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: '100vw',
  height: '20vh',
  zIndex: 10,
  
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px 16px 0 0',
  color: '#ffffff',
  boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.4)',
  
  '@media': {
    'screen and (orientation: landscape) and (max-width: 1024px)': {
      top: 0,
      right: 0,
      bottom: 'auto',
      left: 'auto',
      
      width: '20vw',
      height: '100vh',
      
      borderTop: 'none',
      borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '0',
      boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.4)',
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
