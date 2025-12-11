import { useMediaTrack } from 'use-device-camera'
import { Slider, Dropdown, Toggle } from './inputs'


export default function ControlBar() {
  const trackManager = useMediaTrack()
  const capabilities = trackManager?.capabilities // useMemo(() => , [trackManager])
  const settings = trackManager?.settings // useMemo(() => , [trackManager])

  if (!capabilities || !settings) {
    return null
  }

  const handleConstraintChange = (key: string, value: any) => {
    trackManager?.applyConstraints({
      [key]: value,
    }).then(() => {
    }).catch(error => {
      console.error("Error applying constraints:", error);
    });
  }

  return (
    <div style={{ padding: '16px', background: 'rgba(0,0,0,0.5)', borderRadius: '8px', marginTop: '16px', maxWidth: '300px', maxHeight: '80vh', overflowY: 'auto' }}>
      <h3 style={{ color: 'white', marginBottom: '20px' }}>Camera Controls</h3>
      {Object.entries(capabilities).map(([key, capability]) => {
        const currentValue = (settings as any)[key]

        // Skip deviceId and groupId as they are not user-controllable
        if (key === 'deviceId' || key === 'groupId') {
          return null
        }

        // Handle boolean capabilities (e.g., torch)
        if (typeof capability === 'boolean' && capability !== undefined) {
          return (
            <Toggle
              key={key}
              label={key}
              value={currentValue === true}
              onChange={(newValue) => handleConstraintChange(key, newValue)}
            />
          )
        }

        // Handle array capabilities (e.g., exposureMode, focusMode, whiteBalanceMode, resizeMode)
        if (Array.isArray(capability) && capability.length > 1) { // If only one option, no need for dropdown
          return (
            <Dropdown
              key={key}
              label={key}
              options={capability as string[]}
              value={currentValue as string}
              onChange={(newValue) => handleConstraintChange(key, newValue)}
            />
          )
        }
        
        // Handle min/max/step capabilities (e.g., zoom, exposureCompensation, focusDistance, iso, colorTemperature, frameRate, aspectRatio, height, width, exposureTime)
        if (
          typeof capability === 'object' &&
          capability !== null &&
          ('min' in capability || 'max' in capability)
        ) {
          const min = (capability as any).min ?? 0
          const max = (capability as any).max ?? 1
          const step = (capability as any).step ?? (max - min) / 100 // Default step if not provided

          // Special handling for aspectRatio, height, width which are currently set by Camera.tsx
          // I will temporarily skip them to avoid conflict, but will consider removing the logic from Camera.tsx later
          if (['aspectRatio', 'height', 'width'].includes(key)) {
            return null
          }

          return (
            <Slider
              key={key}
              label={key}
              min={min}
              max={max}
              step={step}
              value={currentValue ?? min} // Default to min if currentValue is undefined
              onChange={(newValue) => handleConstraintChange(key, newValue)}
            />
          )
        }

        return null
      })}
    </div>
  )
}
