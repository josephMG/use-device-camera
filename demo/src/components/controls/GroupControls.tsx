import React from 'react';
import { ControlGroup, RelatedGroup } from '../inputs';
import { type TrackManager, ConstraintDropdown, ConstraintSlider } from './common';

interface GroupControlProps {
  trackManager: TrackManager | null | undefined;
}

export const FocusControl: React.FC<GroupControlProps> = ({ trackManager }) => {
  const capabilities = trackManager?.capabilities
  const settings = trackManager?.settings
  if (!capabilities || !('focusMode' in capabilities)) return null;
  if (!settings || !('focusMode' in settings)) return null;

  const setting = settings.focusMode as string;
  const isManual = setting === 'manual' || setting === 'none';

  return (
    <ControlGroup
      title="focus"
      primaryControl={<ConstraintDropdown trackManager={trackManager} capabilityKey="focusMode" />}
      isManual={isManual}
      dependentControls={[
        <ConstraintSlider key="focusDistance" trackManager={trackManager} capabilityKey="focusDistance" />
      ]}
    />
  );
};

export const ExposureControl: React.FC<GroupControlProps> = ({ trackManager }) => {
  const capabilities = trackManager?.capabilities
  const settings = trackManager?.settings
  if (!capabilities || !('exposureMode' in capabilities)) return null;
  if (!settings || !('exposureMode' in settings)) return null;

  const setting = settings.exposureMode;
  const isManual = setting === 'manual' || setting === 'none';

  return (
    <ControlGroup
      title="exposure"
      primaryControl={<ConstraintDropdown trackManager={trackManager} capabilityKey="exposureMode" />}
      isManual={isManual}
      dependentControls={[
        <ConstraintSlider key="exposureCompensation" trackManager={trackManager} capabilityKey="exposureCompensation" />,
        <ConstraintSlider key="exposureTime" trackManager={trackManager} capabilityKey="exposureTime" />,
        <ConstraintSlider key="iso" trackManager={trackManager} capabilityKey="iso" />
      ]}
    />
  );
};

export const WhiteBalanceControl: React.FC<GroupControlProps> = ({ trackManager }) => {
  const capabilities = trackManager?.capabilities
  
  const hasMode = capabilities && 'whiteBalanceMode' in capabilities;
  const hasTemp = capabilities && 'colorTemperature' in capabilities;

  if (!hasMode && !hasTemp) return null;

  return (
    <RelatedGroup title="white balance">
      {hasMode && (
        <ConstraintDropdown 
          trackManager={trackManager} 
          capabilityKey="whiteBalanceMode" 
          getRelatedConstraints={(value) => value === 'continuous' ? { colorTemperature: 0 } : undefined}
        />
      )}
      {hasTemp && <ConstraintSlider trackManager={trackManager} capabilityKey="colorTemperature" />}
    </RelatedGroup>
  );
};

export const ResolutionControl: React.FC<GroupControlProps> = ({ trackManager }) => {
  const capabilities = trackManager?.capabilities;
  
  const hasHeight = capabilities && 'height' in capabilities;
  const hasWidth = capabilities && 'width' in capabilities;
  const hasAspectRatio = capabilities && 'aspectRatio' in capabilities;

  if (!hasHeight && !hasWidth && !hasAspectRatio) return null;

  return (
    <RelatedGroup title="Resolution">
      {hasHeight && <ConstraintSlider trackManager={trackManager} capabilityKey="height" />}
      {hasWidth && <ConstraintSlider trackManager={trackManager} capabilityKey="width" />}
      {hasAspectRatio && <ConstraintSlider trackManager={trackManager} capabilityKey="aspectRatio" />}
    </RelatedGroup>
  );
};

