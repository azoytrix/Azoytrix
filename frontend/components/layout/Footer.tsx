import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, SITE } from "@/lib/site";
import { Suspense } from "react";
import CopyrightYear from "./CopyrightYear";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <Image src="/logo-mark.png" alt="" width={36} height={36} />
            <span className="font-display text-xl font-extrabold text-navy">{SITE.name}</span>
          </div>
          <p className="mt-4 font-serif text-lg italic text-navy">{SITE.tagline}</p>
          <p className="mt-2 text-xs tracking-widest text-muted">{SITE.pillars}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-navy">Explore</h4>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-muted transition hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-navy">Get in touch</h4>
          <p className="mt-4 text-sm text-muted">
            Software · AI · Cloud · Digital Innovation
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-2 inline-block text-sm font-medium text-brand hover:underline"
          >
            {SITE.email}
          </a>
        </div>
      </div>

      <div className="border-t border-line py-5 text-center text-xs text-muted">
        © <Suspense fallback="2026"><CopyrightYear /></Suspense> Azoytrix. All rights reserved.
      </div>
    </footer>
  );
}