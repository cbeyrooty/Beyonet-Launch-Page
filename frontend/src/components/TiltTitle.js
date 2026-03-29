import { useRef, useEffect } from 'react';
import { motion, useTransform, useSpring, AnimatePresence } from 'framer-motion';

const TiltTitle = ({ skin, mouseX, mouseY }) => {
  const sizeRef = useRef({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      sizeRef.current = { w: window.innerWidth, h: window.innerHeight };
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Normalized mouse position: -0.5 to 0.5
  const normX = useTransform(mouseX, (val) => val / sizeRef.current.w - 0.5);
  const normY = useTransform(mouseY, (val) => val / sizeRef.current.h - 0.5);

  // 3D tilt: max +/-6 degrees, with smooth spring
  const rawRotateY = useTransform(normX, [-0.5, 0.5], [-6, 6]);
  const rawRotateX = useTransform(normY, [-0.5, 0.5], [6, -6]);
  const rotateY = useSpring(rawRotateY, { stiffness: 100, damping: 30 });
  const rotateX = useSpring(rawRotateX, { stiffness: 100, damping: 30 });

  // Skin A: cinematic blur-to-focus entrance
  const pictureVariants = {
    initial: { opacity: 0, filter: 'blur(12px)' },
    animate: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.2, 0.8, 0.2, 1] },
    },
    exit: {
      opacity: 0,
      filter: 'blur(8px)',
      transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] },
    },
  };

  // Skin B: sharp structured slide-in
  const mediaVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] },
    },
  };

  return (
    <motion.div
      data-testid="tilt-title-wrapper"
      className="tilt-wrapper"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
    >
      <AnimatePresence mode="wait">
        {skin === 'picture' ? (
          <motion.h1
            key="picture-title"
            data-testid="company-name-heading"
            className="title title-picture"
            variants={pictureVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            The Beyonet
            <br />
            Picture Company
          </motion.h1>
        ) : (
          <motion.h1
            key="media-title"
            data-testid="company-name-heading"
            className="title title-media"
            variants={mediaVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            The Beyonet
            <br />
            Media Company
          </motion.h1>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TiltTitle;
