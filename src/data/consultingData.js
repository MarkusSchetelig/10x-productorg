export const challenges = [
  {
    id: 1,
    title: "Strategic Misalignment",
    description: "Organizations struggle to connect AI capabilities with business goals, leading to scattered initiatives without clear ROI.",
    icon: "Target"
  },
  {
    id: 2,
    title: "Tool Overload",
    description: "The overwhelming landscape of AI models and platforms creates decision paralysis and integration nightmares.",
    icon: "Layers"
  },
  {
    id: 3,
    title: "Security & Compliance Risks",
    description: "Data privacy, IP protection, and model bias pose significant risks without proper governance frameworks.",
    icon: "Shield"
  },
  {
    id: 4,
    title: "Cultural Resistance",
    description: "Teams fear job displacement and struggle to adapt to new AI-augmented workflows and responsibilities.",
    icon: "Users"
  },
  {
    id: 5,
    title: "Knowledge Silos",
    description: "Unstructured internal knowledge prevents AI from accessing the context needed for high-quality outputs.",
    icon: "Database"
  },
  {
    id: 6,
    title: "Measurement Blindness",
    description: "Traditional metrics fail to capture the true impact of AI transformation beyond simple productivity gains.",
    icon: "BarChart"
  }
];

export const consultingAreas = [
  {
    id: 1,
    title: "Strategic Alignment & Roadmap",
    shortTitle: "Strategy",
    description: "Defining the 'Why', the 'What' and the 'How'. Creating a phased adoption roadmap that aligns AI capabilities with specific business goals and value drivers.",
    icon: "Map",
    color: "#0891b2",
    benefits: ["Clear vision and roadmap", "Aligned stakeholders", "Measurable objectives"],
    strategy: [
      "Assess current SDLC maturity and AI readiness",
      "Define business objectives and success metrics",
      "Identify high-value use cases and quick wins",
      "Create phased transformation roadmap",
      "Establish governance and steering committee"
    ],
    implementation: [
      "Execute pilot projects in controlled environments",
      "Deploy change management programs",
      "Integrate AI tools into existing workflows",
      "Monitor KPIs and adjust approach",
      "Scale successful patterns across organization"
    ]
  },
  {
    id: 2,
    title: "Toolchain & Platform Selection",
    shortTitle: "Technology",
    description: "Navigating the complex landscape of AI models and agent frameworks to build a cohesive, secure, and future-proof technology stack.",
    icon: "Cpu",
    color: "#7c3aed",
    benefits: ["Optimized tool selection", "Integrated workflows", "Future-proof architecture"],
    strategy: [
      "Evaluate AI models (GPT, Claude, Gemini, open-source)",
      "Assess agent platforms and orchestration tools",
      "Define security and compliance requirements",
      "Create technology selection criteria",
      "Design integration architecture"
    ],
    implementation: [
      "Setup development and testing environments",
      "Configure AI model access and API management",
      "Implement security controls and monitoring",
      "Build integration connectors and APIs",
      "Deploy and optimize infrastructure"
    ]
  },
  {
    id: 3,
    title: "Governance, Risk & Compliance",
    shortTitle: "Governance",
    description: "Establishing integrated data and AI governance frameworks that address privacy, quality, ethics, and compliance while enabling responsible innovation.",
    icon: "Shield",
    color: "#dc2626",
    benefits: ["Risk mitigation", "Compliance assurance", "Ethical AI practices"],
    strategy: [
      "Define **principles & policies** for ethical, transparent, and accountable AI/data use",
      "Establish **governance structure** with clear roles, decision rights, and oversight committees",
      "Identify **key risks & appetite** — bias, privacy, security, operational, and reputational",
      "Map **regulatory requirements** (GDPR, CCPA, EU AI Act, ISO/IEC 42001, etc.) to business context",
      "Design **model lifecycle standards** — from development through approval, monitoring, and retirement"
    ],
    implementation: [
      "Maintain **inventories & documentation** — datasets, lineage, model cards, decision logs",
      "Run **audits & testing** — bias detection, data quality checks, adversarial security testing",
      "Implement **compliance controls** — privacy impact assessments, consent management, reporting logs",
      "Monitor & respond to **incidents** — AI performance drift, ethical breaches, regulatory changes",
      "**Train and enforce** — staff awareness on AI ethics, risk management, and compliance obligations"
    ]
  },
  {
    id: 4,
    title: "Pilot Program & Use Case Prioritization",
    shortTitle: "Pilots",
    description: "Identifying and executing high-impact, low-risk pilot projects to demonstrate value, build momentum, and generate key learnings.",
    icon: "Rocket",
    color: "#f59e0b",
    benefits: ["Quick wins", "Validated approach", "Scalable learnings"],
    strategy: [
      "Map use cases across SDLC phases",
      "Evaluate impact vs. complexity matrix",
      "Select pilot candidates with clear ROI",
      "Define success criteria and metrics",
      "Create pilot execution framework"
    ],
    implementation: [
      "Form pilot teams and assign champions",
      "Execute time-boxed pilot sprints",
      "Measure and document results",
      "Gather feedback and iterate",
      "Package learnings for broader rollout"
    ]
  },
  {
    id: 5,
    title: "Agent & Workflow Engineering",
    shortTitle: "Engineering",
    description: "Designing, building, and refining AI agents and automated workflows for specific SDLC phases, integrating them with existing systems.",
    icon: "Workflow",
    color: "#10b981",
    benefits: ["Automated workflows", "Seamless integration", "Productivity gains"],
    strategy: [
      "Map existing SDLC workflows and bottlenecks",
      "Design AI-augmented process flows",
      "Define agent capabilities and boundaries",
      "Create workflow orchestration patterns",
      "Establish quality gates and controls"
    ],
    implementation: [
      "Build custom agents for specific tasks",
      "Integrate with CI/CD pipelines",
      "Implement workflow automation",
      "Deploy monitoring and observability",
      "Continuously optimize agent performance"
    ]
  },
  {
    id: 6,
    title: "Organizational Change & Role Evolution",
    shortTitle: "Change",
    description: "Managing the human dimension of change, including redefining roles, evolving team structures, and developing new skill sets.",
    icon: "Users",
    color: "#6366f1",
    benefits: ["Smooth transition", "Empowered teams", "New capabilities"],
    strategy: [
      "Assess current roles and skill gaps",
      "Design future-state organization model",
      "Create role evolution pathways",
      "Develop change communication strategy",
      "Build coalition of change champions"
    ],
    implementation: [
      "Launch change management programs",
      "Facilitate team workshops and training",
      "Support role transitions and upskilling",
      "Address resistance and concerns",
      "Celebrate wins and build momentum"
    ]
  },
  {
    id: 7,
    title: "Knowledge Management & Prompt Engineering",
    shortTitle: "Knowledge",
    description: "Structuring internal knowledge and developing prompt engineering expertise to provide agents with the right context for high-quality output.",
    icon: "Brain",
    color: "#ec4899",
    benefits: ["Optimized AI outputs", "Knowledge leverage", "Prompt expertise"],
    strategy: [
      "Audit existing knowledge repositories",
      "Design knowledge taxonomy and structure",
      "Develop prompt engineering guidelines",
      "Create context management framework",
      "Establish knowledge governance processes"
    ],
    implementation: [
      "Build centralized knowledge base",
      "Create prompt libraries and templates",
      "Implement RAG (Retrieval Augmented Generation)",
      "Train teams on prompt engineering",
      "Continuously refine and optimize prompts"
    ]
  },
  {
    id: 8,
    title: "Measurement & Impact Tracking",
    shortTitle: "Measurement",
    description: "Developing a holistic measurement framework to track impact beyond productivity, focusing on quality, speed, cost, and overall system health.",
    icon: "TrendingUp",
    color: "#14b8a6",
    benefits: ["Clear ROI", "Data-driven decisions", "Continuous improvement"],
    strategy: [
      "Define success metrics beyond productivity",
      "Create balanced scorecard framework",
      "Establish baseline measurements",
      "Design impact attribution models",
      "Build continuous improvement loops"
    ],
    implementation: [
      "Deploy analytics and monitoring tools",
      "Implement dashboards and reporting",
      "Track quality, speed, and cost metrics",
      "Conduct regular impact assessments",
      "Share insights and best practices"
    ]
  },
  {
    id: 9,
    title: "Training & Talent Development",
    shortTitle: "Training",
    description: "Creating new training programs and career paths to upskill the existing workforce and attract new talent for an AI-first engineering culture.",
    icon: "GraduationCap",
    color: "#f97316",
    benefits: ["Skilled workforce", "Career growth", "Innovation culture"],
    strategy: [
      "Assess current skill levels and gaps",
      "Design AI-first curriculum and pathways",
      "Create career development frameworks",
      "Build learning and development roadmap",
      "Establish certification programs"
    ],
    implementation: [
      "Launch hands-on training workshops",
      "Deploy self-paced learning platforms",
      "Create mentorship and coaching programs",
      "Run hackathons and innovation labs",
      "Track skill development and progression"
    ]
  }
];

export const stats = [
  {
    value: "72.5%",
    label: "AI performance on SWE-bench",
    source: "Anthropic 2025",
    modalContent: "SWE-bench measures AI's ability to solve real-world software engineering problems. This 72.5% success rate represents a breakthrough in AI's capability to understand, debug, and implement complex code changes autonomously, approaching senior developer performance levels."
  },
  {
    value: "25%",
    label: "of Google's code is AI-generated",
    source: "Sundar Pichai 2025",
    modalContent: "Google's revelation that a quarter of their new code is AI-generated demonstrates the scalability and reliability of AI coding assistants. This includes production-ready code across various languages and frameworks, validated through their rigorous code review process."
  },
  {
    value: "3-5x",
    label: "Developer productivity increase",
    source: "Accenture 2025",
    modalContent: "Studies show developers using AI assistants complete tasks 3-5 times faster. This includes reduced time for boilerplate code, faster debugging, automated test generation, and accelerated learning curves for new technologies and codebases."
  },
  {
    value: "76%",
    label: "of developers use AI tools",
    source: "Stack Overflow 2024",
    modalContent: "The rapid adoption of AI tools among developers signals a fundamental shift in the profession. From code completion to debugging assistance, AI has become an essential part of the modern developer's toolkit, with adoption rates continuing to accelerate."
  }
];

export const tenXPillars = [
  {
    id: 1,
    title: "Exponential Speed and Agility",
    subtitle: "Time-to-Market",
    icon: "Zap",
    description: "AI-powered tools drastically accelerate the product development lifecycle, shrinking the time from idea to launch.",
    content: "By automating time-consuming tasks – from coding and testing to project management – AI frees teams to focus on high-value creative work. Organizations report that tasks which once took weeks can now be completed in days or hours. Some product leaders note their teams can now dream up an idea one day and have a functional prototype the next.",
    benefits: [
      "10× faster time-to-market",
      "More frequent releases",
      "Quicker pivots based on feedback",
      "Real-time market response"
    ],
    imageUrl: "image1.png" // Placeholder for first image
  },
  {
    id: 2,
    title: "Customer-Centric Value Delivery",
    subtitle: "Outcome Focus",
    icon: "Heart",
    description: "A 10× product organization puts customer value at the center from day one, and AI makes this far more achievable.",
    content: "Modern AI systems can ingest and synthesize fragmented customer feedback from surveys, support tickets, usage analytics, and even social media, then integrate those insights directly into product planning. AI can compress weeks of user research into hours by analyzing massive data sets and surfacing genuine patterns.",
    benefits: [
      "Unprecedented clarity on user needs",
      "Faster validation of requirements",
      "Higher customer adoption",
      "Outcome-based product strategies"
    ],
    imageUrl: "image2.png" // Placeholder for second image
  },
  {
    id: 3,
    title: "Unleashing Innovation through Experimentation",
    subtitle: "Rapid Testing",
    icon: "Lightbulb",
    description: "Being 10× means dramatically boosting innovation capacity – running many rapid experiments to find the best ideas.",
    content: "AI lowers the cost and time of experimentation to near zero, allowing teams to try out far more concepts than before. Generative AI can instantly create prototypes or simulations, and even automate A/B tests. Traditional product development might test a handful of ideas, but an AI-augmented process can validate dozens.",
    benefits: [
      "Near-zero cost experimentation",
      "Data-driven decision making",
      "Expanded innovation pipeline",
      "Systematic innovation process"
    ],
    imageUrl: null // Placeholder for future image
  },
  {
    id: 4,
    title: "AI-Augmented Teams and Talent",
    subtitle: "Empowered People",
    icon: "Users",
    description: "The fusion of human talent with AI capabilities leads to smaller, empowered teams that punch far above their weight.",
    content: "AI acts as a force multiplier for product managers, designers, and developers. With AI assistance, a product manager can rapidly prototype, generate mockups, or produce draft code. A single AI-augmented individual can operate like a 10× team, accelerating cycles without waiting on others.",
    benefits: [
      "Leaner, more autonomous teams",
      "End-to-end capability in single roles",
      "Higher employee satisfaction",
      "Focus on strategic thinking"
    ],
    imageUrl: null // Placeholder for future image
  },
  {
    id: 5,
    title: "Built-In Quality, Compliance, and Resilience",
    subtitle: "Trust at Speed",
    icon: "Shield",
    description: "Moving 10× faster while maintaining extremely high quality through AI-powered continuous checking.",
    content: "Intelligent tools now continuously check code for bugs, security vulnerabilities, adherence to standards, compliance with regulations, and accessibility issues – all in real time. This 'shift left' of quality means problems are caught and fixed before production. AI can generate comprehensive test cases and ensure every requirement is validated.",
    benefits: [
      "Higher quality at faster speed",
      "Built-in compliance",
      "Lower defect rates",
      "Greater customer trust"
    ],
    imageUrl: null // Placeholder for future image
  }
];