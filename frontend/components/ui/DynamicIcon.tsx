import { createElement } from "react";
import type { LucideProps } from "lucide-react";
import { getIcon } from "@/lib/icons";

/** Renders a lucide icon from its name (as stored in Strapi). Unknown names show a default icon. */
export default function DynamicIcon({ name, ...props }: { name?: string } & LucideProps) {
  return createElement(getIcon(name), props);
}
