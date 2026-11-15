"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroVisual from "@/components/three/HeroVisual";
import HeroParticles from "@/components/home/HeroParticles";
import { SITE } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white via-white to-surface">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      {/* <HeroParticles /> */}

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl grid-cols-1 items-center gap-6 px-5 py-12 sm:px-8 lg:grid-cols-2">
        <motion.div
            className="min-w-0"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-semibold tracking-widest text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            SOFTWARE · AI · CLOUD
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] text-navy sm:text-6xl lg:text-7xl">
            Engineering <br />
            the <span className="text-gradient">Next Era.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            We design and build intelligent software, scalable cloud platforms and digital
            products that move businesses forward.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-navy/20 transition hover:bg-brand"
            >
              Start a project
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/our-work"
              className="rounded-full border border-line bg-white px-7 py-3.5 text-sm font-semibold text-navy transition hover:border-brand hover:text-brand"
            >
              See our work
            </Link>
          </div>

          <p className="mt-10 text-xs tracking-[0.25em] text-muted">{SITE.pillars}</p>
        </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="relative flex min-w-0 flex-col lg:h-170"
          >
            <div className="absolute inset-10 rounded-full bg-linear-to-br from-brand/10 via-cyan/10 to-transparent blur-3xl" />
            <HeroVisual />
          </motion.div>
      </div>
    </section>
  );
}