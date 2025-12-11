import { useMemo } from 'react'
import { useCameraContext } from './CameraProvider'
import { useImageCapture, useMediaTrack } from './hooks'

function useCamera() {
  const cameraContext = useCameraContext()
  const { imageCaptureManager } = useImageCapture()
  const { trackManager } = useMediaTrack()
  return useMemo(() => ({
    ...cameraContext,
    imageCaptureManager,
    trackManager,
  }), [cameraContext, imageCaptureManager, trackManager])
}

export default useCamera
