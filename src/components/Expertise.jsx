import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Expertise.css';

const categories = [
  {
    title: 'Full-Stack & Backend',
    color: 'blue',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'OTP Verification', 'React.js', 'MongoDB', 'MySQL', 'PostgreSQL'],
    description: 'Building robust server-side architectures with secure auth, efficient database design, and clean RESTful API contracts.',
  },
  {
    title: 'Data & Machine Learning',
    color: 'gold',
    skills: ['Pandas', 'NumPy', 'Scikit-learn', 'Feature Engineering', 'EDA', 'Random Forest', 'SQL', 'Data Visualization'],
    description: 'End-to-end data pipelines — from raw exploration to predictive modeling and demand forecasting at scale.',
  },
  {
    title: 'Languages & UI',
    color: 'white',
    skills: ['Python', 'JavaScript (ES6+)', 'C++', 'HTML5', 'CSS3', 'SASS/LESS', 'Bootstrap', 'Responsive Design', 'Material Design'],
    description: 'Fluent across the stack — from systems-level C++ to modern ES6+ JavaScript and pixel-perfect responsive interfaces.',
  },
  {
    title: 'AI & DevOps',
    color: 'gold',
    skills: ['Google Gemini API', 'DeepSeek API', 'Git', 'GitHub', 'Linux/Unix', 'VS Code', 'Unit Testing', 'DSA', 'OOP', 'DBMS', 'OS'],
    description: 'Integrating cutting-edge AI APIs, maintaining clean version control workflows, and applying solid CS fundamentals.',
  },
];

const skillColors = {
  blue: 'var(--accent)',
  gold: 'var(--gold)',
  white: 'var(--text)',
};

const containerV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardV = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
};

const tagV = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: 'backOut' } },
};

export default function Expertise() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const allSkills = [
    { tag: 'Python', color: 'blue' },
    { tag: 'JavaScript', color: 'blue' },
    { tag: 'C++', color: 'white' },
    { tag: 'SQL', color: 'gold' },
    { tag: 'React.js', color: 'blue' },
    { tag: 'Node.js', color: 'blue' },
    { tag: 'Express.js', color: 'blue' },
    { tag: 'MongoDB', color: 'blue' },
    { tag: 'PostgreSQL', color: 'blue' },
    { tag: 'MySQL', color: 'blue' },
    { tag: 'Pandas', color: 'gold' },
    { tag: 'NumPy', color: 'gold' },
    { tag: 'Scikit-learn', color: 'gold' },
    { tag: 'Random Forest', color: 'gold' },
    { tag: 'JWT Auth', color: 'blue' },
    { tag: 'REST APIs', color: 'blue' },
    { tag: 'Gemini API', color: 'gold' },
    { tag: 'DeepSeek API', color: 'gold' },
    { tag: 'HTML5', color: 'white' },
    { tag: 'CSS3', color: 'white' },
    { tag: 'SASS', color: 'white' },
    { tag: 'Git', color: 'white' },
    { tag: 'Linux', color: 'white' },
    { tag: 'DSA', color: 'blue' },
    { tag: 'OOP', color: 'blue' },
    { tag: 'Feature Engineering', color: 'gold' },
    { tag: 'EDA', color: 'gold' },
    { tag: 'Unit Testing', color: 'white' },
  ];

  return (
    <section id="expertise" className="expertise-section">
      <div className="grid-overlay" />
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Expertise</span>
          <h2 className="section-heading">Technical strengths across<br />development and analytics.</h2>
        </motion.div>

        {/* Category cards */}
        <motion.div
          className="expertise-grid"
          variants={containerV}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.title}
              className={`expertise-card expertise-card-${cat.color}`}
              variants={cardV}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
            >
              <div className="expertise-card-header">
                <h3 className="expertise-title">{cat.title}</h3>
              </div>
              <p className="expertise-desc">{cat.description}</p>
              <div className="expertise-tags">
                {cat.skills.map((skill) => (
                  <span key={skill} className={`skill-tag skill-tag-${cat.color}`}>{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* All Skills Tag Cloud */}
        <div className="tag-cloud-section">
          <p className="tag-cloud-label">Full skills at a glance</p>
          <motion.div
            className="tag-cloud"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {allSkills.map((s) => (
              <motion.span
                key={s.tag}
                className={`cloud-tag cloud-tag-${s.color}`}
                variants={tagV}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
              >
                {s.tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
