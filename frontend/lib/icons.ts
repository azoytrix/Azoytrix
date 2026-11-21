import {
  Code, Brain, Cloud, Smartphone, Database, Lightbulb, Workflow, LineChart, Layers, Rocket, Search, PenTool, Hammer, RefreshCw, Zap, ShieldCheck, Users, Target, Globe, Shield, Lock, Server, Bot, Sparkles, Settings, Star, Compass, Cpu,
  type LucideIcon,
} from "lucide-react";

/**
 * Icons selectable in Strapi (Icon dropdown of the "IconCard" component).
 * To offer a new icon: import it here, add it to ICONS, and add its name to the
 * `icon` enumeration in backend/src/components/home/icon-card.json.
 */
export const ICONS: Record<string, LucideIcon> = {
  Code,
  Brain,
  Cloud,
  Smartphone,
  Database,
  Lightbulb,
  Workflow,
  LineChart,
  Layers,
  Rocket,
  Search,
  PenTool,
  Hammer,
  RefreshCw,
  Zap,
  ShieldCheck,
  Users,
  Target,
  Globe,
  Shield,
  Lock,
  Server,
  Bot,
  Sparkles,
  Settings,
  Star,
  Compass,
  Cpu,
};

export function getIcon(name: string | undefined | null, fallback: LucideIcon = Code): LucideIcon {
  return (name && ICONS[name]) || fallback;
}
