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
      <div className="robot-icon-wrapper">
        <img src="/robot.png" alt="AI Assistant" className="robot-icon" />
      </div>
      <div className="robot-pulse"></div>
    </motion.div>
  )
}

const NeumorphScrollStory = () => {
  const containerRef = useRef(null)
  const [activeSection, setActiveSection] = useState(0)
  const [selectedArea, setSelectedArea] = useState(null)
  const [selectedPillar, setSelectedPillar] = useState(null)
  const [iconDelays, setIconDelays] = useState([])
  const [showGlobalRobot, setShowGlobalRobot] = useState(false)
  const [robotVisible, setRobotVisible] = useState(false)
  const [showRobotModal, setShowRobotModal] = useState(false)
  const [scrollTimer, setScrollTimer] = useState(null)
  const [showImprintModal, setShowImprintModal] = useState(false)
  const [showDataProtectionModal, setShowDataProtectionModal] = useState(false)
  const section1Ref = useRef(null) // Hero section
  const section2Ref = useRef(null) // 5 Pillars section
  const section3Ref = useRef(null) // Challenges section
  const section4Ref = useRef(null) // Process section
  const section5Ref = useRef(null) // Solutions section
  const section6Ref = useRef(null) // How We Work section
  const section7Ref = useRef(null) // CTA section
  const [isGravityActive, setIsGravityActive] = useState(false)
  const gravityTimeoutRef = useRef(null)
  const gravitySection3TimeoutRef = useRef(null)
  const gravitySection4TimeoutRef = useRef(null)
  const robotCTATimeoutRef = useRef(null)
  
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
    if (selectedArea || selectedPillar !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedArea, selectedPillar])
  
  // Extended gravity effect for section 2 (also pulls from section 1)
  useEffect(() => {
    const handleScroll = () => {
      if (!section2Ref.current || !section1Ref.current || isGravityActive) return
      
      const section2 = section2Ref.current
      const section1 = section1Ref.current
      const rect2 = section2.getBoundingClientRect()
      const rect1 = section1.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const sectionHeight = rect2.height
      
      // Calculate how much of section 2 is visible
      const visibleTop = Math.max(0, rect2.top)
      const visibleBottom = Math.min(viewportHeight, rect2.bottom)
      const visibleHeight = Math.max(0, visibleBottom - visibleTop)
      const visibilityPercentage = visibleHeight / sectionHeight
      
      // Check if we're in section 1 with section 2 partially visible
      const section1Visible = rect1.top <= 0 && rect1.bottom > viewportHeight * 0.3
      const section2PartiallyVisible = rect2.top < viewportHeight && rect2.top > 0
      
      // Extended gravity conditions:
      // 1. Original: More than 50% of section 2 is visible
      // 2. Extended: Gravity starts when just 5% of section 2 is visible
      const shouldApplyGravity = visibilityPercentage > 0.5 || 
                                 (visibilityPercentage > 0.05 && rect2.top < viewportHeight)
      
      if (shouldApplyGravity) {
        const sectionCenter = rect2.top + sectionHeight / 2
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
  
  // Gravity effect between section 2 and section 3
  useEffect(() => {
    const handleSection2to3Gravity = () => {
      if (!section2Ref.current || !section3Ref.current || isGravityActive) return
      
      const section2 = section2Ref.current
      const section3 = section3Ref.current
      const rect2 = section2.getBoundingClientRect()
      const rect3 = section3.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      // Calculate visible portions of both sections
      const section2VisibleTop = Math.max(0, Math.min(viewportHeight, rect2.top))
      const section2VisibleBottom = Math.max(0, Math.min(viewportHeight, rect2.bottom))
      const section2VisibleHeight = section2VisibleBottom - section2VisibleTop
      
      const section3VisibleTop = Math.max(0, Math.min(viewportHeight, rect3.top))
      const section3VisibleBottom = Math.max(0, Math.min(viewportHeight, rect3.bottom))
      const section3VisibleHeight = section3VisibleBottom - section3VisibleTop
      
      // Check if we're in the transition zone between sections 2 and 3
      const inTransitionZone = section2VisibleHeight > 0 && section3VisibleHeight > 0
      
      if (inTransitionZone) {
        // Calculate which section has more screen space
        const section2Percentage = section2VisibleHeight / viewportHeight
        const section3Percentage = section3VisibleHeight / viewportHeight
        
        let targetSection, targetRect, targetHeight
        
        if (section2Percentage > 0.5) {
          // Pull toward section 2
          targetSection = section2
          targetRect = rect2
          targetHeight = rect2.height
        } else if (section3Percentage > 0.5) {
          // Pull toward section 3
          targetSection = section3
          targetRect = rect3
          targetHeight = rect3.height
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
          // Pull toward section 3
          targetSection = section3
          targetRect = rect3
          targetHeight = rect3.height
        } else if (section4Percentage > 0.5) {
          // Pull toward section 4
          targetSection = section4
          targetRect = rect4
          targetHeight = rect4.height
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
          if (gravitySection4TimeoutRef.current) {
            clearTimeout(gravitySection4TimeoutRef.current)
          }
          
          // Wait 2 seconds after user stops interacting
          gravitySection4TimeoutRef.current = setTimeout(() => {
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
  
  // Global robot visibility with scroll-based hide/show
  useEffect(() => {
    let timer = null
    let isScrolling = false
    
    // Show robot initially after 5 seconds
    const initialTimer = setTimeout(() => {
      console.log('Showing global robot initially')
      setShowGlobalRobot(true)
      setRobotVisible(true)
    }, 5000)
    
    const handleScroll = () => {
      if (!showGlobalRobot) return
      
      // Hide robot when scrolling starts
      if (!isScrolling) {
        isScrolling = true
        setRobotVisible(false)
      }
      
      // Clear existing timer
      if (timer) {
        clearTimeout(timer)
      }
      
      // Show robot after 3 seconds of no scrolling
      timer = setTimeout(() => {
        isScrolling = false
        setRobotVisible(true)
      }, 3000)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timer) clearTimeout(timer)
      if (initialTimer) clearTimeout(initialTimer)
    }
  }, [showGlobalRobot])
  
  
  const pillarContent = [
    {
      title: "Exponential Speed and Agility",
      subtitle: "Time-to-Market",
      content: "AI-powered tools drastically **accelerate** the product development lifecycle, shrinking the time from idea to launch. By automating time-consuming tasks – from coding and testing to project management – AI frees teams to focus on high-value creative work. The result is a much faster **time-to-market**: organizations report that tasks which once took weeks can now be completed in **days or hours**. In fact, some product leaders note their teams \"can now dream up an idea one day and have a functional prototype the next\". This unprecedented **agility** means more frequent releases, quicker pivots, and the ability to capitalize on market opportunities or respond to feedback almost in real-time. In an environment where AI is everywhere, **speed becomes a competitive differentiator** – not by overworking teams, but by augmenting them with AI to accomplish more in less time."
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

  const renderTextWithBold = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} style={{ color: '#3979e9' }}>{part.slice(2, -2)}</strong>;
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
              <strong className="keyword-highlight" style={{ color: '#3979e9', cursor: 'help' }}>
                {cleanText}
              </strong>
              <span className="keyword-tooltip neumorph-raised">
                {tooltip}
              </span>
            </span>
          );
        }
        return <strong key={index} style={{ color: '#3979e9' }}>{cleanText}</strong>;
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
      const section = Math.floor(progress * 8) // Updated to 8 sections with How We Work
      setActiveSection(section)
    })
    return () => unsubscribe()
  }, [scrollYProgress])


  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  
  const statsScale = useTransform(scrollYProgress, [0.08, 0.14, 0.2, 0.28], [0.85, 1, 1, 0.95])
  const statsOpacity = useTransform(scrollYProgress, [0.08, 0.14, 0.2, 0.28], [0.3, 1, 1, 0.5])
  const statsBrightness = useTransform(scrollYProgress, [0.08, 0.14, 0.2, 0.28], [0.7, 1.2, 1.2, 0.8])

  // Challenges section starts emerging when 1/3 of stats section is still visible
  const challengesX = useTransform(scrollYProgress, [0.16, 0.26], [-100, 0])
  const challengesOpacity = useTransform(scrollYProgress, [0.16, 0.26, 0.38, 0.42], [0, 1, 1, 0])
  const challengesBrightness = useTransform(scrollYProgress, [0.16, 0.25, 0.38, 0.42], [0.6, 1.4, 1.4, 0.8])
  const challengesScale = useTransform(scrollYProgress, [0.16, 0.25, 0.38, 0.42], [0.85, 1.05, 1.05, 0.95])
  
  // Removed gallery transforms - section deleted
  // const galleryScale = useTransform(scrollYProgress, [0.35, 0.45], [0.85, 1])
  // const galleryOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1])

  const solutionsScale = useTransform(scrollYProgress, [0.45, 0.55], [0.9, 1])

  return (
    <div className="neumorph-scroll-story" ref={containerRef}>
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
            <div className="scroll-indicator neumorph-button">
              <Icons.ChevronDown size={24} />
              <span>Scroll to explore</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 2: 5 Pillars of 10X Product Organization */}
      <section className="neumorph-section pillars-section" ref={section2Ref} style={{ position: 'relative' }}>
        {/* Dynamic background glow */}
        <motion.div 
          className="section-glow"
          style={{
            opacity: useTransform(scrollYProgress, [0.08, 0.14, 0.2, 0.28], [0, 0.6, 0.6, 0]),
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.3), transparent 70%)',
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none'
          }}
        />
        <motion.div 
          className="section-content"
          style={{ 
            scale: statsScale, 
            opacity: statsOpacity,
            filter: useTransform(statsBrightness, value => `brightness(${value})`)
          }}
        >
          <div className="neumorph-card central">
            <h2>
              In the Age of AI
              <br />
              product organizations must shift from seeking 10% Improvements to aiming for <span style={{ color: '#3979e9', fontWeight: 'bold' }}>10X Impact.</span>
            </h2>
          </div>
          
          <div className="pillars-images-container">
            <div className="pillars-row">
              <motion.div 
                className="pillar-image-wrapper"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                onClick={() => setSelectedPillar(0)}
              >
                <div className="click-indicator" style={{ animationDelay: `${iconDelays[0] || 0}s` }}>
                  <Icons.Maximize2 size={16} />
                </div>
                <img src="/image1.png" alt="Exponential Speed & Agility" className="pillar-image" />
              </motion.div>
              <motion.div 
                className="pillar-image-wrapper"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                onClick={() => setSelectedPillar(1)}
              >
                <div className="click-indicator" style={{ animationDelay: `${iconDelays[1] || 1.5}s` }}>
                  <Icons.Maximize2 size={16} />
                </div>
                <img src="/image2.png" alt="Customer-Centric Value Delivery" className="pillar-image" />
              </motion.div>
              <motion.div 
                className="pillar-image-wrapper"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                onClick={() => setSelectedPillar(2)}
              >
                <div className="click-indicator" style={{ animationDelay: `${iconDelays[2] || 3}s` }}>
                  <Icons.Maximize2 size={16} />
                </div>
                <img src="/image3.png" alt="Unleashing Innovation through Experimentation" className="pillar-image" />
              </motion.div>
              <motion.div 
                className="pillar-image-wrapper"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                onClick={() => setSelectedPillar(3)}
              >
                <div className="click-indicator" style={{ animationDelay: `${iconDelays[3] || 4.5}s` }}>
                  <Icons.Maximize2 size={16} />
                </div>
                <img src="/image4.png" alt="AI-Augmented Teams & Talent" className="pillar-image" />
              </motion.div>
              <motion.div 
                className="pillar-image-wrapper"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                onClick={() => setSelectedPillar(4)}
              >
                <div className="click-indicator" style={{ animationDelay: `${iconDelays[4] || 6}s` }}>
                  <Icons.Maximize2 size={16} />
                </div>
                <img src="/image5.png" alt="Built-In Quality, Compliance & Resilience" className="pillar-image" />
              </motion.div>
            </div>
          </div>
          
          <div className="insight-box neumorph-card">
            <div className="insight-icon neumorph-raised round">
              <Icons.TrendingUp size={24} />
            </div>
            <p>
              Adopting this 10× mindset is quickly becoming the right playbook in an era where AI is rewriting the rules of the game.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Section 3: The Challenges */}
      <section className="neumorph-section challenges-story" ref={section3Ref} style={{ position: 'relative' }}>
        {/* Dynamic background glow for challenges */}
        <motion.div 
          className="section-glow"
          style={{
            opacity: useTransform(scrollYProgress, [0.16, 0.25, 0.38, 0.42], [0, 0.8, 0.8, 0]),
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
                  className="challenge-bubble"
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



      {/* Section 6: Process Chart */}
      <section className="neumorph-section process-section" ref={section4Ref} style={{ position: 'relative' }}>
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
          <div className="neumorph-card central">
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
        </motion.div>
        
        {/* Robot CTA for Process Section */}
      </section>

      {/* Section 7: Our Solutions */}
      <section className="neumorph-section solutions-story" ref={section5Ref}>
        <motion.div 
          className="section-content"
          style={{ scale: solutionsScale }}
        >
          <div className="neumorph-card central">
            <h2>Key Pillars of Success</h2>
            <p className="section-lead">
              Comprehensive consulting services designed for the AI era
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

      {/* Section 7: How We Work */}
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
                <span className="activity-tag neumorph-flat">Facilitation Prioritization</span>
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
              <h3 style={{ background: 'linear-gradient(135deg, #e91e63, #ffc107)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Agile Implementation</h3>
              <p>We work alongside your teams using lean agile methodologies to achieve tangible value in weeks rather than months. Through rapid sprints and iterative delivery, our experts transfer knowledge while building, ensuring sustainable capability development.</p>
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

      {/* Section 8: CTA */}
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
                onClick={() => setShowRobotModal(true)}
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
                  <p className="robot-greeting">Welcome! We're excited to help you discover the incredible opportunities AI can unlock for your organization.</p>
                  
                  <div className="robot-suggestions">
                    <h3>Together, we will:</h3>
                    <ul>
                      <li>🎯 <strong>Listen & Understand</strong> - Immerse ourselves in your unique context, ambitions, and challenges</li>
                      <li>🚀 <strong>Discover AI Opportunities</strong> - Map your customer journeys and workflows to identify transformative AI applications</li>
                      <li>📊 <strong>Create Focus & Alignment</strong> - Facilitate prioritization and establish clear objectives that unite your teams</li>
                      <li>⚡ <strong>Transform with Purpose</strong> - Combine analytical rigor with human empathy to ensure successful adoption</li>
                      <li>💡 <strong>Achieve 10X Impact</strong> - Turn your product organization into a competitive advantage</li>
                    </ul>
                  </div>
                  
                  <div className="robot-cta-buttons">
                    <a 
                      href="mailto:contact@10x-productorg.com" 
                      className="neumorph-button primary email-button" 
                      style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '18px' }}
                    >
                      <Icons.Mail size={20} style={{ color: '#4fc3f7' }} />
                      <span><span style={{ color: '#4fc3f7' }}>Contact us at:</span>&nbsp;<strong style={{ marginLeft: '10px' }}>contact@10x-productorg.com</strong></span>
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
        show={showGlobalRobot && robotVisible && !showRobotModal}
        onClick={() => {
          setShowRobotModal(true)
        }}
      />
    </div>
  )
}

export default NeumorphScrollStory