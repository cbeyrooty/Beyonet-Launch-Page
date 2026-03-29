import { useRef, useEffect } from 'react';
import {
  motion,
  useTransform,
  useSpring,
  AnimatePresence,
} from 'framer-motion';

const TiltTitle = ({ skin, mouseX, mouseY, capabilities }) => {
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

  // 3D tilt: max +/-6 degrees on desktop, 0 on touch
  const maxTilt = capabilities.canHover && !capabilities.reducedMotion ? 6 : 0;
  const rawRotateY = useTransform(normX, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const rawRotateX = useTransform(normY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useSpring(rawRotateY, { stiffness: 100, damping: 30 });
  const rotateX = useSpring(rawRotateX, { stiffness: 100, damping: 30 });

  // Skin A: cinematic blur-to-focus entrance
  const pictureVariants = {
    initial: capabilities.reducedMotion
      ? { opacity: 0 }
      : { opacity: 0, filter: 'blur(12px)' },
    animate: capabilities.reducedMotion
      ? { opacity: 1, transition: { duration: 0.4 } }
      : {
          opacity: 1,
          filter: 'blur(0px)',
          transition: { duration: 1, ease: [0.2, 0.8, 0.2, 1] },
        },
    exit: capabilities.reducedMotion
      ? { opacity: 0, transition: { duration: 0.2 } }
      : {
          opacity: 0,
          filter: 'blur(8px)',
          transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] },
        },
  };

  // Skin B: sharp structured slide-in
  const mediaVariants = {
    initial: capabilities.reducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 30 },
    animate: capabilities.reducedMotion
      ? { opacity: 1, transition: { duration: 0.4 } }
      : {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
        },
    exit: capabilities.reducedMotion
      ? { opacity: 0, transition: { duration: 0.2 } }
      : {
          opacity: 0,
          y: -20,
          transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] },
        },
  };

  return (
    <motion.div
      data-testid="tilt-title-wrapper"
      className="tilt-wrapper"
      style={
        capabilities.canHover && !capabilities.reducedMotion
          ? { rotateX, rotateY, transformPerspective: 1200 }
          : undefined
      }
    >
      <AnimatePresence mode="wait">
        {skin === 'picture' ? (
          <motion.div
            key="picture-title"
            className="title-block"
            variants={pictureVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h1
              data-testid="company-name-heading"
              className="title title-picture"
            >
              The Beyonet
              <br />
              Picture Company
            </h1>
            <p
              className="title-email title-email-picture"
              data-testid="title-email"
            >
              hello@beyon.et
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="media-title"
            className="title-block"
            variants={mediaVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h1
              data-testid="company-name-heading"
              className="title title-media"
            >
              The Beyonet
              <br />
              Media Company
            </h1>
            <p
              className="title-email title-email-media"
              data-testid="title-email"
            >
              hello@beyon.et
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TiltTitle;
