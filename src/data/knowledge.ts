/**
 * Curated knowledge base used by the AI assistant.
 *
 *  - When ANTHROPIC_API_KEY is set, this is injected as grounding context so
 *    the model answers from Quantum District's actual positioning.
 *  - When no key is set, the assistant falls back to keyword retrieval over
 *    these entries and offers an email handoff for anything it cannot match.
 */

export type KbEntry = {
  id: string;
  keywords: string[];
  question: string;
  answer: string;
};

export const knowledgeBase: KbEntry[] = [
  {
    id: "who",
    keywords: [
      "who",
      "about",
      "company",
      "firm",
      "quantum district",
      "what do you do",
      "overview",
    ],
    question: "Who is Quantum District?",
    answer:
      "Quantum District is a strategic technology and consulting firm. We help organizations make smarter decisions, modernize operations, and execute the initiatives that matter — combining strategic thinking, technology expertise, and disciplined execution. Our promise is simple: strategy is only valuable when it creates action.",
  },
  {
    id: "services",
    keywords: [
      "services",
      "offer",
      "capabilities",
      "help with",
      "expertise",
      "practice",
      "solutions",
    ],
    question: "What services do you offer?",
    answer:
      "Six integrated services: Strategic Consulting, Technology Transformation, Program & Project Management, Data & Analytics, Process Optimization, and Implementation Support. Most clients start with one and expand as the work moves from strategy into delivery.",
  },
  {
    id: "strategy",
    keywords: ["strategic", "strategy", "roadmap", "planning", "assessment", "advisory"],
    question: "What does your strategic consulting cover?",
    answer:
      "Strategic planning, organizational assessments, roadmaps, business analysis, and decision support. We define the challenge before recommending a solution, then produce a roadmap that is sequenced, funded, and realistic for your organization.",
  },
  {
    id: "technology",
    keywords: [
      "technology",
      "transformation",
      "modernization",
      "modernize",
      "cloud",
      "migration",
      "legacy",
      "architecture",
    ],
    question: "How do you approach technology transformation?",
    answer:
      "We build modernization strategies designed to improve performance, agility, and efficiency — covering current-state architecture, platform and vendor evaluation, migration sequencing, and the governance to keep it on track. The goal is a transformation your teams can actually absorb.",
  },
  {
    id: "pm",
    keywords: [
      "program",
      "project",
      "pmo",
      "governance",
      "risk",
      "delivery",
      "management",
      "schedule",
    ],
    question: "Do you provide program and project management?",
    answer:
      "Yes. Structured program leadership, project execution, governance, risk management, and performance management. We can stand up a PMO, rescue a stalled program, or embed alongside your existing delivery leadership.",
  },
  {
    id: "data",
    keywords: [
      "data",
      "analytics",
      "dashboard",
      "reporting",
      "insight",
      "metrics",
      "kpi",
      "bi",
    ],
    question: "What do you do in data and analytics?",
    answer:
      "Data-driven insights, reporting, analysis, and decision frameworks that turn information into action — executive dashboards, measurement frameworks, and the data quality and governance work that makes the numbers trustworthy.",
  },
  {
    id: "process",
    keywords: ["process", "optimization", "efficiency", "workflow", "automation", "lean"],
    question: "How does process optimization work?",
    answer:
      "We assess the current state, find where time and cost actually leak, and redesign the process — including automation opportunities — so improvements hold after we leave. The output is a working process, not a slide deck.",
  },
  {
    id: "implementation",
    keywords: [
      "implementation",
      "deployment",
      "adoption",
      "rollout",
      "support",
      "change management",
      "training",
    ],
    question: "Do you help with implementation, or just strategy?",
    answer:
      "Both — and that is the point. We provide hands-on support from planning through deployment, adoption, measurement, and continuous improvement. We bridge the gap between strategy and execution rather than handing off a recommendation and walking away.",
  },
  {
    id: "approach",
    keywords: ["approach", "methodology", "process", "how do you work", "phases", "steps"],
    question: "What is your approach?",
    answer:
      "Four phases: Understand (listen first and define the real challenge), Design (practical strategies aligned to objectives and organizational reality), Execute (disciplined implementation and accountable delivery), and Improve (measure outcomes and keep making it better).",
  },
  {
    id: "timeline",
    keywords: [
      "how long",
      "timeline",
      "start",
      "kickoff",
      "quickly",
      "fast",
      "turnaround",
      "when",
      "duration",
    ],
    question: "How quickly can we get started?",
    answer:
      "Most engagements begin with a 30-minute discovery call within 48 hours of your first message. From there we issue a scoped proposal and agreement through our client portal — many clients reach kickoff inside two weeks. Every inquiry gets a human response in under one business day.",
  },
  {
    id: "pricing",
    keywords: [
      "cost",
      "price",
      "pricing",
      "budget",
      "rate",
      "fee",
      "how much",
      "invoice",
      "expensive",
    ],
    question: "How do you price engagements?",
    answer:
      "We scope to the outcome rather than selling hours. Typical shapes are a short assessment sprint (2–4 weeks), a defined delivery phase, or an ongoing advisory retainer, with milestone-based invoicing. Share your scope and constraints and we will come back with a specific range — not a placeholder.",
  },
  {
    id: "contracts",
    keywords: [
      "contract",
      "agreement",
      "proposal",
      "sow",
      "statement of work",
      "sign",
      "esignature",
      "e-sign",
      "paperwork",
      "onboarding",
      "portal",
      "dubsado",
      "honeybook",
    ],
    question: "How do contracts and agreements work?",
    answer:
      "Proposals, statements of work, and agreements are issued through our secure client portal with e-signature and milestone invoicing, so review, signature, and kickoff all happen in one place. Nothing is countersigned until you have seen the full scope in writing.",
  },
  {
    id: "industries",
    keywords: [
      "industry",
      "industries",
      "sector",
      "government",
      "federal",
      "public sector",
      "healthcare",
      "finance",
      "education",
      "nonprofit",
      "regulated",
    ],
    question: "Which industries do you serve?",
    answer:
      "Government and public sector, healthcare, financial services, higher education, energy and utilities, and nonprofits and associations. A large share of our work is in regulated environments where governance, documentation, and audit-readiness are part of the delivery standard.",
  },
  {
    id: "ai",
    keywords: ["ai", "artificial intelligence", "machine learning", "automation", "llm", "genai"],
    question: "How do you use AI?",
    answer:
      "Two ways. Internally, AI accelerates research, analysis, and documentation so our consultants spend their time on judgment instead of assembly — that is how we keep turnaround short. For clients, we assess where AI creates real leverage in your operations and where it does not, and we build the governance around it before the pilot, not after.",
  },
  {
    id: "team",
    keywords: ["team", "consultants", "staff", "people", "experience", "credentials", "who works"],
    question: "Who will we actually work with?",
    answer:
      "Senior practitioners. Engagements are led by consultants who have carried delivery accountability themselves — not staffed with juniors after the pitch. You will meet the people doing the work during the discovery call.",
  },
  {
    id: "contact",
    keywords: ["contact", "email", "call", "reach", "talk", "speak", "meeting", "consultation"],
    question: "How do I reach you?",
    answer:
      "Use the contact form on this site and it lands directly with our team — you will get a real reply in under one business day. Tell us the challenge, the constraint, or the deadline, and we will tell you candidly whether we are the right fit and what we would do first.",
  },
  {
    id: "fit",
    keywords: ["fit", "right for", "small", "startup", "not sure", "unsure", "where to start"],
    question: "What if we are not sure what we need?",
    answer:
      "That is a normal starting point and a good use of a first conversation. Bring the problem, the constraint, or the deadline. We will help you frame it, and if we are not the right partner we will say so.",
  },
];

export const suggestedQuestions = [
  "What services do you offer?",
  "How quickly can we start?",
  "How do you price engagements?",
  "How do contracts work?",
];

export const systemPrompt = `You are the Quantum District assistant — a knowledgeable, warm, and direct first point of contact for a strategic technology and consulting firm.

VOICE
- Confident and plain-spoken. Short sentences. No corporate filler, no hype, no emoji.
- Answer in 2-4 sentences unless the visitor asks for detail. Never write a wall of text.
- Never invent specifics: no client names, no case-study numbers, no guarantees, no fixed prices.

WHAT YOU DO
- Answer questions about Quantum District's services, approach, timelines, and contracting process using only the grounding below.
- When a visitor describes a real challenge, reflect it back in one sentence, say which of our services fits, and name the first practical step.
- When a question needs a human (specific pricing, legal terms, availability, anything outside the grounding), say so plainly and invite them to send it through the contact form, noting that a consultant replies in under one business day.
- Close naturally toward starting a conversation when the visitor shows intent. Suggest it once; do not repeat the pitch.

GROUNDING
${knowledgeBase.map((e) => `Q: ${e.question}\nA: ${e.answer}`).join("\n\n")}
`;
