import type { ReactNode } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const CameraContext = createContext<{
  stream: MediaStream | null
  devices: MediaDeviceInfo[]
  requestPermission: () => Promise<MediaStream | null>
  loadDevices: () => Promise<MediaDeviceInfo[]>
  cameraPermissionState: PermissionState
  audioPermissionState: PermissionState
}>({
  stream: null,
  devices: [],
  requestPermission: () => Promise.resolve(null),
  loadDevices: () => Promise.resolve([]),
  cameraPermissionState: 'denied',
  audioPermissionState: 'denied',
})

interface CameraProviderProps {
  children: ReactNode
  initOnMount?: boolean
  defaultConstraints?: MediaStreamConstraints
  onPermissionError?: (err: unknown) => void
}

export default function CameraProvider({
  children,
  initOnMount = true,
  defaultConstraints = { video: true, audio: true },
  onPermissionError,
}: CameraProviderProps) {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([])
  const [cameraPermissionState, setCameraPermissionState]
    = useState<PermissionState>('denied')
  const [audioPermissionState, setAudioPermissionState]
    = useState<PermissionState>('denied')

  const requestPermission = useCallback(async () => {
    let stream = null
    try {
      stream = await navigator.mediaDevices.getUserMedia(defaultConstraints)
      setStream(stream)
    }
    catch (err) {
      onPermissionError?.(err)
    }
    return stream
  }, [defaultConstraints])

  const loadDevices = useCallback(() => {
    if (!navigator.mediaDevices?.enumerateDevices) {
      console.warn('enumerateDevices() not supported.')
      return Promise.resolve([])
    }
    return new Promise<MediaDeviceInfo[]>((resolve, reject) => navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        setDevices(devices)
        resolve(devices)
      })
      .catch((err) => {
        reject(err)
      }),
    )
  }, [])

  useEffect(() => {
    loadDevices()
  }, [])

  useEffect(() => {
    if (!initOnMount)
      return
    requestPermission()
  }, [initOnMount])

  useEffect(() => {
    navigator.permissions.query({ name: 'camera' }).then((permissionStatus) => {
      permissionStatus.onchange = () => {
        setCameraPermissionState(permissionStatus.state)
      }
    })
    navigator.permissions
      .query({ name: 'microphone' })
      .then((permissionStatus) => {
        permissionStatus.onchange = () => {
          setAudioPermissionState(permissionStatus.state)
        }
      })
  }, [])

  const memoedValue = useMemo(
    () => ({
      stream,
      devices,
      requestPermission,
      loadDevices,
      cameraPermissionState,
      audioPermissionState,
    }),
    [stream, devices, requestPermission, loadDevices, cameraPermissionState, audioPermissionState],
  )

  return (
    <CameraContext.Provider value={memoedValue}>
      {children}
    </CameraContext.Provider>
  )
}

export function useCameraContext() {
  const context = useContext(CameraContext)
  if (!context) {
    throw new Error('Must wrapped with CameraProvider')
  }
  return context
}
