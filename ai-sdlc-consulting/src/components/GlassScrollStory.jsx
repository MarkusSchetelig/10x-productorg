import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import * as Icons from 'lucide-react'
import { challenges, consultingAreas, stats } from '../data/consultingData'
import './GlassScrollStory.css'

const GlassScrollStory = () => {
  const containerRef = useRef(null)
  const [activeSection, setActiveSection] = useState(0)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const getIcon = (iconName, size = 32) => {
    const Icon = Icons[iconName] || Icons.Circle
    return <Icon size={size} />
  }

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(progress => {
      const section = Math.floor(progress * 6)
      setActiveSection(section)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  
  const statsScale = useTransform(scrollYProgress, [0.1, 0.25], [0.8, 1])
  const statsOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1])

  const challengesX = useTransform(scrollYProgress, [0.2, 0.4], [-100, 0])
  const challengesOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1])

  const solutionsScale = useTransform(scrollYProgress, [0.4, 0.6], [0.9, 1])
  const solutionsRotate = useTransform(scrollYProgress, [0.4, 0.6], [-5, 0])

  // Background orbs for glassmorphism effect
  const renderBackgroundOrbs = () => (
    <div className="background-orbs">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="orb orb-4" />
      <div className="orb orb-5" />
    </div>
  )

  return (
    <div className="glass-scroll-story" ref={containerRef}>
      <nav className="glass-nav">
        <div className="nav-glass-content">
          <div className="nav-progress">
            <div 
              className="progress-bar" 
              style={{ width: `${scrollYProgress.get() * 100}%` }}
            />
          </div>
          <div className="nav-sections">
            {['Intro', 'Reality', 'Challenges', 'Bridge', 'Solutions', 'Future'].map((section, idx) => (
              <div 
                key={idx}
                className={`nav-item ${activeSection === idx ? 'active' : ''}`}
              >
                {section}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Section 1: Hero */}
      <section className="glass-section hero-section">
        {renderBackgroundOrbs()}
        <motion.div 
          className="hero-content glass-card"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <h1 className="hero-title">
            The AI Revolution is Here
          </h1>
          <p className="hero-subtitle">
            Are you ready to transform your software development lifecycle?
          </p>
          <div className="scroll-indicator glass-pill">
            <Icons.ChevronDown size={32} className="bounce" />
            <span>Scroll to explore</span>
          </div>
        </motion.div>
        <div className="floating-shapes">
          <div className="shape shape-1" />
          <div className="shape shape-2" />
          <div className="shape shape-3" />
        </div>
      </section>

      {/* Section 2: The Reality */}
      <section className="glass-section stats-section">
        {renderBackgroundOrbs()}
        <motion.div 
          className="section-content"
          style={{ scale: statsScale, opacity: statsOpacity }}
        >
          <div className="glass-card central-card">
            <h2>The New Reality of Software Development</h2>
            <p className="section-lead">
              The numbers don't lie. AI is fundamentally reshaping how we build software.
            </p>
          </div>
          
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                className="stat-card glass-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="stat-glow" />
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-source">{stat.source}</div>
              </motion.div>
            ))}
          </div>
          
          <div className="insight-box glass-card">
            <div className="insight-icon">
              <Icons.Lightbulb size={24} />
            </div>
            <p>
              Organizations that don't adapt now risk becoming obsolete within the next 5 years.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Section 3: The Challenges */}
      <section className="glass-section challenges-story">
        {renderBackgroundOrbs()}
        <motion.div 
          className="section-content"
          style={{ x: challengesX, opacity: challengesOpacity }}
        >
          <div className="glass-card central-card">
            <h2>But Transformation Isn't Easy</h2>
            <p className="section-lead">
              Every organization faces critical barriers on the path to AI adoption
            </p>
          </div>
          
          <div className="challenges-timeline">
            {challenges.map((challenge, idx) => (
              <motion.div 
                key={challenge.id}
                className="timeline-item"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: idx * 0.15 }}
              >
                <div className="timeline-marker glass-card">
                  <div className="marker-icon">{getIcon(challenge.icon, 24)}</div>
                </div>
                <div className="timeline-content glass-card">
                  <h3>{challenge.title}</h3>
                  <p>{challenge.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Section 4: The Bridge */}
      <section className="glass-section bridge-section">
        {renderBackgroundOrbs()}
        <motion.div 
          className="section-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="glass-card central-card">
            <h2>From Challenge to Opportunity</h2>
            <p className="section-lead">
              Every barrier is a chance to build something better
            </p>
          </div>
          
          <div className="transformation-visual">
            <div className="transform-left glass-card">
              <div className="card-glow red-glow" />
              <h3>Where You Are</h3>
              <ul>
                <li>Overwhelmed by AI options</li>
                <li>Concerned about security</li>
                <li>Facing team resistance</li>
                <li>Lacking clear metrics</li>
              </ul>
            </div>
            <div className="transform-center">
              <motion.div
                className="glass-orb"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Icons.RefreshCw size={48} />
              </motion.div>
            </div>
            <div className="transform-right glass-card">
              <div className="card-glow green-glow" />
              <h3>Where You'll Be</h3>
              <ul>
                <li>Strategic AI implementation</li>
                <li>Robust governance framework</li>
                <li>Empowered teams</li>
                <li>Clear ROI metrics</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 5: Our Solutions */}
      <section className="glass-section solutions-story">
        {renderBackgroundOrbs()}
        <motion.div 
          className="section-content"
          style={{ scale: solutionsScale, rotate: solutionsRotate }}
        >
          <div className="glass-card central-card">
            <h2>Your Transformation Partners</h2>
            <p className="section-lead">
              Comprehensive consulting services designed for the AI era
            </p>
          </div>
          
          <div className="solutions-showcase">
            {consultingAreas.map((area, idx) => (
              <motion.div
                key={area.id}
                className="solution-showcase-card glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
              >
                <div 
                  className="showcase-accent"
                  style={{ background: `linear-gradient(135deg, ${area.color}40, ${area.color}20)` }}
                />
                <div className="showcase-header">
                  <div className="showcase-icon glass-icon" style={{ backgroundColor: `${area.color}20` }}>
                    {getIcon(area.icon, 40)}
                  </div>
                </div>
                <div className="showcase-body">
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                  <div className="showcase-benefits">
                    {area.benefits.map((benefit, bidx) => (
                      <div key={bidx} className="benefit-tag glass-pill">
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Section 6: CTA */}
      <section className="glass-section cta-story">
        {renderBackgroundOrbs()}
        <motion.div 
          className="section-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="final-cta glass-card large-card">
            <div className="cta-glow" />
            <h2>The Future is Being Written Now</h2>
            <p className="cta-lead">
              Join the leaders who are already transforming their SDLC with AI
            </p>
            
            <div className="cta-stats">
              <div className="cta-stat glass-card">
                <div className="cta-number">15+</div>
                <div className="cta-label">Successful Projects</div>
              </div>
              <div className="cta-stat glass-card">
                <div className="cta-number">3-5x</div>
                <div className="cta-label">Productivity Gain in critical workflows</div>
              </div>
              <div className="cta-stat glass-card">
                <div className="cta-number">90%</div>
                <div className="cta-label">Client Satisfaction</div>
              </div>
            </div>
            
            <div className="cta-actions">
              <motion.button
                className="cta-btn primary glass-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Journey
                <Icons.ArrowRight size={20} />
              </motion.button>
              <motion.a
                href="https://docs.google.com/document/d/1A59B92h1k85owCO2II-J5MPoUJ-wuDUgoAHkrM0DIDk/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn secondary glass-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <Icons.FileText size={20} />
                Whitepaper: 10X Product-Manager
              </motion.a>
            </div>
            
            <div className="contact-info glass-card inline-card">
              <p>Or reach out directly:</p>
              <a href="mailto:contact@10x-productorg.com">contact@10x-productorg.com</a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default GlassScrollStory