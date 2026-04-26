import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './Projects.css';

const projects = [
  {
    id: 'studentgpt',
    featured: true,
    name: 'StudentGPT',
    subtitle: 'AI Study Assistant',
    period: 'Aug – Dec 2025',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Gemini API', 'DeepSeek API'],
    bullets: [
      'Built a responsive React UI for real-time AI-powered academic chat with reusable components.',
      'Integrated Google Gemini + DeepSeek APIs for context-aware, multi-model AI assistance.',
      'Designed scalable REST APIs, reducing response time by 20%.',
    ],
    stat: { value: '20%', label: 'Faster API response' },
    gradient: 'linear-gradient(135deg, #05080f 0%, #0d1b40 60%, #1a3a8a 100%)',
  },
  {
    id: 'smart-travel',
    featured: false,
    name: 'Smart Travel Platform',
    subtitle: 'Full-Stack App',
    period: 'Oct – Nov 2025',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    bullets: [
      'Role-based views (RBAC) with secure dynamic interactions and route protection.',
      'REST API integration for routing, ride management, and user operations.',
      'Optimized DB queries & indexing — reduced load time under high data volume.',
    ],
  },
  {
    id: 'uber-analysis',
    featured: false,
    name: 'Uber Trip Analysis',
    subtitle: 'ML & Data Science',
    period: 'May – Jun 2025',
    stack: ['Python', 'Pandas', 'Scikit-learn', 'Random Forest', 'SQL'],
    bullets: [
      'Analyzed 50,000+ trip records to uncover demand trends and usage patterns.',
      'Applied feature engineering and preprocessing to improve model accuracy.',
      'Built a Random Forest model for demand forecasting with strong prediction performance.',
    ],
    stat: { value: '50K+', label: 'Trip records analyzed' },
  },
];

function useTiltEffect(ref) {
  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(1200px) rotateY(${x * 12}deg) rotateX(${-y * 8}deg) scale(1.02)`;
  };
  const handleMouseLeave = (e) => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) scale(1)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  };
  return { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
}

function FeaturedCard({ project, inView }) {
  const cardRef = useRef(null);
  const tilt = useTiltEffect(cardRef);

  return (
    <motion.div
      ref={cardRef}
      className="project-featured-card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      style={{ background: project.gradient }}
      {...tilt}
    >
      <div className="project-featured-glow" />
      <div className="project-featured-inner">
        <div className="project-featured-left">
          <div className="project-badge-featured">Featured Project</div>
          <h3 className="project-name-featured">{project.name}</h3>
          <p className="project-subtitle">{project.subtitle} · {project.period}</p>
          <ul className="project-bullets">
            {project.bullets.map((b) => <li key={b}>{b}</li>)}
          </ul>
          <div className="project-stack">
            {project.stack.map((tech) => (
              <span key={tech} className="tech-pill-dark">{tech}</span>
            ))}
          </div>
        </div>
        {project.stat && (
          <div className="project-featured-stat">
            <div className="project-stat-value">{project.stat.value}</div>
            <div className="project-stat-label">{project.stat.label}</div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function SmallCard({ project, index, inView }) {
  const cardRef = useRef(null);
  const tilt = useTiltEffect(cardRef);

  return (
    <motion.div
      ref={cardRef}
      className="project-small-card"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.35 + index * 0.15, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      {...tilt}
    >
      <div className="project-small-header">
        <div>
          <div className="project-name">{project.name}</div>
          <div className="project-period">{project.period}</div>
        </div>
      </div>
      <p className="project-small-sub">{project.subtitle}</p>
      <ul className="project-bullets-sm">
        {project.bullets.map((b) => <li key={b}>{b}</li>)}
      </ul>
      {project.stat && (
        <div className="project-small-stat">
          <span className="project-small-stat-value">{project.stat.value}</span>
          <span className="project-small-stat-label"> {project.stat.label}</span>
        </div>
      )}
      <div className="project-stack-sm">
        {project.stack.map((tech) => (
          <span key={tech} className="tech-pill">{tech}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="projects-section">
      <div className="grid-overlay" />
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Projects</span>
          <h2 className="section-heading">Things I've actually built.</h2>
        </motion.div>

        <FeaturedCard project={featured} inView={inView} />

        <div className="projects-grid">
          {others.map((project, i) => (
            <SmallCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
