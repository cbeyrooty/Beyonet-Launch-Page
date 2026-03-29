import { useState, useEffect } from 'react';

export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState(() => ({
    canHover: window.matchMedia('(hover: hover)').matches,
    isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    isVisible: !document.hidden,
    dpr: Math.min(window.devicePixelRatio || 1, 2), // Cap at 2x for performance
    isMobile: window.innerWidth < 768,
  }));

  useEffect(() => {
    const hoverQuery = window.matchMedia('(hover: hover)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleHover = (e) =>
      setCapabilities((c) => ({ ...c, canHover: e.matches }));
    const handleMotion = (e) =>
      setCapabilities((c) => ({ ...c, reducedMotion: e.matches }));
    const handleVisibility = () =>
      setCapabilities((c) => ({ ...c, isVisible: !document.hidden }));
    const handleResize = () =>
      setCapabilities((c) => ({
        ...c,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
        isMobile: window.innerWidth < 768,
      }));

    hoverQuery.addEventListener('change', handleHover);
    motionQuery.addEventListener('change', handleMotion);
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('resize', handleResize);

    return () => {
      hoverQuery.removeEventListener('change', handleHover);
      motionQuery.removeEventListener('change', handleMotion);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return capabilities;
}
