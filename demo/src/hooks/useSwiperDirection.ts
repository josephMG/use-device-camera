import { useEffect, useState } from 'react';

export function useSwiperDirection() {
  const [swiperDirection, setSwiperDirection] = useState<'horizontal' | 'vertical'>('horizontal');

  useEffect(() => {
    const updateSwiperDirection = () => {
      const isMobileLandscape = window.matchMedia("(orientation: landscape) and (max-width: 1024px)").matches;

      if (isMobileLandscape) {
        // Mobile Landscape
        setSwiperDirection('vertical');
      } else {
        // Desktop or Mobile Portrait
        setSwiperDirection('horizontal');
      }
    };

    updateSwiperDirection();
    window.addEventListener('resize', updateSwiperDirection);
    return () => window.removeEventListener('resize', updateSwiperDirection);
  }, []);

  return swiperDirection;
}
