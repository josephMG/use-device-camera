import React from 'react';
import { Button, RelatedGroup } from '../inputs';

interface ActionButtonProps {
  stream: MediaStream | null;
  imageCaptureManager?: ImageCapture | null;
}

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const CanvasCaptureButton: React.FC<Pick<ActionButtonProps, 'stream'>> = ({ stream }) => {
  const handleCapture = async () => {
    if (!stream) return;
    try {
      const video = document.createElement('video');
      video.muted = true;
      video.playsInline = true;
      video.srcObject = stream
      await video.play();

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        canvas.toBlob(blob => {
          if (blob) downloadBlob(blob, 'canvas-capture.png');
        }, 'image/png');
      }

      video.pause();
      video.srcObject = null;
      video.remove();
    } catch (err) {
      console.error('MDN Capture failed:', err);
      alert('MDN Capture failed: ' + err);
    }
  };

  return (
    <Button onClick={handleCapture} disabled={!stream} title="Canvas Capture (MDN)" icon={
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    }>
      Canvas
    </Button>
  );
};

export const TakePhotoButton: React.FC<Pick<ActionButtonProps, 'imageCaptureManager'>> = ({ imageCaptureManager }) => {
  const track = imageCaptureManager?.track
  const hasImageCapture = !!imageCaptureManager

  const handleCapture = async () => {
    if (!track || !imageCaptureManager) return;
    try {
      const blob = await imageCaptureManager.takePhoto();
      downloadBlob(blob, 'photo.jpg');
    } catch (err) {
      console.error('takePhoto failed:', err);
      alert('takePhoto failed: ' + err);
    }
  };

  return (
    <Button onClick={handleCapture} disabled={!track || !hasImageCapture} title="takePhoto()" icon={
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
        <path d="M12 9v8M8 13h8" strokeOpacity="0.5" />
      </svg>
    }>
      Photo
    </Button>
  );
};

export const FlashPhotoButton: React.FC<Pick<ActionButtonProps, 'imageCaptureManager'>> = ({ imageCaptureManager }) => {
  const track = imageCaptureManager?.track
  const hasImageCapture = !!imageCaptureManager

  const handleCapture = async () => {
    if (!track || !imageCaptureManager) return;
    try {
      const blob = await imageCaptureManager.takePhoto({ fillLightMode: 'flash' });
      downloadBlob(blob, 'photo-flash.jpg');
    } catch (err) {
      console.error('takePhoto(flash) failed:', err);
      alert('takePhoto(flash) failed: ' + err);
    }
  };

  return (
    <Button onClick={handleCapture} disabled={!track || !hasImageCapture} title="takePhoto({ flash })" icon={
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
        <polygon points="13 2 9 7 12 7 10 12" fill="currentColor" stroke="none" transform="translate(6, -6) scale(0.8)" />
      </svg>
    }>
      Flash
    </Button>
  );
};

export const GrabFrameButton: React.FC<Pick<ActionButtonProps, 'imageCaptureManager'>> = ({ imageCaptureManager }) => {
  const track = imageCaptureManager?.track
  const hasImageCapture = !!imageCaptureManager

  const handleCapture = async () => {
    if (!track || !imageCaptureManager || !('grabFrame' in imageCaptureManager) || typeof imageCaptureManager.grabFrame !== 'function') return;
    try {
      const bitmap = await imageCaptureManager.grabFrame();

      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(bitmap, 0, 0);
        canvas.toBlob(blob => {
          if (blob) downloadBlob(blob, 'grab-frame.png');
        });
      }
      bitmap.close();
    } catch (err) {
      console.error('grabFrame failed:', err);
      alert('grabFrame failed: ' + err);
    }
  };

  return (
    <Button onClick={handleCapture} disabled={!track || !hasImageCapture} title="grabFrame()" icon={
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    }>
      Grab
    </Button>
  );
};

export const SnapshotControl: React.FC<ActionButtonProps> = ({stream, imageCaptureManager}) => {
  return (
    <RelatedGroup title="Snapshot">
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-around', padding: '4px' }}>
        <CanvasCaptureButton stream={stream} />
        <TakePhotoButton imageCaptureManager={imageCaptureManager} />
        <FlashPhotoButton imageCaptureManager={imageCaptureManager}  />
        <GrabFrameButton imageCaptureManager={imageCaptureManager} />
      </div>
    </RelatedGroup>
  );
};
