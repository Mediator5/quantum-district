export const site = {
  name: "Quantum District",
  tagline: "Technology · Strategy · Transformation",
  headline: "Strategic Technology & Consulting",
  subhead: "Turning Complex Challenges Into Measurable Progress.",
  description:
    "Quantum District helps organizations navigate technology, transformation, and strategic challenges with practical solutions built for real-world results.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://quantumdistrict.com",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@quantumdistrict.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+1 (202) 555-0147",
  location: "Washington, DC · Serving clients nationwide",
  responseWindow: "under 1 business day",
} as const;

export const nav = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Approach", href: "/#approach" },
  { label: "Insights", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export type Service = {
  id: string;
  number: string;
  title: string;
  summary: string;
  bullets: string[];
  icon:
    | "compass"
    | "cpu"
    | "kanban"
    | "chart"
    | "workflow"
    | "rocket";
  image: string;
};

export const services: Service[] = [
  {
    id: "strategic-consulting",
    number: "01",
    title: "Strategic Consulting",
    summary:
      "Strategic planning, organizational assessments, roadmaps, business analysis, and decision support.",
    bullets: [
      "Strategic planning & roadmaps",
      "Organizational assessments",
      "Business analysis & decision support",
    ],
    icon: "compass",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "technology-transformation",
    number: "02",
    title: "Technology Transformation",
    summary:
      "Technology modernization and transformation strategies designed to improve performance, agility, and efficiency.",
    bullets: [
      "Modernization strategy",
      "Cloud & platform migration planning",
      "Architecture and vendor evaluation",
    ],
    icon: "cpu",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "program-project-management",
    number: "03",
    title: "Program & Project Management",
    summary:
      "Structured program leadership, project execution, governance, risk management, and performance management.",
    bullets: [
      "Program leadership & governance",
      "Risk and dependency management",
      "Performance management & reporting",
    ],
    icon: "kanban",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "data-analytics",
    number: "04",
    title: "Data & Analytics",
    summary:
      "Data-driven insights, reporting, analysis, and decision frameworks that turn information into action.",
    bullets: [
      "Dashboards & executive reporting",
      "Analysis and measurement frameworks",
      "Data quality & governance",
    ],
    icon: "chart",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "process-optimization",
    number: "05",
    title: "Process Optimization",
    summary:
      "Process assessment and redesign focused on eliminating inefficiencies and creating sustainable improvements.",
    bullets: [
      "Current-state process assessment",
      "Redesign & automation opportunities",
      "Sustainable operating models",
    ],
    icon: "workflow",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "implementation-support",
    number: "06",
    title: "Implementation Support",
    summary:
      "Hands-on support from planning through deployment, adoption, measurement, and continuous improvement.",
    bullets: [
      "Deployment & change enablement",
      "Adoption and training support",
      "Continuous improvement cycles",
    ],
    icon: "rocket",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
  },
];

export const approach = [
  {
    step: "01",
    title: "Understand",
    body: "We listen first, understand the mission, and define the challenge before recommending a solution.",
  },
  {
    step: "02",
    title: "Design",
    body: "We develop practical strategies and solutions aligned with business objectives and organizational realities.",
  },
  {
    step: "03",
    title: "Execute",
    body: "We help turn strategy into action through disciplined implementation and accountable delivery.",
  },
  {
    step: "04",
    title: "Improve",
    body: "We measure outcomes, identify opportunities, and continuously improve the solution.",
  },
];

export const stats = [
  { value: 18, suffix: "+", label: "Years of combined delivery leadership" },
  { value: 40, suffix: "+", label: "Programs guided from strategy to launch" },
  { value: 96, suffix: "%", label: "Client initiatives delivered on schedule" },
  { value: 24, suffix: "h", label: "Typical response to a new inquiry" },
];

export const differentiators = [
  {
    title: "AI-accelerated discovery",
    body: "Our AI assistant answers scoping questions the moment you ask them, then routes the details straight to a senior consultant — no waiting on a callback to get moving.",
  },
  {
    title: "Answers in hours, not weeks",
    body: "Every inquiry gets a human response in under one business day, with a scoped point of view — not a generic brochure.",
  },
  {
    title: "Contracting without friction",
    body: "Proposals, agreements, and e-signature run through our client portal, so you go from conversation to kickoff in days.",
  },
];

export const testimonials = [
  {
    quote:
      "They walked in with a plan on day three, not month three. The roadmap was practical, funded, and actually got built.",
    name: "Director of Operations",
    role: "Federal health program",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "Quantum District turned a stalled modernization effort into a sequenced, measurable program. Leadership finally had one version of the truth.",
    name: "VP, Technology",
    role: "Regional financial services firm",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "The difference is follow-through. They stayed until adoption was real and the numbers moved.",
    name: "Chief of Staff",
    role: "State agency transformation office",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
  },
];

export const industries = [
  "Government & Public Sector",
  "Healthcare",
  "Financial Services",
  "Higher Education",
  "Energy & Utilities",
  "Nonprofit & Associations",
];

export const faqs = [
  {
    q: "How quickly can we get started?",
    a: "Most engagements begin with a 30-minute discovery call within 48 hours of your first message. From there we can issue a scoped proposal and agreement through our client portal — many clients are at kickoff inside two weeks.",
  },
  {
    q: "What does a typical engagement look like?",
    a: "We scope to the outcome, not the hours. Engagements usually run as a short assessment sprint (2–4 weeks), a defined delivery phase, and an improvement cycle. Advisory retainers are available for ongoing decision support.",
  },
  {
    q: "How do contracts and agreements work?",
    a: "Proposals, statements of work, and agreements are issued through our secure client portal, with e-signature and milestone-based invoicing. You review everything in one place before anything is countersigned.",
  },
  {
    q: "Do you work with government and regulated organizations?",
    a: "Yes. A large share of our work is with public sector, healthcare, and regulated environments where governance, documentation, and audit-readiness are part of the delivery standard.",
  },
  {
    q: "How is AI used in your work?",
    a: "Two ways. Internally, AI accelerates research, analysis, and documentation so our consultants spend their time on judgment rather than assembly. Externally, our AI assistant answers your scoping questions instantly and hands off the specifics to a human on our team.",
  },
  {
    q: "What if we are not sure what we need yet?",
    a: "That is a normal starting point and a good use of a first conversation. Bring the problem, the constraint, or the deadline — we will tell you candidly whether we are the right fit and what we would do first.",
  },
];

export const projectTypes = [
  "Strategic Consulting",
  "Technology Transformation",
  "Program & Project Management",
  "Data & Analytics",
  "Process Optimization",
  "Implementation Support",
  "Not sure yet — need guidance",
];

export const budgetRanges = [
  "Under $25,000",
  "$25,000 – $75,000",
  "$75,000 – $250,000",
  "$250,000+",
  "To be determined",
];

export const timelines = [
  "Immediately",
  "Within 30 days",
  "This quarter",
  "Exploring options",
];
