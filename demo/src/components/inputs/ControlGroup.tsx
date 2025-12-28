import React, { type ReactNode } from 'react';
import * as styles from './ControlGroup.css';

interface ControlGroupProps {
  title: string;
  primaryControl: ReactNode;
  isManual: boolean;
  dependentControls: ReactNode[];
}

const ControlGroup: React.FC<ControlGroupProps> = ({
  title,
  primaryControl,
  isManual,
  dependentControls,
}) => {
  return (
    <div className={styles.groupWrapper}>
      <div className={styles.groupTitle}>{title}</div>
      {primaryControl}
      {isManual && (
        <div className={`${styles.dependentControl} swiper-no-swiping`}>
          {dependentControls}
        </div>
      )}
    </div>
  );
};

export default ControlGroup;
