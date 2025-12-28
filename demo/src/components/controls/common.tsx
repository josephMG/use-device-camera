import React, { useCallback } from 'react';
import { Slider, Dropdown, Toggle } from '../inputs';

export interface TrackManager {
  capabilities?: MediaTrackCapabilities;
  settings?: MediaTrackSettings;
  applyConstraints: (constraints: MediaTrackConstraints) => Promise<void>;
}

export type ConstraintValue = string | number | boolean;
export type RelatedConstraints = Record<string, ConstraintValue>;

interface BaseControlProps {
  trackManager: TrackManager | null | undefined;
  capabilityKey: string;
  label?: string;
  getRelatedConstraints?: (value?: ConstraintValue) => (RelatedConstraints | undefined);
  [key: string]: unknown;
}

const useConstraintHandler = (trackManager: TrackManager | null | undefined) => {
  return useCallback((key: string, value: ConstraintValue, extraConstraints?: RelatedConstraints) => {
    trackManager?.applyConstraints({
      advanced: [{
        [key]: value,
        ...(extraConstraints ?? {})
      }]
    }).catch(error => {
      console.error("Error applying constraints:", error);
    });
  }, [trackManager]);
};

export const ConstraintToggle: React.FC<BaseControlProps> = ({ trackManager, capabilityKey, label, getRelatedConstraints }) => {
  const handleConstraintChange = useConstraintHandler(trackManager);
  
  if (!trackManager?.capabilities || !trackManager?.settings) return null;
  
  const capability = trackManager.capabilities[capabilityKey as keyof MediaTrackCapabilities];
  const setting = trackManager.settings[capabilityKey as keyof MediaTrackSettings];

  if (capability === undefined) return null;

  return (
    <Toggle
      label={label || capabilityKey}
      value={setting === true}
      onChange={(val) => {
        const extra = getRelatedConstraints?.(val);
        handleConstraintChange(capabilityKey, val, extra);
      }}
    />
  );
};

export const ConstraintSlider: React.FC<BaseControlProps> = ({ trackManager, capabilityKey, label, getRelatedConstraints, ...props }) => {
  const handleConstraintChange = useConstraintHandler(trackManager);

  if (!trackManager?.capabilities || !trackManager?.settings) return null;

  const capability = trackManager.capabilities[capabilityKey as keyof MediaTrackCapabilities];
  const setting = trackManager.settings[capabilityKey as keyof MediaTrackSettings];

  if (typeof capability !== 'object' || capability === null || (!('min' in capability) && !('max' in capability))) return null;
  
  const { min, max, step } = capability as MediaSettingsRange;
  const sliderMin = Number(min ?? 0);
  const sliderMax = Number(max ?? 1);
  const sliderStep = step ?? (sliderMax - sliderMin) / 100;
  const value = (setting as number) ?? sliderMin;

  return (
    <Slider
      label={label || capabilityKey}
      min={sliderMin}
      max={sliderMax}
      step={sliderStep}
      value={value}
      onChange={(val) => {
        const extra = getRelatedConstraints?.(val);
        handleConstraintChange(capabilityKey, val, extra);
      }}
      {...props}
    />
  );
};

export const ConstraintDropdown: React.FC<BaseControlProps> = ({ trackManager, capabilityKey, label, getRelatedConstraints, ...props }) => {
  const handleConstraintChange = useConstraintHandler(trackManager);

  if (!trackManager?.capabilities || !trackManager?.settings) return null;

  const capability = trackManager.capabilities[capabilityKey as keyof MediaTrackCapabilities];
  const setting = trackManager.settings[capabilityKey as keyof MediaTrackSettings];

  if (!Array.isArray(capability) || capability.length <= 0) return null;

  const options = [...(capability as string[])];
  if (options.includes('manual') && !options.includes('none')) {
    options.push('none');
  }

  return (
    <Dropdown
      label={label || capabilityKey}
      options={options}
      value={setting as string}
      onChange={(val) => {
        const extra = getRelatedConstraints?.(val);
        handleConstraintChange(capabilityKey, val, extra);
      }}
      {...props}
    />
  );
};
