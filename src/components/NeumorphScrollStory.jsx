import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, LayoutGroup } from 'framer-motion'
import * as Icons from 'lucide-react'
import { challenges, consultingAreas, stats, tenXPillars } from '../data/consultingData'
import './NeumorphScrollStory.css'

const NeumorphScrollStory = () => {
  const containerRef = useRef(null)
  const [activeSection, setActiveSection] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isHoveringGallery, setIsHoveringGallery] = useState(false)
  const [selectedArea, setSelectedArea] = useState(null)
  const [selectedPillar, setSelectedPillar] = useState(null)
  
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

  const getIcon = (iconName, size = 32) => {
    const Icon = Icons[iconName] || Icons.Circle
    return <Icon size={size} />
  }

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

  const processSteps = [
    {
      number: "01",
      title: "High Value / Risk Use Cases",
      description: "Erhebung, Bewertung, Definition und Priorisierung der relevanten Anwendungsfälle (unternehmenstrategisch).",
      icon: "FileCheck",
      color: "#67e8f9"
    },
    {
      number: "02",
      title: "Architecture & Data",
      description: "Erhebung, Bewertung, Priorisierung der relevanten Systeme und Daten, Definition der Data & Analytics Ziel-Architektur.",
      icon: "Database",
      color: "#60a5fa"
    },
    {
      number: "03",
      title: "People & Culture",
      description: "Definition der relevanten Rollen und Skills sowie Gap-Analyse. Data Leadership, Definition Aus- und Weiterbildung.",
      icon: "Users",
      color: "#818cf8"
    },
    {
      number: "04",
      title: "Processes",
      description: "Definition der Data Management-, Data Governance-Analytics Prozesse.",
      icon: "Workflow",
      color: "#6366f1"
    },
    {
      number: "05",
      title: "Organization",
      description: "Definition des passfähigen Ziel-Organisationsmodells, Way of Working, Steering Committee und Gap-Analyse.",
      icon: "Building",
      color: "#8b5cf6"
    },
    {
      number: "06",
      title: "Business Case",
      description: "Konkretisierung und Definition des Data Driven Business Cases (Kosten, Nutzen, ROI) und Roadmap.",
      icon: "TrendingUp",
      color: "#a78bfa"
    },
    {
      number: "07",
      title: "Value Steering Model",
      description: "Definition der KPI's, Monitoring und der kontinuierlichen Erfolgskontrolle.",
      icon: "BarChart3",
      color: "#c084fc"
    },
    {
      number: "08",
      title: "Implementation Partner",
      description: "Definition des know-how Partnerprofils und Evaluierung der passfähigen Implementierungs-Partner und Technologie.",
      icon: "Handshake",
      color: "#e879f9"
    },
    {
      number: "09",
      title: "Approval",
      description: "Freigabe des Data Driven Business Cases durch das Board und Institutionalisierung des Steering Committee.",
      icon: "CheckCircle2",
      color: "#f472b6"
    },
    {
      number: "10",
      title: "Implementation & Operation",
      description: "Sie übernehmen, wir begleiten bei Bedarf zur erfolgreichen Etablierung und stetigen Verbesserung einer Data Inspired und Digital Culture.",
      icon: "Rocket",
      color: "#fb923c"
    }
  ]

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(progress => {
      const section = Math.floor(progress * 7) // Updated to 7 sections after removing bridge
      setActiveSection(section)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  // Auto-advance slides every 4.2 seconds with synchronized dimming
  useEffect(() => {
    if (isHoveringGallery) {
      return // Don't set up interval when hovering
    }
    
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % sdlcSlides.length)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 150)
      }, 450)
    }, 4200)
    return () => clearInterval(interval)
  }, [isHoveringGallery])

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
  
  const galleryScale = useTransform(scrollYProgress, [0.35, 0.45], [0.85, 1])
  const galleryOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1])

  const solutionsScale = useTransform(scrollYProgress, [0.55, 0.65], [0.9, 1])

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
      <section className="neumorph-section hero-section">
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
              Are you ready?
            </p>
            <div className="scroll-indicator neumorph-button">
              <Icons.ChevronDown size={24} />
              <span>Scroll to explore</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 2: 5 Pillars of 10X Product Organization */}
      <section className="neumorph-section pillars-section">
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
              product organizations must shift from seeking 10% improvements to aiming for 10× impact.
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
                <div className="click-indicator">
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
                <div className="click-indicator">
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
                <div className="click-indicator">
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
                <div className="click-indicator">
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
                <div className="click-indicator">
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
      <section className="neumorph-section challenges-story">
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
                <div className="timeline-connector">
                  <div className="connector-line neumorph-inset" />
                  <div className="timeline-marker neumorph-raised round">
                    <div className="marker-icon">{getIcon(challenge.icon, 20)}</div>
                  </div>
                </div>
                <div className="timeline-content neumorph-card">
                  <h3>{challenge.title}</h3>
                  <p>{challenge.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>


      {/* Section 5: SDLC Gallery */}
      <section className="neumorph-section gallery-section">
        <motion.div 
          className="section-content"
          style={{
            scale: galleryScale,
            opacity: galleryOpacity
          }}
        >
          <div className="neumorph-card central">
            <h2>BLUEPRINT<br />towards AI-assisted Software engineering</h2>
          </div>
          
          <div 
            className="gallery-container"
            onMouseEnter={() => setIsHoveringGallery(true)}
            onMouseLeave={() => setIsHoveringGallery(false)}
          >
            <div className={`gallery-slide neumorph-card ${isTransitioning ? 'transitioning' : ''}`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ width: '100%', position: 'relative', zIndex: 2 }}
                >
                <h3 className="slide-title">{sdlcSlides[activeSlide].title}</h3>
                <p className="slide-subtitle">{sdlcSlides[activeSlide].subtitle}</p>
                
                <div className="slide-content-transformation">
                  {sdlcSlides[activeSlide].content.map((item, tIdx) => (
                    <div 
                      key={tIdx} 
                      className="transformation-item"
                    >
                      <div className="transformation-dimension">
                        {item.dimension}
                      </div>
                      <div className="transformation-content">
                        {item.today && (
                          <div className="transformation-today">
                            <span className="label">Today:</span> {item.today}
                          </div>
                        )}
                        <div className="transformation-target">
                          <span className="label">Target:</span> {item.target}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Navigation dots */}
            <div className={`gallery-navigation ${isHoveringGallery ? 'paused' : ''}`}>
              {sdlcSlides.map((_, idx) => (
                <button
                  key={idx}
                  className={`gallery-dot ${activeSlide === idx ? 'active' : ''}`}
                  onClick={() => {
                    if (!isTransitioning) {
                      setIsTransitioning(true)
                      setTimeout(() => {
                        setActiveSlide(idx)
                        setTimeout(() => {
                          setIsTransitioning(false)
                        }, 150)
                      }, 450)
                    }
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Section 6: Process Chart */}
      <section className="neumorph-section process-section">
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
            <h2>Our Data-Driven Transformation Process</h2>
            <p className="section-lead">
              10 strategic steps to build your AI-powered organization
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
      </section>

      {/* Section 7: Our Solutions */}
      <section className="neumorph-section solutions-story">
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
            {consultingAreas.map((area, idx) => (
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
      </section>

      {/* Section 8: CTA */}
      <section className="neumorph-section cta-story">
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
              Join the leaders who are already transforming their SDLC with AI
            </p>
            
            <div className="cta-stats">
              <div className="cta-stat neumorph-inset">
                <div className="cta-number">500+</div>
                <div className="cta-label">Successful Transformations</div>
              </div>
              <div className="cta-stat neumorph-inset">
                <div className="cta-number">3-5x</div>
                <div className="cta-label">Average Productivity Gain</div>
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
              >
                Start Your Journey
                <Icons.ArrowRight size={20} />
              </motion.button>
              <motion.button
                className="cta-btn secondary neumorph-button-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icons.FileText size={20} />
                Get the Whitepaper
              </motion.button>
            </div>
            
            <div className="contact-info neumorph-inset">
              <p>Or reach out directly:</p>
              <a href="mailto:ai-transformation@consultancy.com">ai-transformation@consultancy.com</a>
            </div>
          </div>
        </motion.div>
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
                        <li key={idx}>{renderTextWithBold(item)}</li>
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
                        <li key={idx}>{renderTextWithBold(item)}</li>
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
    </div>
  )
}

export default NeumorphScrollStory