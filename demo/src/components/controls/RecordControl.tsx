import React, { useState, useRef } from 'react';
import { Button, RelatedGroup } from '../inputs';
import { useSwiperDirection } from '../../hooks/useSwiperDirection';

interface RecordControlProps {
  stream: MediaStream | null;
}

export const RecordControl: React.FC<RecordControlProps> = ({ stream }) => {
  const direction = useSwiperDirection();
  const flexDirection = direction === 'vertical' ? 'column' : 'row';
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = () => {
    if (!stream) return;
    chunksRef.current = [];
    try {
      const options = { mimeType: 'video/mp4' };
      const recorder = new MediaRecorder(stream, MediaRecorder.isTypeSupported(options.mimeType) ? options : undefined);
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `recording-${Date.now()}.mp4`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      };
      
      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording:', err);
      alert('Failed to start recording: ' + err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <RelatedGroup title="Recording">
      <div style={{ display: 'flex', flexDirection, gap: '12px', justifyContent: 'center', alignItems: 'center', padding: '4px' }}>
        <Button onClick={startRecording} disabled={!stream || isRecording} title="Start Recording" icon={
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <circle cx="12" cy="12" r="10" />
             <circle cx="12" cy="12" r="3" fill="red" stroke="none" />
           </svg>
        }>
          Start
        </Button>
        <Button onClick={stopRecording} disabled={!isRecording} title="Stop Recording" icon={
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" stroke="none"/>
           </svg>
        }>
          Stop
        </Button>
      </div>
    </RelatedGroup>
  );
};
