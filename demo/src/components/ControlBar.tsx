import { useCamera, useImageCapture, useMediaTrack } from 'use-device-camera';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSwiperDirection } from '../hooks/useSwiperDirection';

import {
  FocusControl,
  ExposureControl,
  WhiteBalanceControl,
  TorchControl,
  ZoomControl,
  BrightnessControl,
  ContrastControl,
  SaturationControl,
  SharpnessControl,
  LatencyControl,
  VolumeControl,
  ChannelCountControl,
  SampleRateControl,
  SampleSizeControl,
  AutoGainControl,
  NoiseSuppressionControl,
  SuppressLocalAudioPlaybackControl,
  LogicalSurfaceControl,
  RestrictOwnAudioControl,
  FrameRateControl,
  DeviceControl,
  ResizeModeControl,
  DisplaySurfaceControl,
  EchoCancellationControl,
  SnapshotControl,
  RecordControl,
  ResolutionControl,
  JsonDebugViewer,
  type TrackManager,
} from './controls';
import * as styles from './styles.css';
import * as debugStyles from './debug.css';

export default function ControlBar() {
  const trackManager = useMediaTrack();
  const capabilities = trackManager?.capabilities;
  const settings = trackManager?.settings;
  const constraints = trackManager?.constraints
  const swiperDirection = useSwiperDirection();

  const { stream, devices } = useCamera(); // Get stream
  const { imageCaptureManager } = useImageCapture(); // Get imageCaptureManager

  const isTest = import.meta.env.VITE_APP_ENV === 'test';

  if (!capabilities || !settings) {
    return null;
  }

  const manager = trackManager as unknown as TrackManager;
  const has = (key: string, isArray?: boolean) => {
    if (!isArray) return key in capabilities
    const capability = capabilities[key as keyof MediaTrackCapabilities]
    return key in capabilities && (Array.isArray(capability) && capability?.length > 0);
  }

  const controls = [
    {
      id: 'snapshots',
      component: <SnapshotControl stream={stream} imageCaptureManager={imageCaptureManager} />,
      visible: true
    },
    {
      id: 'recording',
      component: <RecordControl stream={stream} />,
      visible: true
    },
    { id: 'device', component: <DeviceControl trackManager={manager} />, visible: (devices?.length ?? 0) > 0 || has('facingMode', true) },
    { id: 'focus', component: <FocusControl trackManager={manager} />, visible: has('focusMode') },
    { id: 'exposure', component: <ExposureControl trackManager={manager} />, visible: has('exposureMode') },
    { id: 'whiteBalance', component: <WhiteBalanceControl trackManager={manager} />, visible: has('whiteBalanceMode') || has('colorTemperature') },
    { id: 'torch', component: <TorchControl trackManager={manager} />, visible: has('torch') },
    { id: 'zoom', component: <ZoomControl trackManager={manager} />, visible: has('zoom') },
    { id: 'brightness', component: <BrightnessControl trackManager={manager} />, visible: has('brightness') },
    { id: 'contrast', component: <ContrastControl trackManager={manager} />, visible: has('contrast') },
    { id: 'saturation', component: <SaturationControl trackManager={manager} />, visible: has('saturation') },
    { id: 'sharpness', component: <SharpnessControl trackManager={manager} />, visible: has('sharpness') },
    { id: 'latency', component: <LatencyControl trackManager={manager} />, visible: has('latency') },
    { id: 'volume', component: <VolumeControl trackManager={manager} />, visible: has('volume') },
    { id: 'channelCount', component: <ChannelCountControl trackManager={manager} />, visible: has('channelCount') },
    { id: 'sampleRate', component: <SampleRateControl trackManager={manager} />, visible: has('sampleRate') },
    { id: 'sampleSize', component: <SampleSizeControl trackManager={manager} />, visible: has('sampleSize') },
    { id: 'autoGainControl', component: <AutoGainControl trackManager={manager} />, visible: has('autoGainControl') },
    { id: 'noiseSuppression', component: <NoiseSuppressionControl trackManager={manager} />, visible: has('noiseSuppression') },
    { id: 'suppressLocalAudioPlayback', component: <SuppressLocalAudioPlaybackControl trackManager={manager} />, visible: has('suppressLocalAudioPlayback') },
    { id: 'logicalSurface', component: <LogicalSurfaceControl trackManager={manager} />, visible: has('logicalSurface') },
    { id: 'restrictOwnAudio', component: <RestrictOwnAudioControl trackManager={manager} />, visible: has('restrictOwnAudio') },
    { id: 'frameRate', component: <FrameRateControl trackManager={manager} />, visible: has('frameRate') },
    { id: 'resizeMode', component: <ResizeModeControl trackManager={manager} />, visible: has('resizeMode') },
    { id: 'displaySurface', component: <DisplaySurfaceControl trackManager={manager} />, visible: has('displaySurface') },
    { id: 'echoCancellation', component: <EchoCancellationControl trackManager={manager} />, visible: has('echoCancellation') },
    { id: 'resolution', component: <ResolutionControl trackManager={manager} />, visible: has('height') || has('width') || has('aspectRatio') }, // New ResolutionControl
  ].filter(c => c.visible);

  return (
    <div className={styles.controlBarContainer}>

      <Swiper
        direction={swiperDirection}
        spaceBetween={20}
        slidesPerView={1}
        style={{ width: '100%', height: '100%' }}
      >
        {/*
         <SwiperSlide>
             <h3 className={styles.sectionHeader} style={{ textAlign: 'center', marginTop: '20px' }}>Camera Controls</h3>
             <div className={styles.debugInfo} style={{ textAlign: 'center' }}>Swipe to adjust</div>
         </SwiperSlide>
         */}
        {controls.map(control => (
          <SwiperSlide key={control.id} style={{ overflowY: 'auto', overflowX: 'hidden' }}>
            <div style={{ padding: 12 }}>
              {control.component}
            </div>
          </SwiperSlide>
        ))}
        {isTest && (
          <>
            <SwiperSlide style={{ overflowY: 'auto', overflowX: 'hidden' }}>
              <div className={debugStyles.testContainer}>
                <JsonDebugViewer data={devices} label="Devices" />
              </div>
            </SwiperSlide>
            <SwiperSlide style={{ overflowY: 'auto', overflowX: 'hidden' }}>
              <div className={debugStyles.testContainer}>
                <JsonDebugViewer data={constraints} label="Constraints" />
              </div>
            </SwiperSlide>
            <SwiperSlide style={{ overflowY: 'auto', overflowX: 'hidden' }}>
              <div className={debugStyles.testContainer}>
                <JsonDebugViewer data={capabilities} label="Capabilities" />
              </div>
            </SwiperSlide>
            <SwiperSlide style={{ overflowY: 'auto', overflowX: 'hidden' }}>
              <div className={debugStyles.testContainer}>
                <JsonDebugViewer data={settings} label="Settings" />
              </div>
            </SwiperSlide>
          </>
        )}
      </Swiper>
    </div>
  );
}
