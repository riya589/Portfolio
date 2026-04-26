import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const roles = [
  'I build backends.',
  'I ship products.',
  'I analyze data.',
  'I write code that delivers.',
];

const stats = [
  { value: '2', label: 'Internships' },
  { value: '3', label: 'Projects Built' },
  { value: '50K+', label: 'Records Analyzed' },
  { value: '20%', label: 'Faster APIs' },
];

const wordVariants = {
  hidden: { y: 80, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.3 + i * 0.12, duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const displayText = roles[roleIndex].slice(0, charIndex);

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 60);
    } else if (!isDeleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 35);
    } else if (isDeleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((i) => (i + 1) % roles.length);
      }, 50);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  const heroWords = ['Riya', 'Roy'];

  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const [pupils, setPupils] = useState({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // For parallax

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Update basic mouse pos for parallax
      setMousePos({
        x: (mouseX / window.innerWidth - 0.5) * 2,
        y: (mouseY / window.innerHeight - 0.5) * 2,
      });

      const updateEye = (eyeRef) => {
        if (!eyeRef.current) return { x: 0, y: 0 };
        const rect = eyeRef.current.getBoundingClientRect();
        // The center of the eye element
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const rad = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
        // The max distance the pupil can move from center (in pixels). 
        // 6.5% width of a max 600px container is ~39px. 
        // The pupil is 65% of that, so it can move ~15px.
        const maxDist = rect.width * 0.22; 
        
        // Use hypot to scale the distance, so it doesn't just snap to the edge 
        // immediately if the mouse is slightly away.
        const distToMouse = Math.hypot(mouseX - eyeCenterX, mouseY - eyeCenterY);
        const distance = Math.min(maxDist, distToMouse * 0.15);

        return {
          x: Math.cos(rad) * distance,
          y: Math.sin(rad) * distance,
        };
      };

      setPupils({
        left: updateEye(leftEyeRef),
        right: updateEye(rightEyeRef)
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="hero" className="hero">
      {/* Grid overlay */}
      <div className="grid-overlay" />

      {/* Glow blobs */}
      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />

      {/* Interactive 3D Character on the side */}
      <div className="hero-character-wrap">
        <motion.div
          className="hero-character-container"
          initial={{ opacity: 0, x: 60, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 1.0, duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
          style={{ transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)` }}
        >
          {/* Glow behind character */}
          <div className="character-glow" />
          
          <img
            src="/character_hero.png"
            alt="3D Interactive Developer Character"
            className="hero-character-img"
            draggable="false"
          />

          {/* Left Eye (Character's Right Eye) */}
          <div className="hero-eye-container" style={{ left: '36.9%', top: '46.9%' }} ref={leftEyeRef}>
            <div 
              className="hero-pupil"
              style={{ transform: `translate(${pupils.left.x}px, ${pupils.left.y}px)` }}
            >
              <div className="hero-pupil-highlight" />
            </div>
            <div className="hero-eyelid" />
          </div>

          {/* Right Eye (Character's Left Eye) */}
          <div className="hero-eye-container" style={{ left: '48.5%', top: '45.8%' }} ref={rightEyeRef}>
            <div 
              className="hero-pupil"
              style={{ transform: `translate(${pupils.right.x}px, ${pupils.right.y}px)` }}
            >
              <div className="hero-pupil-highlight" />
            </div>
            <div className="hero-eyelid" />
          </div>
        </motion.div>
      </div>



      <div className="container hero-content">
        {/* Eyebrow */}
        <motion.div
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <span className="hero-eyebrow-dot" />
          Full-Stack Developer / Backend Engineer / CS Undergraduate
        </motion.div>

        {/* Giant Name */}
        <div className="hero-name-container">
          <h1 className="hero-name" aria-label="Riya Roy">
            {heroWords.map((word, i) => (
              <span key={word} className="hero-name-word-wrap">
                <motion.span
                  className="hero-name-word"
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={wordVariants}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        {/* Animated role */}
        <motion.div
          className="hero-role"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <span className="hero-role-text">{displayText}</span>
          <span className="hero-cursor">|</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          Hireable, product-minded, and ready to build software that actually delivers.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6 }}
        >
          <a
            href="#projects"
            className="btn btn-primary"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Projects →
          </a>
          <a
            href="#contact"
            className="btn btn-outline"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Let's Connect
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="hero-stat"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.35 + i * 0.08, duration: 0.4 }}
            >
              <span className="hero-stat-value">{stat.value}</span>
              <span className="hero-stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <div className="scroll-line" />
        <span>scroll</span>
      </motion.div>
    </section>
  );
}
