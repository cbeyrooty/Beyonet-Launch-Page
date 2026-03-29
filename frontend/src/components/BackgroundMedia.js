import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const BackgroundMedia = ({ active, mouseX, mouseY, capabilities }) => {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const particlesRef = useRef([]);
  const activeRef = useRef(active);
  const visibleRef = useRef(capabilities.isVisible);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    visibleRef.current = capabilities.isVisible;
  }, [capabilities.isVisible]);

  const initParticles = useCallback(
    (width, height) => {
      const isMobile = capabilities.isMobile;
      const count = isMobile
        ? Math.min(Math.floor((width * height) / 16000), 55)
        : Math.min(Math.floor((width * height) / 9000), 150);

      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.4 + 0.5,
      }));
    },
    [capabilities.isMobile]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = capabilities.dpr;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(window.innerWidth, window.innerHeight);
    };

    resize();
    window.addEventListener('resize', resize);

    const canHover = capabilities.canHover;
    const linkDist = capabilities.isMobile ? 80 : 100;
    const repelDist = 130;

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      // Fully pause when tab is hidden
      if (!visibleRef.current) return;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const particles = particlesRef.current;

      // Update physics
      if (canHover) {
        const mx = mouseX.get();
        const my = mouseY.get();
        for (const p of particles) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < repelDist && dist > 0) {
            const force = ((repelDist - dist) / repelDist) * 0.5;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }
      }

      for (const p of particles) {
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }

      // Only draw when active
      if (!activeRef.current) {
        ctx.clearRect(0, 0, w, h);
        return;
      }

      ctx.clearRect(0, 0, w, h);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const ddx = particles[i].x - particles[j].x;
          const ddy = particles[i].y - particles[j].y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < linkDist) {
            const alpha = (1 - d / linkDist) * 0.08;
            ctx.strokeStyle = `rgba(11, 12, 14, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      ctx.fillStyle = 'rgba(11, 12, 14, 0.28)';
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [mouseX, mouseY, initParticles, capabilities.dpr, capabilities.canHover, capabilities.isMobile]);

  return (
    <motion.div
      data-testid="background-canvas-media"
      className="bg-layer bg-media"
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ pointerEvents: active ? 'auto' : 'none' }}
    >
      <canvas ref={canvasRef} className="media-canvas" />
      <div className="media-grid-overlay" />
    </motion.div>
  );
};

export default BackgroundMedia;
