import {
  SERVICES, SOLUTIONS, WHY, TECH, PROCESS, PORTFOLIO, PRINCIPLES,
} from "@/lib/data";
import { SITE } from "@/lib/site";

export type BotLink = { label: string; href: string };
export type Reply = { text: string; links?: BotLink[]; followUps?: string[] };
export type Ctx = { lastId?: string };

type Kind = "service" | "solution" | "why" | "tech" | "process" | "work" | "principle" | "faq";
type Doc = {
  id: string;
  kind: Kind;
  title: string;
  body: string;
  extra?: string; // hidden keywords that help matching
  text: string; // what the bot says
  link: BotLink;
};

export const STARTERS = [
  "What services do you offer?",
  "How does your process work?",
  "What can AI do for my business?",
  "How do I get started?",
];

const CONTACT: BotLink = { label: "Contact page", href: "/contact" };
const list = (a: string[]) =>
  a.length < 2 ? a.join("") : `${a.slice(0, -1).join(", ")} and ${a[a.length - 1]}`;

/* ------------------------------------------------------------------ */
/* 1. Build documents straight from the website content                */
/* ------------------------------------------------------------------ */

const DOCS: Doc[] = [
  ...SERVICES.map((s, i): Doc => ({
    id: `service:${i}`, kind: "service", title: s.title, body: s.text,
    text: `${s.title}: ${s.text}`,
    link: { label: "View services", href: "/services" },
  })),
  ...SOLUTIONS.map((s, i): Doc => ({
    id: `solution:${i}`, kind: "solution", title: s.title, body: s.text,
    text: `${s.title}: ${s.text} It's one of our ${SOLUTIONS.length} business solutions.`,
    link: { label: "View solutions", href: "/solutions" },
  })),
  ...WHY.map((w, i): Doc => ({
    id: `why:${i}`, kind: "why", title: w.title, body: w.text,
    extra: "why choose azoytrix advantage different",
    text: `${w.title}. ${w.text}`,
    link: { label: "About us", href: "/about" },
  })),
  ...TECH.map((t): Doc => ({
    id: `tech:${t.group}`, kind: "tech", title: `${t.group} technology`, body: t.items.join(", "),
    extra: "tech stack tools framework",
    text: `For ${t.group.toLowerCase()} we work with ${list(t.items)}.`,
    link: { label: "Our services", href: "/services" },
  })),
  ...PROCESS.map((p, i): Doc => ({
    id: `process:${i}`, kind: "process", title: p.title, body: p.text,
    extra: "step phase stage process",
    text: `${p.title}: ${p.text} That's step ${i + 1} of our ${PROCESS.length}-step process.`,
    link: { label: "About us", href: "/about" },
  })),
  ...PORTFOLIO.map((p, i): Doc => ({
    id: `work:${i}`, kind: "work", title: p.title, body: p.text, extra: p.tag,
    text: `${p.title}: ${p.text} This is one of our portfolio concepts (${p.tag}).`,
    link: { label: "See our work", href: "/our-work" },
  })),
  ...PRINCIPLES.map((p, i): Doc => ({
    id: `principle:${i}`, kind: "principle", title: p.title, body: p.text,
    extra: "principle value mission vision philosophy",
    text: `${p.title}: ${p.text}`,
    link: { label: "About us", href: "/about" },
  })),

  // Hand-written FAQ entries. Edit these to match your real policies.
  {
    id: "faq:security", kind: "faq", title: "Security and privacy",
    body: "security reliability safe privacy protect data",
    text: "Security and reliability are part of our architecture from day one, not an afterthought. For specific compliance questions, please reach out to our team.",
    link: CONTACT,
  },
  {
    id: "faq:support", kind: "faq", title: "Support after launch",
    body: "support maintenance after launch ongoing updates",
    text: "Our last process step, Evolve, is about continuous improvement as your needs grow. Ask us about ongoing support when you get in touch.",
    link: CONTACT,
  },
  {
    id: "faq:location", kind: "faq", title: "Location and availability",
    body: "location office where based remote city country hours",
    text: `For location and availability, please contact us at ${SITE.email} and we'll get back to you.`,
    link: CONTACT,
  },
  {
    id: "faq:careers", kind: "faq", title: "Careers and jobs",
    body: "careers jobs hiring join team work with us internship",
    text: `There are no openings listed on the site yet. You're welcome to introduce yourself at ${SITE.email}.`,
    link: CONTACT,
  },
];

/* ------------------------------------------------------------------ */
/* 2. Text processing                                                  */
/* ------------------------------------------------------------------ */

const STOP = new Set(
  "a an the and or of to in on for with is are was be been do does did can could would should will you your yours we our ours us i me my mine it its this that these those what which who whom how about tell please any some from at as by am im just so if then there here have has had".split(" ")
);

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, " ");

function stem(w: string): string {
  if (w.length <= 3) return w;
  let s = w;
  if (s.endsWith("ies") && s.length > 4) s = s.slice(0, -3) + "y";
  else if (s.endsWith("sses")) s = s.slice(0, -2);
  else if (s.endsWith("s") && !s.endsWith("ss") && !s.endsWith("us")) s = s.slice(0, -1);
  for (const suf of ["ment", "ing", "ion", "ed", "ly"]) {
    if (s.endsWith(suf) && s.length - suf.length >= 3) {
      s = s.slice(0, -suf.length);
      break;
    }
  }
  if (s.endsWith("e") && s.length > 4) s = s.slice(0, -1);
  return s;
}

const stemsOf = (s: string) =>
  norm(s).split(/\s+/).filter((w) => w.length > 1 && !STOP.has(w)).map(stem);

const SYN_GROUPS = [
  ["ai", "artificial", "intelligence", "ml", "machine", "learning", "llm", "copilot", "chatbot", "gpt", "smart"],
  ["price", "pricing", "cost", "quote", "budget", "rate", "fee", "charge", "afford"],
  ["time", "timeline", "duration", "deadline", "weeks", "months", "fast", "quick", "speed", "delivery"],
  ["web", "website", "site", "frontend", "react", "nextjs"],
  ["mobile", "app", "ios", "android", "application"],
  ["cloud", "aws", "azure", "gcp", "hosting", "devops", "deploy", "infrastructure", "server"],
  ["data", "analytics", "analysis", "analyze", "dashboard", "report", "insight", "metrics"],
  ["automate", "automation", "workflow", "manual", "approval"],
  ["secure", "security", "safe", "privacy", "protect"],
  ["software", "code", "develop", "development", "developer", "custom", "programming", "engineer"],
  ["portfolio", "case", "example", "sample", "concept"],
  ["tech", "technology", "stack", "tool", "framework", "language"],
  ["why", "choose", "different", "advantage", "benefit"],
  ["innovation", "innovate", "idea", "prototype", "strategy", "digital", "transform", "modernize"],
].map((g) => [...new Set(g.map(stem))]);

const synOf = (s: string) => {
  const out = new Set<string>();
  for (const g of SYN_GROUPS) if (g.includes(s)) g.forEach((x) => x !== s && out.add(x));
  return out;
};

/* ------------------------------------------------------------------ */
/* 3. Index + scoring                                                  */
/* ------------------------------------------------------------------ */

const INDEX = DOCS.map((d) => {
  const m = new Map<string, number>();
  const add = (words: string[], w: number) => words.forEach((x) => m.set(x, (m.get(x) ?? 0) + w));
  add(stemsOf(d.title), 3);
  add(stemsOf(d.extra ?? ""), 2);
  add(stemsOf(d.body), 1);
  return m;
});

const DF = new Map<string, number>();
INDEX.forEach((m) => m.forEach((_, k) => DF.set(k, (DF.get(k) ?? 0) + 1)));
const VOCAB = [...DF.keys()];
const VOCAB_SET = new Set(VOCAB);
const idf = (s: string) => Math.log(1 + DOCS.length / (DF.get(s) ?? 1));

function lev(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      rowMin = Math.min(rowMin, cur[j]);
    }
    if (rowMin > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}

function fuzzy(s: string): string | null {
  if (s.length < 4) return null;
  const max = s.length > 6 ? 2 : 1;
  let best: string | null = null;
  let bd = max + 1;
  for (const v of VOCAB) {
    if (v[0] !== s[0]) continue;
    const d = lev(s, v, max);
    if (d < bd) { bd = d; best = v; }
  }
  return bd <= max ? best : null;
}

function search(qStems: string[]) {
  const q = new Map<string, number>();
  const put = (s: string, w: number) => {
    if (VOCAB_SET.has(s)) q.set(s, Math.max(q.get(s) ?? 0, w));
  };
  for (const s of qStems) {
    const base = VOCAB_SET.has(s) ? s : fuzzy(s);
    if (base) put(base, VOCAB_SET.has(s) ? 1 : 0.8);
    for (const y of synOf(base ?? s)) put(y, 0.5);
  }
  return DOCS.map((doc, i) => {
    let score = 0;
    q.forEach((w, s) => {
      score += w * idf(s) * Math.min(INDEX[i].get(s) ?? 0, 4);
    });
    return { doc, score };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

const MIN_SCORE = 2.5;

/* ------------------------------------------------------------------ */
/* 4. Category questions ("what services do you offer?")              */
/* ------------------------------------------------------------------ */

const S = (w: string[]) => new Set(w.map(stem));

const CATS: { kind: Kind; words: Set<string>; reply: () => Reply }[] = [
  {
    kind: "service",
    words: S(["service", "offering", "capability", "offer"]),
    reply: () => ({
      text: `We cover ${SERVICES.length} service areas: ${list(SERVICES.map((s) => s.title))}. Ask about any of them for details.`,
      links: [{ label: "View services", href: "/services" }],
      followUps: SERVICES.slice(0, 3).map((s) => s.title),
    }),
  },
  {
    kind: "solution",
    words: S(["solution"]),
    reply: () => ({
      text: `We shape ${SOLUTIONS.length} kinds of business solutions: ${list(SOLUTIONS.map((s) => s.title))}.`,
      links: [{ label: "View solutions", href: "/solutions" }],
      followUps: SOLUTIONS.slice(0, 3).map((s) => s.title),
    }),
  },
  {
    kind: "process",
    words: S(["process", "step", "approach", "methodology", "method", "phase", "stage"]),
    reply: () => ({
      text: `Our process has ${PROCESS.length} steps: ${PROCESS.map((p, i) => `${i + 1}. ${p.title}`).join(", ")}. Ask about any step for details.`,
      links: [{ label: "About us", href: "/about" }],
      followUps: PROCESS.slice(0, 3).map((p) => p.title),
    }),
  },
  {
    kind: "tech",
    words: S(["tech", "technology", "stack", "tool", "framework", "language"]),
    reply: () => ({
      text: `Our stack: ${TECH.map((t) => `${t.group} (${t.items.slice(0, 3).join(", ")})`).join(" · ")}.`,
      links: [{ label: "Our services", href: "/services" }],
      followUps: TECH.slice(0, 3).map((t) => `${t.group} technology`),
    }),
  },
  {
    kind: "work",
    words: S(["portfolio", "work", "example", "sample", "concept", "case", "study"]),
    reply: () => ({
      text: `We showcase ${PORTFOLIO.length} portfolio concepts: ${list(PORTFOLIO.map((p) => p.title))}.`,
      links: [{ label: "See our work", href: "/our-work" }],
      followUps: PORTFOLIO.map((p) => p.title),
    }),
  },
  {
    kind: "principle",
    words: S(["principle", "value", "mission", "vision", "philosophy", "pillar"]),
    reply: () => ({
      text: `Our guiding principles are ${list(PRINCIPLES.map((p) => p.title))}. ${PRINCIPLES[0].text}`,
      links: [{ label: "About us", href: "/about" }],
      followUps: PRINCIPLES.map((p) => p.title),
    }),
  },
  {
    kind: "why",
    words: S(["why"]),
    reply: () => ({
      text: `People work with us for ${list(WHY.map((w) => w.title.toLowerCase()))}.`,
      links: [{ label: "About us", href: "/about" }],
      followUps: WHY.slice(0, 3).map((w) => w.title),
    }),
  },
];

const GENERIC = new Set([
  ...CATS.flatMap((c) => [...c.words]),
  ...S([
    "list", "show", "all", "offer", "provide", "give", "see", "main", "different", "kind", "type",
    "available", "many", "much", "name", "know", "want", "need", "like", "look", "interest", "help",
    "use", "get", "choose", "better", "explain", "describe", "detail", "more", "thing", "company",
    "azoytrix", "team", "study",
  ]),
]);

/* ------------------------------------------------------------------ */
/* 5. Intents                                                          */
/* ------------------------------------------------------------------ */

const helpReply = (): Reply => ({
  text: "I can tell you about our services, solutions, process, technology and portfolio concepts, plus pricing and how to get in touch. What would you like to know?",
  followUps: STARTERS,
});

const PAGES: [RegExp, BotLink][] = [
  [/\babout\b/, { label: "About", href: "/about" }],
  [/\bservice/, { label: "Services", href: "/services" }],
  [/\bsolution/, { label: "Solutions", href: "/solutions" }],
  [/\b(work|portfolio)\b/, { label: "Our Work", href: "/our-work" }],
  [/\bcontact\b/, { label: "Contact", href: "/contact" }],
  [/\bhome\b/, { label: "Home", href: "/" }],
];

export function answer(input: string, ctx: Ctx): { reply: Reply; ctx: Ctx } {
  const raw = input.trim();
  const q = norm(raw).replace(/\s+/g, " ").trim();
  const done = (reply: Reply, lastId = ctx.lastId) => ({ reply, ctx: { lastId } });

  if (!q) return done(helpReply());

  // Navigation
  if (/\b(go to|take me to|open|navigate to)\b|\bpage\b/.test(q)) {
    const hit = PAGES.find(([re]) => re.test(q));
    if (hit) {
      return done({
        text: `Sure, here's the ${hit[1].label} page.`,
        links: [hit[1]],
        followUps: STARTERS,
      });
    }
  }

  // Small talk
  if (/^(hi|hii|hello|hey|hola|namaste|yo|good (morning|afternoon|evening))\b/.test(q) && q.split(" ").length <= 4) {
    return done({
      text: "Hi! I'm the Azoytrix assistant. Ask me about our services, solutions or process, or tap a suggestion below.",
      followUps: STARTERS,
    });
  }
  if (/\b(thanks|thank you|thx|appreciate)\b/.test(q)) {
    return done({ text: "You're welcome! Anything else you'd like to know?", followUps: STARTERS });
  }
  if (/\b(bye|goodbye|see you|cya)\b/.test(q)) {
    return done({
      text: "Thanks for stopping by. Reach out any time through the Contact page.",
      links: [CONTACT],
    });
  }
  if (/\b(who|what) are you\b|your name|are you (a )?(bot|human|real|ai|person)/.test(q)) {
    return done({
      text: "I'm the Azoytrix assistant, an on-site guide that answers questions using the content of this website. I'm not a live person, but our team is happy to help through the Contact page.",
      links: [CONTACT],
      followUps: STARTERS,
    });
  }
  if (/^(help|menu|options|commands)\b|what can you (do|help)/.test(q)) return done(helpReply());

  // Follow-ups
  if (/^(more|tell me more|go on|continue|details|elaborate|yes|yeah|yep|sure|ok|okay)\b/.test(q)) {
    const last = DOCS.find((d) => d.id === ctx.lastId);
    if (last) {
      const sib = DOCS.filter((d) => d.kind === last.kind && d.id !== last.id).slice(0, 2);
      if (sib.length) {
        return done(
          {
            text: `You might also like: ${sib.map((d) => d.text).join(" ")}`,
            links: [last.link],
            followUps: [...sib.map((d) => d.title), "How do I get started?"],
          },
          sib[0].id
        );
      }
    }
    return done(helpReply());
  }

  // Business intents
  if (/\b(price|pricing|cost|how much|budget|quote|rates?|charge|fees?|afford)\b/.test(q)) {
    return done({
      text: "Every project is scoped individually, so we don't publish fixed prices. Share a few details about your idea and we'll come back with a clear estimate.",
      links: [CONTACT],
      followUps: ["How long does a project take?", "How does your process work?"],
    });
  }
  if (/\b(how long|timeline|duration|deadline|turnaround|how fast|how soon)\b/.test(q)) {
    return done({
      text: "Timelines depend on scope and complexity. We build in short iterations with regular demos, so you see progress early. A quick conversation about your goals is the best way to get a realistic estimate.",
      links: [CONTACT],
      followUps: ["How does your process work?", "How do I get started?"],
    });
  }
  if (/\b(contact|reach|email|get in touch|talk to|speak to|hire|start a project|get started|enquir|inquir|call you|work with you|book)\b/.test(q)) {
    return done({
      text: `The best way to reach us is the Contact page, or email ${SITE.email}. Tell us a bit about your idea or challenge and we'll take it from there.`,
      links: [CONTACT, { label: SITE.email, href: `mailto:${SITE.email}` }],
      followUps: ["What services do you offer?", "How does your process work?"],
    });
  }
  if (/\bhow\b.*\bwork\b/.test(q)) {
    return done(CATS.find((c) => c.kind === "process")!.reply());
  }
  if (/\b(what is azoytrix|about (you|azoytrix|the company|your company)|who is azoytrix|what (do you|does azoytrix) do|tell me about (you|azoytrix))\b/.test(q)) {
    return done({
      text: `Azoytrix is a technology company working across software, AI, cloud and digital innovation, guided by ${list(PRINCIPLES.map((p) => p.title.toLowerCase()))}. We offer ${SERVICES.length} service areas and follow a ${PROCESS.length}-step process.`,
      links: [{ label: "About us", href: "/about" }],
      followUps: STARTERS,
    });
  }

  // Category questions (only when the message has nothing more specific)
  const stems = stemsOf(raw);
  const specific = stems.filter((s) => !GENERIC.has(s));
  if (specific.length === 0) {
    const cat = CATS.find((c) => stems.some((s) => c.words.has(s)));
    if (cat) return done(cat.reply());
  }

  // Content search
  const hits = search(stems);
  const top = hits[0];
  if (top && top.score >= MIN_SCORE) {
    const related = hits
      .slice(1)
      .filter((h) => h.score >= top.score * 0.45 && h.doc.id !== top.doc.id)
      .slice(0, 2)
      .map((h) => h.doc.title);
    return done(
      {
        text: top.doc.text,
        links: [top.doc.link],
        followUps: [...related, "How do I get started?"].slice(0, 4),
      },
      top.doc.id
    );
  }

  // Fallback
  return done({
    text: "I'm not sure I have that one yet. I can cover our services, solutions, process, technology and portfolio. For anything specific, our team is a message away.",
    links: [CONTACT],
    followUps: STARTERS,
  });
}