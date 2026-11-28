
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Globe,
  Mail,
  Menu,
  MoveUpRight,
  Send,
  Sparkles,
  X,
  Code2,
  Layers3,
  Palette,
  Terminal,
  Code,
  BriefcaseBusiness,
} from "lucide-react";

const projects = [
  {
    number: "01",
    name: "Nexus Analytics",
    type: "SaaS Dashboard · 2026",
    description:
      "A powerful analytics platform that transforms complex business data into actionable insights.",
    tags: ["Next.js", "TypeScript", "Data Viz"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85",
    color: "from-violet-500/30 to-indigo-950",
  },
  {
    number: "02",
    name: "Forma Commerce",
    type: "E-commerce · 2025",
    description:
      "A refined shopping experience focused on product discovery, simplicity and conversion.",
    tags: ["React", "Tailwind", "UX Design"],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=85",
    color: "from-orange-500/20 to-amber-950",
  },
  {
    number: "03",
    name: "Vertex Spaces",
    type: "Real Estate · 2025",
    description:
      "A digital property platform bringing immersive discovery and intelligent search together.",
    tags: ["Next.js", "Three.js", "API"],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
    color: "from-emerald-500/20 to-teal-950",
  },
];

const skills = [
  { name: "Frontend Engineering", value: 95 },
  { name: "React & Next.js", value: 92 },
  { name: "Backend Development", value: 84 },
  { name: "UI / UX Design", value: 88 },
  { name: "Creative Development", value: 78 },
];

const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "JavaScript",
  "Tailwind CSS",
  "Framer Motion",
  "Three.js",
  "PostgreSQL",
  "MongoDB",
  "Git",
  "Figma",
];

const experience = [
  {
    period: "2024 — Present",
    role: "Senior Software Engineer",
    company: "Digital Product Studio",
    description:
      "Building scalable web platforms, reusable systems and high-quality digital experiences.",
  },
  {
    period: "2022 — 2024",
    role: "Full Stack Developer",
    company: "Technology Company",
    description:
      "Developed frontend applications, backend services and API-driven products.",
  },
  {
    period: "2021 — 2022",
    role: "Frontend Developer",
    company: "Creative Studio",
    description:
      "Created responsive interfaces and interactive web experiences for clients.",
  },
];

export default function PortfolioDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const navigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
    setMenuOpen(false);
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#0b0d10] font-sans text-white selection:bg-violet-400 selection:text-black">
      {/* Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#0b0d10]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-10 lg:px-16">
          <button
            onClick={() => navigate("portfolio-home")}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500 text-white">
              <Code2 size={19} />
            </div>
            <span className="text-sm font-bold tracking-[0.16em]">
              ALEX<span className="text-violet-400">.</span>DEV
            </span>
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            {[
              ["About", "portfolio-about"],
              ["Work", "portfolio-work"],
              ["Skills", "portfolio-skills"],
              ["Experience", "portfolio-experience"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => navigate(id)}
                className="text-xs text-white/55 transition hover:text-white"
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => navigate("portfolio-contact")}
            className="hidden items-center gap-2 rounded-full border border-violet-400/40 px-5 py-2.5 text-xs font-semibold text-violet-300 transition hover:bg-violet-500 hover:text-white md:flex"
          >
            Let's Connect <ArrowUpRight size={14} />
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-white/10 p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#111419] px-6 py-4 md:hidden">
            {[
              ["About", "portfolio-about"],
              ["Work", "portfolio-work"],
              ["Skills", "portfolio-skills"],
              ["Experience", "portfolio-experience"],
              ["Contact", "portfolio-contact"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => navigate(id)}
                className="block w-full border-b border-white/[0.07] py-4 text-left text-sm text-white/75"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="portfolio-home"
        className="relative flex min-h-[760px] items-center overflow-hidden px-5 pb-24 pt-36 sm:px-10 lg:min-h-[850px] lg:px-16"
      >
        <div className="absolute inset-0">
          <div className="absolute -right-20 top-24 h-[550px] w-[550px] rounded-full bg-violet-600/[0.12] blur-[120px]" />
          <div className="absolute -left-32 bottom-0 h-[350px] w-[350px] rounded-full bg-indigo-600/[0.09] blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
              maskImage:
                "linear-gradient(to bottom, black, transparent 90%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-center gap-16 lg:grid-cols-[1.3fr_.7fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="mb-9 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                Available for select projects
              </span>
            </div>

            <p className="mb-5 text-sm font-medium text-white/50">
              Hello, I'm Alex Morgan
            </p>

            <h1 className="max-w-[850px] text-5xl font-bold leading-[1.05] tracking-[-0.065em] sm:text-7xl lg:text-[88px]">
              I build digital
              <br />
              <span className="bg-gradient-to-r from-violet-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                experiences.
              </span>
            </h1>

            <p className="mt-8 max-w-[520px] text-sm leading-8 text-white/50 sm:text-base">
              Full-stack developer and creative technologist crafting
              high-performance web applications, thoughtful interfaces and
              interactive experiences.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <button
                onClick={() => navigate("portfolio-work")}
                className="flex items-center gap-3 rounded-xl bg-violet-500 px-6 py-4 text-xs font-bold text-white transition hover:bg-violet-400"
              >
                Explore my work <ArrowUpRight size={16} />
              </button>

              <button
                onClick={() => navigate("portfolio-contact")}
                className="flex items-center gap-3 rounded-xl border border-white/15 px-6 py-4 text-xs font-semibold text-white/80 transition hover:border-white/40 hover:bg-white/5"
              >
                Get in touch <Mail size={15} />
              </button>
            </div>

            <div className="mt-16 flex flex-wrap gap-9 border-t border-white/10 pt-8">
              {[
                ["05+", "Years building"],
                ["40+", "Projects delivered"],
                ["15+", "Happy clients"],
              ].map(([number, label]) => (
                <div key={label}>
                  <p className="text-2xl font-bold tracking-tight">{number}</p>
                  <p className="mt-1 text-[10px] text-white/40">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Decorative profile card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto w-full max-w-[370px]"
          >
            <div className="absolute -inset-5 rounded-[35px] bg-gradient-to-br from-violet-500/20 to-cyan-500/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#15191f] p-3 shadow-2xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-gradient-to-br from-[#37305b] via-[#202338] to-[#10151b]">
                <div className="absolute -right-10 top-10 h-52 w-52 rounded-full bg-violet-500/30 blur-3xl" />
                <div className="absolute -left-10 bottom-0 h-52 w-52 rounded-full bg-cyan-500/20 blur-3xl" />

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="flex h-40 w-40 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] shadow-[0_0_80px_rgba(139,92,246,0.18)] backdrop-blur-xl">
                    <Terminal size={70} className="text-violet-200" strokeWidth={1.2} />
                  </div>
                  <p className="mt-8 text-xl font-bold tracking-tight">
                    ALEX MORGAN
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-white/45">
                    Developer · Creator
                  </p>
                </div>

                <div className="absolute left-5 top-5 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-[9px] font-semibold text-violet-200 backdrop-blur-md">
                  {"<"} CODE & CREATE {"/>"}
                </div>

                <div className="absolute bottom-5 right-5 rounded-xl border border-white/10 bg-black/25 p-3 backdrop-blur-md">
                  <Sparkles size={19} className="text-cyan-300" />
                </div>
              </div>

              <div className="flex items-center justify-between px-3 py-4">
                <div>
                  <p className="text-xs font-bold">Creative Developer</p>
                  <p className="mt-1 text-[10px] text-white/40">
                    Building the web, differently.
                  </p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500/15 text-violet-300">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>

            <div className="absolute -right-5 top-24 hidden rounded-xl border border-white/10 bg-[#1b2028] px-4 py-3 shadow-xl sm:block">
              <p className="text-[9px] text-white/40">CURRENT FOCUS</p>
              <p className="mt-1 text-xs font-semibold text-cyan-300">
                Next.js + AI
              </p>
            </div>

            <div className="absolute -left-8 bottom-24 hidden rounded-xl border border-white/10 bg-[#1b2028] px-4 py-3 shadow-xl sm:block">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-semibold">Open to work</span>
              </div>
            </div>
          </motion.div>
        </div>

        <button
          onClick={() => navigate("portfolio-about")}
          className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/35 transition hover:text-white"
        >
          Scroll to explore
          <ArrowDown size={15} className="animate-bounce" />
        </button>
      </section>

      {/* About */}
      <section
        id="portfolio-about"
        className="border-y border-white/[0.07] bg-[#101318] px-5 py-24 sm:px-10 lg:px-16 lg:py-32"
      >
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-28">
          <div>
            <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.23em] text-violet-300">
              <span className="h-px w-8 bg-violet-400" />
              01 / About me
            </p>

            <h2 className="text-4xl font-bold leading-tight tracking-[-0.05em] sm:text-5xl">
              Engineering
              <br />
              with a creative
              <br />
              <span className="font-light text-violet-300">mindset.</span>
            </h2>
          </div>

          <div className="flex flex-col justify-end">
            <p className="text-lg leading-9 text-white/75">
              I enjoy turning ambitious ideas into useful, beautifully
              engineered digital products. My work combines engineering
              discipline with curiosity for design, interaction and emerging
              technology.
            </p>

            <p className="mt-6 text-sm leading-8 text-white/45">
              I work across the entire development process — from architecture
              and interface design to APIs, deployment and performance
              optimization. I believe the best products are not just
              functional; they make complex things feel simple.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#portfolio-contact"
                className="flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-xs font-semibold text-white transition hover:border-violet-400 hover:text-violet-300"
              >
                Let's collaborate <ArrowUpRight size={14} />
              </a>
              <span className="flex items-center gap-2 px-3 text-[10px] text-white/40">
                <Globe size={14} /> Working worldwide
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="portfolio-work"
        className="mx-auto max-w-[1440px] px-5 py-24 sm:px-10 lg:px-16 lg:py-32"
      >
        <div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.23em] text-violet-300">
              <span className="h-px w-8 bg-violet-400" />
              02 / Selected work
            </p>
            <h2 className="text-4xl font-bold tracking-[-0.05em] sm:text-6xl">
              Things I've
              <span className="font-light text-violet-300"> created.</span>
            </h2>
          </div>
          <p className="max-w-[300px] text-sm leading-7 text-white/40">
            A selection of projects that reflect my approach to design,
            engineering and problem solving.
          </p>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5 }}
              className="group grid overflow-hidden rounded-2xl border border-white/[0.08] bg-[#12161c] md:grid-cols-[1.1fr_.9fr]"
            >
              <div
                className={`relative min-h-[260px] overflow-hidden bg-gradient-to-br ${project.color}`}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                <span className="absolute left-6 top-6 rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-[10px] font-semibold text-white backdrop-blur-md">
                  PROJECT / {project.number}
                </span>
                <div className="absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition group-hover:bg-violet-400">
                  <MoveUpRight size={20} />
                </div>
              </div>

              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-violet-300">
                  {project.type}
                </p>
                <h3 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                  {project.name}
                </h3>
                <p className="mt-5 max-w-[420px] text-sm leading-7 text-white/45">
                  {project.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] text-white/65"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section
        id="portfolio-skills"
        className="border-y border-white/[0.07] bg-[#101318] px-5 py-24 sm:px-10 lg:px-16 lg:py-32"
      >
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.23em] text-violet-300">
            <span className="h-px w-8 bg-violet-400" />
            03 / Expertise
          </p>

          <h2 className="mb-14 text-4xl font-bold tracking-[-0.05em] sm:text-6xl">
            Tools of the
            <span className="font-light text-violet-300"> trade.</span>
          </h2>

          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="space-y-8">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-white/80">
                      {skill.name}
                    </span>
                    <span className="text-xs text-violet-300">
                      {skill.value}%
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="mb-7 flex items-center gap-3 text-sm font-bold">
                <Layers3 size={19} className="text-violet-300" />
                Technologies I work with
              </h3>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {technologies.map((technology, index) => (
                  <motion.div
                    key={technology}
                    whileHover={{ y: -4, borderColor: "rgba(167,139,250,.5)" }}
                    className="flex min-h-[76px] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-4 transition"
                  >
                    <span className="text-[10px] font-bold text-violet-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-medium text-white/75">
                      {technology}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        id="portfolio-experience"
        className="mx-auto max-w-[1440px] px-5 py-24 sm:px-10 lg:px-16 lg:py-32"
      >
        <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.23em] text-violet-300">
          <span className="h-px w-8 bg-violet-400" />
          04 / Experience
        </p>

        <h2 className="mb-14 text-4xl font-bold tracking-[-0.05em] sm:text-6xl">
          The journey
          <span className="font-light text-violet-300"> so far.</span>
        </h2>

        <div className="max-w-[1000px]">
          {experience.map((item, index) => (
            <div
              key={item.role}
              className="grid gap-4 border-t border-white/10 py-8 md:grid-cols-[180px_1fr]"
            >
              <p className="pt-1 text-xs font-medium text-violet-300">
                {item.period}
              </p>
              <div>
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <h3 className="text-xl font-bold">{item.role}</h3>
                  <span className="text-xs text-white/40">{item.company}</span>
                </div>
                <p className="mt-3 max-w-[620px] text-sm leading-7 text-white/45">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section
        id="portfolio-contact"
        className="bg-gradient-to-br from-[#211c3c] via-[#171629] to-[#0e1117] px-5 py-24 sm:px-10 lg:px-16 lg:py-32"
      >
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[1fr_.8fr] lg:gap-24">
          <div>
            <p className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.23em] text-violet-300">
              <span className="h-px w-8 bg-violet-400" />
              05 / Get in touch
            </p>

            <h2 className="text-5xl font-bold leading-[1.1] tracking-[-0.06em] sm:text-7xl">
              Let's make
              <br />
              something
              <br />
              <span className="font-light text-violet-300">meaningful.</span>
            </h2>

            <p className="mt-7 max-w-[410px] text-sm leading-8 text-white/50">
              Have a project, an interesting challenge or just want to say
              hello? I'd love to hear from you.
            </p>

            <div className="mt-9 flex gap-3">
                {[
                    { icon: Code, label: "GitHub" },
                    { icon: BriefcaseBusiness, label: "LinkedIn" },
                    { icon: Globe, label: "Website" },
                ].map((social) => {
                    const Icon = social.icon;

                    return (
                    <button
                        key={social.label}
                        aria-label={social.label}
                        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white/60 transition hover:border-violet-400 hover:bg-violet-500/10 hover:text-violet-300"
                    >
                        <Icon size={17} />
                    </button>
                    );
                })}
                </div>
          </div>

          <form
            onSubmit={submitForm}
            className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-9"
          >
            <div>
              <label className="mb-2 block text-xs font-semibold text-white/70">
                Name
              </label>
              <input
                required
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                placeholder="Your name"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-violet-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-white/70">
                Email
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-violet-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-white/70">
                Project details
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(event) =>
                  setForm({ ...form, message: event.target.value })
                }
                placeholder="Tell me about your idea..."
                className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-violet-400"
              />
            </div>

            {formSubmitted && (
              <p className="text-xs font-semibold text-emerald-300">
                ✓ Demo message submitted successfully!
              </p>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-violet-500 px-6 py-4 text-xs font-bold transition hover:bg-violet-400"
            >
              Send message <Send size={15} />
            </button>

            <p className="text-center text-[10px] text-white/35">
              Frontend demo only. No message is sent to a server.
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.07] bg-[#090b0e] px-5 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-xs font-bold tracking-[0.15em]">
            ALEX<span className="text-violet-400">.</span>DEV
          </p>
          <p className="text-[10px] text-white/35">
            © 2026 Alex Morgan. All rights reserved.
          </p>
          <button
            onClick={() => navigate("portfolio-home")}
            className="flex items-center gap-2 text-[10px] text-white/50 transition hover:text-violet-300"
          >
            Back to top <ArrowUpRight size={13} />
          </button>
        </div>
        <p className="mt-5 text-center text-[9px] text-white/25">
          Designed as an Azoytrix portfolio showcase demonstration.
        </p>
      </footer>
    </main>
  );
}
