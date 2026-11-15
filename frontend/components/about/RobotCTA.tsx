"use client";

import dynamic from "next/dynamic";

const CuteRobotModel = dynamic(
  () => import("./CuteRobotModel").then((mod) => mod.CuteRobotModel),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center min-h-[340px] sm:min-h-[420px]">
        <div className="text-center opacity-50">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-brand/20 border-t-brand" />
          <p className="font-mono text-[10px] tracking-[0.2em] text-brand">LOADING MODEL</p>
        </div>
      </div>
    ),
  }
);

export default function RobotCTA() {
  return <CuteRobotModel />;
}
