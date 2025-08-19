export const challenges = [
  {
    id: 1,
    title: "Vision Without a Map",
    description: "No crisp, shared AI vision tied to measurable business outcomes leaves teams pulling in different directions.",
    icon: "Target"
  },
  {
    id: 2,
    title: "Endless Pilots That Never Launch",
    description: "Small tests keep running with no clear success criteria or plan to move into real use.",
    icon: "Layers"
  },
  {
    id: 3,
    title: "Portfolio by Loudest Voice",
    description: "Absent transparent impact/effort prioritization, investments skew to opinions over evidence.",
    icon: "Shield"
  },
  {
    id: 4,
    title: "Unreliable AI Features",
    description: "Inconsistent performance, unpredictable outputs, and frequent failures undermine user confidence and adoption.",
    icon: "Users"
  },
  {
    id: 5,
    title: "Experiments Without Stop/Scale Rules",
    description: "Shipping features without hypotheses, metrics, and decision thresholds wastes time and signals.",
    icon: "Database"
  },
  {
    id: 6,
    title: "Swamps, Not Lakehouses",
    description: "Poorly governed, low-quality, undiscoverable data blocks reuse and slows every initiative.",
    icon: "BarChart"
  },
  {
    id: 7,
    title: "Data in Silos",
    description: "Each department keeps their own data locked away, making it impossible to get a complete picture or leverage insights across the organization.",
    icon: "FileCheck"
  },
  {
    id: 8,
    title: "Confusing Metrics and Definitions",
    description: "Teams use different definitions and dashboards, so they argue about numbers instead of improving results.",
    icon: "Activity"
  },
  {
    id: 9,
    title: "Privacy-by-Design Gaps",
    description: "Weak zero-trust access, masking, and residency controls turn every use case into a compliance fire drill.",
    icon: "Lock"
  },
  {
    id: 10,
    title: "Model Monoculture",
    description: "Betting on a single model undermines fit, cost, latency, and the ability to re-benchmark as the landscape shifts.",
    icon: "Cpu"
  },
  {
    id: 11,
    title: "Agent Spaghetti",
    description: "Ad-hoc tool orchestration without an agent platform and standards kills reliability and debuggability.",
    icon: "Network"
  },
  {
    id: 12,
    title: "Prompt Drift & Eval Debt",
    description: "Treating prompts like magic instead of versioned, tested assets causes regressions you can't detect or roll back.",
    icon: "GitBranch"
  },
  {
    id: 13,
    title: "Outdated Knowledge Sources",
    description: "The documents and data your AI relies on are old or poorly managed, leading to wrong or incomplete answers.",
    icon: "Calendar"
  },
  {
    id: 14,
    title: "Hard to See Performance and Costs",
    description: "Missing monitoring and cost tracking hide errors and spending, so bills grow without control.",
    icon: "DollarSign"
  },
  {
    id: 15,
    title: "Compliance Added Too Late",
    description: "Privacy and AI rules (like GDPR and the EU AI Act) are bolted on at the end, causing delays and rework.",
    icon: "AlertTriangle"
  },
  {
    id: 16,
    title: "Missing Model Governance",
    description: "No live registry, model cards, lineage, or logs slows audits and weakens provenance.",
    icon: "Archive"
  },
  {
    id: 17,
    title: "Bias & Robustness Blind Spots",
    description: "Lacking systematic fairness, robustness, privacy, and adversarial testing invites harm and incidents.",
    icon: "Eye"
  },
  {
    id: 18,
    title: "Automating a Broken Process",
    description: "If the process is unclear or wasteful, automation only makes the problems faster and bigger.",
    icon: "Settings"
  },
  {
    id: 19,
    title: "Humans Out of the Loop",
    description: "Undefined human-in-the-loop thresholds, escalation paths, and override design put outcomes and trust at risk.",
    icon: "UserCheck"
  },
  {
    id: 20,
    title: "Fragile Workflows",
    description: "Steps fail easily because there are no retries, clear logs, or backup actions when something goes wrong.",
    icon: "Zap"
  },
  {
    id: 21,
    title: "RACI Roulette",
    description: "Murky decision rights, slow forums, and unclear escalation stall risky changes and cross-team work.",
    icon: "Users"
  },
  {
    id: 22,
    title: "Playbook Vacuum",
    description: "Absent concise, opinionated playbooks and readiness checks, every team reinvents the basics.",
    icon: "Book"
  },
  {
    id: 23,
    title: "Skills Gap",
    description: "People lack practical training (e.g., writing good AI instructions and checking outputs), which causes mistakes and slows progress.",
    icon: "GraduationCap"
  },
  {
    id: 24,
    title: "Siloed Knowledge",
    description: "Without a taxonomy, knowledge hub, and prompt library, lessons stay local and duplication explodes.",
    icon: "Library"
  },
  {
    id: 25,
    title: "Wrong Rewards",
    description: "Recognition and advancement aren't tied to safe experimentation and sharing, so the culture stalls.",
    icon: "Award"
  }
];

export const consultingAreas = [
  {
    id: 1,
    title: "Strategy & Portfolio Governance",
    shortTitle: "Strategy",
    description: "Turning vision into an executable, value-led portfolio. Unify strategy, roadmapping, prioritization, and governance into a single operating rhythm that aligns AI investments to business outcomes and manages risk at scale.",
    icon: "Map",
    color: "#0891b2",
    benefits: ["Clear strategy-to-execution line of sight", "Faster, evidence-based decisions", "Predictable value delivery"],
    strategy: [
      { text: "Define a compelling AI **Vision**, principles, and guardrails", keyword: "Vision", tooltip: "A clear vision articulates why AI matters to the business and what outcomes it will create. It aligns executives and teams on the problem spaces to pursue and those to avoid. Invest the time to write it crisply and socialize it broadly so every initiative can trace back to it." },
      { text: "Build a sequenced **Roadmap** across horizons (pilots → scale)", keyword: "Roadmap", tooltip: "A good roadmap sequences bets from small, low-risk pilots to scaled products, balancing capability building with business value. Keep horizons explicit (H1/H2/H3) and include decision points where you double-down or stop. Review quarterly to adapt to learning and market changes." },
      { text: "Apply impact/complexity-based **Prioritization** with value hypotheses", keyword: "Prioritization", tooltip: "Use a transparent rubric that weighs business impact, complexity, risk, and data readiness. This avoids loudest-voice selection and creates repeatable decisions across teams. Re-score items as new information arrives to keep the portfolio fresh." },
      { text: "Establish portfolio **Governance** (stage gates, funding, risk)", keyword: "Governance", tooltip: "Governance should accelerate, not block, progress by clarifying who decides what and when. Stage gates enforce minimum quality, safety, and value evidence before scaling. Keep the process lightweight and publish decisions to build trust." },
      { text: "Set **OKRs** and benefits-realization models per value stream", keyword: "OKRs", tooltip: "OKRs translate strategy into measurable, time-bound commitments. Tie key results to value (revenue, cost, risk reduction), not just activity (number of pilots). Track them openly and adjust the plan when leading indicators deviate." }
    ],
    implementation: [
      { text: "Run quarterly **Planning** and monthly business reviews", keyword: "Planning", tooltip: "Cadenced planning builds momentum and creates a predictable drumbeat for decisions. Use it to reconcile capacity with demand and to surface cross-team constraints early. Bring data to the table—metrics, risks, and lessons learned—not just opinions." },
      { text: "Operate a pilot-to-product **Pipeline** with clear exit criteria", keyword: "Pipeline", tooltip: "Treat pilots as a funnel with explicit entry/exit criteria, evaluation methods, and owner accountability. Standardize artifacts so learnings are reusable across teams. Graduating to production should require value evidence and safety sign‑off." },
      { text: "Track **Dependencies**, risks, and change decisions transparently", keyword: "Dependencies", tooltip: "Mapping dependencies exposes hidden blockers across data, platform, and compliance. Visualize them and assign owners so slippage in one area doesn't cascade. Revisit the map each month; dependencies change as work unfolds." },
      { text: "Communicate progress with **Dashboards** and narratives", keyword: "Dashboards", tooltip: "Dashboards make progress, risks, and impact visible to everyone. Include both leading indicators (adoption, cycle time) and lagging ones (ROI, quality improvements). Pair numbers with short narratives so stakeholders understand context and next steps." },
      { text: "**Rebalancing** the portfolio based on evidence and learning", keyword: "Rebalancing", tooltip: "Great portfolios evolve: double-down on winners, pause laggards, and create space for new bets. Use pre-agreed thresholds to trigger decisions rather than endless debate. Document why changes were made so the organization learns over time." }
    ]
  },
  {
    id: 2,
    title: "Product & Service Innovation",
    shortTitle: "Innovation",
    description: "Building AI-native experiences customers love. Embed AI into product strategy, discovery, design, and GTM to deliver copilots, personalization, and intelligent automation—safely and sustainably.",
    icon: "Lightbulb",
    color: "#f59e0b",
    benefits: ["Differentiated customer value and retention", "New revenue streams and pricing models", "Faster discovery-to-delivery cycles"],
    strategy: [
      { text: "Refresh **Product Vision** and value propositions with AI", keyword: "Product Vision", tooltip: "Recast your product's job to be done in an AI-enabled world. Describe how AI changes user outcomes, not just features. Align vision with data realities and platform capabilities to avoid wishful thinking." },
      { text: "Identify **Use Cases** for in-product agents, copilots, personalization", keyword: "Use Cases", tooltip: "Start with user problems where AI removes friction or creates delight. Validate desirability, feasibility, and viability before building. Keep the scope thin and measurable so learning is fast." },
      { text: "Define **UX** patterns, guardrails, and privacy-by-design", keyword: "UX", tooltip: "AI UX needs clarity, control, and recovery: set expectations, explain actions, and allow undo. Privacy-by-design should be visible, not hidden. Use consistent patterns so users build trust across the product." },
      { text: "Set **Experiments** strategy, metrics, and learning cadence", keyword: "Experiments", tooltip: "Ship small, measure hard: instrument success metrics and define stop/scale criteria. Mix qualitative feedback with quantitative results for a full picture. Archive learnings so future teams avoid repeating the same tests." },
      { text: "Align **Pricing**/packaging and metering to value delivered", keyword: "Pricing", tooltip: "If AI creates new value, price and package it thoughtfully. Consider metered usage, tiers, or add-ons, and be transparent about limits. Monitor perceived value versus cost to adjust quickly." }
    ],
    implementation: [
      { text: "Ship thin-slice **A/B Testing** features behind flags", keyword: "A/B Testing", tooltip: "A/B testing separates hype from impact by comparing against a control. Keep experiments focused on one hypothesis to avoid muddled results. Ramp gradually and watch for unintended effects on other metrics." },
      { text: "Capture **Feedback** and human-in-the-loop reviews in product", keyword: "Feedback", tooltip: "In-product feedback loops turn users into co-designers. Make it easy to flag issues and rate usefulness, and close the loop with visible fixes. Combine with human review for high-stakes decisions." },
      { text: "Use a **Design System** for consistent AI interactions", keyword: "Design System", tooltip: "A design system for AI patterns (prompts, confirmations, explanations) reduces cognitive load. Reuse components so behavior is predictable across surfaces. Document when to use which pattern to guide teams." },
      { text: "Monitor **Telemetry** (quality, safety, latency, unit economics)", keyword: "Telemetry", tooltip: "Without telemetry you're guessing—track quality, safety, latency, and cost per interaction. Build alerts and dashboards for product and platform teams. Use telemetry to prioritize technical debt that degrades experience." },
      { text: "Iterate using **Analytics** (cohorts, funnels, usage)", keyword: "Analytics", tooltip: "Cohort and funnel analysis reveals who benefits and where users drop off. Segment by persona and task to tailor improvements. Share findings widely so marketing, support, and product act together." }
    ]
  },
  {
    id: 3,
    title: "Process & Workflow Transformation",
    shortTitle: "Workflows",
    description: "Rewiring how work flows with AI + automation. Redesign end-to-end processes with process mining, lean principles, and AI/RPA orchestration; deploy agents where they remove waste and elevate human work.",
    icon: "Workflow",
    color: "#14b8a6",
    benefits: ["Lower cost and cycle time", "Higher quality and compliance", "Better employee experience"],
    strategy: [
      { text: "Map flows with **Process Mining** and telemetry to expose waste", keyword: "Process Mining", tooltip: "Process mining turns logs into maps of how work really flows. It reveals delays, rework, and hidden variations you won't see in docs. Use it to target the few steps that deliver most of the improvement." },
      { text: "Drive **Prioritization** of augmentation vs. full automation", keyword: "Prioritization", tooltip: "Not every step should be automated; some only need AI assistance. Evaluate tasks by risk, variability, and business impact to pick the right approach. Revisit choices as models and tools mature." },
      { text: "Define **Controls**, segregation of duties, and auditability by design", keyword: "Controls", tooltip: "Bake controls into the flow—don't bolt them on later. Define who can approve what, and record evidence automatically. This makes auditors happy and incidents easier to investigate." },
      { text: "Plan **HITL** exception handling and escalation paths", keyword: "HITL", tooltip: "Human-in-the-loop keeps people in charge where stakes or ambiguity are high. Specify when the system must ask for review and how override works. Measure escalation volume and resolution time to tune thresholds." },
      { text: "Set **SLAs**, resilience, and continuity targets", keyword: "SLAs", tooltip: "Set service levels that matter to customers: turnaround time, accuracy, and first-time-right. Track them publicly so teams feel ownership. Adjust SLAs as automation improves capability." }
    ],
    implementation: [
      { text: "Implement **Triage**/routing, generation, and QA with AI assist", keyword: "Triage", tooltip: "AI can classify, prioritize, and route work so experts focus on what matters. Start with clear categories and add nuance as performance grows. Keep humans able to re-route when context beats the model." },
      { text: "**Orchestration** of RPA/API plus agent-driven workflows", keyword: "Orchestration", tooltip: "Coordinating bots, APIs, and agents is where real productivity appears. Use a workflow engine that supports retries, compensating actions, and observability. Design for idempotency to survive partial failures." },
      { text: "Embed **Auditability** with control points and evidence logs", keyword: "Auditability", tooltip: "Every important step should leave a verifiable trace. Store inputs, outputs, approvals, and model versions tied to each decision. Good evidence speeds incident response and compliance checks." },
      { text: "Train teams on **SOPs** and escalation paths", keyword: "SOPs", tooltip: "Standard operating procedures let people and machines work together smoothly. Keep them short, visual, and embedded where the work happens. Update them after each incident or major improvement." },
      { text: "Track **Metrics** for throughput, rework, defects, and outcomes", keyword: "Metrics", tooltip: "Measure the flow, not just the parts—how long, how many, how good. Tie improvements to business outcomes like NPS or cost per case. Share metrics weekly to keep momentum and accountability high." }
    ]
  },
  {
    id: 4,
    title: "Data Platform & Architecture",
    shortTitle: "Data Platform",
    description: "Engineering the trusted, interoperable data backbone. Build a scalable, governed data foundation with strong contracts, semantics, and privacy-by-design to power analytics, ML, and agents.",
    icon: "Database",
    color: "#7c3aed",
    benefits: ["High-quality, discoverable, and reusable data", "Lower latency from data to decisions", "Foundation for RAG and feature reuse"],
    strategy: [
      { text: "Select target **Architecture** and integration patterns", keyword: "Architecture", tooltip: "Choose an architecture that reflects how your business generates and uses data—centralized lakehouse, domain-oriented mesh, or a hybrid. Favor modularity and clear interfaces so components can evolve independently. Document decisions and tradeoffs to guide future scaling." },
      { text: "Define domain ownership, **Data Contracts**, SLAs, and quality SLOs", keyword: "Data Contracts", tooltip: "Data contracts make producers and consumers agree on schemas, SLAs, and quality expectations. They reduce breakage and provide a basis for automated validation. Start with critical pipelines and expand as teams see the reliability benefits." },
      { text: "Standardize **Catalog**/lineage, glossary, and semantic layer", keyword: "Catalog", tooltip: "A living catalog lets people find, trust, and correctly use datasets. Pair metadata with ownership, lineage, and usage examples to reduce misuse. Make contribution simple so the catalog stays current rather than becoming shelfware." },
      { text: "Set **Zero Trust** security, privacy, residency, and access controls", keyword: "Zero Trust", tooltip: "Assume no implicit trust—authenticate and authorize every request, minimize privileges, and log access. Combine fine-grained policies with privacy techniques like masking or differential privacy. Design for data residency and regulatory boundaries up front." },
      { text: "Plan **Resilience**, cost transparency, and disaster recovery", keyword: "Resilience", tooltip: "Build for failure: replication, backups, schema evolution, and chaos testing. Measure recovery time and point objectives and test them regularly. Budget for reliability; it's cheaper than downtime and data loss." }
    ],
    implementation: [
      { text: "Implement **Ingestion** (CDC/batch/event) with validation & dedup", keyword: "Ingestion", tooltip: "Standardize ingestion patterns so teams don't reinvent the wheel for each source. Validate early (schema, nulls, duplicates) to avoid propagating bad data downstream. Monitor throughput and freshness to catch lags before users do." },
      { text: "Stand up governed lake/warehouse and **Semantic Layer**s", keyword: "Semantic Layer", tooltip: "A semantic layer turns raw tables into business-friendly metrics and definitions. It reduces inconsistent reporting and simplifies self-service analytics. Govern changes so metrics stay stable while still allowing evolution." },
      { text: "Deploy catalog/lineage, **Data Quality** monitors, and stewardship", keyword: "Data Quality", tooltip: "Quality monitoring should check accuracy, completeness, timeliness, and drift. Alert owners with clear runbooks when thresholds are breached. Tie quality KPIs to team objectives so it remains a shared responsibility." },
      { text: "Provision **Vector DB** and feature store with governance", keyword: "Vector DB", tooltip: "Vector stores enable retrieval and grounding for LLMs; treat them like any other production data system. Govern what content is indexed, how it's updated, and how long it lives. Periodically evaluate embedding choices and recall/precision tradeoffs." },
      { text: "Automate with **IaC**/CI-CD for data and FinOps guardrails", keyword: "IaC", tooltip: "Manage your data infrastructure as code for repeatability and speed. Version everything, enforce reviews, and use automated tests for pipelines. Pair with FinOps to spot waste and right‑size resources." }
    ]
  },
  {
    id: 5,
    title: "AI Platform, Models & AgentOps",
    shortTitle: "AI Platform",
    description: "Industrializing AI with the right model & agent stack. Stand up an AI platform for experimentation-to-production across models and agent frameworks—covering evaluation, deployment, observability, safety, and cost control. Emphasize strategic agent-platform selection and tool-use orchestration.",
    icon: "Cpu",
    color: "#10b981",
    benefits: ["Reliable, secure AI at scale", "Faster iteration cycles", "Predictable cost and performance"],
    strategy: [
      { text: "Select **Model Portfolio** (closed, open, fine-tuned, small models)", keyword: "Model Portfolio", tooltip: "No single model wins everywhere; match models to tasks, data sensitivity, latency, and cost. Maintain a small, curated portfolio you can evaluate and swap. Periodically re-benchmark as the model landscape changes rapidly." },
      { text: "Decide build vs. buy for **Agent Platform**s and tool orchestration", keyword: "Agent Platform", tooltip: "Agent platforms coordinate tools, memory, policies, and evaluation; they're the 'runtime' for AI work. Choose for reliability, debuggability, and enterprise integration—not just demos. Start with a narrow set of patterns and grow capabilities deliberately." },
      { text: "Define **LLMOps**/AgentOps standards (registry, versioning, CI/CD, evals)", keyword: "LLMOps", tooltip: "LLMOps brings software engineering rigor to prompts, contexts, and models. Treat prompts like code—version, test, and roll back. Build CI/CD that runs evals and safety checks before anything hits production." },
      { text: "Establish **Safety** controls (guardrails, red teaming, policy-as-code)", keyword: "Safety", tooltip: "Assume models can fail in surprising ways; design layered guardrails. Red team for jailbreaks, data exfiltration, and biased outcomes, and log contested cases for review. Make policy-as-code so controls are enforceable and auditable." },
      { text: "Set **SLOs** for latency, quality, cost, and capacity; plan routing/caching", keyword: "SLOs", tooltip: "Define target latency, response quality, cost per request, and reliability upfront. Route traffic based on SLOs and degrade gracefully under load. Publish SLOs so product teams design experiences that fit realistic limits." }
    ],
    implementation: [
      { text: "Implement **RAG**, prompt/context management, and eval pipelines", keyword: "RAG", tooltip: "Retrieval-augmented generation grounds outputs in your own trusted knowledge. Keep corpora fresh, control access, and measure answer accuracy versus hallucination. Start with high-value domains and expand as patterns stabilize." },
      { text: "Stand up **Registry** for models/agents, feature & secret management", keyword: "Registry", tooltip: "A central registry tracks versions, approvals, and where models/agents run. It enables provenance, reproducibility, and quick rollback when issues arise. Integrate it with CI/CD and access control so it's part of the daily flow." },
      { text: "Integrate **Observability** (traces, drift, token/unit economics)", keyword: "Observability", tooltip: "Instrumentation should show what prompts, tools, and models did for each request. Track drift, failures, and unit economics to spot regressions early. Visualize traces so engineers can debug multi-step agent behavior quickly." },
      { text: "Automate deploys with **Canary**/A-B and safe rollback", keyword: "Canary", tooltip: "Canary releases limit blast radius by exposing new models/prompts to a small slice first. Compare quality and cost against control before ramping. Automate rollback on pre-defined failure conditions." },
      { text: "Drive **Optimization** via batching, caching, routing, and quotas", keyword: "Optimization", tooltip: "Optimize for user experience and cost: cache common responses, batch where safe, and route to cheaper models for simple tasks. Measure tradeoffs continuously; optimizations can decay as usage shifts. Document patterns so teams reuse what works." }
    ]
  },
  {
    id: 6,
    title: "Governance, Risk, Security & Compliance",
    shortTitle: "Governance",
    description: "Enabling responsible innovation with confidence. Operationalize ethical principles, regulatory requirements, and security-by-design across data and AI lifecycles without slowing delivery.",
    icon: "Shield",
    color: "#dc2626",
    benefits: ["Reduced regulatory and reputational risk", "Consistent, auditable model decisions", "Scalable privacy and security posture"],
    strategy: [
      { text: "Define **Policies** for fairness, transparency, and accountability", keyword: "Policies", tooltip: "Policies translate principles into concrete do's and don'ts engineers can follow. Keep them specific, testable, and easy to reference in tooling. Review them regularly as regulations and technology evolve." },
      { text: "Map **Compliance** obligations (e.g., GDPR, EU AI Act) to controls/owners", keyword: "Compliance", tooltip: "Don't 'interpret' regulations ad hoc—map each requirement to a control, an owner, and an audit artifact. Build privacy by design (DPIAs, consent, data minimization) into workflows. Partner early with legal to avoid costly rework late." },
      { text: "Set lifecycle **Standards** (design → approval → monitoring → retire)", keyword: "Standards", tooltip: "Lifecycle standards define minimum bars for documentation, testing, approvals, and monitoring. They create consistency across teams and speed external audits. Keep them slim but enforce them consistently." },
      { text: "Establish **Oversight** (review boards, decision rights, escalation)", keyword: "Oversight", tooltip: "Oversight bodies should be multi-disciplinary and empowered to say 'no.' Define decision rights and escalation paths so tough calls don't linger. Publish outcomes to create precedents others can reuse." },
      { text: "Plan **Red Teaming**, incident response, and third-party risk", keyword: "Red Teaming", tooltip: "Treat adversarial testing as a routine, not a one-off. Simulate jailbreaks, prompt injections, data leakage, and harmful outputs. Feed findings into guardrails, training, and developer education." }
    ],
    implementation: [
      { text: "Maintain **Inventories** (datasets, lineage, model cards, logs)", keyword: "Inventories", tooltip: "You can't govern what you can't see; maintain up-to-date lists of datasets, models, and decisions. Include lineage and owners so issues route quickly. Automate updates from pipelines to keep inventories accurate." },
      { text: "Run **Testing** for bias, robustness, privacy, and adversarial risk", keyword: "Testing", tooltip: "Build repeatable test suites: fairness metrics, robustness checks, red-team scenarios, and privacy tests. Fail builds when thresholds aren't met. Record results so you can show due diligence later." },
      { text: "Enforce **DPIAs**, consent, retention, and audit trails", keyword: "DPIAs", tooltip: "Data Protection Impact Assessments surface privacy risks before deployment. Pair them with consent management and data retention limits. Keep artifacts with the model card so reviewers have a full picture." },
      { text: "Monitor **Drift**, anomalies, and policy violations with alerts", keyword: "Drift", tooltip: "Models and data change; watch for quality and behavior drift. Set alerts on leading indicators and trigger re-training or rollback when needed. Document incidents and fixes to strengthen resilience." },
      { text: "Provide ongoing **Training** and control effectiveness reviews", keyword: "Training", tooltip: "Regular training keeps policies alive and skills current. Use real incidents to make lessons stick. Track participation and understanding so compliance isn't just a checkbox." }
    ]
  },
  {
    id: 7,
    title: "Organization & Operating Model",
    shortTitle: "Organization",
    description: "Structuring for speed, clarity, and scale. Clarify roles, responsibilities, decision rights, and cross‑team interfaces (Aufbau‑ & Ablauforganisation) to reduce friction and speed decisions across platform, product, data, and risk.",
    icon: "Layers",
    color: "#6366f1",
    benefits: ["Clear ownership and faster decisions", "Scalable, repeatable delivery patterns", "Reduced handoffs and coordination overhead"],
    strategy: [
      { text: "Define macro-**Structure** (stream-aligned, platform, enabling, comp)", keyword: "Structure", tooltip: "Choose team topologies that minimize cognitive load and handoffs. Stream-aligned teams own customer value; platform teams provide paved roads. Revisit structure as products and platforms mature." },
      { text: "Map roles and **RACI** across development, data, and governance", keyword: "RACI", tooltip: "Make decision rights explicit so issues don't bounce around. Keep RACI charts lightweight and visible where work starts. Update when roles or processes change to prevent drift." },
      { text: "Standardize **Rituals** (intake, triage, reviews, change control)", keyword: "Rituals", tooltip: "Rituals create predictable touchpoints for alignment and decisions. Keep agendas focused and produce clear outputs (decisions, owners, due dates). If a ritual isn't adding value, fix it or kill it." },
      { text: "Align **Capacity**/budget to value streams and SLAs", keyword: "Capacity", tooltip: "Capacity planning matches ambition to reality. Balance product work, platform work, and compliance so none starves. Visualize where people are allocated to spot bottlenecks early." },
      { text: "Set **Vendors** engagement and sourcing models", keyword: "Vendors", tooltip: "Vendors extend your capabilities but add dependencies. Define onboarding, security, performance expectations, and exit plans up front. Periodically benchmark them so the partnership stays healthy." }
    ],
    implementation: [
      { text: "Stand up AI **CoE** and Enablement teams to unblock delivery", keyword: "CoE", tooltip: "A Center of Excellence accelerates adoption by centralizing expertise and reusable assets. Keep it enabling, not gatekeeping—its job is to make others faster. Measure success by how much the CoE is reused, not how many approvals it issues." },
      { text: "Publish **Playbooks** and decision forums with SLAs", keyword: "Playbooks", tooltip: "Playbooks turn tacit know-how into repeatable steps. Keep them concise, opinionated, and updated with field lessons. Link to templates and tools so teams can execute immediately." },
      { text: "Run **Review Boards** and readiness checks for risky changes", keyword: "Review Boards", tooltip: "Review boards provide a safety net for high-risk models and changes. Time-box reviews and define what evidence is required in advance. Track decisions and rationales to create organizational memory." },
      { text: "Monitor **Org Health** and adapt design regularly", keyword: "Org Health", tooltip: "Healthy orgs ship faster: watch engagement, turnover, and cross-team friction. Use surveys and retros to surface issues early. Treat org design as a product that iterates." },
      { text: "Codify **Interfaces** via internal 'APIs' (charters, contracts)", keyword: "Interfaces", tooltip: "Internal interfaces—charters, SLAs, and shared schemas—reduce coordination tax. Make them explicit and versioned, like APIs. Review them when strategy or structure shifts." }
    ]
  },
  {
    id: 8,
    title: "People, Culture & Capability Enablement",
    shortTitle: "People & Culture",
    description: "Growing confident, psychologically safe, AI‑capable teams. Merge culture and enablement: build literacy and hands‑on skills (prompt, context, agent engineering), systematize knowledge management, and foster psychological safety and ethics.",
    icon: "Users",
    color: "#ec4899",
    benefits: ["Higher adoption and delivery quality", "Safer, ethical use of AI", "Persistent learning and engagement"],
    strategy: [
      { text: "Define **Competencies** with role-based maps and proficiency tiers", keyword: "Competencies", tooltip: "Competency maps clarify what 'good' looks like for each role. They guide hiring, development, and career progression. Keep them living documents that evolve with technology and business needs." },
      { text: "Build **Communities** of practice, mentoring, and coach networks", keyword: "Communities", tooltip: "Communities of practice spread patterns faster than top-down mandates. Give them charters, time, and a clear path to influence standards. Celebrate contributions so people keep participating." },
      { text: "Create knowledge **Taxonomy**, ownership, and contribution norms", keyword: "Taxonomy", tooltip: "A shared taxonomy makes knowledge findable and reusable. Keep it simple enough that busy people actually follow it. Assign ownership so categories don't decay into clutter." },
      { text: "Design **Curricula** (literacy, prompting, RAG, AgentOps) with assessments", keyword: "Curricula", tooltip: "Role-based curricula combine theory with hands-on labs on real data. Assessments verify that skills stick and identify areas to coach. Update content quarterly to track the pace of change in AI." },
      { text: "Align **Incentives** to learning, sharing, and impact", keyword: "Incentives", tooltip: "People do what's rewarded—tie recognition and advancement to learning and knowledge sharing. Make contributions visible in reviews and promotion cases. Avoid perverse incentives that value activity over outcomes." }
    ],
    implementation: [
      { text: "Run **Labs**, clinics, and pair/mob sessions on real use cases", keyword: "Labs", tooltip: "Labs are where confidence is built—safe spaces to practice with real constraints. Rotate problems and tools so exposure is broad. Capture outputs as templates others can reuse." },
      { text: "Publish **Prompt Library**, templates, and test suites with guardrails", keyword: "Prompt Library", tooltip: "A prompt library prevents Groundhog Day by sharing what already works. Include examples, context strategies, and eval results. Treat it like code: review changes and retire weak patterns." },
      { text: "Launch a **Knowledge Hub** (RAG, tagging, lineage) for reuse", keyword: "Knowledge Hub", tooltip: "Centralize playbooks, case studies, datasets, and components in one searchable place. Wire it to your RAG so agents benefit too. Track usage to focus curation where it helps most." },
      { text: "Provide **Recognition** for safe experimentation and shared learning", keyword: "Recognition", tooltip: "Shine a light on behaviors you want more of—write-ups, demos, mentoring. Small, frequent recognition often beats rare big awards. Ensure credit flows to teams, not just individuals." },
      { text: "Coach **Leadership** on inclusive, AI-era management behaviors", keyword: "Leadership", tooltip: "Leaders set the tone: curiosity, psychological safety, and ethics must be visible. Train managers to coach with data and to set realistic expectations about AI. Model learning in public to normalize it for everyone else." }
    ]
  },
  {
    id: 9,
    title: "Measurement, Progress & Learning (Share What Works)",
    shortTitle: "Measurement & Learning",
    description: "Proving impact and amplifying organizational learning. Build a balanced system to measure quality, speed, cost, risk, and adoption—and make Sharing of Learnings a first‑class ritual through demos, case studies, and communities.",
    icon: "TrendingUp",
    color: "#f97316",
    benefits: ["Transparent ROI and risk profile", "Faster compounding of insights", "Evidence‑based portfolio decisions"],
    strategy: [
      { text: "Define value **Metrics** beyond productivity (quality, CX, risk)", keyword: "Metrics", tooltip: "Measure outcomes users care about, not just internal activity. Balance speed with quality and risk so you don't improve one at the expense of others. Keep the set small and stable to enable trend analysis." },
      { text: "Establish **Baselines**, attribution, and review cadence", keyword: "Baselines", tooltip: "Without baselines you can't prove improvement. Capture 'before' values and document assumptions and data sources. Re-baseline only when the underlying system changes materially." },
      { text: "Set **Thresholds** for scale/sunset and learning capture", keyword: "Thresholds", tooltip: "Predefine what success looks like and when to stop. Thresholds reduce bias and sunk-cost fallacy during evaluations. Make them public so decisions feel fair and repeatable." },
      { text: "Plan **Showcases** (demo days, guild talks) to spread wins", keyword: "Showcases", tooltip: "Regular showcases build momentum and cross-pollinate ideas. Keep them short, focused on user value, and honest about tradeoffs. Record sessions and link to artifacts so learnings persist." },
      { text: "Integrate **Feedback Loops** into product/platform roadmaps", keyword: "Feedback Loops", tooltip: "Close the loop by turning insights into backlog items and platform improvements. Assign owners and due dates so ideas don't die in documents. Review outcomes to see which changes paid off." }
    ],
    implementation: [
      { text: "Deploy **Dashboards** and heatmaps at product/platform/program levels", keyword: "Dashboards", tooltip: "Dashboards should tell a story: where we are, what changed, and what to do next. Standardize core views so leaders compare apples to apples. Refresh automatically to keep trust high." },
      { text: "Publish **Case Studies**, post-mortems, and playbooks in the hub", keyword: "Case Studies", tooltip: "Case studies codify context, approach, results, and pitfalls so others can replicate. Include numbers and quotes from users for credibility. Keep them brief and searchable." },
      { text: "Host regular **Demos** and community forums; track engagement", keyword: "Demos", tooltip: "Live demos make progress tangible and invite feedback early. Encourage teams to show rough edges and discuss what they'd try next. Track attendance and questions to gauge interest and gaps." },
      { text: "Align **Budgeting** to evidence and OKR progress", keyword: "Budgeting", tooltip: "Tie funding to measurable outcomes so value earns more runway. Use rolling-wave funding to avoid big-bang bets that are hard to unwind. Make tradeoffs explicit so teams understand decisions." },
      { text: "Increase **Transparency** by publicizing insights and decisions", keyword: "Transparency", tooltip: "Transparency reduces rumor mills and aligns effort. Share not just wins but what didn't work and why. The more people see the decision process, the more they trust it." }
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
    content: "By automating time-consuming tasks – from coding and testing to project management – AI frees teams to focus on high-value creative work. Our clients report that tasks which once took weeks can now be completed in days or hours. Some product leaders note their teams can now dream up an idea one day and have a functional prototype the next.",
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