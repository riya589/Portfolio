import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './About.css';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="about-section">
      <div className="grid-overlay" />
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">About</span>
          <h2 className="section-heading">A portfolio aligned<br />with where I'm headed.</h2>
        </motion.div>

        <motion.div
          className="about-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Card 1 — Professional Direction */}
          <motion.div className="about-card about-card-primary" variants={cardVariants}>
            <h3 className="about-card-title">Professional Direction</h3>
            <p className="about-card-body">
              CS undergrad building <strong>secure, scalable, AI-powered</strong> full-stack applications and data-driven systems. I combine clean backend engineering with strong product sense — whether it's JWT auth, REST APIs, ML pipelines, or responsive UIs.
            </p>
            <p className="about-card-body" style={{ marginTop: '1rem' }}>
              Open to <span className="text-accent">internships</span> and early-career roles in <span className="text-accent">Backend / Full-Stack / Data</span>. Based in Gurugram, Haryana.
            </p>
            <div className="about-status-badge">
              <span className="about-status-dot" />
              Open to opportunities
            </div>
          </motion.div>

          {/* Card 2 — Education */}
          <motion.div className="about-card about-card-edu" variants={cardVariants}>
            <h3 className="about-card-title">Education</h3>
            <div className="edu-simple">
              <div className="edu-year-badge">2023 – 2027</div>
              <div className="edu-uni-name">Chandigarh University, India</div>
              <div className="edu-uni-deg">B.E. Computer Science Engineering</div>
            </div>
          </motion.div>

          {/* Card 3 — What I Bring */}
          <motion.div className="about-card about-card-bring" variants={cardVariants}>
            <h3 className="about-card-title">What I Bring</h3>
            <ul className="bring-list">
              {[
                'Secure auth systems (JWT + OTP)',
                'Scalable REST API design',
                'AI/ML pipeline integration',
                'Data analysis at scale (50K+ records)',
                'Responsive, accessible UIs in React',
                'End-to-end deployment experience',
              ].map((text) => (
                <li key={text} className="bring-item">
                  <span className="bring-dot" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
