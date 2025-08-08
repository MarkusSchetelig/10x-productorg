import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Icons from 'lucide-react'
import { challenges, consultingAreas, stats } from '../data/consultingData'
import './JourneyMap.css'

const JourneyMap = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [showSolution, setShowSolution] = useState(false)

  const steps = [
    { id: 0, title: "Current State", subtitle: "Manual SDLC" },
    { id: 1, title: "Challenges", subtitle: "Transformation Barriers" },
    { id: 2, title: "Solutions", subtitle: "Consulting Services" },
    { id: 3, title: "Future State", subtitle: "AI-Powered SDLC" }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeStep < 3 && !showSolution) {
        setActiveStep(prev => prev + 1)
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [activeStep, showSolution])

  const getIcon = (iconName) => {
    const Icon = Icons[iconName] || Icons.Circle
    return <Icon size={24} />
  }

  return (
    <div className="journey-container">
      <header className="journey-header">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Transform Your SDLC with AI</h1>
          <p>Navigate the challenges and unlock the potential of AI-assisted software development</p>
        </motion.div>

        <div className="stats-bar">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-source">{stat.source}</div>
            </motion.div>
          ))}
        </div>
      </header>

      <div className="journey-map">
        <div className="timeline">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`timeline-step ${activeStep >= index ? 'active' : ''}`}
              onClick={() => setActiveStep(index)}
            >
              <div className="step-marker">
                <div className="step-number">{index + 1}</div>
              </div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.subtitle}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`step-connector ${activeStep > index ? 'active' : ''}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeStep === 0 && (
            <motion.div
              key="current"
              className="content-panel"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
            >
              <h2>Traditional Software Development</h2>
              <div className="current-state">
                <div className="state-item">
                  <Icons.Code size={48} />
                  <h4>Manual Coding</h4>
                  <p>Developers write every line of code manually</p>
                </div>
                <div className="state-item">
                  <Icons.FileText size={48} />
                  <h4>Static Documentation</h4>
                  <p>Documentation quickly becomes outdated</p>
                </div>
                <div className="state-item">
                  <Icons.Bug size={48} />
                  <h4>Reactive Testing</h4>
                  <p>Bugs discovered late in the development cycle</p>
                </div>
                <div className="state-item">
                  <Icons.Users size={48} />
                  <h4>Siloed Teams</h4>
                  <p>Limited collaboration between development phases</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeStep === 1 && (
            <motion.div
              key="challenges"
              className="content-panel"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
            >
              <h2>Transformation Challenges</h2>
              <div className="challenges-grid">
                {challenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.id}
                    className="challenge-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="challenge-icon">{getIcon(challenge.icon)}</div>
                    <h3>{challenge.title}</h3>
                    <p>{challenge.description}</p>
                  </motion.div>
                ))}
              </div>
              <motion.button
                className="cta-button"
                onClick={() => setActiveStep(2)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Discover Our Solutions
                <Icons.ArrowRight size={20} />
              </motion.button>
            </motion.div>
          )}

          {activeStep === 2 && (
            <motion.div
              key="solutions"
              className="content-panel"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
            >
              <h2>Our Consulting Services</h2>
              <div className="solutions-grid">
                {consultingAreas.map((area, index) => (
                  <motion.div
                    key={area.id}
                    className="solution-card"
                    style={{ borderColor: area.color }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="solution-header" style={{ backgroundColor: area.color }}>
                      <div className="solution-icon">{getIcon(area.icon)}</div>
                      <h3>{area.shortTitle}</h3>
                    </div>
                    <div className="solution-content">
                      <p>{area.description}</p>
                      <ul className="benefits-list">
                        {area.benefits.map((benefit, idx) => (
                          <li key={idx}>
                            <Icons.Check size={16} />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeStep === 3 && (
            <motion.div
              key="future"
              className="content-panel"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
            >
              <h2>AI-Powered Future State</h2>
              <div className="future-state">
                <div className="transformation-visual">
                  <div className="before-after">
                    <div className="before">
                      <h4>Before</h4>
                      <ul>
                        <li>20 developers per project</li>
                        <li>6-month release cycles</li>
                        <li>Manual testing and deployment</li>
                        <li>Reactive problem solving</li>
                      </ul>
                    </div>
                    <div className="arrow-container">
                      <Icons.ArrowRight size={48} />
                    </div>
                    <div className="after">
                      <h4>After</h4>
                      <ul>
                        <li>2-3 AI-augmented engineers</li>
                        <li>Continuous delivery</li>
                        <li>Automated quality assurance</li>
                        <li>Predictive maintenance</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="cta-section">
                  <h3>Ready to Transform?</h3>
                  <p>Let us guide your journey to an AI-powered SDLC</p>
                  <motion.button
                    className="cta-button primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Schedule a Consultation
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default JourneyMap