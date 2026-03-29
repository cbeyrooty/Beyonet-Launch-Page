import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MagneticToggle = ({ skin, onToggle, capabilities }) => {
  const buttonRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 22 });
  const springY = useSpring(y, { stiffness: 300, damping: 22 });

  const handleMouseMove = useCallback(
    (e) => {
      // Disable magnetic effect on touch devices
      if (!capabilities.canHover) return;

      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      const maxOffset = 14;
      const strength = 0.18;
      x.set(Math.max(-maxOffset, Math.min(maxOffset, dx * strength)));
      y.set(Math.max(-maxOffset, Math.min(maxOffset, dy * strength)));
    },
    [x, y, capabilities.canHover]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <div
      className="toggle-area"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid="toggle-area"
    >
      <motion.button
        ref={buttonRef}
        data-testid="skin-toggle-button"
        className="toggle-button"
        onClick={onToggle}
        style={
          capabilities.canHover ? { x: springX, y: springY } : undefined
        }
        whileTap={{ scale: 0.96 }}
        whileHover={capabilities.canHover ? { scale: 1.03 } : undefined}
        aria-pressed={skin === 'media'}
        aria-label={
          skin === 'picture'
            ? 'Switch to Beyonet Media Company'
            : 'Switch to Beyonet Picture Company'
        }
      >
        <span className="toggle-label">
          {skin === 'picture' ? 'Media' : 'Picture'}
        </span>
      </motion.button>
    </div>
  );
};

export default MagneticToggle;
