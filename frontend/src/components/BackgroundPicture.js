import { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

const BackgroundPicture = ({ active, mouseX, mouseY, capabilities }) => {
  const spotlightRef = useRef(null);
  const grainRef = useRef(null);
  const driftFrameRef = useRef(null);

  // Smooth spring for spotlight position (creates premium lag effect)
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 30 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 30 });

  // Generate film grain noise texture once on mount
  useEffect(() => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    if (grainRef.current) {
      grainRef.current.style.backgroundImage = `url(${canvas.toDataURL()})`;
    }
  }, []);

  // Desktop: track smoothed mouse position for spotlight
  useEffect(() => {
    if (!capabilities.canHover || !capabilities.isVisible) return;

    const update = () => {
      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty('--mx', `${smoothX.get()}px`);
        spotlightRef.current.style.setProperty('--my', `${smoothY.get()}px`);
      }
    };
    const unsubX = smoothX.on('change', update);
    const unsubY = smoothY.on('change', update);
    return () => {
      unsubX();
      unsubY();
    };
  }, [smoothX, smoothY, capabilities.canHover, capabilities.isVisible]);

  // Touch devices: ambient spotlight drift (slow Lissajous orbit)
  useEffect(() => {
    if (capabilities.canHover || !active) return;

    let angle = 0;
    const drift = () => {
      if (!capabilities.isVisible) {
        driftFrameRef.current = requestAnimationFrame(drift);
        return;
      }

      angle += 0.004;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const rx = Math.min(cx, 300) * 0.3;
      const ry = Math.min(cy, 200) * 0.25;
      const x = cx + Math.cos(angle) * rx;
      const y = cy + Math.sin(angle * 0.7) * ry;

      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty('--mx', `${x}px`);
        spotlightRef.current.style.setProperty('--my', `${y}px`);
      }

      driftFrameRef.current = requestAnimationFrame(drift);
    };

    drift();
    return () => {
      if (driftFrameRef.current) cancelAnimationFrame(driftFrameRef.current);
    };
  }, [capabilities.canHover, capabilities.isVisible, active]);

  return (
    <motion.div
      data-testid="background-canvas-picture"
      className="bg-layer bg-picture"
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ pointerEvents: active ? 'auto' : 'none' }}
    >
      {/* Dark cinematic base with vignette */}
      <div className="picture-base" />

      {/* Mouse-following spotlight */}
      <div ref={spotlightRef} className="picture-spotlight" />

      {/* Animated film grain overlay */}
      <div ref={grainRef} className="picture-grain" />
    </motion.div>
  );
};

export default BackgroundPicture;
