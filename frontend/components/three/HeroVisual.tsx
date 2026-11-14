"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-24 w-24 animate-pulse rounded-full bg-linear-to-br from-brand/20 to-cyan/20" />
    </div>
  ),
});

export default function HeroVisual() {
  return <HeroScene />;
}