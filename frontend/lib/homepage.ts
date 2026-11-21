/**
 * Homepage content shape consumed by the sections in components/home.
 *
 * Source is the Strapi single type "homepage" (GET /api/homepage). Any missing
 * or empty field falls back to FALLBACK_HOMEPAGE, which mirrors the original
 * hardcoded site, so the page never breaks when Strapi is unreachable.
 *
 * Rule for editors: an EMPTY text field in Strapi means "use the default text".
 */

export interface IconCard { icon: string; title: string; text: string }
export interface TextCard { title: string; text: string }
export interface TechGroup { group: string; items: string[] }
export interface PortfolioProject { tag: string; title: string; text: string; gradient: string }
export interface StatItem { value: number; suffix: string; label: string }

interface HeadingContent {
  eyebrow: string;
  title: string;
  /** Optional gradient-highlighted text appended to the title. */
  titleHighlight: string;
  description: string;
}

export interface HeroContent {
  badge: string;
  headingLine1: string;
  headingLine2: string;
  headingHighlight: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  pillars: string;
}

export interface BrandStatementContent {
  eyebrow: string;
  headingStart: string;
  headingHighlight: string;
  descriptionStart: string;
  descriptionHighlight: string;
  descriptionEnd: string;
  capabilities: string[];
}

export interface ServicesContent extends HeadingContent {
  items: IconCard[];
  cardFooterLabel: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface SolutionsContent extends HeadingContent {
  buttonLabel: string;
  buttonHref: string;
  noteTitle: string;
  noteText: string;
  items: IconCard[];
}

export interface WhyContent extends HeadingContent {
  items: IconCard[];
  closingEyebrow: string;
  closingTitle: string;
}

export interface TechContent extends HeadingContent {
  groups: TechGroup[];
  domainLabel: string;
  ecosystemLabel: string;
  closingEyebrow: string;
  closingTitle: string;
}

export interface ProcessContent extends HeadingContent {
  steps: IconCard[];
  phaseLabel: string;
  closingEyebrow: string;
  closingTitle: string;
}

export interface PortfolioContent extends HeadingContent {
  projects: PortfolioProject[];
  badgeLabel: string;
  footerLabel: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface StatsContent extends HeadingContent {
  items: StatItem[];
  footerLabel: string;
  footerCode: string;
}

export interface PrinciplesContent extends HeadingContent {
  items: TextCard[];
  philosophyLabel: string;
  philosophyLine1: string;
  philosophyLine2: string;
  mindsetLabel: string;
}

export interface CtaContent {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  emailLabel: string;
  email: string;
  modelCaption: string;
  signatureLeft: string;
  signatureRight: string;
}

export interface HomepageConfig {
  source: "cms" | "fallback";
  hero: HeroContent;
  brandStatement: BrandStatementContent;
  services: ServicesContent;
  solutions: SolutionsContent;
  why: WhyContent;
  tech: TechContent;
  process: ProcessContent;
  portfolio: PortfolioContent;
  stats: StatsContent;
  principles: PrinciplesContent;
  cta: CtaContent;
}

/**
 * Tailwind needs full class names in source, so portfolio gradients are a fixed
 * list. The keys must match the `gradient` enumeration in
 * backend/src/components/home/portfolio-card.json.
 */
export const PORTFOLIO_GRADIENTS: Record<string, string> = {
  brand_cyan: "from-brand to-cyan",
  navy_brand: "from-navy to-brand",
  cyan_navy: "from-cyan to-navy",
  brand_navy: "from-brand to-navy",
  navy_cyan: "from-navy to-cyan",
  cyan_brand: "from-cyan to-brand",
};

/* ------------------------------------------------------------------ */
/* Fallback: mirrors the original hardcoded homepage.                  */
/* ------------------------------------------------------------------ */

export const FALLBACK_HOMEPAGE: HomepageConfig = {
  "source": "fallback",
  "hero": {
    "badge": "SOFTWARE · AI · CLOUD",
    "headingLine1": "Engineering",
    "headingLine2": "the",
    "headingHighlight": "Next Era.",
    "description": "We design and build intelligent software, scalable cloud platforms and digital products that move businesses forward.",
    "primaryCtaLabel": "Start a project",
    "primaryCtaHref": "/contact",
    "secondaryCtaLabel": "See our work",
    "secondaryCtaHref": "/our-work",
    "pillars": "INNOVATION · INTELLIGENCE · ENGINEERING"
  },
  "brandStatement": {
    "eyebrow": "Who we are",
    "headingStart": "We turn ambitious ideas into",
    "headingHighlight": "intelligent digital experiences.",
    "descriptionStart": "Azoytrix is a technology company bringing together",
    "descriptionHighlight": "software engineering, artificial intelligence and cloud",
    "descriptionEnd": "to help organisations innovate, evolve and build what comes next.",
    "capabilities": [
      "Intelligent software",
      "AI-driven innovation",
      "Cloud-native solutions"
    ]
  },
  "services": {
    "eyebrow": "What we do",
    "title": "Engineering the next generation of digital experiences.",
    "titleHighlight": "",
    "description": "Six specialized capabilities. One technology partner. From ambitious first ideas to intelligent, scalable platforms, we engineer solutions built for what comes next.",
    "items": [
      {
        "icon": "Code",
        "title": "Software Development",
        "text": "Custom web and enterprise software, engineered for performance and long-term maintainability."
      },
      {
        "icon": "Brain",
        "title": "AI & Machine Learning",
        "text": "Practical AI: copilots, automation and predictive models that fit real business workflows."
      },
      {
        "icon": "Cloud",
        "title": "Cloud & DevOps",
        "text": "Scalable cloud architecture, CI/CD pipelines and reliable infrastructure from day one."
      },
      {
        "icon": "Smartphone",
        "title": "Web & Mobile Apps",
        "text": "Fast, accessible products for every screen, from first prototype to production release."
      },
      {
        "icon": "Database",
        "title": "Data & Analytics",
        "text": "Pipelines, dashboards and insight layers that turn raw data into confident decisions."
      },
      {
        "icon": "Lightbulb",
        "title": "Digital Innovation",
        "text": "Strategy and rapid prototyping to validate ideas and modernise how your business operates."
      }
    ],
    "cardFooterLabel": "Our expertise",
    "ctaEyebrow": "Have something in mind?",
    "ctaTitle": "Let's engineer your next big idea.",
    "ctaDescription": "Explore our capabilities and discover what's possible.",
    "ctaLabel": "Explore all services",
    "ctaHref": "/services"
  },
  "solutions": {
    "eyebrow": "Solutions",
    "title": "Technology that moves your",
    "titleHighlight": "business forward.",
    "description": "We combine business insight with technical depth to solve real operational challenges, simplify complexity and create opportunities for sustainable growth.",
    "buttonLabel": "Discover our solutions",
    "buttonHref": "/solutions",
    "noteTitle": "Built around your business.",
    "noteText": "Purposeful technology, practical thinking and solutions designed to scale with you.",
    "items": [
      {
        "icon": "Workflow",
        "title": "Business Process Automation",
        "text": "Replace manual, repetitive work with reliable automated workflows."
      },
      {
        "icon": "LineChart",
        "title": "Intelligent Analytics",
        "text": "Real-time reporting and AI-driven forecasting for faster, better decisions."
      },
      {
        "icon": "Cloud",
        "title": "Cloud Modernization",
        "text": "Move legacy systems to secure, cost-efficient and scalable cloud platforms."
      },
      {
        "icon": "Layers",
        "title": "Digital Product Platforms",
        "text": "End-to-end platforms that launch new products and revenue streams."
      }
    ]
  },
  "why": {
    "eyebrow": "Why Azoytrix",
    "title": "A technology partner built for the long run.",
    "titleHighlight": "",
    "description": "Great technology is more than code. It's about building meaningful partnerships, delivering lasting value and creating solutions that grow with your ambitions.",
    "items": [
      {
        "icon": "Zap",
        "title": "Built for speed",
        "text": "Lean teams and modern tooling mean shorter cycles from idea to launch."
      },
      {
        "icon": "ShieldCheck",
        "title": "Secure by design",
        "text": "Security and reliability are part of the architecture, not an afterthought."
      },
      {
        "icon": "Users",
        "title": "True partnership",
        "text": "Clear communication and shared ownership of outcomes at every stage."
      },
      {
        "icon": "Target",
        "title": "Outcome driven",
        "text": "Every decision is tied to a measurable business result."
      }
    ],
    "closingEyebrow": "The Azoytrix approach",
    "closingTitle": "Think beyond technology. Build for impact."
  },
  "tech": {
    "eyebrow": "Our Technology",
    "title": "The technology behind",
    "titleHighlight": "what's next.",
    "description": "We bring together modern frameworks, reliable infrastructure and intelligent tools to engineer digital products built for performance, flexibility and scale.",
    "groups": [
      {
        "group": "Frontend",
        "items": [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "Three.js"
        ]
      },
      {
        "group": "Backend",
        "items": [
          "Node.js",
          "REST APIs",
          "PostgreSQL",
          "Prisma",
          "Authentication"
        ]
      },
      {
        "group": "AI & Data",
        "items": [
          "LLM Integration",
          "Python",
          "Vector Search",
          "Data Pipelines",
          "Analytics"
        ]
      },
      {
        "group": "Cloud",
        "items": [
          "Vercel",
          "Render",
          "Neon",
          "Cloudinary",
          "CI/CD"
        ]
      }
    ],
    "domainLabel": "Technology domain",
    "ecosystemLabel": "Azoytrix technology ecosystem",
    "closingEyebrow": "Technology with purpose",
    "closingTitle": "The right tools. The right architecture. Real-world impact."
  },
  "process": {
    "eyebrow": "How we work",
    "title": "A clear path from",
    "titleHighlight": "idea to impact.",
    "description": "A thoughtful, collaborative process that transforms complex challenges into meaningful digital solutions.",
    "steps": [
      {
        "icon": "Search",
        "title": "Discover",
        "text": "We learn your goals, users and constraints."
      },
      {
        "icon": "PenTool",
        "title": "Design",
        "text": "Architecture, UX and a clear delivery plan."
      },
      {
        "icon": "Hammer",
        "title": "Build",
        "text": "Iterative development with regular demos."
      },
      {
        "icon": "Rocket",
        "title": "Launch",
        "text": "Tested, monitored and deployed with confidence."
      },
      {
        "icon": "RefreshCw",
        "title": "Evolve",
        "text": "Continuous improvement as your needs grow."
      }
    ],
    "phaseLabel": "Phase",
    "closingEyebrow": "From vision to reality",
    "closingTitle": "Every great product starts with a clear process."
  },
  "portfolio": {
    "eyebrow": "Selected work",
    "title": "Ideas transformed into",
    "titleHighlight": "digital experiences.",
    "description": "Explore the kinds of intelligent products, platforms and digital experiences we're building for what's next.",
    "projects": [
      {
        "tag": "AI · Concept",
        "title": "Intelligent Support Copilot",
        "text": "An AI assistant that triages enquiries and drafts accurate responses for support teams.",
        "gradient": "brand_cyan"
      },
      {
        "tag": "Cloud · Concept",
        "title": "Unified Operations Dashboard",
        "text": "A real-time control centre bringing infrastructure, sales and delivery metrics into one view.",
        "gradient": "navy_brand"
      },
      {
        "tag": "Software · Concept",
        "title": "Smart Workflow Platform",
        "text": "A configurable platform that automates approvals, documents and cross-team handoffs.",
        "gradient": "cyan_navy"
      }
    ],
    "badgeLabel": "Featured project",
    "footerLabel": "Azoytrix / Portfolio",
    "ctaEyebrow": "More about what we build",
    "ctaTitle": "Your next big idea could be our next project.",
    "ctaLabel": "Explore our work",
    "ctaHref": "/our-work"
  },
  "stats": {
    "eyebrow": "The Azoytrix footprint",
    "title": "Numbers tell a story.",
    "titleHighlight": "We build what comes next.",
    "description": "A snapshot of the ambition, engineering and impact behind every digital experience we create.",
    "items": [
      {
        "value": 6,
        "suffix": "",
        "label": "Service categories"
      },
      {
        "value": 3,
        "suffix": "",
        "label": "Core pillars"
      },
      {
        "value": 5,
        "suffix": "",
        "label": "Step delivery process"
      },
      {
        "value": 100,
        "suffix": "%",
        "label": "Commitment to quality"
      }
    ],
    "footerLabel": "Engineering with purpose",
    "footerCode": "AZOYTRIX / BUILDING THE FUTURE"
  },
  "principles": {
    "eyebrow": "What drives us",
    "title": "The principles behind",
    "titleHighlight": "every possibility.",
    "description": "Technology is only as meaningful as the thinking behind it. These principles shape how we approach challenges, engineer solutions and build lasting partnerships.",
    "items": [
      {
        "title": "Innovation",
        "text": "We explore what's next and turn emerging technology into practical advantage."
      },
      {
        "title": "Intelligence",
        "text": "We build systems that learn, adapt and help people make smarter decisions."
      },
      {
        "title": "Engineering",
        "text": "We hold ourselves to rigorous standards: clean, tested, scalable and secure."
      }
    ],
    "philosophyLabel": "Our philosophy",
    "philosophyLine1": "We don't just follow the future.",
    "philosophyLine2": "We engineer what's possible.",
    "mindsetLabel": "The Azoytrix mindset"
  },
  "cta": {
    "badge": "The next chapter starts here",
    "title": "Have an idea?",
    "titleHighlight": "Let's make it extraordinary.",
    "description": "From ambitious ideas to intelligent digital products, let's create technology that moves your business forward.",
    "primaryLabel": "Start a conversation",
    "primaryHref": "/contact",
    "emailLabel": "Email our team",
    "email": "azoytrix@gmail.com",
    "modelCaption": "Architectural intelligence",
    "signatureLeft": "AZOYTRIX / IDEAS INTO IMPACT",
    "signatureRight": "Built for what's next"
  }
};

/* ------------------------------------------------------------------ */
/* Strapi -> HomepageConfig                                            */
/* ------------------------------------------------------------------ */

/** Non-empty string or fallback. */
function str(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

/** Copy every string field from the CMS section, using the fallback where empty. */
function mergeStrings<T extends object>(fallback: T, raw: unknown): T {
  const src = (raw ?? {}) as Record<string, unknown>;
  const out: Record<string, unknown> = { ...(fallback as Record<string, unknown>) };
  for (const [key, value] of Object.entries(fallback as Record<string, unknown>)) {
    if (typeof value === "string") out[key] = str(src[key], value);
  }
  return out as T;
}

/** "one per line" text (commas also work) -> trimmed non-empty strings. */
function splitList(value: unknown): string[] {
  return typeof value === "string"
    ? value.split(/[\n,]/).map((s) => s.trim()).filter(Boolean)
    : [];
}

type Rec = Record<string, unknown>;

const rec = (v: unknown): Rec => (v && typeof v === "object" ? (v as Rec) : {});
const txt = (v: unknown): string => (typeof v === "string" ? v : "");
const asArray = (v: unknown): Rec[] => (Array.isArray(v) ? v.map(rec) : []);

function mapIconCards(raw: unknown, fallback: IconCard[]): IconCard[] {
  const mapped = asArray(raw)
    .filter((c) => txt(c.title).trim())
    .map((c) => ({
      icon: txt(c.icon) || "Code",
      title: txt(c.title),
      text: txt(c.text),
    }));
  return mapped.length > 0 ? mapped : fallback;
}

function mapTextCards(raw: unknown, fallback: TextCard[]): TextCard[] {
  const mapped = asArray(raw)
    .filter((c) => txt(c.title).trim())
    .map((c) => ({ title: txt(c.title), text: txt(c.text) }));
  return mapped.length > 0 ? mapped : fallback;
}

/**
 * Transform a Strapi homepage response into HomepageConfig.
 * Missing sections, empty text and empty lists fall back to the defaults.
 */
export function mapStrapiHomepage(raw: unknown): HomepageConfig {
  const payload = rec(raw).data;
  const entry = rec(Array.isArray(payload) ? payload[0] : payload);
  const a = rec(entry.attributes ?? entry);
  const section = (key: string): Rec => rec(a[key]);
  const F = FALLBACK_HOMEPAGE;

  const capabilities = splitList(section("brandStatement").capabilities);

  const groups: TechGroup[] = asArray(section("tech").groups)
    .map((g) => ({ group: txt(g.name).trim(), items: splitList(g.items) }))
    .filter((g) => g.group && g.items.length > 0);

  const projects: PortfolioProject[] = asArray(section("portfolio").projects)
    .filter((p) => txt(p.title).trim())
    .map((p) => ({
      tag: txt(p.tag),
      title: txt(p.title),
      text: txt(p.text),
      gradient: txt(p.gradient) || "brand_cyan",
    }));

  const stats: StatItem[] = asArray(section("stats").items)
    .filter((s) => txt(s.label).trim())
    .map((s) => {
      const n = Number(s.value);
      return {
        value: Number.isFinite(n) ? n : 0,
        suffix: txt(s.suffix),
        label: txt(s.label),
      };
    });

  return {
    source: "cms",
    hero: mergeStrings(F.hero, a.hero),
    brandStatement: {
      ...mergeStrings(F.brandStatement, a.brandStatement),
      capabilities: capabilities.length > 0 ? capabilities : F.brandStatement.capabilities,
    },
    services: {
      ...mergeStrings(F.services, a.services),
      items: mapIconCards(section("services").items, F.services.items),
    },
    solutions: {
      ...mergeStrings(F.solutions, a.solutions),
      items: mapIconCards(section("solutions").items, F.solutions.items),
    },
    why: {
      ...mergeStrings(F.why, a.why),
      items: mapIconCards(section("why").items, F.why.items),
    },
    tech: {
      ...mergeStrings(F.tech, a.tech),
      groups: groups.length > 0 ? groups : F.tech.groups,
    },
    process: {
      ...mergeStrings(F.process, a.process),
      steps: mapIconCards(section("process").steps, F.process.steps),
    },
    portfolio: {
      ...mergeStrings(F.portfolio, a.portfolio),
      projects: projects.length > 0 ? projects : F.portfolio.projects,
    },
    stats: {
      ...mergeStrings(F.stats, a.stats),
      items: stats.length > 0 ? stats : F.stats.items,
    },
    principles: {
      ...mergeStrings(F.principles, a.principles),
      items: mapTextCards(section("principles").items, F.principles.items),
    },
    cta: mergeStrings(F.cta, a.cta),
  };
}
