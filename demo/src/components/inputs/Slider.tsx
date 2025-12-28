import React from 'react'
import * as styles from './Slider.css'

interface SliderProps {
  label: string
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
}

const Slider: React.FC<SliderProps> = ({
  label,
  min,
  max,
  step,
  value,
  onChange,
}) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        {label}: {value.toFixed(2)}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        className={`${styles.slider} swiper-no-swiping`}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  )
}

export default Slider
