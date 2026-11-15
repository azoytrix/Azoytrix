import Link from "next/link";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Azoytrix. Start a conversation about your next project.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-white py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,111,217,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,111,217,0.035)_1px,transparent_1px)] bg-size-[64px_64px]" />
          <div className="absolute left-1/2 top-1/2 h-105 w-105 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/40 blur-[120px]" />
          <div className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-cyan-100/30 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mx-auto max-w-4xl text-center">
            <div className="mb-8 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-brand/50" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand">
                Get in touch
              </span>
              <span className="h-px w-8 bg-brand/50" />
            </div>

            <h1 className="font-display text-3xl font-semibold leading-[1.25] tracking-tight text-navy sm:text-5xl lg:text-[3.65rem]">
              Let's create{" "}
              <span className="relative inline-block">
                <span className="text-gradient">what's next.</span>
              </span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg sm:leading-9">
              Great ideas deserve thoughtful engineering. Tell us what you're imagining, and let's
              make it happen.
            </p>

            <div className="mx-auto mt-16 h-px w-24 bg-linear-to-r from-transparent via-brand/50 to-transparent" />
          </Reveal>
        </div>
      </section>
      {/* Contact form + info */}
      <section className="relative isolate overflow-hidden bg-surface py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-100/50 blur-[120px]" />
          <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-100/40 blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,111,217,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,111,217,0.025)_1px,transparent_1px)] bg-size-[64px_64px]" />
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-1">
              <Reveal>
                <SectionHeading
                  eyebrow="Send us a message"
                  title="Start a conversation"
                  description="Tell us about your project, timeline and goals. We typically respond within one business day."
                />
              </Reveal>
              <ContactForm />
            </div>

            {/* Contact info */}
            <div className="lg:col-span-1">
              <Reveal delay={0.1}>
                <SectionHeading
                  eyebrow="Other ways to reach us"
                  title="Get in touch directly"
                  description="Prefer to email or call? Here's how to reach the Azoytrix team."
                />
              </Reveal>

              <div className="mt-16 space-y-8">
                {[{
                  icon: Mail,
                  title: "Email",
                  subtitle: SITE.email,
                  href: `mailto:${SITE.email}`,

                }, {
                  icon: MapPin,
                  title: "Location",
                  subtitle: "Remote-first · Worldwide",
                  href: "#",
                }].map((item, i) => (
                  <Reveal key={item.title} delay={i * 0.08}>
                    <a
                      href={item.href}
                      className="group flex items-start gap-4 rounded-2xl border border-white/80 bg-white/90 p-6 shadow-[0_8px_35px_rgba(15,35,70,0.035)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/25"
                    >
                      <div className="flex shrink-0 h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-brand/10 to-cyan/10 text-brand ring-1 ring-brand/10 transition-all duration-300 group-hover:from-brand group-hover:to-cyan group-hover:text-white">
                        <item.icon size={20} strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm text-ink">
                          {item.subtitle}
                        </p>
                      </div>
                      <ArrowRight
                        size={16}
                        className="mt-0.5 shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand"
                      />
                    </a>
                  </Reveal>
                ))}
              </div>

              <div className="mt-20">
                <div className="inline-flex items-center gap-3 rounded-full border border-brand/10 bg-brand/10 px-4 py-2 mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">
                    Typically replies within 1 business day
                  </span>
                </div>
                <p className="text-sm leading-7 text-muted max-w-xs">
                  Not sure where to start? Describe your idea in the form and we'll help you shape
                  it into a plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}