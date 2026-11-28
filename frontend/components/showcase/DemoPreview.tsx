"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const FRAME_W = 1280; // virtual desktop width the demo renders at
const FRAME_H = 800;

export default function DemoPreview({
  slug,
  title,
  children,
}: {
  slug: string;
  title: string;
  children?: ReactNode; // fallback shown until the preview has loaded
}) {
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const el = box.current;
    if (!el) return;

    // Mount the iframe only when the card is near the viewport,
    // and unmount it when it is far away to save memory.
    const io = new IntersectionObserver(
      ([entry]) => {
        setNear(entry.isIntersecting);
        if (!entry.isIntersecting) setLoaded(false);
      },
      { rootMargin: "200px" }
    );

    // Keep the scale in sync with the card width
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / FRAME_W);
    });

    io.observe(el);
    ro.observe(el);
    return () => {
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={box} className="az-preview">
      {/* Fallback / skeleton */}
      <div className={`az-preview__fallback ${loaded ? "is-hidden" : ""}`}>
        {children}
      </div>

      {near && (
        <iframe
          src={`/demos/${slug}?preview=1`}
          title={`${title} live preview`}
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => setLoaded(true)}
          className={`az-preview__frame ${loaded ? "is-loaded" : ""}`}
          style={{
            width: FRAME_W,
            height: FRAME_H,
            transform: `scale(${scale})`,
          }}
        />
      )}

      <div className="az-preview__shine" />
    </div>
  );
}