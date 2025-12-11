import React from 'react'
import * as styles from './Toggle.css'

interface ToggleProps {
  label: string
  value: boolean
  onChange: (value: boolean) => void
}

const Toggle: React.FC<ToggleProps> = ({ label, value, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <label className={styles.toggleSwitch}>
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className={styles.toggleInput}
        />
        <span className={styles.toggleSlider}></span>
      </label>
    </div>
  )
}

export default Toggle
