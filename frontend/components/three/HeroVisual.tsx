"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-75 w-full items-center justify-center lg:h-full">
      <div className="h-24 w-24 animate-pulse rounded-full bg-cyan/30 blur-sm" />
    </div>
  ),
});

export default function HeroVisual() {
  return <HeroScene />;
}