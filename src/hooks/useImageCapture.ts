import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCameraContext } from '../CameraProvider'

function useImageCapture() {
  const { stream } = useCameraContext()
  const [imageCaptureManager, setImageCaptureManager] = useState<ImageCapture>()
  const [photoSettings, setPhotoSettings] = useState<PhotoSettings>()
  const [photoCapabilities, setPhotoCapabilities] = useState<PhotoCapabilities>()

  const takePhoto = useCallback(async (
    photoSettings: PhotoSettings,
    onError?: (err: unknown) => void,
  ) => {
    if (!imageCaptureManager)
      return null
    try {
      return await imageCaptureManager.takePhoto(photoSettings)
    }
    catch (err) {
      onError?.(err)
    }
    return null
  }, [imageCaptureManager])

  useEffect(() => {
    if (!stream)
      return

    const imageCapture = new ImageCapture(stream.getVideoTracks()?.[0])
    setImageCaptureManager(imageCapture)
    imageCapture.getPhotoCapabilities().then(capabilities => setPhotoCapabilities(capabilities))
    imageCapture.getPhotoSettings().then(settings => setPhotoSettings(settings))
  }, [stream])

  return useMemo(() => ({
    imageCaptureManager,
    takePhoto,
    photoSettings,
    photoCapabilities,
  }), [imageCaptureManager, takePhoto, photoSettings, photoCapabilities])
}

export default useImageCapture
