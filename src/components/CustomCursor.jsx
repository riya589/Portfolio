import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const sparklesRef = useRef([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;
    let rafId;
    let sparkleTimer = null;

    const onMove = (e) => {
      dotX = e.clientX;
      dotY = e.clientY;

      // Spawn sparkles occasionally
      if (Math.random() < 0.18) {
        spawnSparkle(dotX, dotY);
      }
    };

    const spawnSparkle = (x, y) => {
      const sparkle = document.createElement('div');
      sparkle.className = 'cursor-sparkle';
      const chars = ['✦', '✧', '⋆', '·', '˚'];
      sparkle.textContent = chars[Math.floor(Math.random() * chars.length)];
      sparkle.style.left = `${x + (Math.random() - 0.5) * 20}px`;
      sparkle.style.top = `${y + (Math.random() - 0.5) * 20}px`;
      sparkle.style.fontSize = `${8 + Math.random() * 8}px`;
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 600);
    };

    const animate = () => {
      ringX += (dotX - ringX) * 0.1;
      ringY += (dotY - ringY) * 0.1;

      const dot = dotRef.current;
      const ring = ringRef.current;

      if (dot) {
        dot.style.left = `${dotX}px`;
        dot.style.top = `${dotY}px`;
      }
      if (ring) {
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const onEnter = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        setIsHovering(true);
      }
    };

    const onLeave = (e) => {
      if (!e.target.closest('a, button, [role="button"]')) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={`cursor-dot-cute ${isHovering ? 'hovering' : ''}`}>
        <span className="cursor-heart">♥</span>
      </div>
      <div ref={ringRef} className={`cursor-ring-cute ${isHovering ? 'hovering' : ''}`} />
    </>
  );
}
