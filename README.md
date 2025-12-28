# use-device-camera

A React hook for easy camera device integration, providing access to media streams, device enumeration, track capabilities, and image capture.

## Installation

```bash
npm install use-device-camera
```

## Usage

### 1. Wrap your app with `CameraProvider`

First, wrap your component tree with `CameraProvider`. This manages the media stream and permissions.

```tsx
import { CameraProvider } from 'use-device-camera';

function App() {
  return (
    <CameraProvider
      initOnMount={true}
      defaultConstraints={{ video: true, audio: false }}
      onPermissionError={(err) => console.error('Permission failed:', err)}
    >
      <MyCameraComponent />
    </CameraProvider>
  );
}
```

### 2. Access the Camera Stream

Use the `useCamera` hook to access the current `MediaStream`, list of devices, and permission states.

```tsx
import { useEffect, useRef } from 'react';
import { useCamera } from 'use-device-camera';

function MyCameraComponent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { stream, devices, loadDevices } = useCamera();

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline muted />
      <button onClick={loadDevices}>Refresh Devices</button>
      <ul>
        {devices.map((device) => (
          <li key={device.deviceId}>{device.label}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 3. Control Media Track (Zoom, Focus, etc.)

Use `useMediaTrack` to access the underlying video track and apply constraints.

```tsx
import { useMediaTrack } from 'use-device-camera';

function Controls() {
  const { applyConstraints, capabilities, settings } = useMediaTrack();

  const handleZoom = (event) => {
    applyConstraints({ advanced: [{ zoom: Number(event.target.value) }] });
  };

  if (!capabilities?.zoom) return null;

  return (
    <input
      type="range"
      min={capabilities.zoom.min}
      max={capabilities.zoom.max}
      step={capabilities.zoom.step}
      onChange={handleZoom}
    />
  );
}
```

### 4. Capture Images

Use `useImageCapture` to take high-resolution photos.

```tsx
import { useImageCapture } from 'use-device-camera';

function Snapshot() {
  const { takePhoto } = useImageCapture();

  const handleCapture = async () => {
    const blob = await takePhoto();
    if (blob) {
      const url = URL.createObjectURL(blob);
      window.open(url);
    }
  };

  return <button onClick={handleCapture}>Take Photo</button>;
}
```

## API

### `<CameraProvider />`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initOnMount` | `boolean` | `true` | Request camera access automatically on mount. |
| `defaultConstraints` | `MediaStreamConstraints` | `{ video: true, audio: true }` | Initial constraints for `getUserMedia`. |
| `onPermissionError` | `(err: unknown) => void` | `undefined` | Callback for permission errors. |

### `useCamera()`

Returns:
- `stream`: `MediaStream | null`
- `devices`: `MediaDeviceInfo[]`
- `requestPermission(constraints?)`: `Promise<MediaStream | null>`
- `loadDevices()`: `Promise<MediaDeviceInfo[]>`
- `cameraPermissionState`: `PermissionState`
- `audioPermissionState`: `PermissionState`

### `useMediaTrack()`

Returns:
- `trackManager`: `MediaStreamTrack | undefined`
- `applyConstraints(constraints)`: `Promise<void>`
- `settings`: `MediaTrackSettings`
- `capabilities`: `MediaTrackCapabilities`

### `useImageCapture()`

Returns:
- `imageCaptureManager`: `ImageCapture | undefined`
- `takePhoto(settings?)`: `Promise<Blob | null>`
- `photoSettings`: `PhotoSettings`
- `photoCapabilities`: `PhotoCapabilities`

## License

MIT
