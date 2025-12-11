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
      width: '50%',
      margin: '0 auto',
    },
    '(orientation: portrait)': {
      width: '100vw',
      height: '70vh'
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
