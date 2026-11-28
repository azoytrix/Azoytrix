
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Globe2,
  Layers3,
  Menu,
  Monitor,
  Palette,
  Send,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

import DemoButton from "@/components/showcase/shared/DemoButton";

const services = [
  {
    number: "01",
    title: "Digital Strategy",
    description:
      "We turn complex business challenges into clear digital roadmaps that move your organization forward.",
    icon: Globe2,
  },
  {
    number: "02",
    title: "Product Engineering",
    description:
      "Scalable applications and intelligent platforms built around the way your business works.",
    icon: Layers3,
  },
  {
    number: "03",
    title: "Experience Design",
    description:
      "Thoughtful interfaces and meaningful interactions that make every digital touchpoint count.",
    icon: Palette,
  },
];

const projects = [
  {
    name: "Nexus Analytics",
    category: "SaaS Platform",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=85",
    className: "md:col-span-7",
  },
  {
    name: "Forma Studio",
    category: "Brand & Digital",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1000&q=85",
    className: "md:col-span-5",
  },
  {
    name: "Vertex Living",
    category: "Real Estate",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=85",
    className: "md:col-span-5",
  },
  {
    name: "Aether Commerce",
    category: "E-commerce",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1000&q=85",
    className: "md:col-span-7",
  },
];

const testimonials = [
  {
    quote:
      "The team understood our vision from day one. What they delivered completely transformed how our customers experience our brand.",
    name: "Alex Morgan",
    role: "CEO, Nexus Group",
    initials: "AM",
  },
  {
    quote:
      "A thoughtful, strategic approach to technology. The final product feels effortless, yet it solves some very complex problems.",
    name: "Sarah Chen",
    role: "Founder, Forma Studio",
    initials: "SC",
  },
];

export default function CorporateWebsiteDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setMenuOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f8f6] text-[#20231f]">
      {/* Navigation */}
      <header className="absolute left-0 right-0 top-0 z-40 border-b border-white/15">
        <div className="mx-auto flex h-[82px] max-w-[1440px] items-center justify-between px-5 sm:px-10 lg:px-16">
          <button
            onClick={() => scrollTo("corporate-home")}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#20231f]">
              <Sparkles size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              NORD<span className="font-light">STUDIO</span>
            </span>
          </button>

          <nav className="hidden items-center gap-9 md:flex">
            {[
              ["About", "corporate-about"],
              ["Services", "corporate-services"],
              ["Work", "corporate-work"],
              ["Contact", "corporate-contact"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-xs font-medium text-white/75 transition hover:text-white"
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo("corporate-contact")}
            className="hidden items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-bold text-[#20231f] transition hover:bg-[#d9e4d6] md:flex"
          >
            Let's Talk <ArrowUpRight size={15} />
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl border border-white/20 p-2 text-white md:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {menuOpen && (
          <div className="absolute left-0 right-0 top-full border-t border-white/10 bg-[#202c27] p-6 shadow-2xl md:hidden">
            {[
              ["About", "corporate-about"],
              ["Services", "corporate-services"],
              ["Work", "corporate-work"],
              ["Contact", "corporate-contact"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="block w-full border-b border-white/10 py-4 text-left text-sm text-white"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="corporate-home"
        className="relative flex min-h-[720px] items-center overflow-hidden bg-[#202c27] pt-24 sm:min-h-[790px]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2000&q=90')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#17221e] via-[#17221e]/85 to-[#17221e]/30" />
        <div className="absolute -right-32 top-24 h-[500px] w-[500px] rounded-full border border-white/10" />
        <div className="absolute -right-16 top-40 h-[350px] w-[350px] rounded-full border border-white/10" />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-20 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-[820px]"
          >
            <div className="mb-8 flex items-center gap-3">
              <span className="h-px w-10 bg-[#b6d2ae]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#c0d8b9]">
                Independent Digital Agency · Est. 2018
              </span>
            </div>

            <h1 className="text-5xl font-semibold leading-[1.08] tracking-[-0.055em] text-white sm:text-7xl lg:text-[92px]">
              Ideas into
              <br />
              <span className="font-light italic text-[#b8d3b0]">
                impact.
              </span>
            </h1>

            <p className="mt-8 max-w-[490px] text-sm leading-7 text-white/65 sm:text-base">
              We partner with ambitious businesses to create thoughtful
              digital experiences, powerful products and meaningful brands
              that move the world forward.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo("corporate-work")}
                className="flex items-center gap-3 rounded-full bg-[#b8d3b0] px-7 py-4 text-xs font-bold text-[#202c27] transition hover:bg-white"
              >
                Explore Our Work <ArrowUpRight size={17} />
              </button>

              <button
                onClick={() => scrollTo("corporate-about")}
                className="flex items-center gap-2 px-4 py-4 text-xs font-semibold text-white/80 transition hover:text-white"
              >
                Discover our story <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>

          <div className="absolute bottom-9 right-10 hidden items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/50 lg:flex">
            <span className="h-px w-12 bg-white/30" />
            Scroll to explore
            <ChevronDown size={15} />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section
        id="corporate-about"
        className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 sm:px-10 lg:grid-cols-2 lg:gap-24 lg:px-16 lg:py-32"
      >
        <div>
          <p className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#718a6b]">
            <span className="h-px w-8 bg-[#718a6b]" />
            Who we are
          </p>
          <h2 className="max-w-[560px] text-4xl font-semibold leading-[1.15] tracking-[-0.045em] sm:text-5xl">
            We believe better thinking creates{" "}
            <span className="font-light italic text-[#718a6b]">
              better futures.
            </span>
          </h2>
        </div>

        <div className="flex flex-col justify-end">
          <p className="text-base leading-8 text-[#72776f]">
            NORD is an independent digital partner working at the intersection
            of strategy, design and technology. We bring together curious
            minds, creative thinkers and experienced engineers to solve
            meaningful problems.
          </p>

          <p className="mt-5 text-base leading-8 text-[#72776f]">
            From the first idea to the final interaction, we care about every
            detail that makes a digital experience useful, memorable and
            unmistakably yours.
          </p>

          <button
            onClick={() => scrollTo("corporate-services")}
            className="mt-8 flex w-fit items-center gap-3 border-b border-[#718a6b] pb-2 text-xs font-bold text-[#52694c] transition hover:gap-5"
          >
            More about our approach <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[#e7e8e2] bg-white">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-10 px-5 py-14 sm:px-10 md:grid-cols-4 lg:px-16">
          {[
            ["08+", "Years of experience"],
            ["120+", "Projects delivered"],
            ["18", "Countries reached"],
            ["96%", "Client satisfaction"],
          ].map(([number, label]) => (
            <div key={label} className="md:border-l md:border-[#e8e9e3] md:pl-9">
              <p className="text-4xl font-semibold tracking-tight text-[#26362d] sm:text-5xl">
                {number}
              </p>
              <p className="mt-3 text-xs text-[#858a81]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section
        id="corporate-services"
        className="mx-auto max-w-[1440px] px-5 py-24 sm:px-10 lg:px-16 lg:py-32"
      >
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#718a6b]">
              <span className="h-px w-8 bg-[#718a6b]" />
              What we do
            </p>
            <h2 className="max-w-[600px] text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
              Strategy meets
              <span className="font-light italic text-[#718a6b]">
                {" "}craft.
              </span>
            </h2>
          </div>

          <p className="max-w-[350px] text-sm leading-7 text-[#858a81]">
            From ambitious concepts to real-world digital products, we help
            businesses create what comes next.
          </p>
        </div>

        <div className="divide-y divide-[#e4e6df] border-y border-[#e4e6df]">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.number}
                whileHover={{ x: 5 }}
                className="group grid gap-5 py-9 transition md:grid-cols-[90px_1fr_1fr_60px] md:items-center"
              >
                <span className="text-xs font-semibold text-[#9da398]">
                  / {service.number}
                </span>

                <h3 className="text-2xl font-semibold tracking-tight text-[#28332b] transition group-hover:text-[#718a6b] sm:text-3xl">
                  {service.title}
                </h3>

                <p className="max-w-[400px] text-sm leading-7 text-[#858a81]">
                  {service.description}
                </p>

                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#e3e6de] text-[#718a6b] transition group-hover:border-[#718a6b] group-hover:bg-[#718a6b] group-hover:text-white">
                  <Icon size={20} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Projects */}
      <section
        id="corporate-work"
        className="bg-[#202c27] px-5 py-24 text-white sm:px-10 lg:px-16 lg:py-32"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#b8d3b0]">
                <span className="h-px w-8 bg-[#b8d3b0]" />
                Selected projects
              </p>
              <h2 className="text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                Work that
                <span className="font-light italic text-[#b8d3b0]">
                  {" "}moves us.
                </span>
              </h2>
            </div>

            <p className="max-w-[330px] text-sm leading-7 text-white/50">
              A selection of ideas, products and experiences created in
              collaboration with ambitious people.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-12">
            {projects.map((project, index) => (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`group ${project.className}`}
              >
                <div className="relative aspect-[1.4/1] overflow-hidden bg-white/5">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-white/65">
                        {project.category} · {project.year}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold sm:text-2xl">
                        {project.name}
                      </h3>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#202c27] transition group-hover:bg-[#b8d3b0]">
                      <ArrowUpRight size={19} />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 sm:px-10 lg:grid-cols-2 lg:gap-24 lg:px-16 lg:py-32">
        <div>
          <p className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#718a6b]">
            <span className="h-px w-8 bg-[#718a6b]" />
            Our principles
          </p>
          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">
            Good work starts with{" "}
            <span className="font-light italic text-[#718a6b]">
              good values.
            </span>
          </h2>
        </div>

        <div className="space-y-7">
          {[
            {
              title: "Thoughtful by design",
              text: "Every decision has a reason. We build with clarity and purpose.",
              icon: Sparkles,
            },
            {
              title: "Built to last",
              text: "We create reliable solutions that grow with your ambitions.",
              icon: ShieldCheck,
            },
            {
              title: "Always moving forward",
              text: "We stay curious, adapt quickly and embrace better possibilities.",
              icon: Zap,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="flex gap-5 border-b border-[#e5e7df] pb-7">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf0e7] text-[#718a6b]">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#858a81]">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#e9eee6] px-5 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#718a6b]">
            What clients say
          </p>
          <h2 className="mb-12 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
            Built on collaboration.
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="rounded-2xl bg-white p-7 sm:p-10"
              >
                <div className="mb-7 flex gap-1 text-[#718a6b]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>★</span>
                  ))}
                </div>
                <p className="text-lg leading-8 text-[#364138] sm:text-xl">
                  “{testimonial.quote}”
                </p>
                <div className="mt-9 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9eee6] text-xs font-bold text-[#52694c]">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-xs font-bold">{testimonial.name}</p>
                    <p className="mt-1 text-[10px] text-[#858a81]">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="corporate-contact"
        className="bg-[#202c27] px-5 py-24 text-white sm:px-10 lg:px-16 lg:py-32"
      >
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#b8d3b0]">
              <span className="h-px w-8 bg-[#b8d3b0]" />
              Start a conversation
            </p>

            <h2 className="text-5xl font-semibold leading-[1.1] tracking-[-0.055em] sm:text-7xl">
              Have an idea?
              <br />
              <span className="font-light italic text-[#b8d3b0]">
                Let's build it.
              </span>
            </h2>

            <p className="mt-7 max-w-[390px] text-sm leading-7 text-white/55">
              Tell us what you're imagining. We'll help you find the right
              direction and turn that idea into something real.
            </p>

            <div className="mt-12 flex items-center gap-3 text-sm text-white/70">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Monitor size={17} />
              </div>
              <div>
                <p className="font-semibold text-white">Digital-first thinking</p>
                <p className="mt-1 text-xs text-white/40">
                  Ideas, strategy and technology
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-9"
          >
            <div>
              <label className="mb-2 block text-xs font-semibold text-white/70">
                Your name
              </label>
              <input
                required
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                placeholder="John Smith"
                className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#b8d3b0]"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-white/70">
                Email address
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                placeholder="john@company.com"
                className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#b8d3b0]"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-white/70">
                Tell us about your project
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(event) =>
                  setForm({ ...form, message: event.target.value })
                }
                placeholder="I'd like to build..."
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#b8d3b0]"
              />
            </div>

            {formSubmitted && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-300">
                <CheckCircle2 size={16} />
                Demo form submitted successfully!
              </div>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#b8d3b0] px-6 py-4 text-xs font-bold text-[#202c27] transition hover:bg-white"
            >
              Send your message <Send size={15} />
            </button>

            <p className="text-center text-[10px] text-white/35">
              This is a frontend demonstration. No message is sent to a server.
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#17221e] px-5 py-9 text-white sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <Sparkles size={19} className="text-[#b8d3b0]" />
            <span className="text-sm font-bold tracking-widest">
              NORDSTUDIO
            </span>
          </div>

          <p className="text-[10px] text-white/40">
            © 2026 NORD Studio. All rights reserved.
          </p>

          <p className="text-[10px] text-white/50">
            Crafted as an Azoytrix showcase demo.
          </p>
        </div>
      </footer>
    </main>
  );
}
