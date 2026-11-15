import {
  Brain, Cloud, Code, Database, Lightbulb, Smartphone,
  Workflow, LineChart, Layers, Rocket,
  Search, PenTool, Hammer, RefreshCw,
  Zap, ShieldCheck, Users, Target,
} from "lucide-react";

export const SERVICES = [
  { icon: Code, title: "Software Development", text: "Custom web and enterprise software, engineered for performance and long-term maintainability." },
  { icon: Brain, title: "AI & Machine Learning", text: "Practical AI: copilots, automation and predictive models that fit real business workflows." },
  { icon: Cloud, title: "Cloud & DevOps", text: "Scalable cloud architecture, CI/CD pipelines and reliable infrastructure from day one." },
  { icon: Smartphone, title: "Web & Mobile Apps", text: "Fast, accessible products for every screen, from first prototype to production release." },
  { icon: Database, title: "Data & Analytics", text: "Pipelines, dashboards and insight layers that turn raw data into confident decisions." },
  { icon: Lightbulb, title: "Digital Innovation", text: "Strategy and rapid prototyping to validate ideas and modernise how your business operates." },
];

export const SOLUTIONS = [
  { icon: Workflow, title: "Business Process Automation", text: "Replace manual, repetitive work with reliable automated workflows." },
  { icon: LineChart, title: "Intelligent Analytics", text: "Real-time reporting and AI-driven forecasting for faster, better decisions." },
  { icon: Cloud, title: "Cloud Modernization", text: "Move legacy systems to secure, cost-efficient and scalable cloud platforms." },
  { icon: Layers, title: "Digital Product Platforms", text: "End-to-end platforms that launch new products and revenue streams." },
];

export const WHY = [
  { icon: Zap, title: "Built for speed", text: "Lean teams and modern tooling mean shorter cycles from idea to launch." },
  { icon: ShieldCheck, title: "Secure by design", text: "Security and reliability are part of the architecture, not an afterthought." },
  { icon: Users, title: "True partnership", text: "Clear communication and shared ownership of outcomes at every stage." },
  { icon: Target, title: "Outcome driven", text: "Every decision is tied to a measurable business result." },
];

export const TECH = [
  { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Three.js"] },
  { group: "Backend", items: ["Node.js", "REST APIs", "PostgreSQL", "Prisma", "Authentication"] },
  { group: "AI & Data", items: ["LLM Integration", "Python", "Vector Search", "Data Pipelines", "Analytics"] },
  { group: "Cloud", items: ["Vercel", "Render", "Neon", "Cloudinary", "CI/CD"] },
];

export const PROCESS = [
  { icon: Search, title: "Discover", text: "We learn your goals, users and constraints." },
  { icon: PenTool, title: "Design", text: "Architecture, UX and a clear delivery plan." },
  { icon: Hammer, title: "Build", text: "Iterative development with regular demos." },
  { icon: Rocket, title: "Launch", text: "Tested, monitored and deployed with confidence." },
  { icon: RefreshCw, title: "Evolve", text: "Continuous improvement as your needs grow." },
];

export const PORTFOLIO = [
  { tag: "AI · Concept", title: "Intelligent Support Copilot", text: "An AI assistant that triages enquiries and drafts accurate responses for support teams.", from: "from-brand", to: "to-cyan" },
  { tag: "Cloud · Concept", title: "Unified Operations Dashboard", text: "A real-time control centre bringing infrastructure, sales and delivery metrics into one view.", from: "from-navy", to: "to-brand" },
  { tag: "Software · Concept", title: "Smart Workflow Platform", text: "A configurable platform that automates approvals, documents and cross-team handoffs.", from: "from-cyan", to: "to-navy" },
];

// Replace with real figures as the company grows
export const STATS = [
  { value: 6, suffix: "", label: "Service categories" },
  { value: 3, suffix: "", label: "Core pillars" },
  { value: 5, suffix: "", label: "Step delivery process" },
  { value: 100, suffix: "%", label: "Commitment to quality" },
];

export const PRINCIPLES = [
  { title: "Innovation", text: "We explore what's next and turn emerging technology into practical advantage." },
  { title: "Intelligence", text: "We build systems that learn, adapt and help people make smarter decisions." },
  { title: "Engineering", text: "We hold ourselves to rigorous standards: clean, tested, scalable and secure." },
];