import { useState, useEffect, useCallback } from 'react';
import { useMotionValue } from 'framer-motion';
import '@/App.css';
import BackgroundPicture from '@/components/BackgroundPicture';
import BackgroundMedia from '@/components/BackgroundMedia';
import MagneticToggle from '@/components/MagneticToggle';
import TiltTitle from '@/components/TiltTitle';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';

function App() {
  const [skin, setSkin] = useState('picture');
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const capabilities = useDeviceCapabilities();

  // Set data-skin attribute on html element for CSS variable swapping
  useEffect(() => {
    document.documentElement.dataset.skin = skin;
  }, [skin]);

  // Global pointer tracking — only on hover-capable devices
  useEffect(() => {
    if (!capabilities.canHover) return;

    const handlePointerMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [mouseX, mouseY, capabilities.canHover]);

  const toggleSkin = useCallback(() => {
    setSkin((prev) => (prev === 'picture' ? 'media' : 'picture'));
  }, []);

  return (
    <div className="landing-page" data-testid="landing-page">
      {/* Background effect layers — both always mounted for crossfade */}
      <BackgroundPicture
        active={skin === 'picture'}
        mouseX={mouseX}
        mouseY={mouseY}
        capabilities={capabilities}
      />
      <BackgroundMedia
        active={skin === 'media'}
        mouseX={mouseX}
        mouseY={mouseY}
        capabilities={capabilities}
      />

      {/* Central title with 3D parallax tilt */}
      <TiltTitle
        skin={skin}
        mouseX={mouseX}
        mouseY={mouseY}
        capabilities={capabilities}
      />

      {/* Fixed magnetic toggle button */}
      <MagneticToggle
        skin={skin}
        onToggle={toggleSkin}
        capabilities={capabilities}
      />
    </div>
  );
}

export default App;
