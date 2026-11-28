
"use client";

import type { ReactNode } from "react";
import type { ComponentProps } from "react";
import { motion } from "framer-motion";

type MotionButtonProps = ComponentProps<typeof motion.button>;

type DemoButtonProps = Omit<
  MotionButtonProps,
  "children" | "className"
> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
  className?: string;
};

export default function DemoButton({
  children,
  variant = "primary",
  icon,
  className = "",
  ...props
}: DemoButtonProps) {
  const variants = {
    primary:
      "bg-slate-950 text-white hover:bg-slate-800 shadow-lg shadow-slate-950/10",
    secondary:
      "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50",
    ghost:
      "bg-transparent text-slate-600 hover:bg-slate-100",
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18 }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </motion.button>
  );
}
