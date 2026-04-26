import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Credentials.css';

const education = [
  {
    period: '2023–2027',
    degree: 'B.E. Computer Science Engineering',
    institution: 'Chandigarh University, India',
    level: 'University',
  },
  {
    period: '2022–2023',
    degree: 'Intermediate (Class 12)',
    institution: 'Gurukulam, Dhanbad, Jharkhand',
    level: 'Higher Secondary',
  },
  {
    period: '2020–2021',
    degree: 'Matriculation (Class 10)',
    institution: 'De Nobili School CMRI, Dhanbad',
    level: 'Secondary',
  },
];

const certifications = [
  { name: 'SQL (Basic – Advanced)', issuer: 'HackerRank' },
  { name: 'Problem Solving (Basic – Intermediate)', issuer: 'HackerRank' },
  { name: 'SQL: A Practical Introduction for Querying Databases', issuer: 'IBM' },
  { name: 'Databases & SQL for Data Science with Python', issuer: 'IBM' },
  { name: 'Ethical Hacking Foundations & Network Security', issuer: 'Packt' },
];

const achievements = [
  { value: '100+', label: 'LeetCode Problems', sublabel: 'Medium-level focus' },
  { value: 'Top 45', label: 'Teams — Tekathon 4.0', sublabel: 'Internal SIH 2025 Hackathon' },
];

const containerV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemV = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export default function Credentials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="credentials" className="credentials-section">
      <div className="grid-overlay" />
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Credentials</span>
          <h2 className="section-heading">Education, certifications & wins.</h2>
        </motion.div>

        <div className="credentials-layout">
          {/* Left: Education */}
          <div className="credentials-education">
            <h3 className="cred-sub-heading">Education</h3>
            <motion.div
              className="edu-cards"
              variants={containerV}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {education.map((edu) => (
                <motion.div key={edu.degree} className="edu-cred-card" variants={itemV}>
                  <div className="edu-cred-year">{edu.period}</div>
                  <div className="edu-cred-level">{edu.level}</div>
                  <div className="edu-cred-degree">{edu.degree}</div>
                  <div className="edu-cred-institution">{edu.institution}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Certs + Achievements */}
          <div className="credentials-right">
            <h3 className="cred-sub-heading">Certifications</h3>
            <motion.div
              className="cert-list"
              variants={containerV}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {certifications.map((cert) => (
                <motion.div key={cert.name} className="cert-item" variants={itemV}>
                  <div>
                    <div className="cert-name">{cert.name}</div>
                    <div className="cert-issuer">{cert.issuer}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <h3 className="cred-sub-heading" style={{ marginTop: '2.5rem' }}>Achievements</h3>
            <motion.div
              className="achievements-chips"
              variants={containerV}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              {achievements.map((ach) => (
                <motion.div key={ach.label} className="achievement-chip" variants={itemV}>
                  <div className="ach-value">{ach.value}</div>
                  <div className="ach-label">{ach.label}</div>
                  <div className="ach-sublabel">{ach.sublabel}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
