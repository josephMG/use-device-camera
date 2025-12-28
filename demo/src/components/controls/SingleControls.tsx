import React from 'react';
import { ConstraintToggle, ConstraintSlider, ConstraintDropdown, type TrackManager } from './common';

interface ControlProps {
  trackManager: TrackManager | null | undefined;
}

// Toggles
export const TorchControl: React.FC<ControlProps> = (props) => <ConstraintToggle capabilityKey="torch" {...props} />;
export const AutoGainControl: React.FC<ControlProps> = (props) => <ConstraintToggle capabilityKey="autoGainControl" {...props} />;
export const NoiseSuppressionControl: React.FC<ControlProps> = (props) => <ConstraintToggle capabilityKey="noiseSuppression" {...props} />;
export const SuppressLocalAudioPlaybackControl: React.FC<ControlProps> = (props) => <ConstraintToggle capabilityKey="suppressLocalAudioPlayback" {...props} />;
export const LogicalSurfaceControl: React.FC<ControlProps> = (props) => <ConstraintToggle capabilityKey="logicalSurface" {...props} />;
export const RestrictOwnAudioControl: React.FC<ControlProps> = (props) => <ConstraintToggle capabilityKey="restrictOwnAudio" {...props} />;

// Sliders
export const ZoomControl: React.FC<ControlProps> = (props) => <ConstraintSlider capabilityKey="zoom" {...props} />;
export const BrightnessControl: React.FC<ControlProps> = (props) => <ConstraintSlider capabilityKey="brightness" {...props} />;
export const ContrastControl: React.FC<ControlProps> = (props) => <ConstraintSlider capabilityKey="contrast" {...props} />;
export const SaturationControl: React.FC<ControlProps> = (props) => <ConstraintSlider capabilityKey="saturation" {...props} />;
export const SharpnessControl: React.FC<ControlProps> = (props) => <ConstraintSlider capabilityKey="sharpness" {...props} />;
export const LatencyControl: React.FC<ControlProps> = (props) => <ConstraintSlider capabilityKey="latency" {...props} />;
export const VolumeControl: React.FC<ControlProps> = (props) => <ConstraintSlider capabilityKey="volume" {...props} />;
export const ChannelCountControl: React.FC<ControlProps> = (props) => <ConstraintSlider capabilityKey="channelCount" {...props} />;
export const SampleRateControl: React.FC<ControlProps> = (props) => <ConstraintSlider capabilityKey="sampleRate" {...props} />;
export const SampleSizeControl: React.FC<ControlProps> = (props) => <ConstraintSlider capabilityKey="sampleSize" {...props} />;
export const FrameRateControl: React.FC<ControlProps> = (props) => <ConstraintSlider capabilityKey="frameRate" {...props} />;
// height, width, aspectRatio are ignored in ControlBar, so I'll skip them or add them if requested. 
// User said "replace... explicit and individual". I will add them just in case but ControlBar ignored them. 
// I'll skip them for now to match ControlBar logic which explicitly returns null for them.

// Dropdowns
export const FacingModeControl: React.FC<ControlProps> = (props) => <ConstraintDropdown capabilityKey="facingMode" {...props} />;
export const ResizeModeControl: React.FC<ControlProps> = (props) => <ConstraintDropdown capabilityKey="resizeMode" {...props} />;
export const DisplaySurfaceControl: React.FC<ControlProps> = (props) => <ConstraintDropdown capabilityKey="displaySurface" {...props} />;
export const EchoCancellationControl: React.FC<ControlProps> = (props) => <ConstraintDropdown capabilityKey="echoCancellation" {...props} />;
