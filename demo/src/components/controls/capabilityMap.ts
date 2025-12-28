import { Slider, Dropdown, Toggle } from '../inputs';

const capabilityToComponent: Record<string, typeof Toggle | typeof Slider | typeof Dropdown> = {
  // ConstrainBoolean
  torch: Toggle,
  autoGainControl: Toggle,
  noiseSuppression: Toggle,
  suppressLocalAudioPlayback: Toggle,
  logicalSurface: Toggle,
  restrictOwnAudio: Toggle,

  // ConstrainDouble
  latency: Slider,
  volume: Slider,
  exposureCompensation: Slider,
  colorTemperature: Slider,
  iso: Slider,
  brightness: Slider,
  contrast: Slider,
  saturation: Slider,
  sharpness: Slider,
  focusDistance: Slider,
  zoom: Slider,
  aspectRatio: Slider,
  frameRate: Slider,
  exposureTime: Slider,

  // ConstrainULong
  channelCount: Slider,
  sampleRate: Slider,
  sampleSize: Slider,
  height: Slider,
  width: Slider,

  // ConstrainDOMString
  deviceId: Dropdown,
  groupId: Dropdown,
  whiteBalanceMode: Dropdown,
  exposureMode: Dropdown,
  focusMode: Dropdown,
  facingMode: Dropdown,
  resizeMode: Dropdown,
  displaySurface: Dropdown,

  // Special case for echoCancellation
  echoCancellation: Dropdown, // Can be boolean or string array
};

export const capabilityGroups: Record<string, { primary: string; controls: string[] }> = {
  focus: {
    primary: 'focusMode',
    controls: ['focusDistance'],
  },
  exposure: {
    primary: 'exposureMode',
    controls: ['exposureCompensation', 'exposureTime', 'iso'],
  },
};

export const capabilityRelated: [string[]] = (
  [['whiteBalanceMode', 'colorTemperature']]
)
export default capabilityToComponent;
