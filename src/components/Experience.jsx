import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import './Experience.css';

const experiences = [
  {
    period: 'May – June 2025',
    company: 'Edunet Foundation × Microsoft',
    role: 'Frontend Development Intern',
    type: 'Virtual',
    bullets: [
      'Built and structured reusable frontend components displaying ML pipeline data in interactive dashboards.',
      'Integrated REST API outputs into frontend visualization tools for dynamic, real-time data rendering.',
      'Ensured responsive and accessible UI across devices using HTML5, CSS3, and JavaScript.',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'REST APIs', 'ML Dashboard'],
    color: 'blue',
  },
  {
    period: 'June 2025',
    company: 'SkillCraft Technology',
    role: 'Software Developer Intern',
    type: 'Virtual',
    bullets: [
      'Diagnosed and resolved frontend bugs, improving UI responsiveness and overall application stability.',
      'Reviewed and refactored components to follow clean code standards and established team best practices.',
      'Managed version control and collaborative development workflows using Git and GitHub.',
    ],
    tags: ['JavaScript', 'Git', 'GitHub', 'Clean Code', 'UI Debug'],
    color: 'gold',
  },
];

function TimelineItem({ exp, index, inView }) {
  return (
    <motion.div
      className="timeline-item"
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.2, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Timeline node */}
      <div className="timeline-node-wrap">
        <motion.div
          className={`timeline-node timeline-node-${exp.color}`}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.5 + index * 0.2, type: 'spring', stiffness: 200 }}
        />
      </div>

      {/* Content */}
      <div className={`timeline-content timeline-content-${exp.color}`}>
        <div className="timeline-header">
          <div>
            <span className="timeline-period">{exp.period}</span>
            <span className="timeline-type">{exp.type}</span>
          </div>
        </div>
        <h3 className="timeline-company">{exp.company}</h3>
        <p className="timeline-role">{exp.role}</p>
        <ul className="timeline-bullets">
          {exp.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        <div className="timeline-tags">
          {exp.tags.map((tag) => (
            <span key={tag} className={`exp-tag exp-tag-${exp.color}`}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="experience-section">
      <div className="grid-overlay" />
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Experience</span>
          <h2 className="section-heading">Where I've contributed.</h2>
        </motion.div>

        <div className="timeline">
          <motion.div
            className="timeline-line"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.4, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          />
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.company} exp={exp} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
