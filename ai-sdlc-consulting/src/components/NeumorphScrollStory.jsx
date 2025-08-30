import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, LayoutGroup } from 'framer-motion'
import * as Icons from 'lucide-react'
import { challenges, consultingAreas, stats, tenXPillars } from '../data/consultingData'
import './NeumorphScrollStory.css'

// Robot CTA Component - Fixed position at bottom-right of viewport
const RobotCTA = ({ show, onClick }) => {
  if (!show) return null
  
  return (
    <motion.div
      className="robot-cta robot-cta-fixed"
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0 
      }}
      exit={{ opacity: 0, scale: 0.5, y: 50 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      onClick={onClick}
    >
      <div className="robot-help-text">Need support? </div>
      <div className="robot-icon-wrapper">
        <img src="/robot.png" alt="AI Assistant" className="robot-icon" />
      </div>
      <div className="robot-pulse"></div>
    </motion.div>
  )
}

const SupportTile = ({ show, onClick }) => {
  if (!show) return null
  
  return (
    <motion.div
      className="pillar-image-wrapper support-card clickable"
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0 
      }}
      exit={{ opacity: 0, scale: 0.5, y: 50 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      onClick={onClick}
      style={{ 
        position: 'fixed',
        bottom: '40px',
        right: '40px',
        width: '200px',
        height: '200px', // Same height as other framework tiles
        backgroundColor: '#4a2c3a', // Subtle muted pink background
        zIndex: 1000
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%', 
        padding: '1rem',
        textAlign: 'center'
      }}>
        <div style={{ 
          fontSize: '0.9em', 
          color: 'white', 
          lineHeight: '1.2',
          fontWeight: '500',
          backgroundColor: 'black',
          borderRadius: '50%',
          width: '140px',
          height: '140px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          Check the Implementation Framework
        </div>
      </div>
    </motion.div>
  )
}

const NeumorphScrollStory = () => {
  const containerRef = useRef(null)
  const [activeSection, setActiveSection] = useState(0)
  const [selectedArea, setSelectedArea] = useState(null)
  const [selectedPillar, setSelectedPillar] = useState(null)
  const [selectedFrameworkComponent, setSelectedFrameworkComponent] = useState(null)
  const [iconDelays, setIconDelays] = useState([])
  const [showGlobalRobot, setShowGlobalRobot] = useState(false)
  const [robotVisible, setRobotVisible] = useState(false)
  const [showRobotModal, setShowRobotModal] = useState(false)
  const [scrollTimer, setScrollTimer] = useState(null)
  const [showImprintModal, setShowImprintModal] = useState(false)
  const [showDataProtectionModal, setShowDataProtectionModal] = useState(false)
  const section1Ref = useRef(null) // Hero section
  const section2Ref = useRef(null) // AI Impact Framework section
  const section3Ref = useRef(null) // Challenges section
  const section4Ref = useRef(null) // Process section
  const section5Ref = useRef(null) // Solutions section  
  const section6Ref = useRef(null) // How We Work section
  const section7Ref = useRef(null) // CTA section
  const [isGravityActive, setIsGravityActive] = useState(false)
  const gravityTimeoutRef = useRef(null)
  const gravitySection1TimeoutRef = useRef(null)
  const gravitySection2TimeoutRef = useRef(null)
  const gravitySection3TimeoutRef = useRef(null)
  const gravitySection4TimeoutRef = useRef(null)
  const gravitySection5TimeoutRef = useRef(null)
  const robotCTATimeoutRef = useRef(null)
  const [challengesInView, setChallengesInView] = useState(false)
  const [frameworkInView, setFrameworkInView] = useState(false)
  const [showSupportTile, setShowSupportTile] = useState(false)
  
  // Generate random animation delays for icons
  const generateRandomDelays = () => {
    const delays = [];
    const usedDelays = new Set();
    
    // Generate 5 unique random delays between 0 and 13.6 seconds
    while (delays.length < 5) {
      const delay = (Math.random() * 13.6).toFixed(1);
      if (!usedDelays.has(delay)) {
        usedDelays.add(delay);
        delays.push(delay);
      }
    }
    
    return delays;
  };

  // Initialize and update random delays
  useEffect(() => {
    // Set initial delays
    setIconDelays(generateRandomDelays());
    
    // Update delays every cycle (13.6 seconds) to change the order
    const interval = setInterval(() => {
      setIconDelays(generateRandomDelays());
    }, 13600);
    
    return () => clearInterval(interval);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedArea || selectedPillar !== null || selectedFrameworkComponent !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedArea, selectedPillar])
  
  // Extended gravity effect for section 3 (5 Pillars - also pulls from section 2)
  useEffect(() => {
    const handleScroll = () => {
      // TEMPORARILY DISABLED to debug section 4 conflict
      return;
      if (!section3Ref.current || !section2Ref.current || isGravityActive) return
      
      const section3 = section3Ref.current
      const section2 = section2Ref.current
      const rect3 = section3.getBoundingClientRect()
      const rect2 = section2.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const sectionHeight = rect3.height
      
      // Calculate how much of section 3 is visible
      const visibleTop = Math.max(0, rect3.top)
      const visibleBottom = Math.min(viewportHeight, rect3.bottom)
      const visibleHeight = Math.max(0, visibleBottom - visibleTop)
      const visibilityPercentage = visibleHeight / sectionHeight
      
      // Check if we're in section 2 with section 3 partially visible
      const section2Visible = rect2.top <= 0 && rect2.bottom > viewportHeight * 0.3
      const section3PartiallyVisible = rect3.top < viewportHeight && rect3.top > 0
      
      // Extended gravity conditions:
      // 1. Original: More than 50% of section 3 is visible
      // 2. Extended: Gravity starts when just 5% of section 3 is visible
      const shouldApplyGravity = visibilityPercentage > 0.5 || 
                                 (visibilityPercentage > 0.05 && rect3.top < viewportHeight)
      
      if (shouldApplyGravity) {
        const sectionCenter = rect3.top + sectionHeight / 2
        const viewportCenter = viewportHeight / 2
        const offset = Math.abs(sectionCenter - viewportCenter)
        
        // Only trigger gravity if section is not already reasonably centered (within 50px)
        if (offset > 50) {
          // Clear any existing timeout
          if (gravityTimeoutRef.current) {
            clearTimeout(gravityTimeoutRef.current)
          }
          
          // Wait 2 seconds after user stops interacting to avoid flickering
          gravityTimeoutRef.current = setTimeout(() => {
            setIsGravityActive(true)
            
            // Calculate the scroll position to center the section
            const targetScrollY = window.scrollY + (sectionCenter - viewportCenter)
            
            // Create a custom slower animation (50% speed reduction)
            const startY = window.scrollY
            const distance = targetScrollY - startY
            const duration = 1600 // Doubled from ~800ms (browser smooth default) to 1600ms
            const startTime = performance.now()
            
            const animateScroll = (currentTime) => {
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / duration, 1)
              
              // Easing function for smooth animation
              const easeInOutCubic = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2
              
              window.scrollTo(0, startY + distance * easeInOutCubic)
              
              if (progress < 1) {
                requestAnimationFrame(animateScroll)
              }
            }
            
            requestAnimationFrame(animateScroll)
            
            // Reset gravity flag after animation completes
            setTimeout(() => {
              setIsGravityActive(false)
            }, 1600)
          }, 2000) // 2 seconds delay to ensure user has stopped scrolling and avoid flickering
        }
      } else {
        // Clear timeout if conditions not met
        if (gravityTimeoutRef.current) {
          clearTimeout(gravityTimeoutRef.current)
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (gravityTimeoutRef.current) {
        clearTimeout(gravityTimeoutRef.current)
      }
    }
  }, [isGravityActive])
  
  // Deeplink functionality for hash-based navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) // Remove the #
      if (hash === 'ai-impact-framework' && section2Ref.current) {
        // Smooth scroll to the AI Impact Framework section
        const section2 = section2Ref.current
        const rect2 = section2.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        
        // Calculate position to center the section
        const sectionCenter = rect2.top + rect2.height / 2
        const viewportCenter = viewportHeight / 2
        const targetScrollY = window.scrollY + (sectionCenter - viewportCenter)
        
        // Smooth scroll animation
        const startY = window.scrollY
        const distance = targetScrollY - startY
        const duration = 1200
        const startTime = performance.now()
        
        const animateScroll = (currentTime) => {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)
          
          // Easing function for smooth animation
          const easeInOutCubic = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2
          
          window.scrollTo(0, startY + distance * easeInOutCubic)
          
          if (progress < 1) {
            requestAnimationFrame(animateScroll)
          }
        }
        
        requestAnimationFrame(animateScroll)
      } else if (hash === 'implementation-framework' && section5Ref.current) {
        // Smooth scroll to the Implementation Framework section (section 5)
        const section5 = section5Ref.current
        const section5AbsoluteTop = section5.offsetTop
        const targetTop = -140 // Same positioning as section 5 gravity system
        const targetScrollY = section5AbsoluteTop - targetTop
        
        // Smooth scroll animation
        const startY = window.scrollY
        const distance = targetScrollY - startY
        const duration = 1200
        const startTime = performance.now()
        
        const animateScroll = (currentTime) => {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / duration, 1)
          
          // Easing function for smooth animation
          const easeInOutCubic = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2
          
          window.scrollTo(0, startY + distance * easeInOutCubic)
          
          if (progress < 1) {
            requestAnimationFrame(animateScroll)
          }
        }
        
        requestAnimationFrame(animateScroll)
      }
    }
    
    // Handle initial load with hash
    handleHashChange()
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])
  
  // Gravity effect for section 1 (Hero section) when 50% visible
  useEffect(() => {
    const handleSection1Gravity = () => {
      if (!section1Ref.current || isGravityActive) return
      
      const section1 = section1Ref.current
      const rect1 = section1.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      // Calculate visible portion of section 1
      const section1VisibleTop = Math.max(0, Math.min(viewportHeight, rect1.top))
      const section1VisibleBottom = Math.max(0, Math.min(viewportHeight, rect1.bottom))
      const section1VisibleHeight = section1VisibleBottom - section1VisibleTop
      const section1Percentage = section1VisibleHeight / viewportHeight
      
      // Trigger gravity when 50% or more of section 1 is visible
      if (section1Percentage >= 0.5) {
        const sectionCenter = rect1.top + rect1.height / 2
        const viewportCenter = viewportHeight / 2
        const offset = Math.abs(sectionCenter - viewportCenter)
        
        // Only trigger gravity if not already reasonably centered
        if (offset > 50) {
          // Clear any existing timeout
          if (gravitySection1TimeoutRef.current) {
            clearTimeout(gravitySection1TimeoutRef.current)
          }
          
          // Wait 2 seconds after user stops interacting
          gravitySection1TimeoutRef.current = setTimeout(() => {
            setIsGravityActive(true)
            
            // Calculate the scroll position to center the section
            const targetScrollY = window.scrollY + (sectionCenter - viewportCenter)
            
            // Custom slower animation
            const startY = window.scrollY
            const distance = targetScrollY - startY
            const duration = 1600
            const startTime = performance.now()
            
            const animateScroll = (currentTime) => {
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / duration, 1)
              
              // Easing function for smooth animation
              const easeInOutCubic = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2
              
              window.scrollTo(0, startY + distance * easeInOutCubic)
              
              if (progress < 1) {
                requestAnimationFrame(animateScroll)
              } else {
                setIsGravityActive(false)
              }
            }
            
            requestAnimationFrame(animateScroll)
          }, 2000)
        }
      } else {
        // Clear timeout if less than 50% visible
        if (gravitySection1TimeoutRef.current) {
          clearTimeout(gravitySection1TimeoutRef.current)
        }
      }
    }
    
    window.addEventListener('scroll', handleSection1Gravity, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleSection1Gravity)
      if (gravitySection1TimeoutRef.current) {
        clearTimeout(gravitySection1TimeoutRef.current)
      }
    }
  }, [isGravityActive])
  
  // Gravity effect for section 2 (AI Impact Framework) when 50% visible
  useEffect(() => {
    const handleSection2Gravity = () => {
      if (!section2Ref.current || isGravityActive) return
      
      const section2 = section2Ref.current
      const rect2 = section2.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      // Calculate visible portion of section 2
      const section2VisibleTop = Math.max(0, Math.min(viewportHeight, rect2.top))
      const section2VisibleBottom = Math.max(0, Math.min(viewportHeight, rect2.bottom))
      const section2VisibleHeight = section2VisibleBottom - section2VisibleTop
      const section2Percentage = section2VisibleHeight / viewportHeight
      
      // Trigger gravity when 50% or more of section 2 is visible
      if (section2Percentage >= 0.5) {
        // Check if section is already positioned correctly (-25px to get headline at ~20px from top)
        const targetTop = -25
        const section2AbsoluteTop = section2.offsetTop
        const targetScrollY = section2AbsoluteTop - targetTop
        const currentScrollY = window.scrollY
        const offset = Math.abs(currentScrollY - targetScrollY)
        
        // Only trigger gravity if not already reasonably positioned
        if (offset > 50) {
          // Clear any existing timeout
          if (gravitySection2TimeoutRef.current) {
            clearTimeout(gravitySection2TimeoutRef.current)
          }
          
          // Wait 2 seconds after user stops interacting
          gravitySection2TimeoutRef.current = setTimeout(() => {
            setIsGravityActive(true)
            
            // Calculate the absolute scroll position to position section at targetTop (-25px to get headline at ~20px from top)
            const targetTop = -25
            const section2AbsoluteTop = section2.offsetTop
            const targetScrollY = section2AbsoluteTop - targetTop
            
            // Custom slower animation
            const startY = window.scrollY
            const distance = targetScrollY - startY
            const duration = 1600
            const startTime = performance.now()
            
            const animateScroll = (currentTime) => {
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / duration, 1)
              
              // Easing function for smooth animation
              const easeInOutCubic = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2
              
              window.scrollTo(0, startY + distance * easeInOutCubic)
              
              if (progress < 1) {
                requestAnimationFrame(animateScroll)
              } else {
                setIsGravityActive(false)
              }
            }
            
            requestAnimationFrame(animateScroll)
          }, 2000)
        }
      } else {
        // Clear timeout if less than 50% visible
        if (gravitySection2TimeoutRef.current) {
          clearTimeout(gravitySection2TimeoutRef.current)
        }
      }
    }
    
    window.addEventListener('scroll', handleSection2Gravity, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleSection2Gravity)
      if (gravitySection2TimeoutRef.current) {
        clearTimeout(gravitySection2TimeoutRef.current)
      }
    }
  }, [isGravityActive])
  
  // Gravity effect between section 2 and section 3 (framework to challenges)
  useEffect(() => {
    const handleSection2to3Gravity = () => {
      if (!section2Ref.current || !section3Ref.current || !section4Ref.current || isGravityActive) return
      
      const section2 = section2Ref.current
      const section3 = section3Ref.current
      const section4 = section4Ref.current
      const rect2 = section2.getBoundingClientRect()
      const rect3 = section3.getBoundingClientRect()
      const rect4 = section4.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      // Calculate visible portions of all sections
      const section2VisibleTop = Math.max(0, Math.min(viewportHeight, rect2.top))
      const section2VisibleBottom = Math.max(0, Math.min(viewportHeight, rect2.bottom))
      const section2VisibleHeight = section2VisibleBottom - section2VisibleTop
      
      const section3VisibleTop = Math.max(0, Math.min(viewportHeight, rect3.top))
      const section3VisibleBottom = Math.max(0, Math.min(viewportHeight, rect3.bottom))
      const section3VisibleHeight = section3VisibleBottom - section3VisibleTop
      
      const section4VisibleTop = Math.max(0, Math.min(viewportHeight, rect4.top))
      const section4VisibleBottom = Math.max(0, Math.min(viewportHeight, rect4.bottom))
      const section4VisibleHeight = section4VisibleBottom - section4VisibleTop
      
      // Calculate percentages
      const section4Percentage = section4VisibleHeight / viewportHeight
      
      // Don't interfere if section 4 has ANY visibility (let section 3-4 gravity handle it)
      if (section4Percentage > 0) {
        // Also clear any existing timeout to prevent delayed activation
        if (gravitySection3TimeoutRef.current) {
          clearTimeout(gravitySection3TimeoutRef.current)
        }
        return
      }
      
      // Check if we're in the transition zone between sections 2 and 3
      const inTransitionZone = section2VisibleHeight > 0 && section3VisibleHeight > 0
      
      if (inTransitionZone) {
        // Calculate which section has more screen space
        const section2Percentage = section2VisibleHeight / viewportHeight
        const section3Percentage = section3VisibleHeight / viewportHeight
        
        let targetSection, targetRect, targetHeight
        
        if (section2Percentage > 0.5) {
          // Section 2 gravity is handled by dedicated section 2 gravity effect
          // Skip this transition gravity to avoid double gravity
          return
        } else if (section3Percentage > 0.5) {
          // Pull toward section 3
          targetSection = section3
          targetRect = rect3
          targetHeight = rect3.height
        } else if (section2Percentage > section3Percentage) {
          // Pull toward section 2 (but use dedicated section 2 positioning logic)
          const targetTop = -25
          const section2AbsoluteTop = section2.offsetTop
          const targetScrollY = section2AbsoluteTop - targetTop
          const currentScrollY = window.scrollY
          const offset = Math.abs(currentScrollY - targetScrollY)
          
          if (offset > 50) {
            if (gravitySection3TimeoutRef.current) {
              clearTimeout(gravitySection3TimeoutRef.current)
            }
            
            gravitySection3TimeoutRef.current = setTimeout(() => {
              setIsGravityActive(true)
              
              const startY = window.scrollY
              const distance = targetScrollY - startY
              const duration = 1600
              const startTime = performance.now()
              
              const animateScroll = (currentTime) => {
                const elapsed = currentTime - startTime
                const progress = Math.min(elapsed / duration, 1)
                
                const easeInOutCubic = progress < 0.5
                  ? 4 * progress * progress * progress
                  : 1 - Math.pow(-2 * progress + 2, 3) / 2
                
                window.scrollTo(0, startY + distance * easeInOutCubic)
                
                if (progress < 1) {
                  requestAnimationFrame(animateScroll)
                } else {
                  setIsGravityActive(false)
                }
              }
              
              requestAnimationFrame(animateScroll)
            }, 1600)
          }
          return
        } else {
          // No clear majority, don't apply gravity
          return
        }
        
        const sectionCenter = targetRect.top + targetHeight / 2
        const viewportCenter = viewportHeight / 2
        const offset = Math.abs(sectionCenter - viewportCenter)
        
        // Only trigger gravity if not already reasonably centered
        if (offset > 50) {
          // Clear any existing timeout
          if (gravitySection3TimeoutRef.current) {
            clearTimeout(gravitySection3TimeoutRef.current)
          }
          
          // Wait 2 seconds after user stops interacting
          gravitySection3TimeoutRef.current = setTimeout(() => {
            setIsGravityActive(true)
            
            // Calculate the scroll position to center the section
            const targetScrollY = window.scrollY + (sectionCenter - viewportCenter)
            
            // Custom slower animation
            const startY = window.scrollY
            const distance = targetScrollY - startY
            const duration = 1600
            const startTime = performance.now()
            
            const animateScroll = (currentTime) => {
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / duration, 1)
              
              // Easing function for smooth animation
              const easeInOutCubic = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2
              
              window.scrollTo(0, startY + distance * easeInOutCubic)
              
              if (progress < 1) {
                requestAnimationFrame(animateScroll)
              }
            }
            
            requestAnimationFrame(animateScroll)
            
            // Reset gravity flag after animation completes
            setTimeout(() => {
              setIsGravityActive(false)
            }, 1600)
          }, 2000)
        }
      } else {
        // Clear timeout if not in transition zone
        if (gravitySection3TimeoutRef.current) {
          clearTimeout(gravitySection3TimeoutRef.current)
        }
      }
    }
    
    window.addEventListener('scroll', handleSection2to3Gravity, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleSection2to3Gravity)
      if (gravitySection3TimeoutRef.current) {
        clearTimeout(gravitySection3TimeoutRef.current)
      }
    }
  }, [isGravityActive])
  
  // Gravity effect between section 3 (Challenges) and section 4 (Process)
  useEffect(() => {
    const handleSection3to4Gravity = () => {
      if (!section3Ref.current || !section4Ref.current || isGravityActive) return
      
      const section3 = section3Ref.current
      const section4 = section4Ref.current
      const rect3 = section3.getBoundingClientRect()
      const rect4 = section4.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      // Calculate visible portions of both sections
      const section3VisibleTop = Math.max(0, Math.min(viewportHeight, rect3.top))
      const section3VisibleBottom = Math.max(0, Math.min(viewportHeight, rect3.bottom))
      const section3VisibleHeight = section3VisibleBottom - section3VisibleTop
      
      const section4VisibleTop = Math.max(0, Math.min(viewportHeight, rect4.top))
      const section4VisibleBottom = Math.max(0, Math.min(viewportHeight, rect4.bottom))
      const section4VisibleHeight = section4VisibleBottom - section4VisibleTop
      
      // Check if we're in the transition zone between sections 3 and 4
      const inTransitionZone = section3VisibleHeight > 0 && section4VisibleHeight > 0
      
      if (inTransitionZone) {
        // Calculate which section has more screen space
        const section3Percentage = section3VisibleHeight / viewportHeight
        const section4Percentage = section4VisibleHeight / viewportHeight
        
        let targetSection, targetRect, targetHeight
        
        if (section3Percentage > 0.5) {
          // Pull toward section 3 - center it but 50px higher
          const targetTop = (viewportHeight - rect3.height) / 2 - 50
          const section3AbsoluteTop = section3.offsetTop
          const targetScrollY = section3AbsoluteTop - targetTop
          const currentScrollY = window.scrollY
          const offset = Math.abs(currentScrollY - targetScrollY)
          
          if (offset > 50) {
            if (gravitySection4TimeoutRef.current) {
              clearTimeout(gravitySection4TimeoutRef.current)
            }
            
            gravitySection4TimeoutRef.current = setTimeout(() => {
              setIsGravityActive(true)
              
              const startY = window.scrollY
              const distance = targetScrollY - startY
              const duration = 1600
              const startTime = performance.now()
              
              const animateScroll = (currentTime) => {
                const elapsed = currentTime - startTime
                const progress = Math.min(elapsed / duration, 1)
                
                const easeInOutCubic = progress < 0.5
                  ? 4 * progress * progress * progress
                  : 1 - Math.pow(-2 * progress + 2, 3) / 2
                
                window.scrollTo(0, startY + distance * easeInOutCubic)
                
                if (progress < 1) {
                  requestAnimationFrame(animateScroll)
                } else {
                  setIsGravityActive(false)
                }
              }
              
              requestAnimationFrame(animateScroll)
            }, 2000)
          }
          return
        } else if (section4Percentage > 0.5) {
          // Pull toward section 4 - center it  
          const targetTop = (viewportHeight - rect4.height) / 2
          const section4AbsoluteTop = section4.offsetTop
          const targetScrollY = section4AbsoluteTop - targetTop
          const currentScrollY = window.scrollY
          const offset = Math.abs(currentScrollY - targetScrollY)
          
          if (offset > 50) {
            if (gravitySection4TimeoutRef.current) {
              clearTimeout(gravitySection4TimeoutRef.current)
            }
            
            gravitySection4TimeoutRef.current = setTimeout(() => {
              setIsGravityActive(true)
              
              const startY = window.scrollY
              const distance = targetScrollY - startY
              const duration = 1600
              const startTime = performance.now()
              
              const animateScroll = (currentTime) => {
                const elapsed = currentTime - startTime
                const progress = Math.min(elapsed / duration, 1)
                
                const easeInOutCubic = progress < 0.5
                  ? 4 * progress * progress * progress
                  : 1 - Math.pow(-2 * progress + 2, 3) / 2
                
                window.scrollTo(0, startY + distance * easeInOutCubic)
                
                if (progress < 1) {
                  requestAnimationFrame(animateScroll)
                } else {
                  setIsGravityActive(false)
                }
              }
              
              requestAnimationFrame(animateScroll)
            }, 2000)
          }
          return
        } else {
          // No clear majority, don't apply gravity
          return
        }
      } else {
        // Clear timeout if not in transition zone
        if (gravitySection4TimeoutRef.current) {
          clearTimeout(gravitySection4TimeoutRef.current)
        }
      }
    }
    
    window.addEventListener('scroll', handleSection3to4Gravity, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleSection3to4Gravity)
      if (gravitySection4TimeoutRef.current) {
        clearTimeout(gravitySection4TimeoutRef.current)
      }
    }
  }, [isGravityActive])
  
  // Gravity effect between section 4 (Process) and section 5 (Solutions)
  useEffect(() => {
    const handleSection4to5Gravity = () => {
      if (!section3Ref.current || !section4Ref.current || !section5Ref.current || isGravityActive) return
      
      const section3 = section3Ref.current
      const section4 = section4Ref.current
      const section5 = section5Ref.current
      const rect3 = section3.getBoundingClientRect()
      const rect4 = section4.getBoundingClientRect()
      const rect5 = section5.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      // Calculate visible portions of all sections
      const section3VisibleTop = Math.max(0, Math.min(viewportHeight, rect3.top))
      const section3VisibleBottom = Math.max(0, Math.min(viewportHeight, rect3.bottom))
      const section3VisibleHeight = section3VisibleBottom - section3VisibleTop
      
      const section4VisibleTop = Math.max(0, Math.min(viewportHeight, rect4.top))
      const section4VisibleBottom = Math.max(0, Math.min(viewportHeight, rect4.bottom))
      const section4VisibleHeight = section4VisibleBottom - section4VisibleTop
      
      const section5VisibleTop = Math.max(0, Math.min(viewportHeight, rect5.top))
      const section5VisibleBottom = Math.max(0, Math.min(viewportHeight, rect5.bottom))
      const section5VisibleHeight = section5VisibleBottom - section5VisibleTop
      
      // Calculate percentages
      const section3Percentage = section3VisibleHeight / viewportHeight
      
      // Don't interfere if section 3 has ANY visibility (let section 3-4 gravity handle it)
      if (section3Percentage > 0) {
        // Also clear any existing timeout to prevent delayed activation
        if (gravitySection5TimeoutRef.current) {
          clearTimeout(gravitySection5TimeoutRef.current)
        }
        return
      }
      
      // Check if we're in the transition zone between sections 4 and 5
      const inTransitionZone = section4VisibleHeight > 0 && section5VisibleHeight > 0
      
      if (inTransitionZone) {
        // Calculate which section has more screen space
        const section4Percentage = section4VisibleHeight / viewportHeight
        const section5Percentage = section5VisibleHeight / viewportHeight
        
        if (section4Percentage > 0.5) {
          // Pull toward section 4 - align top with viewport top
          const targetTop = 0 // Align section top with viewport top
          const section4AbsoluteTop = section4.offsetTop
          const targetScrollY = section4AbsoluteTop - targetTop
          const currentScrollY = window.scrollY
          const offset = Math.abs(currentScrollY - targetScrollY)
          
          if (offset > 50) {
            if (gravitySection5TimeoutRef.current) {
              clearTimeout(gravitySection5TimeoutRef.current)
            }
            
            gravitySection5TimeoutRef.current = setTimeout(() => {
              setIsGravityActive(true)
              
              const startY = window.scrollY
              const distance = targetScrollY - startY
              const duration = 1600
              const startTime = performance.now()
              
              const animateScroll = (currentTime) => {
                const elapsed = currentTime - startTime
                const progress = Math.min(elapsed / duration, 1)
                
                const easeInOutCubic = progress < 0.5
                  ? 4 * progress * progress * progress
                  : 1 - Math.pow(-2 * progress + 2, 3) / 2
                
                window.scrollTo(0, startY + distance * easeInOutCubic)
                
                if (progress < 1) {
                  requestAnimationFrame(animateScroll)
                } else {
                  setIsGravityActive(false)
                }
              }
              
              requestAnimationFrame(animateScroll)
            }, 2000)
          }
          return
        } else if (section5Percentage > 0.5) {
          // Pull toward section 5 - position headline 20px below viewport top
          const targetTop = -140 // Position section higher to account for internal padding
          const section5AbsoluteTop = section5.offsetTop
          const targetScrollY = section5AbsoluteTop - targetTop
          const currentScrollY = window.scrollY
          const offset = Math.abs(currentScrollY - targetScrollY)
          
          if (offset > 50) {
            if (gravitySection5TimeoutRef.current) {
              clearTimeout(gravitySection5TimeoutRef.current)
            }
            
            gravitySection5TimeoutRef.current = setTimeout(() => {
              setIsGravityActive(true)
              
              const startY = window.scrollY
              const distance = targetScrollY - startY
              const duration = 1600
              const startTime = performance.now()
              
              const animateScroll = (currentTime) => {
                const elapsed = currentTime - startTime
                const progress = Math.min(elapsed / duration, 1)
                
                const easeInOutCubic = progress < 0.5
                  ? 4 * progress * progress * progress
                  : 1 - Math.pow(-2 * progress + 2, 3) / 2
                
                window.scrollTo(0, startY + distance * easeInOutCubic)
                
                if (progress < 1) {
                  requestAnimationFrame(animateScroll)
                } else {
                  setIsGravityActive(false)
                }
              }
              
              requestAnimationFrame(animateScroll)
            }, 2000)
          }
          return
        } else {
          // No clear majority, don't apply gravity
          return
        }
      } else {
        // Clear timeout if not in transition zone
        if (gravitySection5TimeoutRef.current) {
          clearTimeout(gravitySection5TimeoutRef.current)
        }
      }
    }
    
    window.addEventListener('scroll', handleSection4to5Gravity, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleSection4to5Gravity)
      if (gravitySection5TimeoutRef.current) {
        clearTimeout(gravitySection5TimeoutRef.current)
      }
    }
  }, [isGravityActive])
  
  // Intersection Observer for challenges section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !challengesInView) {
            setChallengesInView(true)
          }
        })
      },
      {
        threshold: 0.3 // Trigger when 30% of the section is visible
      }
    )

    if (section3Ref.current) {
      observer.observe(section3Ref.current)
    }

    return () => {
      if (section3Ref.current) {
        observer.unobserve(section3Ref.current)
      }
    }
  }, [challengesInView])

  // Track framework section visibility to hide global robot
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setFrameworkInView(entry.isIntersecting)
        })
      },
      {
        threshold: 0.2 // Trigger when 20% of the section is visible
      }
    )

    if (section2Ref.current) {
      observer.observe(section2Ref.current)
    }

    return () => {
      if (section2Ref.current) {
        observer.unobserve(section2Ref.current)
      }
    }
  }, [])

  // Support tile visibility with 5-second delay when framework is in view
  useEffect(() => {
    let timer = null
    
    if (frameworkInView) {
      // Show support tile after 10 seconds when framework section is in view
      timer = setTimeout(() => {
        setShowSupportTile(true)
      }, 10000)
    } else {
      // Hide support tile when framework section is not in view
      setShowSupportTile(false)
      if (timer) {
        clearTimeout(timer)
      }
    }

    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [frameworkInView])

  // Global robot visibility with scroll-based hide/show
  useEffect(() => {
    let timer = null
    let isScrolling = false
    let lastScrollTime = 0
    
    // Show robot initially after 6 seconds
    const initialTimer = setTimeout(() => {
      console.log('Showing global robot initially')
      setShowGlobalRobot(true)
      setRobotVisible(true)
    }, 6000)
    
    const handleScroll = () => {
      if (!showGlobalRobot) return
      
      // Don't hide robot during gravity animations
      if (isGravityActive) {
        console.log('Ignoring scroll during gravity animation')
        return
      }
      
      const currentTime = Date.now()
      lastScrollTime = currentTime
      
      // Hide robot when scrolling starts
      if (!isScrolling) {
        isScrolling = true
        console.log('Hiding robot during scroll')
        setRobotVisible(false)
      }
      
      // Clear existing timer
      if (timer) {
        clearTimeout(timer)
      }
      
      // Show robot after 6 seconds of no scrolling
      timer = setTimeout(() => {
        // Only show robot if enough time has passed since last scroll and not during gravity
        if (Date.now() - lastScrollTime >= 6000 && !isGravityActive) {
          isScrolling = false
          console.log('Showing robot after scroll timeout')
          setRobotVisible(true)
        }
      }, 6000)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timer) clearTimeout(timer)
      if (initialTimer) clearTimeout(initialTimer)
    }
  }, [showGlobalRobot, isGravityActive])
  
  
  const pillarContent = [
    {
      title: "Exponential Speed and Agility",
      subtitle: "Time-to-Market",
      content: "AI-powered tools drastically **accelerate** the product development lifecycle, shrinking the time from idea to launch. By automating time-consuming tasks – from coding and testing to project management – AI frees teams to focus on high-value creative work. The result is a much faster **time-to-market**: Our clients report that tasks which once took weeks can now be completed in **days or hours**. In fact, some product leaders note their teams \"can now dream up an idea one day and have a functional prototype the next\". This unprecedented **agility** means more frequent releases, quicker pivots, and the ability to capitalize on market opportunities or respond to feedback almost in real-time. In an environment where AI is everywhere, **speed becomes a competitive differentiator** – not by overworking teams, but by augmenting them with AI to accomplish more in less time."
    },
    {
      title: "Customer-Centric Value Delivery",
      subtitle: "Outcome Focus",
      content: "A 10× product organization puts **customer value** at the center from day one, and AI makes this far more achievable. Modern AI systems can ingest and synthesize fragmented customer feedback from surveys, support tickets, usage analytics, and even social media, then integrate those insights directly into product planning. This means teams can understand user needs and pain points with **unprecedented clarity and speed**. For example, generative AI can compress **weeks of user research into hours** by analyzing massive data sets and surfacing genuine patterns, allowing product managers to validate needs faster and more objectively. The outcome is that products deliver real customer value much sooner – features are aligned to real user problems and market demand from the outset, not after multiple missed iterations. Companies leveraging AI in this way are seeing **higher customer adoption** and satisfaction because they're building what people truly want, and even moving toward **outcome-based product strategies** (tying success to customer results rather than just feature delivery). In short, AI-driven customer insight enables a 10× organization to be radically customer-centric, ensuring every release is laser-focused on value and impact."
    },
    {
      title: "Unleashing Innovation through Experimentation",
      subtitle: "Rapid Testing",
      content: "Being \"10×\" also means dramatically boosting innovation capacity – not by betting on one big idea, but by running many **rapid experiments** to find the best ideas. AI lowers the cost and time of experimentation to **near zero**, allowing teams to try out far more concepts than before. Generative AI can instantly create prototypes or simulations, and even automate A/B tests, so that more good ideas see the light of day instead of dying in lengthy research phases. Traditional product development might test a handful of ideas due to resource limits, but an AI-augmented process can **validate dozens**. This expands the innovation pipeline and reduces reliance on the HiPPO (Highest Paid Person's Opinion) – decisions are driven by **data from experiments** rather than gut feeling. For instance, product teams can now generate a UI mockup or a working beta in hours and put it in front of users immediately, using a \"Wizard of Oz\" approach to fake any unbuilt functionality. If the concept doesn't resonate with users or if engagement metrics fall short, the team can **kill ideas early** – before investing significant engineering effort. Conversely, promising ideas can be identified and scaled up faster. By embracing AI-fueled experimentation, a 10× product org creates a culture where innovation isn't a lucky break – it's a continuous, systematic process of trial, learning, and iteration at 10× the speed and scale of a conventional team."
    },
    {
      title: "AI-Augmented Teams and Talent",
      subtitle: "Empowered People",
      content: "Another pillar of the 10× Product Organization is the fusion of human talent with AI capabilities, leading to smaller, empowered teams that punch far above their weight. AI acts as a **force multiplier** for product managers, designers, and developers – effectively collapsing traditional role boundaries. For example, with the assistance of generative AI, a product manager can rapidly prototype a feature, generate design mockups, or even produce draft code with minimal involvement from specialized teams. This **end-to-end capability** means the classic PM dream of being a \"mini-CEO\" is finally coming to fruition, as AI enables product leaders to oversee everything from ideation to execution within one role. Similarly, a single developer or UX designer augmented by AI can accomplish what used to require a full squad – one person can iterate on a design, get code suggestions, and run tests autonomously, dramatically reducing handoffs and dependencies. In practice, organizations are seeing that a single AI-augmented individual can **operate like a 10× team**, accelerating cycles without waiting on others. Importantly, this is not about overloading people – it's about **shifting focus**. AI handles the drudgery (status reports, routine coding, slicing data), while human experts concentrate on strategic thinking, creative problem-solving, and leadership tasks that truly drive outcomes. The net effect is a leaner, more autonomous team structure where talent is leveraged to its fullest. People in a 10× organization spend less time coordinating and more time innovating and leading – which not only boosts productivity, but also enriches the **employee experience** (developers report higher satisfaction when AI lifts the busywork so they can solve meaningful problems). In an AI-first era, teams that effectively collaborate with AI will significantly outperform those that rely on siloed, traditional role definitions."
    },
    {
      title: "Built-In Quality, Compliance, and Resilience",
      subtitle: "Trust at Speed",
      content: "Moving 10× faster is pointless if you break things or compromise trust along the way – which is why top product organizations are now building **quality and governance** into the process by design. AI makes it feasible to maintain extremely high quality in parallel with rapid development, instead of trading one for the other. Specifically, intelligent tools now continuously check code for bugs, security vulnerabilities, adherence to coding standards, compliance with regulations, and even accessibility issues – all in **real time** as developers work. This **\"shift left\" of quality** means potential problems are caught and fixed by AI before they reach production. For example, GitHub's AI-assisted code analysis can flag mistakes and suggest fixes, speeding up code reviews by up to 7× and catching vulnerabilities automatically. Likewise, generative AI can generate comprehensive test cases and ensure every requirement is validated, giving teams far **greater test coverage** than manual effort ever could. The result is higher-quality products that are secure, reliable, and compliant from the get-go, even as release cycles shorten. Early adopters of AI in the SDLC have noted lower defect rates and less firefighting, which translates to better uptime and lower customer churn due to quality issues. Moreover, by baking in compliance (e.g. privacy checks, industry regulations) into development via AI, enterprise teams can move fast without later surprises. In essence, a 10× organization doesn't just ship faster – it **ships better**. By leveraging AI to uphold quality and resilience at scale, these organizations gain customer trust and operate with confidence that rapid innovation won't come at the expense of stability or integrity."
    }
  ]
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Framework component data
  const frameworkData = {
    topGoal: {
      icon: "/growth.png",
      title: "Profitable, Sustainable, Ethical Growth",
      summary: "This is your ultimate North Star: achieving holistic success where profitability, integrity, and sustainability are a unified objective. Lasting success is not born from a single strategy, but from the systemic mastery of this entire framework. It begins by building foundational Core Capabilities—from AI-powered platforms and augmented teams to intelligent workflows and 'AI First' products. These capabilities unlock the crucial Value Drivers of your business: radical efficiency, unprecedented speed, deep customer empathy, and uncompromising quality. This powerful combination is what fuels the engines of Profitable Growth, from PLG to strategic expansion. The entire system is fortified by your \"Ethical Moat\", ensuring your success is not only significant but also sustainable. It is this integrated, systemic design—the seamless interplay between your capabilities, the value you create, and the growth you achieve—that creates a resilient, intelligent organization and an insurmountable competitive advantage.",
      levers: [
        {
          title: "AI-Driven Profitability Optimization",
          description: "Growth without profitability is unsustainable. Therefore, applying AI to directly enhance financial performance and margin is the foundational strategy for durable success. AI models analyze market dynamics, customer behavior, and internal costs to power dynamic pricing strategies that maximize revenue without sacrificing volume. It also optimizes resource allocation and operational spending—from cloud infrastructure costs and external foundation model usage to supply chain logistics—to reduce the cost of goods sold (COGS) and operating expenses. By embedding this financial intelligence into core business processes, the organization moves from static budgeting to a dynamic, AI-guided model of continuous profitability optimization."
        },
        {
          title: "AI-Infused Product-Led Growth (PLG)",
          description: "Successful enterprises use their products as the primary driver of customer acquisition, engagement, and expansion—a strategy known as Product-Led Growth (PLG). AI acts as a powerful multiplier at every stage of this PLG flywheel, transforming the product into an engine of adaptive growth. By orchestrating hyper-personalized experiences, AI accelerates the entire cycle—from identifying ideal customers and speeding up their \"Aha!\" moment to proactively preventing churn and engineering virality, creating a highly efficient and sustainable growth model."
        },
        {
          title: "AI-Augmented Commercial Motions",
          description: "Complementing PLG by infusing intelligence into all other go-to-market motions creates a holistic commercial system. For Sales-Led Growth, AI identifies high-intent leads and provides real-time coaching to sales teams. For Marketing-Led Growth, it powers hyper-personalized campaigns and optimizes ad spend. For customer success, it automates workflows and predicts churn risk. This creates a cohesive, AI-powered commercial system where every customer-facing team operates with maximum effectiveness."
        },
        {
          title: "AI-Driven Strategic Expansion & Innovation",
          description: "Using AI for strategic \"big bets\" and market creation enables proactive growth. By analyzing vast market, technology, and competitive datasets, AI identifies adjacent market opportunities, predicts emerging customer needs, and simulates the potential ROI of new ventures. This transforms growth strategy from a reactive process into a predictive science, enabling the organization to confidently enter new markets and launch breakthrough products that define future demand."
        },
        {
          title: "The \"Ethical Moat\" (Architecting for Trust and Responsibility)",
          description: "The elevation of AI Governance, Risk, Ethics, and Compliance (GRC) from a mere compliance task to a core strategic differentiator marks a pivotal strategic shift. In an environment of increasing AI skepticism, building verifiably trustworthy, fair, and transparent AI systems forges a sustainable competitive advantage known as an \"Ethical Moat\". This approach builds deep customer loyalty, attracts top talent, and mitigates significant financial and reputational risks."
        }
      ]
    },
    customerFit: {
      icon: "/customer_fit.png",
      title: "Market & Customer\nFit/ Value",
      summary: "This is the heart of value creation. By harnessing AI to understand customers with unprecedented depth, continuously discover their evolving needs, and predict their future desires, you move beyond simply satisfying market needs to anticipating them. You forge an unbreakable bond through empathy, crafting dynamic, personalized experiences that make every user feel uniquely seen and valued, ensuring your product doesn't just fit the market, but defines it.",
      levers: [
        {
          title: "AI-Augmented Customer Empathy at Scale",
          description: "AI transforms customer empathy from an anecdotal art into a data-backed science. By analyzing immense volumes of qualitative data from sources like reviews, support tickets, and interviews, AI extracts key themes, sentiment patterns, and recurring pain points. This allows for the development of a deeper, more nuanced understanding of the \"why\" behind customer behavior, enabling product decisions that are genuinely and systemically customer-centric."
        },
        {
          title: "AI-Powered Continuous Discovery",
          description: "The habit of continuous discovery is supercharged by AI, evolving from periodic user interviews to a perpetual, automated stream of insight. AI systems can continuously monitor user behavior and feedback channels in real-time, automatically surfacing emerging trends, friction points, and shifts in user needs. This transforms discovery into an always-on capability, allowing teams to infuse their daily decisions with fresh, scalable customer intelligence and adapt with greater agility."
        },
        {
          title: "AI-Driven Predictive Insights & Latent Need Discovery",
          description: "A shift from reacting to stated needs to proactively anticipating unarticulated ones is made possible by AI. By analyzing complex patterns across disparate datasets, AI can forecast future user behavior and uncover latent needs that customers may not even be aware of themselves. This predictive prowess allows for the creation of truly innovative solutions that solve problems before they become widely recognized, establishing a significant competitive advantage by defining the next frontier of market demand."
        },
        {
          title: "Dynamic User Modeling & Hyper-Personalization",
          description: "A paradigm shift from static personas to dynamic, \"living\" user models enables a true \"segment of one\" experience. AI continuously updates millions of individual user profiles with real-time behavioral data, powering hyper-personalized experiences where content, features, and interactions are uniquely tailored. This transforms the product from a static tool into an intelligent partner that adapts and co-evolves with the user, forging deep engagement and loyalty."
        }
      ]
    },
    agility: {
      icon: "/speed.png",
      title: "Agility, Speed and Time-to-Market",
      summary: "This is the engine of competitive momentum. You accelerate every stage of execution by embedding intelligence into your AI-driven Workflows and equipping your teams with AI-powered Platforms. By supercharging agile processes, compressing the development lifecycle, and ensuring launch readiness, you transform your ability to deliver value. This radically shortens the distance between a validated idea and market impact, making speed of delivery your most formidable advantage.",
      levers: [
        {
          title: "AI-Supercharged Agile Execution",
          description: "Agile methodologies are supercharged by AI, moving beyond manual processes. AI assists in sprint planning by analyzing historical data to provide more accurate effort estimations. It can draft detailed user stories and acceptance criteria from high-level concepts, ensuring clarity and consistency. AI also helps in backlog prioritization by analyzing user feedback and business impact data, allowing teams to focus on the most valuable work and accelerate the flow of value through the development process."
        },
        {
          title: "AI-Accelerated Development Lifecycle",
          description: "The core software development lifecycle experiences a \"velocity shock\" driven by AI. Generative AI tools act as co-pilots for developers, accelerating code generation, automating documentation, and suggesting bug fixes in real-time. This radical compression of coding, testing, and refactoring tasks significantly reduces the time required to build features, freeing up engineering capacity to tackle more complex challenges and shortening the overall time from backlog item to functional code."
        },
        {
          title: "Intelligent CI/CD & Deployment",
          description: "The final mile to market—delivery and deployment—is made faster and safer with AI. Intelligent Continuous Integration/Continuous Deployment (CI/CD) pipelines use AI to predict the risk of a new release, automatically flagging potentially problematic code changes before they reach production. AI can also optimize testing within the pipeline and even automate rollback procedures in case of failure, increasing deployment frequency while reducing downtime. This ensures that speed gained in development is not lost in a slow or risky release process."
        },
        {
          title: "AI-Assisted Generation of Go-to-Market Assets",
          description: "The creation of go-to-market assets like blog posts, ad copy, and sales enablement materials is significantly accelerated by AI. Generative AI can take product specifications and user stories as direct input to create accurate and compelling first drafts of all necessary launch content. This ensures that marketing and sales readiness keeps pace with the accelerated development cycle, eliminating a common bottleneck and shortening the critical path from code completion to a fully supported market launch."
        }
      ]
    },
    efficiency: {
      icon: "/cost.png",
      title: "Efficiency, Effectiveness and Cost",
      summary: "This is the creation of a frictionless organization. You achieve exponential output by augmenting your People with AI co-pilots and re-architecting your operations with intelligent AI-driven Workflows. By empowering your teams to focus on the highest-value work, you build an enterprise that is not just lean, but profoundly intelligent and effective in its every action.",
      levers: [
        {
          title: "AI-Augmented Workforce",
          description: "This lever focuses on the exponential productivity gains from human-AI partnership. By embedding AI co-pilots into functional workflows, organizations augment employee capabilities, automating routine tasks and freeing human talent to focus on high-value strategic work. The result is a hyper-productive workforce where individuals and teams achieve significantly greater output, creativity, and effectiveness."
        },
        {
          title: "Intelligent Process Automation",
          description: "This lever delivers efficiency at scale by automating end-to-end business processes. Leveraging capabilities like NoCode/LowCode and cross-functional AI flows, organizations can drastically reduce operational costs, minimize human error, and shorten cycle times. This allows the business to scale its output and complexity without a proportional increase in headcount or resources, directly impacting the bottom line."
        },
        {
          title: "Autonomous Operations",
          description: "This lever unlocks new frontiers of efficiency through the deployment of autonomous systems. By leveraging agentic workflows, \"digital workers\" can manage entire operational functions—from software development to customer support—with minimal human intervention. This qualitative leap beyond simple automation allows human teams to transition from tactical execution to strategic oversight, driving a step-change in operational effectiveness."
        },
        {
          title: "AI-Driven Operational Intelligence",
          description: "This lever enhances strategic effectiveness through superior, AI-driven decision-making. AI provides advanced forecasting, simulation, and optimization capabilities that allow for more precise resource allocation, proactive risk mitigation (e.g., predicting supply chain disruptions), and identification of cost-saving opportunities. This layer of predictive intelligence leads to more effective, data-informed strategies that directly improve operational and financial outcomes."
        }
      ]
    },
    prototyping: {
      icon: "/innovation.png",
      title: "Rapid Iterations & Speed of Innovation",
      summary: "This is where the future is forged. You de-risk innovation by empowering your People with AI-powered Platforms that make it cheap and fast to validate bold concepts. By exploring vast creative territories and testing ideas in hyper-fast build-measure-learn loops, you transform product development from a game of chance into a systematic engine where breakthroughs are the predictable outcome of high-velocity learning.",
      levers: [
        {
          title: "AI-Assisted Exploration & Ideation",
          description: "AI acts as an infinite brainstorming partner, moving beyond human cognitive biases to expand the field of creative possibilities. By analyzing vast customer datasets, it can identify latent needs and suggest novel areas for innovation. It can also map emerging AI capabilities to specific user experience challenges, generating inspiring and unconventional input for ideation sessions. This transforms discovery from being limited by existing knowledge to being propelled by AI-driven insight or inspired by AI-generated ideas."
        },
        {
          title: "AI-Accelerated Build-Measure-Learn Loop",
          description: "AI radically compresses the entire innovation cycle from concept to validated learning. \"Prompt-to-product\" tools allow product managers to generate high-fidelity prototypes in hours, not weeks. This Minimum Testable Prototype (MTP) is then validated using AI-powered user testing platforms that automatically analyze feedback and surface insights. This creates a hyper-fast, continuous loop where building, measuring, and learning happen with unprecedented velocity."
        },
        {
          title: "Empowered Creators & Reduced Dependencies",
          description: "AI democratizes capabilities previously exclusive to specialists, empowering an AI-augmented Product Manager to directly create UI mock-ups, analyze data, or generate functional code. This \"collapsing of the talent stack\" fundamentally changes team dynamics by reducing the handoffs and communication overhead that traditionally slow down innovation. A single person or small team can now achieve the initial validation output of a larger, multi-disciplinary squad."
        }
      ]
    },
    quality: {
      icon: "/quality.png",
      title: "Quality, Reliability, Precision",
      summary: "This is your commitment to excellence. You recognize that speed without trust is a liability, so you architect quality into every step by mastering your AI-driven Workflows and Platforms. By leveraging AI for data-informed decisions, automated QA, proactive monitoring, and in-built compliance, you create a resilient framework for innovation. Guided by critical human oversight, this ensures that rapid development and uncompromising reliability become mutually reinforcing pillars, forging a powerful bond of trust with your customers.",
      levers: [
        {
          title: "Data-Informed Decision-Making",
          description: "Systematically replacing intuition with evidence becomes the basis for decisions. AI enhances this process by analyzing vast datasets to provide predictive insights, ensuring choices are based on probable outcomes, not just historical trends. Organizations leverage AI to define, track, and forecast Key Performance Indicators (KPIs), allowing for more precise identification of high-value features and avoiding investment in initiatives unlikely to succeed, directly improving the quality and impact of product development efforts."
        },
        {
          title: "AI-Powered Quality Assurance & Testing",
          description: "Quality is embedded into the development lifecycle through AI-driven automation and enhancement of testing processes. AI generates comprehensive test cases for greater coverage, automatically detects bugs and security vulnerabilities in real-time, and accelerates code reviews, allowing teams to move faster without sacrificing stability. Proactively identifying potential failures before they reach users transforms quality from a final gate into a continuous, automated discipline that ensures higher reliability from the outset."
        },
        {
          title: "Proactive Monitoring & Anomaly Detection",
          description: "A shift from reactive to proactive system oversight is achieved using AI-powered monitoring tools. These continuously analyze system performance and user behavior data to identify anomalies and predict potential issues, such as model drift or service degradation, before they escalate into critical failures. Teams can address reliability risks preemptively, ensuring a more stable and trustworthy user experience and transforming reliability into a predictive, preventative discipline that safeguards product precision."
        },
        {
          title: "In-built Compliance",
          description: "Compliance is architected directly into AI-driven workflows through programmatic guardrails. These automated rules ensure AI-generated outputs adhere to enterprise policies like coding conventions and security standards. The system can also be designed with triggers that automatically initiate checks against applicable laws, including data privacy rules (GDPR) and comprehensive AI regulations like the EU AI Act, whenever handling sensitive tasks. This transforms compliance from a manual review into an automated, preventative measure integrated directly into the workflow."
        },
        {
          title: "The \"Editor-in-Chief\" for Quality Oversight",
          description: "While AI radically accelerates development, this speed introduces a \"quality-at-scale\" challenge. The Lead Dev, Lead UX and Product Manager's role as a discerning \"Editor-in-Chief\" involves applying rigorous human judgment, domain expertise, and strategic understanding to curate, refine, and validate all AI-generated outputs—from code to content. This critical human oversight acts as a quality gatekeeper, ensuring the velocity gained from AI does not compromise the quality, reliability, and precision of the final product."
        }
      ]
    },
    platform: {
      icon: "/platform.png",
      title: "AI powered\nPlatforms & Tools",
      summary: "This is the foundation of empowerment. You build and master an intelligent technology stack that serves as the launching pad for all other capabilities. From an AI-infused data foundation and a robust MLOps factory to augmented development environments, specialized work tools, and platforms for autonomous agents, this integrated toolkit provides the technological leverage needed to turn ambitious visions into reality at scale.",
      levers: [
        {
          title: "The Intelligent Data Foundation",
          description: "The modern data platform is transformed from a passive repository into an active, intelligent system. AI infuses the data stack with capabilities like automated data discovery, quality monitoring, and governance. Natural language interfaces, such as Databricks' AI/BI Genie, democratize data access, allowing non-technical users to query complex datasets conversationally. This creates a more agile and accessible data foundation, ensuring high-quality fuel for all downstream AI applications and analytics."
        },
        {
          title: "Foundation Model & MLOps Platforms",
          description: "The core engine room for AI innovation is powered by platforms designed to manage the entire lifecycle of machine learning models. These MLOps (Machine Learning Operations) platforms streamline the process of building, training, deploying, and monitoring both proprietary and open-source foundation models. This provides a reliable and scalable \"AI factory,\" enabling teams to consistently deliver high-quality AI capabilities into products and ensuring that models in production remain accurate, fair, and effective over time."
        },
        {
          title: "AI-Augmented Development Environments",
          description: "The tools used by creators are infused with AI, dramatically accelerating development. Integrated Development Environments (IDEs) with AI co-pilots, like GitHub Copilot, provide real-time code suggestions and debugging assistance. \"Prompt-to-product\" platforms, such as v0 and lovable, allow for the rapid generation of UI and full-stack application prototypes from natural language. This creates a hyper-productive environment that lowers technical barriers and empowers teams to build and iterate with unprecedented speed."
        },
        {
          title: "Specialized AI Work Tools & Co-pilots",
          description: "A vast ecosystem of specialized AI-powered tools and co-pilots is emerging to augment specific professional workflows. These applications—from AI research assistants (Perplexity) and meeting summarizers (Fireflies.ai) to intelligent design tools (Miro AI) and sales enablement platforms (Gong)—offload routine cognitive tasks and provide data-driven insights directly within the user's workflow. This allows professionals across all functions to operate with greater efficiency and strategic focus."
        },
        {
          title: "Agentic Automation Platforms",
          description: "A new class of platforms enables the creation and orchestration of autonomous AI agents, or \"digital workers.\" Frameworks like crewAI and AutoGen allow organizations to build multi-agent systems that can manage complex, end-to-end business processes with minimal human intervention. This moves beyond simple task automation to deploying intelligent systems that can reason, plan, and collaborate to achieve strategic goals, unlocking new frontiers of operational efficiency."
        }
      ]
    },
    people: {
      icon: "/people.png",
      title: "AI assisted/ augmented\nIndividuals & Teams",
      summary: "Your people are your greatest asset, and technology serves to unleash their potential. You build a culture of psychological safety where human-AI teams can thrive. You empower individuals with AI co-pilots, architect symbiotic workflows for collaborative intelligence, and commit to continuous learning to build AI fluency. By investing in your people's ability to partner with AI, you transform your workforce into a community of innovators poised to solve the challenges of tomorrow.",
      levers: [
        {
          title: "AI-Driven 10x Impact Mindset",
          description: "A 10x impact mindset is a fundamental cultural shift from linear, incremental improvement (e.g., \"10% better\") to exponential, order-of-magnitude thinking (\"10x better\"). It involves moving beyond optimizing existing processes and instead using AI to reimagine them from first principles. This mindset encourages teams to challenge core assumptions about what is possible, asking not \"How can AI make your current product faster?\" but \"What entirely new product, 10 times more valuable, can we build now that AI exists?\". It embraces bold experimentation and a willingness to create new, AI-native solutions, even if they disrupt existing business models."
        },
        {
          title: "AI as a Personal Co-pilot & Force Multiplier",
          description: "AI acts as a collaborative partner for individuals, augmenting their specific skills and workflows. By offloading routine cognitive tasks—from research and data analysis to content generation (writing meeting minutes, user stories, documenting code, writing testcases, updating marketing materials, etc.) AI co-pilots free up employees to focus on uniquely human strengths like strategic judgment and creativity. This direct augmentation serves as a force multiplier, dramatically increasing individual productivity and enabling each person to achieve a greater level of impact."
        },
        {
          title: "Human-AI Symbiosis & Collaborative Intelligence",
          description: "This moves beyond individual augmentation to designing teams where humans and AI operate as a single, synergistic cognitive unit. In this model, workflows are architected to leverage the complementary strengths of human creativity and ethical oversight alongside AI's speed and analytical power. This creates a state of collaborative intelligence, enabling teams to solve more complex problems and achieve outcomes that would be impossible for either humans or AI to accomplish alone."
        },
        {
          title: "Continuous Upskilling & AI Fluency",
          description: "To thrive in an AI-assisted environment, the workforce must be equipped with the necessary skills and confidence. This involves a sustained commitment to building widespread AI fluency through tailored training and hands-on learning. By investing in continuous upskilling, organizations empower their people to move from being passive users of AI to becoming adept collaborators who can effectively guide, interpret, and leverage AI to its full potential."
        },
        {
          title: "A Foundation of Psychological Safety for Human-AI Teaming",
          description: "For people to effectively partner with AI, they must feel safe to experiment, question AI-generated outputs, and admit mistakes without fear. This psychological safety is the cultural bedrock that prevents automation bias and encourages the critical thinking necessary for responsible AI adoption. It creates an environment where teams can learn from both human and machine errors, fostering the trust required for true human-AI collaboration."
        }
      ]
    },
    workflows: {
      icon: "/process.png",
      title: "AI driven Workflows & Processes",
      summary: "This is the operational blueprint for the future of work. You move beyond rigid, linear processes to design intelligent, adaptive, and collaborative workflows. By augmenting functional experts, creating intelligent flows between them, and deploying autonomous agents, you build a highly efficient and resilient operational backbone that not only executes with precision but learns and improves with every cycle.",
      levers: [
        {
          title: "AI-Augmented Functional Workflows",
          description: "This capability involves embedding AI co-pilots and specialized tools directly into the workflows of specific disciplines to enhance their core tasks. For example, product managers use AI for research synthesis, UX designers for generating mockups from prompts, and developers use AI for code generation and debugging. This boosts the efficiency and quality of work within each disciplinary vertical."
        },
        {
          title: "Cross-Functional Intelligence Flow",
          description: "This capability uses AI to act as the automated \"connective tissue\" between disciplines, breaking down silos and eliminating manual handoffs. AI transforms outputs from one stage into inputs for the next—for instance, synthesizing user research (PM) into draft user stories, which then fuel AI-assisted code generation (Dev), and finally generating marketing copy (Marketing) from feature specifications."
        },
        {
          title: "AI-Supercharged Agile Loops",
          description: "Core agile processes like the Build-Measure-Learn loop are transformed into high-velocity, intelligent cycles. AI automates feedback analysis, accelerates development, and provides predictive insights, allowing teams to iterate and learn with unprecedented speed. This creates a foundational workflow for rapid, data-informed product evolution."
        },
        {
          title: "NoCode/LowCode Automation",
          description: "Developing the capacity to automate business processes and connect disparate applications using visual, NoCode/LowCode platforms. This capability empowers \"citizen developers\" to build and manage rule-based automations without extensive coding, creating a more agile and responsive operational layer. It serves as a foundational step towards more complex, intelligent process automation."
        },
        {
          title: "Agentic Workflows & \"Digital Coworkers\"",
          description: "This represents a fundamental reimagining of automation, shifting from executing pre-programmed tasks to achieving high-level goals. The core of this capability is the deployment of autonomous agents that can independently reason, plan, and execute complex actions. For instance, a code generation agent is not just a tool; it's a \"digital coworker\" that takes a high-level requirement and autonomously decides how to write, debug, and implement the solution, managing the end-to-end process with minimal human intervention."
        }
      ]
    },
    products: {
      icon: "/product.png",
      title: "\"AI first\" Products & Services",
      summary: "This is your ultimate expression of value. You begin with an AI-First mindset to architect living systems that learn and adapt. These systems deliver intelligent and deeply personalized experiences that make your products indispensable partners to your users. By designing for compounding value loops, you create a virtuous cycle of improvement and engagement, forging an unbreakable, data-driven bond that redefines what is possible and sets a new standard for excellence in your industry.",
      levers: [
        {
          title: "The \"AI-First\" Mindset & Architecture",
          description: "An \"AI-First\" mindset is the foundational principle, where the capacity for systems to learn and adapt is the core of the product concept, not an added feature. This leads to architecting AI-native systems that are inherently intelligent, data-centric, and designed for continuous evolution. The product is envisioned from inception as a dynamic entity that learns from user interactions to deliver compounding value over time."
        },
        {
          title: "Intelligent & Adaptive Experiences",
          description: "Embedding AI makes the core product experience smarter, more context-aware, and more intuitive for all users. Capabilities like intelligent search that understands user intent, predictive features that anticipate needs, and adaptive interfaces that dynamically adjust to the user's current task transform the product from a static tool into an intelligent partner that is more effective and easier to use."
        },
        {
          title: "Hyper-Personalization at Scale",
          description: "A true \"segment of one\" experience is delivered by crafting interactions uniquely tailored to each individual user. Powered by AI that processes granular user data and real-time context, the product can dynamically adjust its content, recommendations, and even functionality. This deep level of personalization makes each user feel uniquely seen and valued, forging powerful engagement and loyalty."
        },
        {
          title: "Designing for Compounding Value Loops",
          description: "Products are architected to create self-reinforcing, virtuous cycles that drive compounding value and create a powerful, dynamic moat. This is the core mechanism of data network effects: user engagement generates unique data, which fuels the AI models to improve the product, which in turn attracts more users. The strategic goal is to design this efficient, compounding system as the true, enduring competitive advantage."
        }
      ]
    }
  }

  const renderTextWithBold = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <span key={index} style={{ color: '#3979e9' }}>{part.slice(2, -2)}</span>;
      }
      return part;
    });
  };

  const renderTextWithTooltip = (item) => {
    if (typeof item === 'string') {
      // Legacy support for plain strings
      return renderTextWithBold(item);
    }
    
    // New structure with tooltips
    const { text, keyword, tooltip } = item;
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const cleanText = part.slice(2, -2);
        // Check if this bold text is the keyword with tooltip
        if (cleanText === keyword) {
          return (
            <span key={index} className="keyword-tooltip-wrapper">
              <span className="keyword-highlight" style={{ color: '#3979e9', cursor: 'help' }}>
                {cleanText}
              </span>
              <span className="keyword-tooltip neumorph-raised">
                {tooltip}
              </span>
            </span>
          );
        }
        return <span key={index} style={{ color: '#3979e9' }}>{cleanText}</span>;
      }
      return part;
    });
  };

  const getIcon = (iconName, size = 32) => {
    const Icon = Icons[iconName] || Icons.Circle
    return <Icon size={size} />
  }

  /* Removed sdlcSlides data - section deleted
  const sdlcSlides = [
    {
      id: 2,
      title: "Set the Strategic Foundation",
      subtitle: "Overarching Decisions for the AI-Assisted SDLC",
      content: [
        { 
          dimension: "Strategic Improvement Focus", 
          today: "Driven by Corporate",
          target: "Add business-specific Why(now), What, How, Who" 
        },
        { 
          dimension: "AI Toolchain & Model Selection", 
          today: "Ad-hoc use of various AI tools without a unified strategy",
          target: "Establish clear criteria for tool selection (workflow integration, data privacy/security, IP protection). Strategic choice: Agent Platform and AI Models" 
        }
      ],
      type: "transformation"
    },
    {
      id: 3,
      title: "Set the Strategic Foundation (continued)",
      subtitle: "Overarching Decisions for the AI-Assisted SDLC",
      content: [
        { 
          dimension: "AI Governance", 
          today: "Focus on data privacy and security",
          target: "Establish an AI Governance Committee (CoE), Set Acceptable Use Policies, Buildup capabilities, Enforce" 
        },
        { 
          dimension: "Process Alignment Across Development Sites", 
          today: "Aligned in current SDLC",
          target: "Unified AI SDLC development framework, Collaborative approach towards learning & framework improvement" 
        }
      ],
      type: "transformation"
    },
    {
      id: 4,
      title: "Product Discovery",
      subtitle: "From Manual Guesswork to AI-Powered Foresight",
      content: [
        { 
          dimension: "Market & Competitor Intelligence", 
          today: "Manual review of competitor websites and reports. Analysis is less frequent, slow and prone to human bias",
          target: "AI agents regularly monitor (scrape, crawl, extract) competitors' digital footprints. AI assisted market analysis and competitive benchmarking reports" 
        },
        { 
          dimension: "Customer Understanding", 
          today: "Manual, fragmented analysis of user feedback. Static, assumption-based personas",
          target: "AI synthesizes feedback from all (accessible) channels into actionable insights. Creates 'living user persona documents' continuously updated with real analytics" 
        }
      ],
      type: "transformation"
    },
    {
      id: 5,
      title: "Product Discovery (continued)",
      subtitle: "From Manual Guesswork to AI-Powered Foresight",
      content: [
        { 
          dimension: "Ideation", 
          today: "Low-fidelity ideation in workshops. Limited by understanding what is possible",
          target: "Inspired by AI" 
        },
        { 
          dimension: "Idea Validation & Rapid Prototyping", 
          today: "Validation is slow and expensive. High cost of pursuing a flawed idea",
          target: "AI generates interactive prototypes from text or sketches in 'minutes'. Reduces the cost of failure by enabling teams to 'fail faster'" 
        }
      ],
      type: "transformation"
    },
    {
      id: 5.5,
      title: "Product Discovery (continued)",
      subtitle: "From Manual Guesswork to AI-Powered Foresight",
      content: [
        { 
          dimension: "Business Case & Feasibility Analysis", 
          today: "Manual financial modeling and 'gut-feel' feasibility",
          target: "AI drafts initial business cases, outlining value proposition and ROI" 
        }
      ],
      type: "transformation"
    },
    {
      id: 6,
      title: "Requirements Analysis",
      subtitle: "From Ambiguous Guide to Unambiguous Source Code",
      content: [
        { 
          dimension: "Requirement Elicitation", 
          today: "Manual synthesis of notes from stakeholder interviews. Process is labor-intensive and prone to ambiguity",
          target: "AI transcribes and analyzes stakeholder interviews using NLP. AI identifies key themes, user needs, and conflicting requirements" 
        },
        { 
          dimension: "Specification Generation", 
          today: "Agile principle: 'Working software over comprehensive documentation'",
          target: "Acknowledge and align 2 (competing) cultures: Writing-first culture: specification becomes the new reference for automated implementation pipelines. Building-first culture: Show dont tell. Iterate like hell" 
        }
      ],
      type: "transformation"
    },
    {
      id: 7,
      title: "Architecture & Design",
      subtitle: "From System Designer to Cognitive Modeler",
      content: [
        { 
          dimension: "UI/UX Design", 
          today: "Manual wireframing in tools like Figma; exploration is limited by time",
          target: "AI generates multiple design concepts from text prompts for rapid exploration. AI is trained on the existing Design System to ensure brand consistency" 
        },
        { 
          dimension: "System Architecture Design", 
          today: "Following the 'experience pattern' of the architect at work",
          target: "AI-assisted formal analysis and justification of solution options versus key quality attributes" 
        }
      ],
      type: "transformation"
    },
    {
      id: 8,
      title: "Architecture & Design (continued)",
      subtitle: "From System Designer to Cognitive Modeler",
      content: [
        { 
          dimension: "System Diagrams", 
          today: "Manual creation of diagrams that quickly become obsolete",
          target: "AI generates 'living' diagrams from source code, always synchronized via CI/CD" 
        },
        { 
          dimension: "Architectural Guardrails", 
          today: "Decisions documented for human interpretation",
          target: "Architect defines machine-readable constraints (NFRs, approved tech). Writes 'Fitness Function' tests to continuously validate architecture in CI/CD" 
        },
        { 
          dimension: "Technology Stack Curation", 
          today: "Tech stack choices based on team familiarity or industry trends",
          target: "AI analyzes requirements and suggests optimal tech stacks with trade-offs" 
        }
      ],
      type: "transformation"
    },
    {
      id: 9,
      title: "Implementation",
      subtitle: "From Code Writer to System Validator",
      content: [
        {
          dimension: "AI enabled Productivity Gains",
          today: "Absorbed by organization",
          target: "Self-define & track improvement KPI. Accomplish first net positive effects"
        },
        {
          dimension: "Code Generation",
          today: "Manual, line-by-line code writing. Test-cases are add-on. Limited test-coverage",
          target: "AI generates code, unit tests, and algorithms from natural language. AI can make Test-Driven-Development (TDD) standard practice"
        }
      ],
      type: "transformation"
    },
    {
      id: 10,
      title: "Implementation (continued)",
      subtitle: "From Code Writer to System Validator",
      content: [
        {
          dimension: "Developer's Core Task",
          today: "Implementing business logic; focus is on the 'how' of execution. Performance measured by lines of code or features shipped",
          target: "Developer as 'AI Output Auditor': forensic validation of AI-generated code. Performance metrics evolve to reward finding defects and improving AI output"
        }
      ],
      type: "transformation"
    },
    {
      id: 11,
      title: "Testing & Quality Assurance",
      subtitle: "From Manual Detection to Autonomous Quality",
      content: [
        {
          dimension: "Test Case Generation",
          today: "QA engineers manually write test plans and cases. Incomplete coverage, especially for edge cases",
          target: "AI analyzes requirements or code to generate comprehensive test cases (unit, integration, E2E). AI generates negative tests and complex edge cases"
        },
        {
          dimension: "Test Automation & Execution",
          today: "Writing and maintaining brittle automation scripts is a major effort. Tests fail with minor UI or locator changes",
          target: "'Self-healing' test automation where AI automatically updates scripts when UI changes. AI prioritizes running the most relevant tests based on code changes"
        }
      ],
      type: "transformation"
    },
    {
      id: 12,
      title: "Code Review & Deployment",
      subtitle: "AI-Augmented Quality Gates",
      content: [
        {
          dimension: "Pull Request (PR) Process",
          today: "Slow, manual peer reviews that create bottlenecks. Inconsistent reviews; human reviewers may miss subtle bugs",
          target: "AI acts as an immediate first-pass reviewer, checking standards, bugs, and performance. AI automatically generates PR summaries to accelerate human review"
        },
        {
          dimension: "Security Scanning",
          today: "Security scans run late in the CI pipeline, delaying feedback. Reactive vulnerability detection",
          target: "Real-time, in-IDE security feedback as code is written ('shift left to the keystroke'). AI-powered SAST tools suggest secure alternatives instantly"
        }
      ],
      type: "transformation"
    },
    {
      id: 13,
      title: "Maintenance & Operations",
      subtitle: "Predictive and Automated System Management (AIOps)",
      content: [
        {
          dimension: "Monitoring",
          today: "Reactive monitoring based on static, predefined thresholds. Alert fatigue from numerous, often low-impact, notifications",
          target: "Predictive monitoring (AIOps) learns normal system behavior. AI detects subtle anomalies that are precursors to outages"
        },
        {
          dimension: "Incident Response",
          today: "Manual investigation of logs and metrics to find root cause. High Mean Time to Resolution (MTTR)",
          target: "AI performs automated root cause analysis by correlating alerts across the stack. Automated remediation for common issues (e.g., restarting a service)"
        }
      ],
      type: "transformation"
    },
    {
      id: 14,
      title: "Documentation",
      subtitle: "From Afterthought to Automated Asset",
      content: [
        {
          dimension: "Content Generation",
          today: "Documentation is written manually as a final step. Often incomplete, inaccurate, and quickly outdated",
          target: "AI parses source code to automatically generate documentation. Generates natural language explanations, API docs, and READMEs"
        },
        {
          dimension: "Maintenance",
          today: "Docs are static artifacts, separate from the code",
          target: "'Documentation as Code': docs are versioned and updated via CI/CD. Documentation becomes a reliable, real-time asset"
        }
      ],
      type: "transformation"
    },
    {
      id: 15,
      title: "Collect Learnings/ Track Impact",
      subtitle: "From Siloed Retrospectives to Systemic Improvement",
      content: [
        {
          dimension: "Process Retrospective & Knowledge Sharing",
          today: "Manual, project-specific retrospectives. Learnings are siloed in meeting notes or wiki pages. Difficult to identify recurring, cross-project patterns",
          target: "AI analyzes data across all projects (tickets, commits, CI/CD logs) to find systemic bottlenecks. AI provides data-driven topics for retrospectives. A centralized, AI-queried knowledge base makes all learnings discoverable"
        }
      ],
      type: "transformation"
    },
    {
      id: 16,
      title: "Collect Learnings/ Track Impact (continued)",
      subtitle: "From Siloed Retrospectives to Systemic Improvement",
      content: [
        {
          dimension: "Tracking Impact",
          today: "Often sole focus on coding productivity",
          target: "Focus on system improvement. Measure utilization, impact and cost. Combine Metrics: Blend quantitative and qualitative data for a holistic view. Focus on Actionable Data: Gather data that clearly informs decisions and improvements. Don't Over-Index on Single Metrics: Be wary of Goodhart's Law and ensure that metrics actually reflect improvement"
        }
      ],
      type: "transformation"
    },
    {
      id: 17,
      title: "The Human Dimension",
      subtitle: "Evolving Roles & Teams in an AI-First World",
      content: [
        {
          dimension: "Product Manager",
          today: "Manages feature backlogs and roadmaps. Translates business needs for developers",
          target: "Shifts to defining the 'why' based on ROI and setting ethical safety boundaries for the AI"
        },
        {
          dimension: "Architect",
          today: "Designs system blueprints and selects technologies. Creates diagrams for human interpretation",
          target: "Evolves to define the machine-readable 'rules of the game' (constraints) for the AI"
        }
      ],
      type: "transformation"
    },
    {
      id: 18,
      title: "The Human Dimension (continued)",
      subtitle: "Evolving Roles & Teams in an AI-First World",
      content: [
        {
          dimension: "Developer",
          today: "Writes, debugs, and maintains code. Focuses on the 'how' of implementation",
          target: "Transforms into an auditor focused on forensically validating AI code. Uses time saved to solve novel problems beyond the AI's scope"
        },
        {
          dimension: "Talent Pipeline Challenge",
          today: "Juniors learn by writing boilerplate code and fixing simple bugs",
          target: "Requires new training models (e.g., simulations, AI supervision roles) as entry-level tasks are automated"
        }
      ],
      type: "transformation"
    }
  ]
  */

  const processSteps = [
    {
      number: "01",
      title: "Strategy & Portfolio Governance",
      description: "Unify strategy, roadmapping, and governance to align AI investments with business outcomes and manage risk at scale.",
      icon: "Target",
      color: "#0891b2"
    },
    {
      number: "02",
      title: "People, Culture & Capability",
      description: "Build literacy and hands-on skills while fostering psychological safety and ethical AI practices across teams.",
      icon: "Users",
      color: "#6366f1"
    },
    {
      number: "03",
      title: "Product & Service Innovation",
      description: "Embed AI into product strategy, design, and GTM to deliver copilots, personalization, and intelligent automation.",
      icon: "Lightbulb",
      color: "#f59e0b"
    },
    {
      number: "04",
      title: "Process & Workflow Transformation",
      description: "Redesign end-to-end processes with process mining, lean principles, and AI/RPA orchestration to remove waste.",
      icon: "Workflow",
      color: "#14b8a6"
    },
    {
      number: "05",
      title: "Data Platform & Architecture",
      description: "Build a scalable, governed data foundation with strong contracts, semantics, and privacy-by-design to power analytics and ML.",
      icon: "Database",
      color: "#3b82f6"
    },
    {
      number: "06",
      title: "AI Platform, Models & AgentOps",
      description: "Stand up an AI platform for experimentation-to-production across models and agent frameworks with safety and cost control.",
      icon: "Brain",
      color: "#8b5cf6"
    },
    {
      number: "07",
      title: "Governance, Risk, Security & Compliance",
      description: "Operationalize ethical principles and regulatory requirements across data and AI lifecycles without slowing delivery.",
      icon: "Shield",
      color: "#ec4899"
    },
    {
      number: "08",
      title: "Organization & Operating Model",
      description: "Clarify roles, responsibilities, and decision rights to reduce friction and speed decisions across teams.",
      icon: "Building",
      color: "#84cc16"
    },
    {
      number: "09",
      title: "Measurement, Progress & Learning",
      description: "Build a balanced system to measure impact and amplify organizational learning through demos and case studies.",
      icon: "TrendingUp",
      color: "#ef4444"
    }
  ]

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(progress => {
      const section = Math.floor(progress * 8) // Updated to 8 sections after removing 5 Pillars section
      setActiveSection(section)
    })
    return () => unsubscribe()
  }, [scrollYProgress])


  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  
  // AI Impact Framework section transforms
  const frameworkScale = useTransform(scrollYProgress, [0.08, 0.14, 0.18, 0.22], [0.85, 1, 1, 0.95])
  const frameworkOpacity = useTransform(scrollYProgress, [0.08, 0.14, 0.18, 0.22], [0.3, 1, 1, 0.5])
  const frameworkBrightness = useTransform(scrollYProgress, [0.08, 0.14, 0.18, 0.22], [0.7, 1.2, 1.2, 0.8])
  
  const statsScale = useTransform(scrollYProgress, [0.16, 0.22, 0.28, 0.34], [0.85, 1, 1, 0.95])
  const statsOpacity = useTransform(scrollYProgress, [0.16, 0.22, 0.28, 0.34], [0.3, 1, 1, 0.5])
  const statsBrightness = useTransform(scrollYProgress, [0.16, 0.22, 0.28, 0.34], [0.7, 1.2, 1.2, 0.8])

  // Challenges section starts emerging after AI Framework section
  const challengesX = useTransform(scrollYProgress, [0.18, 0.25], [-100, 0])
  const challengesOpacity = useTransform(scrollYProgress, [0.18, 0.25, 0.40, 0.45], [0, 1, 1, 0])
  const challengesBrightness = useTransform(scrollYProgress, [0.18, 0.25, 0.40, 0.45], [0.6, 1.4, 1.4, 0.8])
  const challengesScale = useTransform(scrollYProgress, [0.18, 0.25, 0.40, 0.45], [0.85, 1.05, 1.05, 0.95])
  
  // Removed gallery transforms - section deleted
  // const galleryScale = useTransform(scrollYProgress, [0.35, 0.45], [0.85, 1])
  // const galleryOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1])

  const solutionsScale = useTransform(scrollYProgress, [0.53, 0.63], [0.9, 1])

  return (
    <div className="neumorph-scroll-story" ref={containerRef} style={{ position: 'relative' }}>
      {/* Animated particles background */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${20 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Section 1: Hero */}
      <section className="neumorph-section hero-section" ref={section1Ref} style={{ position: 'relative' }}>
        <div className="background-pattern">
          <div className="pattern-grid"></div>
        </div>
        <motion.div 
          className="hero-content"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="neumorph-card large">
            <h1 className="hero-title">
              <span style={{ fontSize: '1.5em', display: 'block' }}>10X</span>
              Product Organization
            </h1>
            <p className="hero-subtitle">
              Are you ready to shift gears?
            </p>
            <div 
              className="scroll-indicator neumorph-button"
              onClick={() => {
                if (section2Ref.current) {
                  const section2 = section2Ref.current
                  const rect2 = section2.getBoundingClientRect()
                  const viewportHeight = window.innerHeight
                  
                  // Calculate position to center the section
                  const sectionCenter = rect2.top + rect2.height / 2
                  const viewportCenter = viewportHeight / 2
                  const targetScrollY = window.scrollY + (sectionCenter - viewportCenter)
                  
                  // Smooth scroll animation
                  const startY = window.scrollY
                  const distance = targetScrollY - startY
                  const duration = 1200
                  const startTime = performance.now()
                  
                  const animateScroll = (currentTime) => {
                    const elapsed = currentTime - startTime
                    const progress = Math.min(elapsed / duration, 1)
                    
                    // Easing function for smooth animation
                    const easeInOutCubic = progress < 0.5
                      ? 4 * progress * progress * progress
                      : 1 - Math.pow(-2 * progress + 2, 3) / 2
                    
                    window.scrollTo(0, startY + distance * easeInOutCubic)
                    
                    if (progress < 1) {
                      requestAnimationFrame(animateScroll)
                    }
                  }
                  
                  requestAnimationFrame(animateScroll)
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              <Icons.ChevronDown size={24} />
              <span>Scroll to explore</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 2: AI Impact Framework */}
      <section id="ai-impact-framework" className="neumorph-section framework-section" ref={section2Ref} style={{ position: 'relative' }}>
        <motion.div 
          className="section-glow"
          style={{
            opacity: useTransform(scrollYProgress, [0.08, 0.14, 0.18, 0.22], [0, 0.6, 0.6, 0]),
            background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.2), transparent 70%)',
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none'
          }}
        />
        <motion.div 
          className="section-content"
          style={{ 
            scale: frameworkScale, 
            opacity: frameworkOpacity,
            filter: useTransform(frameworkBrightness, value => `brightness(${value})`)
          }}
        >
          <div className="neumorph-card central" style={{ marginTop: '-20px', marginBottom: 'calc((3rem - 50px) / 2)', paddingTop: '5px', paddingBottom: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <h2>
              The AI Impact Framework
              <br />
              <span style={{ fontSize: '0.765em', fontWeight: 'normal', opacity: 0.9, lineHeight: '1.4', marginTop: '15px', display: 'inline-block' }}>
                In the Age of AI product organizations must shift<br />from seeking 10% Improvements to aiming at <span style={{ color: '#00bcd4' }}>10X Impact.</span>
              </span>
            </h2>
          </div>

          {/* Top Growth Tile - Centered */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0', marginTop: '25px' }}>
            <motion.div 
              className="pillar-image-wrapper value-card clickable"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{ width: '200px', flex: 'none', backgroundColor: '#003a3a' }}
              onClick={() => setSelectedFrameworkComponent('topGoal')}
            >
              <div className="click-indicator" style={{ animationDelay: `${iconDelays[0] || 0}s` }}>
                <Icons.Maximize2 size={16} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1rem' }}>
                <div style={{ width: '90%', aspectRatio: '1', margin: '0 auto 0 auto', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'black' }}>
                  <img src="/growth.png" alt="Profitable, Sustainable, Ethical Growth" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ textAlign: 'center', fontSize: '0.7497em', color: 'white', backgroundColor: 'black', padding: '0.5rem', borderRadius: '4px', width: '90%', margin: '0 auto', marginTop: '-22px', lineHeight: '0.95' }}>
                  Profitable, Sustainable, Ethical Growth
                </div>
              </div>
            </motion.div>
          </div>


          {/* Value Dimensions */}
          <div className="pillars-images-container">
            <div className="pillars-row" style={{ justifyContent: 'center', gap: '20px' }}>
            <motion.div 
              className="pillar-image-wrapper value-card clickable"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              style={{ width: '200px', flex: 'none' }}
              onClick={() => setSelectedFrameworkComponent('customerFit')}
            >
              <div className="click-indicator" style={{ animationDelay: `${iconDelays[1] || 1.5}s` }}>
                <Icons.Maximize2 size={16} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1rem' }}>
                <div style={{ width: '90%', aspectRatio: '1', margin: '0 auto 0 auto', borderRadius: '4px', backgroundColor: 'black', overflow: 'hidden' }}>
                  <img src="/customer_fit.png" alt="Market & Customer Fit/ Value" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ textAlign: 'center', fontSize: '0.7497em', color: 'white', backgroundColor: 'black', padding: '0.5rem', borderRadius: '4px', width: '90%', margin: '0 auto', marginTop: '-22px', lineHeight: '0.95', display: 'flex', flexDirection: 'column' }}>
                  <span>Market & Customer</span>
                  <span>Fit/ Value</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="pillar-image-wrapper value-card clickable"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              style={{ width: '200px', flex: 'none' }}
              onClick={() => setSelectedFrameworkComponent('agility')}
            >
              <div className="click-indicator" style={{ animationDelay: `${iconDelays[0] || 0}s` }}>
                <Icons.Maximize2 size={16} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1rem' }}>
                <div style={{ width: '90%', aspectRatio: '1', margin: '0 auto 0 auto', borderRadius: '4px', backgroundColor: 'black', overflow: 'hidden' }}>
                  <img src="/speed.png" alt="Agility, Speed and Time-to-Market" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ textAlign: 'center', fontSize: '0.7497em', color: 'white', backgroundColor: 'black', padding: '0.5rem', borderRadius: '4px', width: '90%', margin: '0 auto', marginTop: '-22px', lineHeight: '0.95' }}>
Agility, Speed and Time-to-Market
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="pillar-image-wrapper value-card clickable"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              style={{ width: '200px', flex: 'none' }}
              onClick={() => setSelectedFrameworkComponent('efficiency')}
            >
              <div className="click-indicator" style={{ animationDelay: `${iconDelays[3] || 4.5}s` }}>
                <Icons.Maximize2 size={16} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1rem' }}>
                <div style={{ width: '90%', aspectRatio: '1', margin: '0 auto 0 auto', borderRadius: '4px', backgroundColor: 'black', overflow: 'hidden' }}>
                  <img src="/cost.png" alt="Efficiency, Effectiveness and Cost" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ textAlign: 'center', fontSize: '0.7497em', color: 'white', backgroundColor: 'black', padding: '0.5rem', borderRadius: '4px', width: '90%', margin: '0 auto', marginTop: '-22px', lineHeight: '0.95' }}>
Efficiency, Effectiveness and Cost
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="pillar-image-wrapper value-card clickable"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              style={{ width: '200px', flex: 'none' }}
              onClick={() => setSelectedFrameworkComponent('prototyping')}
            >
              <div className="click-indicator" style={{ animationDelay: `${iconDelays[2] || 3}s` }}>
                <Icons.Maximize2 size={16} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1rem' }}>
                <div style={{ width: '90%', aspectRatio: '1', margin: '0 auto 0 auto', borderRadius: '4px', backgroundColor: 'black', overflow: 'hidden' }}>
                  <img src="/innovation.png" alt="Rapid Iterations & Speed of Innovation" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ textAlign: 'center', fontSize: '0.7497em', color: 'white', backgroundColor: 'black', padding: '0.5rem', borderRadius: '4px', width: '90%', margin: '0 auto', marginTop: '-22px', lineHeight: '0.95' }}>
Rapid Iterations & Speed of Innovation
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="pillar-image-wrapper value-card clickable"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              style={{ width: '200px', flex: 'none' }}
              onClick={() => setSelectedFrameworkComponent('quality')}
            >
              <div className="click-indicator" style={{ animationDelay: `${iconDelays[4] || 6}s` }}>
                <Icons.Maximize2 size={16} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1rem' }}>
                <div style={{ width: '90%', aspectRatio: '1', margin: '0 auto 0 auto', borderRadius: '4px', backgroundColor: 'black', overflow: 'hidden' }}>
                  <img src="/quality.png" alt="Quality, Reliability, Precision" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ textAlign: 'center', fontSize: '0.7497em', color: 'white', backgroundColor: 'black', padding: '0.5rem', borderRadius: '4px', width: '90%', margin: '0 auto', marginTop: '-22px', lineHeight: '0.95' }}>
Quality, Reliability, Precision
                </div>
              </div>
            </motion.div>
            </div>
          </div>

          {/* Core Capabilities */}
          <div className="pillars-images-container">
            <div className="pillars-row" style={{ justifyContent: 'center', gap: '20px' }}>
            <motion.div 
              className="pillar-image-wrapper capability-card clickable"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              style={{ width: '200px', flex: 'none' }}
              onClick={() => setSelectedFrameworkComponent('platform')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="click-indicator" style={{ animationDelay: `${iconDelays[0] || 0}s` }}>
                <Icons.Maximize2 size={16} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1rem' }}>
                <div style={{ width: '90%', aspectRatio: '1', margin: '0 auto 0 auto', borderRadius: '4px', backgroundColor: 'black', overflow: 'hidden' }}>
                  <img src="/platform.png" alt="AI powered Platforms & Tools" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ textAlign: 'center', fontSize: '0.7497em', color: 'white', backgroundColor: 'black', padding: '0.5rem', borderRadius: '4px', width: '90%', margin: '0 auto', marginTop: '-22px', lineHeight: '0.95', display: 'flex', flexDirection: 'column' }}>
                  <span>AI powered</span>
                  <span>Platforms & Tools</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="pillar-image-wrapper capability-card clickable"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              style={{ width: '200px', flex: 'none' }}
              onClick={() => setSelectedFrameworkComponent('people')}
            >
              <div className="click-indicator" style={{ animationDelay: `${iconDelays[1] || 1.5}s` }}>
                <Icons.Maximize2 size={16} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1rem' }}>
                <div style={{ width: '90%', aspectRatio: '1', margin: '0 auto 0 auto', borderRadius: '4px', backgroundColor: 'black', overflow: 'hidden' }}>
                  <img src="/people.png" alt="Individuals & Teams assisted/ augmented by AI" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ textAlign: 'center', fontSize: '0.7497em', color: 'white', backgroundColor: 'black', padding: '0.5rem', borderRadius: '4px', width: '90%', margin: '0 auto', marginTop: '-22px', lineHeight: '0.95', display: 'flex', flexDirection: 'column' }}>
                  <span>AI assisted/ augmented</span>
                  <span>Individuals & Teams</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="pillar-image-wrapper capability-card clickable"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0 }}
              style={{ width: '200px', flex: 'none' }}
              onClick={() => setSelectedFrameworkComponent('workflows')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="click-indicator" style={{ animationDelay: `${iconDelays[2] || 3}s` }}>
                <Icons.Maximize2 size={16} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1rem' }}>
                <div style={{ width: '90%', aspectRatio: '1', margin: '0 auto 0 auto', borderRadius: '4px', backgroundColor: 'black', overflow: 'hidden' }}>
                  <img src="/process.png" alt="AI driven Workflows & Processes" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ textAlign: 'center', fontSize: '0.7497em', color: 'white', backgroundColor: 'black', padding: '0.5rem', borderRadius: '4px', width: '90%', margin: '0 auto', marginTop: '-22px', lineHeight: '0.95' }}>
AI driven Workflows & Processes
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="pillar-image-wrapper capability-card clickable"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.1 }}
              style={{ width: '200px', flex: 'none' }}
              onClick={() => setSelectedFrameworkComponent('products')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="click-indicator" style={{ animationDelay: `${iconDelays[4] || 6}s` }}>
                <Icons.Maximize2 size={16} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1rem' }}>
                <div style={{ width: '90%', aspectRatio: '1', margin: '0 auto 0 auto', borderRadius: '4px', backgroundColor: 'black', overflow: 'hidden' }}>
                  <img src="/product.png" alt="AI first Products & Services" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ textAlign: 'center', fontSize: '0.7497em', color: 'white', backgroundColor: 'black', padding: '0.5rem', borderRadius: '4px', width: '90%', margin: '0 auto', marginTop: '-22px', lineHeight: '0.95' }}>
"AI first" Products & Services
                </div>
              </div>
            </motion.div>

            </div>
          </div>


        </motion.div>
      </section>


      {/* Section 3: The Challenges */}
      <section className="neumorph-section challenges-story" ref={section3Ref} style={{ position: 'relative', paddingBottom: '30px' }}>
        {/* Dynamic background glow for challenges */}
        <motion.div 
          className="section-glow"
          style={{
            opacity: useTransform(scrollYProgress, [0.18, 0.25, 0.40, 0.45], [0, 0.8, 0.8, 0]),
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.3), transparent 60%)',
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none'
          }}
        />
        <motion.div 
          className="section-content"
          style={{ 
            x: challengesX, 
            opacity: challengesOpacity,
            filter: useTransform(challengesBrightness, value => `brightness(${value})`),
            scale: challengesScale
          }}
        >
          <div className="neumorph-card central">
            <h2>But Transformation Isn't Easy</h2>
          </div>
          
          <div className="challenges-bubbles">
            {challenges.map((challenge, idx) => {
              // Use prime numbers and different multipliers for better distribution
              const horizontalSeed = (idx * 37 + idx * idx * 5) % 100
              const verticalSeed = (idx * 29 + idx * idx * 7) % 100
              
              return (
                <div
                  key={challenge.id}
                  className={`challenge-bubble ${challengesInView ? 'animate' : ''}`}
                  style={{
                    '--bubble-delay': `${idx * 4}s`,
                    '--bubble-duration': '20s',
                    left: `${2 + (horizontalSeed * 0.85)}%`,
                    top: `${2 + (verticalSeed * 0.85)}%`
                  }}
                >
                  <div className="bubble-content">
                    <h3>{challenge.title}</h3>
                    <p className="bubble-description">{challenge.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
        
      </section>



      {/* Section 4: Process Chart */}
      <section className="neumorph-section process-section" ref={section4Ref} style={{ position: 'relative', marginTop: '80px' }}>
        <div className="animated-bg">
          <div className="bg-gradient-1"></div>
          <div className="bg-gradient-2"></div>
          <div className="bg-gradient-3"></div>
        </div>
        <motion.div 
          className="section-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="neumorph-card central" style={{ paddingTop: '90px' }}>
            <h2>We are here to help in a lean yet structured way!</h2>
            <p className="section-lead">
              9 strategic pillars to build your AI-powered organization
            </p>
          </div>
          
          <div className="process-chart">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.number}
                className={`process-step ${idx % 2 === 0 ? 'top' : 'bottom'}`}
                initial={{ opacity: 0, y: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="step-content">
                  <div className="step-number neumorph-raised">{step.number}</div>
                  <h4 className="step-title">{step.title}</h4>
                </div>
                <div className="step-icon-wrapper">
                  <div 
                    className="step-icon neumorph-raised round"
                    style={{ 
                      background: `linear-gradient(135deg, ${step.color}20, ${step.color}10)`,
                      border: `2px solid ${step.color}`,
                      '--glow-color': step.color 
                    }}
                  >
                    {getIcon(step.icon, 40)}
                  </div>
                  <div className="icon-glow" />
                  <p className="step-description">{step.description}</p>
                </div>
                {idx < processSteps.length - 1 && (
                  <div className="step-connector">
                    <svg width="100" height="80" viewBox="0 0 100 80">
                      <path
                        d={idx % 2 === 0 ? "M 0 40 Q 50 0 100 40" : "M 0 40 Q 40 80 100 0"}
                        fill="none"
                        stroke={`url(#gradient-${idx})`}
                        strokeWidth="2"
                        strokeDasharray="5 5"
                      />
                      <defs>
                        <linearGradient id={`gradient-${idx}`}>
                          <stop offset="0%" stopColor={step.color} stopOpacity="0.5" />
                          <stop offset="100%" stopColor={processSteps[idx + 1].color} stopOpacity="0.5" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <div 
              className="scroll-indicator neumorph-button"
            onClick={() => {
              if (section5Ref.current) {
                const section5 = section5Ref.current
                const section5AbsoluteTop = section5.offsetTop
                const targetTop = -140 // Same positioning as section 5 gravity
                const targetScrollY = section5AbsoluteTop - targetTop
                
                // Smooth scroll animation
                const startY = window.scrollY
                const distance = targetScrollY - startY
                const duration = 1200
                const startTime = performance.now()
                
                const animateScroll = (currentTime) => {
                  const elapsed = currentTime - startTime
                  const progress = Math.min(elapsed / duration, 1)
                  
                  // Easing function for smooth animation
                  const easeInOutCubic = progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2
                  
                  window.scrollTo(0, startY + distance * easeInOutCubic)
                  
                  if (progress < 1) {
                    requestAnimationFrame(animateScroll)
                  }
                }
                
                requestAnimationFrame(animateScroll)
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            <Icons.ChevronDown size={24} />
            <span>Scroll to explore</span>
            </div>
          </div>
        </motion.div>
        
        {/* Robot CTA for Process Section */}
      </section>

      {/* Section 5: Our Solutions */}
      <section className="neumorph-section solutions-story" ref={section5Ref}>
        <motion.div 
          className="section-content"
          style={{ scale: solutionsScale }}
        >
          <div className="neumorph-card central">
            <h2>Implementation Framework</h2>
            <p className="section-lead">
              Key Pillars for Success
            </p>
          </div>
          
          <LayoutGroup>
          <div className="solutions-showcase">
            {[
              consultingAreas[0], // Strategy & Portfolio Governance (id: 1)
              consultingAreas[7], // People, Culture & Capability (id: 8)
              consultingAreas[1], // Product & Service Innovation (id: 2)
              consultingAreas[2], // Process & Workflow Transformation (id: 3)
              consultingAreas[3], // Data Platform & Architecture (id: 4)
              consultingAreas[4], // AI Platform, Models & AgentOps (id: 5)
              consultingAreas[5], // Governance, Risk, Security & Compliance (id: 6)
              consultingAreas[6], // Organization & Operating Model (id: 7)
              consultingAreas[8]  // Measurement, Progress & Learning (id: 9)
            ].map((area, idx) => (
              <motion.div
                key={area.id}
                className="solution-showcase-card neumorph-raised"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
                layoutId={`card-container-${area.id}`}
              >
                <div className="solution-header">
                  <div 
                    className="solution-icon neumorph-inset round"
                    style={{ '--accent-color': area.color }}
                  >
                    {getIcon(area.icon, 32)}
                  </div>
                </div>
                <div className="solution-body">
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                  <div className="solution-benefits">
                    {area.benefits.map((benefit, bidx) => (
                      <div key={bidx} className="benefit-tag neumorph-flat">
                        <Icons.CheckCircle size={14} />
                        {benefit}
                      </div>
                    ))}
                  </div>
                  <motion.button
                    className="expand-button neumorph-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedArea(area)
                    }}
                  >
                    <Icons.Expand size={16} />
                    <span>Learn More</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          </LayoutGroup>
        </motion.div>
        
        {/* Robot CTA for Solutions Section */}
      </section>

      {/* Section 6: How We Work */}
      <section className="neumorph-section how-we-work-section" ref={section6Ref} style={{ position: 'relative' }}>
        <motion.div 
          className="section-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="neumorph-card central">
            <h2>How We Work</h2>
            <p className="section-lead">
              Our proven methodology combines strategic insight with hands-on execution
            </p>
          </div>

          {/* We Listen Philosophy */}
          <motion.div 
            className="work-phase neumorph-raised"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.03 }}
          >
            <div className="phase-image-wrapper">
              <img src="/understand.jpg" alt="We Listen" className="phase-image" />
            </div>
            <div className="phase-content">
              <h3 style={{ background: 'linear-gradient(135deg, #e91e63, #ffc107)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>We Listen</h3>
              <p>Before we act, we listen. Deep understanding comes from truly hearing your challenges, goals, and unique context. We take time to understand not just what you say, but what you mean.</p>
              <div className="phase-activities">
                <span className="activity-tag neumorph-flat">Immersion</span>
                <span className="activity-tag neumorph-flat">Understanding</span>
                <span className="activity-tag neumorph-flat">Ambitions</span>
                <span className="activity-tag neumorph-flat">Challenges</span>
              </div>
            </div>
          </motion.div>

          {/* AI Opportunity Discovery - moved to 2nd position */}
          <motion.div 
            className="work-phase neumorph-raised"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.05 }}
          >
            <div className="phase-image-wrapper">
              <img src="/ai-sdlc-consulting/image.jpg" alt="AI Opportunity Discovery" className="phase-image" />
            </div>
            <div className="phase-content">
              <h3 style={{ background: 'linear-gradient(135deg, #e91e63, #ffc107)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI Opportunity Discovery</h3>
              <p>Opportunities arise where needs or painpoints can be solved in an innovative or better way with AI. By mapping customer journeys, business processes and workflows together with your teams, we pinpoint where AI can transform operations, enhance customer experiences, and create competitive advantages that deliver exceptional value.</p>
              <div className="phase-activities">
                <span className="activity-tag neumorph-flat">AI Bootcamps</span>
                <span className="activity-tag neumorph-flat">Design Thinking</span>
                <span className="activity-tag neumorph-flat">Business Process Analysis</span>
                <span className="activity-tag neumorph-flat">Opportunity Mapping</span>
              </div>
            </div>
          </motion.div>

          {/* Create Focus & Alignment Phase - moved to 3rd position */}
          <motion.div 
            className="work-phase neumorph-raised"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.07 }}
          >
            <div className="phase-image-wrapper">
              <img src="/okr.png" alt="Strategic Alignment" className="phase-image" />
            </div>
            <div className="phase-content">
              <h3 style={{ background: 'linear-gradient(135deg, #e91e63, #ffc107)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Create Focus & Alignment</h3>
              <p>We help you establish clear objectives and measurable outcomes that align teams across all levels. By creating shared goals and transparent metrics, we ensure everyone moves in the same direction with purpose and clarity.</p>
              <div className="phase-activities">
                <span className="activity-tag neumorph-flat">Prioritization</span>
                <span className="activity-tag neumorph-flat">Goal Setting</span>
                <span className="activity-tag neumorph-flat">Strategic Alignment</span>
                <span className="activity-tag neumorph-flat">Performance Metrics</span>
              </div>
            </div>
          </motion.div>

          {/* Implementation Phase - Image on RIGHT */}
          <motion.div 
            className="work-phase neumorph-raised"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.09 }}
          >
            <div className="phase-image-wrapper">
              <img src="/agile.png" alt="Agile Methodology" className="phase-image" />
            </div>
            <div className="phase-content">
              <h3 style={{ background: 'linear-gradient(135deg, #e91e63, #ffc107)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>(Scaled) Agile Implementation</h3>
              <p>We work alongside your teams using lean agile methodologies (including SAFe framework) to achieve tangible value in weeks rather than months. Through rapid sprints and iterative delivery, our experts transfer knowledge while building, ensuring sustainable capability development.</p>
              <div className="phase-activities">
                <span className="activity-tag neumorph-flat">Lean Agile Delivery</span>
                <span className="activity-tag neumorph-flat">Sprint Execution</span>
                <span className="activity-tag neumorph-flat">Pilot Programs</span>
                <span className="activity-tag neumorph-flat">Knowledge Transfer</span>
              </div>
            </div>
          </motion.div>

          {/* Heart & Brain Philosophy */}
          <motion.div 
            className="work-phase neumorph-raised heart-brain-phase"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.11 }}
          >
            <div className="phase-image-wrapper">
              <img src="/heartandbrain.png" alt="Heart and Brain Working Together" className="phase-image" />
            </div>
            <div className="phase-content">
              <h3>Heart & Brain</h3>
              <p>Our approach uniquely combines analytical rigor with human empathy. We believe that successful transformation requires both analytical insights and innovative AI capabilities as well as a deep understanding of people's motivations, needs and fears during this transformation journey.</p>
              <div className="phase-activities">
                <span className="activity-tag neumorph-flat">Change Management</span>
                <span className="activity-tag neumorph-flat">Empathetic Leadership</span>
              </div>
            </div>
          </motion.div>

          {/* Key Differentiators */}
          <div className="differentiators-container">
            <h3 className="differentiators-title">What Sets Us Apart</h3>
            <div className="differentiators-grid">
              <motion.div 
                className="differentiator-card neumorph-inset"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <Icons.Users className="differentiator-icon" size={32} />
                <h4>Collaborative Approach</h4>
                <p>We work as an extension of your team, not external consultants</p>
              </motion.div>
              
              <motion.div 
                className="differentiator-card neumorph-inset"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <Icons.Zap className="differentiator-icon" size={32} />
                <h4>Rapid Time-to-Value</h4>
                <p>Deliver tangible results within weeks, not months</p>
              </motion.div>
              
              <motion.div 
                className="differentiator-card neumorph-inset"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                <Icons.Brain className="differentiator-icon" size={32} />
                <h4>AI-Native Expertise</h4>
                <p>Deep understanding of AI capabilities and practical limitations</p>
              </motion.div>
              
              <motion.div 
                className="differentiator-card neumorph-inset"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <Icons.Network className="differentiator-icon" size={32} />
                <h4>Network of Experts</h4>
                <p>Access to specialized talent and industry leaders worldwide</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 7: CTA */}
      <section className="neumorph-section cta-story" ref={section7Ref}>
        <motion.div 
          className="section-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="final-cta neumorph-card extra-large">
            <div className="cta-glow"></div>
            <h2>The Future is Being Written Now</h2>
            <p className="cta-lead">
              Join the leaders who are already transforming their PDLC with AI
            </p>
            
            <div className="cta-stats">
              <div className="cta-stat neumorph-inset">
                <div className="cta-number">15+</div>
                <div className="cta-label">Successful Projects</div>
              </div>
              <div className="cta-stat neumorph-inset">
                <div className="cta-number">3-15x</div>
                <div className="cta-label">Productivity Gains in Critical Workflows</div>
              </div>
              <div className="cta-stat neumorph-inset">
                <div className="cta-number">90%</div>
                <div className="cta-label">Client Satisfaction</div>
              </div>
            </div>
            
            <div className="cta-actions">
              <motion.button
                className="cta-btn primary neumorph-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Close any other open modals first
                  setSelectedArea(null)
                  setSelectedPillar(null)
                  setShowImprintModal(false)
                  setShowDataProtectionModal(false)
                  // Then open robot modal
                  setShowRobotModal(true)
                }}
              >
                Start Your Journey
                <Icons.ArrowRight size={20} />
              </motion.button>
              <motion.a
                href="https://docs.google.com/document/d/1A59B92h1k85owCO2II-J5MPoUJ-wuDUgoAHkrM0DIDk/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn secondary neumorph-button-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <Icons.FileText size={20} />
                Whitepaper: 10X Product-Manager
              </motion.a>
            </div>
            
            <div className="contact-info neumorph-inset">
              <p>Or reach out directly:</p>
              <a href="mailto:contact@10x-productorg.com">contact@10x-productorg.com</a>
            </div>
          </div>
        </motion.div>
        
        {/* Robot CTA for CTA Section */}
      </section>


      {/* Modal */}
      <LayoutGroup>
      <AnimatePresence>
        {selectedArea && (
          <>
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArea(null)}
              transition={{ duration: 0.3 }}
            />
            <div className="modal-wrapper">
              <motion.div
                className="modal-container neumorph-raised"
                layoutId={`card-container-${selectedArea.id}`}
                transition={{ 
                  type: "spring", 
                  damping: 40, 
                  stiffness: 250,
                  mass: 0.8
                }}
              >
              <motion.button
                className="modal-close"
                onClick={() => setSelectedArea(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Icons.X size={20} />
              </motion.button>
              
              <motion.div 
                className="modal-header"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="modal-icon neumorph-inset round"
                  style={{ '--accent-color': selectedArea.color }}
                >
                  {getIcon(selectedArea.icon, 48)}
                </div>
              </motion.div>
              
              <motion.div 
                className="modal-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h2>{selectedArea.title}</h2>
                <p className="modal-description">{selectedArea.description}</p>
                
                <motion.div 
                  className="modal-details"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <div className="modal-column">
                    <h3>
                      <Icons.Target size={18} />
                      Strategy
                    </h3>
                    <ul>
                      {selectedArea.strategy?.map((item, idx) => (
                        <li key={idx}>{renderTextWithTooltip(item)}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="modal-column">
                    <h3>
                      <Icons.Rocket size={18} />
                      Implementation
                    </h3>
                    <ul>
                      {selectedArea.implementation?.map((item, idx) => (
                        <li key={idx}>{renderTextWithTooltip(item)}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
            </div>
          </>
        )}
        
        {selectedPillar !== null && (
          <>
            <motion.div
              className="modal-overlay pillar-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPillar(null)}
              transition={{ duration: 0.3 }}
            />
            <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
              <motion.div
                className="pillar-modal-container neumorph-raised"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ 
                  type: "spring", 
                  damping: 30, 
                  stiffness: 200
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  className="modal-close"
                  onClick={() => setSelectedPillar(null)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Icons.X size={20} />
                </motion.button>
                
                <motion.div 
                  className="pillar-modal-content"
                  key={selectedPillar}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="pillar-modal-header">
                    <h2>{pillarContent[selectedPillar].title}</h2>
                    <p className="pillar-modal-subtitle">{pillarContent[selectedPillar].subtitle}</p>
                  </div>
                  
                  <div className="pillar-modal-body">
                    <p>{renderTextWithBold(pillarContent[selectedPillar].content)}</p>
                  </div>
                </motion.div>
                
                {/* Bottom Navigation - Outside of keyed motion div */}
                <div className="pillar-modal-navigation">
                  <button
                    type="button"
                    className="modal-nav-subtle modal-nav-prev-subtle"
                    onClick={() => {
                      const newIndex = selectedPillar > 0 ? selectedPillar - 1 : pillarContent.length - 1;
                      setSelectedPillar(newIndex);
                    }}
                    aria-label="Previous pillar"
                  >
                    <Icons.ChevronLeft size={18} />
                  </button>
                  
                  <div className="pillar-modal-pagination">
                    {pillarContent.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`pagination-dot ${idx === selectedPillar ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedPillar(idx);
                        }}
                        aria-label={`Go to pillar ${idx + 1}`}
                      />
                    ))}
                  </div>
                  
                  <button
                    type="button"
                    className="modal-nav-subtle modal-nav-next-subtle"
                    onClick={() => {
                      const newIndex = selectedPillar < pillarContent.length - 1 ? selectedPillar + 1 : 0;
                      setSelectedPillar(newIndex);
                    }}
                    aria-label="Next pillar"
                  >
                    <Icons.ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
      </LayoutGroup>
      
      {/* Framework Component Modal */}
      <AnimatePresence>
        {selectedFrameworkComponent && frameworkData[selectedFrameworkComponent] && (
          <>
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFrameworkComponent(null)}
              transition={{ duration: 0.3 }}
            />
            <div className="modal-wrapper">
              <motion.div
                className="modal-container neumorph-raised"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: "spring", damping: 40, stiffness: 250, mass: 0.8 }}
              >
                <motion.button
                  className="modal-close"
                  onClick={() => setSelectedFrameworkComponent(null)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Icons.X size={20} />
                </motion.button>
                
                <motion.div 
                  className="framework-modal-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="framework-modal-header">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <div style={{ 
                        width: '80px', 
                        height: '80px',
                        marginTop: '20px',
                        marginBottom: '1rem',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderRadius: '12px',
                        padding: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <img 
                          src={frameworkData[selectedFrameworkComponent].icon} 
                          alt={frameworkData[selectedFrameworkComponent].title}
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'contain',
                            filter: 'brightness(1.2)'
                          }} 
                        />
                      </div>
                      <h2 style={{ color: '#3b82f6', marginBottom: '0.5rem', textAlign: 'center' }}>
                        {frameworkData[selectedFrameworkComponent].title}
                      </h2>
                    </div>
                    <p className="framework-modal-summary" style={{ fontSize: '1.1em', marginBottom: '1.5rem', opacity: 0.9, textAlign: 'center', padding: '0 2rem' }}>
                      {frameworkData[selectedFrameworkComponent].summary}
                    </p>
                    <div style={{ padding: '0 2rem', marginBottom: '1rem' }}>
                      <h3 style={{ 
                        color: '#06b6d4', 
                        fontSize: '1.2em', 
                        fontWeight: '600',
                        textAlign: 'left',
                        marginBottom: '0',
                        paddingLeft: '2ch'
                      }}>
                        -  AI driven Opportunity Areas -
                      </h3>
                    </div>
                  </div>
                  
                  <div className="framework-modal-levers" style={{ maxHeight: '400px', overflowY: 'auto', padding: '0 2rem' }}>
                    {frameworkData[selectedFrameworkComponent].levers.map((lever, index) => (
                      <motion.div
                        key={index}
                        className="lever-item neumorph-card"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        style={{ 
                          marginBottom: '1.5rem', 
                          padding: '1.5rem',
                          background: 'rgba(59, 130, 246, 0.03)',
                          border: '1px solid rgba(59, 130, 246, 0.1)',
                          marginLeft: '0',
                          marginRight: '0'
                        }}
                      >
                        <h3 style={{ 
                          color: '#06b6d4', 
                          fontSize: '1.1em', 
                          marginBottom: '0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}>
                          <Icons.ChevronRight size={18} />
                          {lever.title}
                        </h3>
                        <p style={{ 
                          fontSize: '0.95em', 
                          lineHeight: '1.6',
                          opacity: 0.85 
                        }}>
                          {lever.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
      
      {/* Robot Modal */}
      <AnimatePresence>
        {showRobotModal && (
          <>
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRobotModal(false)}
              transition={{ duration: 0.3 }}
            />
            <div className="robot-modal-wrapper">
              <motion.div
                className="robot-modal neumorph-raised"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  type: "spring", 
                  damping: 30, 
                  stiffness: 200
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  className="modal-close"
                  onClick={() => setShowRobotModal(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Icons.X size={20} />
                </motion.button>
                
                <div className="robot-modal-header">
                  <img src="/robot.png" alt="AI Assistant" className="robot-modal-icon" />
                  <h2>Your AI transformation starts here!</h2>
                </div>
                
                <div className="robot-modal-content">
                  <p className="robot-greeting" style={{ textAlign: 'center' }}>Welcome! We're excited to help you identify, develop & harvest the incredible opportunities AI can unlock for your organization.</p>
                  
                  <div className="robot-suggestions" style={{ textAlign: 'center' }}>
                    <h3 style={{ color: '#4fc3f7' }}>Together, we will:</h3>
                    <ul style={{ textAlign: 'center', listStyle: 'none', padding: 0 }}>
                      <li>🎯 <strong style={{ color: 'white', fontSize: '110%' }}>Listen & Understand</strong><br />Immerse ourselves in your unique context, ambitions, and challenges</li>
                      <li>🚀 <strong style={{ color: 'white', fontSize: '110%' }}>Discover AI Opportunities</strong><br />Map your customer journeys and workflows to identify transformative AI applications</li>
                      <li>📊 <strong style={{ color: 'white', fontSize: '110%' }}>Create Focus & Alignment</strong><br />Facilitate prioritization and establish clear objectives that unite your teams</li>
                      <li>⚡ <strong style={{ color: 'white', fontSize: '110%' }}>Transform with Purpose</strong><br />Combine analytical rigor with human empathy to ensure successful adoption</li>
                      <li>💡 <strong style={{ color: 'white', fontSize: '110%' }}>Achieve 10X Impact</strong><br />Turn your product organization into a competitive advantage</li>
                    </ul>
                  </div>
                  
                  <div className="robot-cta-buttons" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <a 
                      href="mailto:contact@10x-productorg.com" 
                      className="neumorph-button primary email-button" 
                      style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', fontSize: '20px', padding: '20px 30px' }}
                    >
                      <Icons.Mail size={24} style={{ color: '#4fc3f7' }} />
                      <span style={{ color: '#4fc3f7' }}>Contact us:</span>
                      <strong style={{ color: 'white' }}>contact@10x-productorg.com</strong>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Imprint Modal */}
      <AnimatePresence>
        {showImprintModal && (
          <>
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowImprintModal(false)}
              transition={{ duration: 0.3 }}
            />
            <div className="modal-wrapper">
              <motion.div
                className="legal-modal neumorph-raised"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ 
                  type: "spring", 
                  damping: 30, 
                  stiffness: 200
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  className="modal-close"
                  onClick={() => setShowImprintModal(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Icons.X size={20} />
                </motion.button>
                
                <div className="legal-modal-content">
                  <h2>Imprint</h2>
                  
                  <section>
                    <h3>Contact</h3>
                    <p>
                      Markus Schetelig<br />
                      Phone: +49 1704979152<br />
                      E-mail: contact@10x-productorg.com
                    </p>
                  </section>

                  <section>
                    <h3>VAT ID</h3>
                    <p>
                      Sales tax identification number according to Sect. 27 a of the Sales Tax Law:<br />
                      DE367364123
                    </p>
                  </section>

                  <section>
                    <h3>Person responsible for editorial</h3>
                    <p>
                      Markus Schetelig<br />
                      Margarethe-Gottliebe-Weg 14B<br />
                      14476 Potsdam
                    </p>
                  </section>

                  <section>
                    <h3>EU dispute resolution</h3>
                    <p>
                      The European Commission provides a platform for online dispute resolution (ODR):{" "}
                      <a
                        href="https://ec.europa.eu/consumers/odr/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="legal-link"
                      >
                        https://ec.europa.eu/consumers/odr/
                      </a>
                      <br />
                      Our e-mail address can be found above in the site notice.
                    </p>
                  </section>

                  <section>
                    <h3>Dispute resolution proceedings in front of a consumer arbitration board</h3>
                    <p>
                      We are not willing or obliged to participate in dispute resolution proceedings in front of a consumer arbitration board.
                    </p>
                  </section>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Data Protection Modal */}
      <AnimatePresence>
        {showDataProtectionModal && (
          <>
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDataProtectionModal(false)}
              transition={{ duration: 0.3 }}
            />
            <div className="modal-wrapper">
              <motion.div
                className="legal-modal neumorph-raised"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ 
                  type: "spring", 
                  damping: 30, 
                  stiffness: 200
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.button
                  className="modal-close"
                  onClick={() => setShowDataProtectionModal(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Icons.X size={20} />
                </motion.button>
                
                <div className="legal-modal-content">
                  <h2>Data Protection</h2>
                  
                  <p>
                    We respect your privacy and are committed to protecting it. Our website does not collect, store, or process any personal data, nor do we use cookies or tracking technologies. If you contact us directly (e.g., via email), any personal information you provide will be used solely to respond to your inquiry and handled in compliance with applicable data protection laws.
                  </p>

                  <p>
                    For any questions or concerns about our data protection practices,<br />
                    please feel free to contact us.
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-content">
          <div className="footer-items">
            <span className="footer-copyright">© 2024 3P&O. All rights reserved.</span>
            <span className="footer-divider">|</span>
            <button
              onClick={() => setShowImprintModal(true)}
              className="footer-link footer-button"
            >
              Imprint
            </button>
            <span className="footer-divider">|</span>
            <button
              onClick={() => setShowDataProtectionModal(true)}
              className="footer-link footer-button"
            >
              Data Protection
            </button>
            <span className="footer-divider">|</span>
            <a
              href="https://www.linkedin.com/in/markus-schetelig-878a29/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link footer-linkedin"
            >
              <svg
                className="linkedin-icon"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </footer>
      
      {/* Global Fixed Robot CTA */}
      <RobotCTA
        show={showGlobalRobot && robotVisible && !showRobotModal && !frameworkInView}
        onClick={() => {
          // Close any other open modals first
          setSelectedArea(null)
          setSelectedPillar(null)
          setShowImprintModal(false)
          setShowDataProtectionModal(false)
          // Then open robot modal
          setShowRobotModal(true)
        }}
      />
      
      {/* Support Tile - Fixed position, only shown in framework section after 10s delay */}
      <SupportTile
        show={showSupportTile && !showRobotModal}
        onClick={() => {
          // Close any open modals first
          setSelectedArea(null)
          setSelectedPillar(null)
          setSelectedFrameworkComponent(null)
          setShowRobotModal(false)
          setShowImprintModal(false)
          setShowDataProtectionModal(false)
          
          // Scroll to section 5 (Implementation Framework)
          if (section5Ref.current) {
            const section5 = section5Ref.current
            const section5AbsoluteTop = section5.offsetTop
            const targetTop = -140 // Same positioning as section 5 gravity
            const targetScrollY = section5AbsoluteTop - targetTop
            
            // Smooth scroll animation
            const startY = window.scrollY
            const distance = targetScrollY - startY
            const duration = 1200
            const startTime = performance.now()
            
            const animateScroll = (currentTime) => {
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / duration, 1)
              
              // Easing function for smooth animation
              const easeInOutCubic = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2
              
              window.scrollTo(0, startY + distance * easeInOutCubic)
              
              if (progress < 1) {
                requestAnimationFrame(animateScroll)
              }
            }
            
            requestAnimationFrame(animateScroll)
          }
        }}
      />
    </div>
  )
}

export default NeumorphScrollStory