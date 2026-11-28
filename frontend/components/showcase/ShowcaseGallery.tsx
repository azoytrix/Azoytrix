"use client";

import { useMemo, useRef, useState } from "react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Code2,
  Layers3,
  Monitor,
  Search,
  Sparkles,
  X,
} from "lucide-react";

import ShowcaseScene from "./ShowcaseScene";
import { showcaseProjects, showcaseCategories } from "@/lib/showcase";

import "./showcase-layout.css"; // replaces showcase-light.css and the old showcase CSS

const PAGE_SIZE = 3;
const EASE = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

const HEADLINE = ["We turn ideas", "into digital", "experiences"];

const capabilities = [
  { icon: Code2, title: "Modern engineering", detail: "Built with modern technologies, tested and maintainable from day one." },
  { icon: Monitor, title: "Responsive by design", detail: "Every screen, every device, from first prototype to production." },
  { icon: Layers3, title: "Scalable architecture", detail: "Designed to grow with your users, your data and your ambitions." },
  { icon: Sparkles, title: "Intelligent experiences", detail: "Technology with purpose: copilots, automation and smarter decisions." },
];

function ProjectIcon({ name }: { name: string }) {
  const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[name];
  if (!Icon) return <Layers3 size={26} strokeWidth={1.6} />;
  return <Icon size={26} strokeWidth={1.6} />;
}

/* Stage preview tilts toward the pointer */
function tilt(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - 0.5;
  const py = (e.clientY - r.top) / r.height - 0.5;
  e.currentTarget.style.setProperty("--rx", `${(-py * 9).toFixed(2)}deg`);
  e.currentTarget.style.setProperty("--ry", `${(px * 12).toFixed(2)}deg`);
}
function untilt(e: MouseEvent<HTMLElement>) {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
}

/* Button that leans toward the cursor */
function Magnetic({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const x = useSpring(0, { stiffness: 220, damping: 18 });
  const y = useSpring(0, { stiffness: 220, damping: 18 });

  return (
    <div
      className="azs-magnetic"
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div style={{ x, y }}>{children}</motion.div>
    </div>
  );
}

export default function ShowcaseGallery() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeSlug, setActiveSlug] = useState("");
  const [openCap, setOpenCap] = useState(0);

  const total = showcaseProjects.length;

  /* Scroll-linked ring rotation */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);

  const filteredProjects = useMemo(() => {
    const q = search.toLowerCase().trim();
    return showcaseProjects.filter((p) => {
      const okCategory = activeCategory === "All" || p.category === activeCategory;
      const okSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q);
      return okCategory && okSearch;
    });
  }, [activeCategory, search]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const remaining = filteredProjects.length - visibleProjects.length;
  const nextBatch = Math.min(PAGE_SIZE, remaining);
  const progress = filteredProjects.length
    ? (visibleProjects.length / filteredProjects.length) * 100
    : 0;

  const active =
    visibleProjects.find((p) => p.slug === activeSlug) ?? visibleProjects[0];

  const changeCategory = (c: string) => {
    setActiveCategory(c);
    setVisibleCount(PAGE_SIZE);
    setActiveSlug("");
  };
  const changeSearch = (v: string) => {
    setSearch(v);
    setVisibleCount(PAGE_SIZE);
    setActiveSlug("");
  };
  const resetFilters = () => {
    setSearch("");
    setActiveCategory("All");
    setVisibleCount(PAGE_SIZE);
    setActiveSlug("");
  };
  const showLess = () => {
    setVisibleCount(PAGE_SIZE);
    setActiveSlug("");
    document
      .getElementById("showcase-projects")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="showcase" className="azs">
      <div className="azs__wrap">
        {/* ============ HERO: headline overlaps an orbiting 3D stage ============ */}
        <header className="azs-hero" ref={heroRef}>
          <div className="azs-hero__copy">
            <motion.p
              className="azs-hero__kicker"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span />
              The Azoytrix experience
            </motion.p>

            <h1 aria-label="We turn ideas into digital experiences.">
              {HEADLINE.map((line, i) => (
                <span className="azs-line" key={line} aria-hidden="true">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.95, ease: EASE, delay: 0.15 + i * 0.12 }}
                  >
                    {line}
                    {i === HEADLINE.length - 1 && <i className="azs-dot">.</i>}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="azs-hero__lead"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
            >
              Explore the possibilities of modern technology. From intelligent
              platforms to immersive digital products, discover what thoughtful
              engineering can bring to life.
            </motion.p>

            <motion.div
              className="azs-hero__actions"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
            >
              <motion.a
                href="#showcase-projects"
                className="azs-btn"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Explore our work
                <ArrowDown size={18} />
              </motion.a>

              <p className="azs-hero__status">
                <i />
                {total} concepts across 10+ industries
              </p>
            </motion.div>
          </div>

          <div className="azs-hero__orb">
            <motion.div className="azs-ring" style={{ rotate: ringRotate }} aria-hidden="true">
              <svg viewBox="0 0 400 400">
                <defs>
                  <path
                    id="azs-ring-path"
                    d="M200 200 m-176 0 a176 176 0 1 1 352 0 a176 176 0 1 1 -352 0"
                  />
                </defs>
                <text>
                  <textPath href="#azs-ring-path" textLength="1100" lengthAdjust="spacing">
                    INNOVATION · INTELLIGENCE · ENGINEERING · INNOVATION · INTELLIGENCE · ENGINEERING ·{" "}
                  </textPath>
                </text>
              </svg>
            </motion.div>

            <div className="azs-orbit" aria-hidden="true">
              <i />
            </div>
            <div className="azs-orbit azs-orbit--inner" aria-hidden="true" />

            <motion.div
              className="azs-hero__scene"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
            >
              <ShowcaseScene />
            </motion.div>

            <p className="azs-hero__hint">Drag to rotate. Press ✦ to scatter it.</p>
          </div>
        </header>

        {/* ============ WORK: index on the left, live stage on the right ============ */}
        <section className="azs-work" id="showcase-projects">
          <div className="azs-work__head">
            <div>
              <h2>
                Built to inspire.
                <br />
                Designed to perform.
              </h2>
              <p>
                Explore interactive demonstrations across different industries and
                discover what's possible.
              </p>
            </div>

            <div className="azs-work__total" aria-label={`${total} interactive concepts`}>
              <strong>{pad(total)}</strong>
              <span>interactive concepts</span>
            </div>
          </div>

          <div className="azs-toolbar">
            <div className="azs-filters" role="group" aria-label="Filter by category">
              {showcaseCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => changeCategory(category)}
                  className={activeCategory === category ? "azs-filter is-active" : "azs-filter"}
                >
                  {activeCategory === category && (
                    <motion.span
                      layoutId="azs-filter-pill"
                      className="azs-filter__pill"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span>{category}</span>
                </button>
              ))}
            </div>

            <label className="azs-search">
              <Search size={17} />
              <input
                type="search"
                placeholder="Search experiences..."
                value={search}
                onChange={(e) => changeSearch(e.target.value)}
              />
              {search && (
                <button type="button" aria-label="Clear search" onClick={() => changeSearch("")}>
                  <X size={15} />
                </button>
              )}
            </label>
          </div>

          {active ? (
            <div className="azs-work__body">
              {/* ---- INDEX ---- */}
              <div className="azs-index">
                <motion.ul layout className="azs-index__list">
                  <AnimatePresence mode="popLayout">
                    {visibleProjects.map((project, index) => {
                      const isActive = project.slug === active.slug;
                      return (
                        <motion.li
                          layout
                          key={project.slug}
                          initial={{ opacity: 0, x: -28 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -14 }}
                          transition={{
                            duration: 0.55,
                            ease: EASE,
                            delay: (index % PAGE_SIZE) * 0.07,
                          }}
                        >
                          <button
                            type="button"
                            className={isActive ? "azs-row is-active" : "azs-row"}
                            aria-current={isActive}
                            onMouseEnter={() => setActiveSlug(project.slug)}
                            onFocus={() => setActiveSlug(project.slug)}
                            onClick={() => setActiveSlug(project.slug)}
                            style={{ "--row-accent": project.accent } as CSSProperties}
                          >
                            {isActive && (
                              <motion.span
                                layoutId="azs-row-bar"
                                className="azs-row__bar"
                                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                              />
                            )}
                            <span className="azs-row__num">{project.number}</span>
                            <span className="azs-row__text">
                              <strong>{project.title}</strong>
                              <small>{project.category}</small>
                            </span>
                            <ArrowUpRight className="azs-row__arrow" size={20} />
                          </button>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </motion.ul>

                {/* count + view more */}
                <motion.div layout className="azs-more">
                  <p className="azs-more__count" aria-live="polite">
                    Showing{" "}
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.strong
                        key={visibleProjects.length}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                      >
                        {visibleProjects.length}
                      </motion.strong>
                    </AnimatePresence>{" "}
                    of <strong>{filteredProjects.length}</strong>
                    {filteredProjects.length !== total && ` (${total} in total)`}
                  </p>

                  <div
                    className="azs-more__bar"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={filteredProjects.length}
                    aria-valuenow={visibleProjects.length}
                  >
                    <motion.span
                      initial={false}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.6, ease: EASE }}
                    />
                  </div>

                  <div className="azs-more__actions">
                    {remaining > 0 && (
                      <motion.button
                        type="button"
                        className="azs-more__btn"
                        onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        View {nextBatch} more
                        <em>{remaining} left</em>
                        <ArrowDown size={16} />
                      </motion.button>
                    )}
                    {visibleCount > PAGE_SIZE && (
                      <motion.button
                        type="button"
                        className="azs-more__less"
                        onClick={showLess}
                        whileTap={{ scale: 0.97 }}
                      >
                        Show less
                        <ArrowUp size={16} />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* ---- STAGE ---- */}
              <div
                className="azs-stage"
                style={
                  {
                    "--accent": active.accent,
                    "--accent-soft": active.accentSoft,
                  } as CSSProperties
                }
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.slug}
                    className="azs-stage__inner"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <div className="azs-stage__meta">
                      <span>
                        {active.number} of {pad(total)}
                      </span>
                      <span>{active.category}</span>
                    </div>

                    <div className="azs-stage__art" onMouseMove={tilt} onMouseLeave={untilt}>
                      <div className="azs-stage__glow" />
                      <div className="azs-stage__icon">
                        <ProjectIcon name={active.icon} />
                      </div>

                      <div className="azs-mini">
                        <div className="azs-mini__top">
                          <i />
                          <i />
                          <i />
                          <span />
                        </div>
                        <div className="azs-mini__body">
                          <div className="azs-mini__side">
                            <i />
                            <i />
                            <i />
                            <i />
                          </div>
                          <div className="azs-mini__main">
                            <div className="azs-mini__title" />
                            <div className="azs-mini__stats">
                              <i />
                              <i />
                              <i />
                            </div>
                            <div className="azs-mini__chart">
                              {Array.from({ length: 9 }).map((_, i) => (
                                <i key={i} style={{ "--i": i } as CSSProperties} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="azs-stage__text">
                      <h3>{active.title}</h3>
                      <p>{active.shortDescription}</p>
                      <Link
                        href={`/demos/${active.slug}`}
                        className="azs-stage__open"
                        aria-label={`Explore ${active.title} demo`}
                      >
                        Open the demo
                        <ArrowUpRight size={18} />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="azs-empty">
              <Search size={30} />
              <h3>No experiences found.</h3>
              <p>Try a different keyword or category.</p>
              <button type="button" onClick={resetFilters}>
                Clear all filters
                <ArrowUpRight size={16} />
              </button>
            </div>
          )}
        </section>

        {/* ============ CAPABILITIES: accordion strip ============ */}
        <section className="azs-cap">
          <h2>What goes into every build</h2>

          <div className="azs-cap__strip">
            {capabilities.map(({ icon: Icon, title, detail }, i) => {
              const open = openCap === i;
              return (
                <button
                  key={title}
                  type="button"
                  className={open ? "azs-cap__panel is-open" : "azs-cap__panel"}
                  aria-expanded={open}
                  onMouseEnter={() => setOpenCap(i)}
                  onFocus={() => setOpenCap(i)}
                  onClick={() => setOpenCap(i)}
                >
                  <span className="azs-cap__icon">
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                  <span className="azs-cap__vtitle">{title}</span>
                  <span className="azs-cap__body">
                    <strong>{title}</strong>
                    <span>{detail}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="azs-cta">
          <div className="azs-cta__copy">
            <h2>
              Let's build something
              <br />
              extraordinary.
            </h2>
            <p>
              Your next big idea deserves more than ordinary execution. Let's
              engineer it together.
            </p>
          </div>

          <Magnetic>
            <Link href="/#contact" className="azs-cta__btn">
              Start a conversation
              <ArrowUpRight size={20} />
            </Link>
          </Magnetic>

          <span className="azs-cta__mark" aria-hidden="true">
            AZX
          </span>
        </section>
      </div>
    </section>
  );
}