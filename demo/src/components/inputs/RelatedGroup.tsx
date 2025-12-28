import React, { type ReactNode } from 'react';
import * as styles from './RelatedGroup.css';

interface RelatedGroupProps {
  title: string;
  children: ReactNode;
}

const RelatedGroup: React.FC<RelatedGroupProps> = ({
  title,
  children,
}) => {
  return (
    <div className={styles.groupWrapper}>
      <div className={styles.groupTitle}>{title}</div>
      <div className={styles.controlsContainer}>
        {children}
      </div>
    </div>
  );
};

export default RelatedGroup;
