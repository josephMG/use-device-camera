import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCamera } from '../CameraProvider'

function useMediaTrack() {
  const { stream } = useCamera()
  const [trackManager, setTrackManager] = useState<MediaStreamTrack>()
  const [constraints, setConstraints] = useState<MediaTrackConstraints>()
  const [settings, setSettings] = useState<MediaTrackSettings>()
  const [capabilities, setCapabilities] = useState<MediaTrackCapabilities>()

  const applyConstraints = useCallback(async (
    constraints: MediaTrackConstraints,
    onError?: (err: unknown) => void,
  ) => {
    if (!trackManager)
      return
    try {
      await trackManager?.applyConstraints(constraints)
      setSettings(trackManager?.getSettings())
      return
    }
    catch (err) {
      onError?.(err)
    }
    return null
  }, [trackManager])

  useEffect(() => {
    if (!stream)
      return

    const track = stream.getVideoTracks()?.[0]
    setTrackManager(track)
    setCapabilities(track?.getCapabilities())
    setSettings(track?.getSettings())
    setConstraints(track?.getConstraints())
  }, [stream])

  return useMemo(() => ({
    trackManager,
    applyConstraints,
    constraints,
    settings,
    capabilities,
  }), [trackManager, applyConstraints, constraints, settings, capabilities])
}

export default useMediaTrack
