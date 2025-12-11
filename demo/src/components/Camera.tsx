import { assignInlineVars } from '@vanilla-extract/dynamic'
import { useEffect, useMemo, useRef } from 'react'
import * as styles from './styles.css'
import { useCamera } from 'use-device-camera'
import { ControlBar } from './' // Import ControlBar

const isMirrored = false

interface CameraProps {
  size?: { width: number, height: number }
}
function Camera({ size: propSize }: CameraProps) {
  const playerRef = useRef<HTMLVideoElement>(null)
  const { stream, trackManager } = useCamera()

  const size = useMemo(() => {
    const bodySize = document.body.getBoundingClientRect()
    return { width: propSize?.width ?? bodySize.width, height: propSize?.height ?? bodySize?.height }
  }, [propSize])

  useEffect(() => {
    const { width, height } = size
    // if (height > width) {
    //   const temp = width
    //   width = height
    //   height = temp
    // }
    // console.log(width, height)
    const K = 10
    trackManager?.applyConstraints({
      width: { ideal: width },
      height: { ideal: height },
      advanced: [{ width: width * K, height: height * K, aspectRatio: width / height }],
    })
  }, [size, trackManager])

  useEffect(() => {
    if (stream && playerRef && playerRef.current) {
      playerRef.current.srcObject = stream
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop()
        })
      }
    }
  }, [stream])


  // const memoLogs = useMemo(() => {
  //   const logString = (type: 'capabilities' | 'settings' | 'constraints', logObject: Record<string, any> = {}) => `${type}: ${JSON.stringify(logObject ?? {})}`
  //   return [logString('capabilities', trackManager?.getCapabilities()), logString('settings', trackManager?.getSettings()), logString('constraints', trackManager?.getConstraints())].map(s => <div>{s}</div>)
  // }, [trackManager])
  //

  return (
    <div className={styles.container} style={{ ...assignInlineVars({ [styles.ratio]: size.height ? `${String((size.width / size.height) * 1)}%` : undefined }) }}>
      <video
        ref={playerRef}
        className={styles.video}
        style={assignInlineVars({ [styles.mirrored]: isMirrored ? 'rotateY(180deg)' : 'rotateY(0deg)' })}
        id="video"
        muted={true}
        autoPlay={true}
        playsInline={true}
      />
      <ControlBar />
    </div>
  )
}

export default Camera
