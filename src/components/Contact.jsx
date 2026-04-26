import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Contact.css';

const links = [
  {
    href: 'mailto:riyaroy2264dns@gmail.com',
    label: '✉ riyaroy2264dns@gmail.com',
    color: 'blue',
    external: false,
  },
  {
    href: 'https://github.com/riya589',
    label: 'GitHub →',
    color: 'white',
    external: true,
  },
  {
    href: 'https://www.linkedin.com/in/riya-roy-646b05289/',
    label: 'LinkedIn →',
    color: 'blue',
    external: true,
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="contact-section">
      <div className="grid-overlay" />
      <div className="contact-bg-glow" />

      <div className="container">
        <motion.div
          ref={ref}
          className="contact-wrapper"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="contact-card">
            <div className="contact-card-glow" />

            <motion.span
              className="section-label"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              Contact
            </motion.span>

            <motion.h2
              className="contact-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Let's build something.
            </motion.h2>

            <motion.p
              className="contact-copy"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              I'm open to internships, early-career roles, and interesting projects.
              If you have something exciting to build — let's talk.
            </motion.p>

            <motion.div
              className="contact-links"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={`contact-link contact-link-${link.color}`}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  aria-label={link.label}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
