import React from 'react';
import * as styles from '../debug.css';

interface JsonDebugViewerProps {
  data: MediaDeviceInfo[] | MediaTrackConstraints | MediaTrackCapabilities | MediaTrackSettings | undefined | null;
  label?: string;
}

export const JsonDebugViewer: React.FC<JsonDebugViewerProps> = ({ data, label }) => {
  if (!data) return null;

  return (
    <div className={styles.viewerWrapper}>
      {label && (
        <div className={styles.viewerLabel}>
          {label}
        </div>
      )}
      <pre className={styles.viewerPre}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};
