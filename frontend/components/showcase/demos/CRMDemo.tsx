
"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Command,
  Filter,
  LayoutDashboard,
  Mail,
  Menu,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Settings2,
  Target,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

type LeadStatus = "New" | "Contacted" | "Qualified" | "Won";

type Lead = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  value: number;
  status: LeadStatus;
  initials: string;
  color: string;
  source: string;
  date: string;
};

const initialLeads: Lead[] = [
  {
    id: 1,
    name: "Olivia Rhye",
    company: "Layers Studio",
    email: "olivia@layers.studio",
    phone: "+91 98765 43210",
    value: 480000,
    status: "New",
    initials: "OR",
    color: "#d9c8f3",
    source: "Website",
    date: "Today",
  },
  {
    id: 2,
    name: "Phoenix Baker",
    company: "Bento Systems",
    email: "phoenix@bento.io",
    phone: "+91 98765 43211",
    value: 820000,
    status: "New",
    initials: "PB",
    color: "#f4d4bb",
    source: "Referral",
    date: "Today",
  },
  {
    id: 3,
    name: "Lana Steiner",
    company: "Circooles",
    email: "lana@circooles.com",
    phone: "+91 98765 43212",
    value: 620000,
    status: "Contacted",
    initials: "LS",
    color: "#c6e3db",
    source: "LinkedIn",
    date: "Yesterday",
  },
  {
    id: 4,
    name: "Demi Wilkinson",
    company: "Catalog",
    email: "demi@catalog.com",
    phone: "+91 98765 43213",
    value: 1250000,
    status: "Contacted",
    initials: "DW",
    color: "#f0d5df",
    source: "Website",
    date: "Yesterday",
  },
  {
    id: 5,
    name: "Candice Wu",
    company: "Command+R",
    email: "candice@commandr.com",
    phone: "+91 98765 43214",
    value: 980000,
    status: "Qualified",
    initials: "CW",
    color: "#d5ddf4",
    source: "Campaign",
    date: "Nov 26",
  },
  {
    id: 6,
    name: "Natali Craig",
    company: "Quotient",
    email: "natali@quotient.com",
    phone: "+91 98765 43215",
    value: 1650000,
    status: "Qualified",
    initials: "NC",
    color: "#e7dfc1",
    source: "Referral",
    date: "Nov 25",
  },
  {
    id: 7,
    name: "Drew Cano",
    company: "Sisyphus",
    email: "drew@sisyphus.com",
    phone: "+91 98765 43216",
    value: 2100000,
    status: "Won",
    initials: "DC",
    color: "#c7e4d0",
    source: "Website",
    date: "Nov 24",
  },
  {
    id: 8,
    name: "Andi Lane",
    company: "Warpspeed",
    email: "andi@warpspeed.com",
    phone: "+91 98765 43217",
    value: 750000,
    status: "Won",
    initials: "AL",
    color: "#ead3c6",
    source: "LinkedIn",
    date: "Nov 23",
  },
];

const stages: LeadStatus[] = ["New", "Contacted", "Qualified", "Won"];

const tasks = [
  {
    title: "Follow up with Olivia",
    detail: "Layers Studio · Proposal discussion",
    time: "10:30 AM",
    color: "#a78bfa",
  },
  {
    title: "Product demo call",
    detail: "Candice Wu · Command+R",
    time: "12:00 PM",
    color: "#60a5fa",
  },
  {
    title: "Send contract draft",
    detail: "Drew Cano · Sisyphus",
    time: "02:30 PM",
    color: "#34d399",
  },
  {
    title: "Review campaign leads",
    detail: "Marketing team · Weekly review",
    time: "04:00 PM",
    color: "#fbbf24",
  },
];

const currency = (value: number) =>
  `₹${(value / 100000).toFixed(1)}L`;

export default function CRMDemo() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [activePage, setActivePage] = useState("Overview");
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showAddLead, setShowAddLead] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [newLead, setNewLead] = useState({
    name: "",
    company: "",
    email: "",
    value: "",
    source: "Website",
  });

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        `${lead.name} ${lead.company} ${lead.email}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  const totalValue = leads.reduce((sum, lead) => sum + lead.value, 0);
  const wonValue = leads
    .filter((lead) => lead.status === "Won")
    .reduce((sum, lead) => sum + lead.value, 0);

  const addLead = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameParts = newLead.name.trim().split(" ");
    const initials = nameParts
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const lead: Lead = {
      id: Date.now(),
      name: newLead.name,
      company: newLead.company,
      email: newLead.email,
      phone: "Not provided",
      value: Number(newLead.value) || 0,
      status: "New",
      initials,
      color: "#d5ddf4",
      source: newLead.source,
      date: "Just now",
    };

    setLeads((current) => [lead, ...current]);
    setNewLead({
      name: "",
      company: "",
      email: "",
      value: "",
      source: "Website",
    });
    setShowAddLead(false);
  };

  const updateStatus = (id: number, status: LeadStatus) => {
    setLeads((current) =>
      current.map((lead) =>
        lead.id === id ? { ...lead, status } : lead
      )
    );

    setSelectedLead((current) =>
      current?.id === id ? { ...current, status } : current
    );
  };

  const navItems = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Leads", icon: Users },
    { label: "Pipeline", icon: Target },
    { label: "Activities", icon: Activity },
  ];

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#202939]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <AnimatePresence>
          {mobileSidebar && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebar(false)}
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            />
          )}
        </AnimatePresence>

        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-[255px] flex-col border-r border-[#eaecf0] bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
            mobileSidebar ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-[76px] items-center justify-between border-b border-[#eaecf0] px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#5546d7] text-white">
                <Command size={19} />
              </div>
              <div>
                <div className="text-[17px] font-bold tracking-[-0.7px]">
                  nexus<span className="text-[#7669e5]">.</span>
                </div>
                <div className="text-[9px] font-semibold uppercase tracking-[2px] text-[#98a2b3]">
                  CRM workspace
                </div>
              </div>
            </div>
            <button
              onClick={() => setMobileSidebar(false)}
              className="lg:hidden"
              aria-label="Close sidebar"
            >
              <X size={19} />
            </button>
          </div>

          <div className="px-4 pt-7">
            <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#98a2b3]">
              Workspace
            </div>

            <div className="mb-5 flex items-center justify-between rounded-lg border border-[#eaecf0] bg-[#fafbfc] p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e9e7ff] text-[#5546d7]">
                  <Building2 size={17} />
                </div>
                <div>
                  <div className="text-xs font-semibold">Azoytrix Studio</div>
                  <div className="mt-1 text-[10px] text-[#98a2b3]">
                    Free workspace
                  </div>
                </div>
              </div>
              <ChevronDown size={15} className="text-[#98a2b3]" />
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = activePage === item.label;

                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setActivePage(item.label);
                      setMobileSidebar(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-[13px] transition ${
                      active
                        ? "bg-[#f0efff] font-semibold text-[#5546d7]"
                        : "text-[#667085] hover:bg-[#f8f9fc] hover:text-[#344054]"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                    {item.label === "Leads" && (
                      <span className="ml-auto rounded-full bg-[#f2f4f7] px-2 py-0.5 text-[10px] text-[#667085]">
                        {leads.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="mb-3 mt-9 px-3 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#98a2b3]">
              Preferences
            </div>

            <button
              onClick={() => setActivePage("Settings")}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-[13px] transition ${
                activePage === "Settings"
                  ? "bg-[#f0efff] text-[#5546d7]"
                  : "text-[#667085] hover:bg-[#f8f9fc]"
              }`}
            >
              <Settings2 size={18} />
              Settings
            </button>
          </div>

          <div className="mt-auto border-t border-[#eaecf0] p-4">
            <div className="flex items-center gap-3 rounded-lg p-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dce7ff] text-xs font-bold text-[#3c5aa6]">
                AS
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-semibold">
                  Alex Morgan
                </div>
                <div className="mt-1 truncate text-[10px] text-[#98a2b3]">
                  alex@azoytrix.com
                </div>
              </div>
              <MoreHorizontal size={18} className="text-[#98a2b3]" />
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1">
          {/* Topbar */}
          <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-[#eaecf0] bg-white/90 px-5 backdrop-blur-xl md:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileSidebar(true)}
                className="rounded-lg border border-[#eaecf0] p-2 lg:hidden"
                aria-label="Open sidebar"
              >
                <Menu size={19} />
              </button>
              <div>
                <div className="text-[15px] font-semibold">
                  {activePage}
                </div>
                <div className="mt-1 text-[10px] text-[#98a2b3]">
                  Workspace / {activePage}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-lg border border-[#eaecf0] bg-[#fafbfc] px-3 py-2.5 sm:flex">
                <Search size={15} className="text-[#98a2b3]" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search leads..."
                  className="w-[145px] bg-transparent text-xs outline-none placeholder:text-[#98a2b3]"
                />
                <kbd className="rounded border border-[#eaecf0] bg-white px-1.5 py-0.5 text-[9px] text-[#98a2b3]">
                  /
                </kbd>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative rounded-lg border border-[#eaecf0] p-2.5 text-[#667085] hover:bg-[#f8f9fc]"
                  aria-label="Notifications"
                >
                  <Bell size={17} />
                  <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#f97066]" />
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 top-14 w-[280px] rounded-xl border border-[#eaecf0] bg-white p-4 shadow-xl"
                    >
                      <div className="text-sm font-semibold">
                        Notifications
                      </div>
                      <div className="mt-4 space-y-4">
                        <div className="flex gap-3">
                          <div className="mt-1 h-2 w-2 rounded-full bg-[#7669e5]" />
                          <div>
                            <p className="text-xs font-medium">
                              New lead received
                            </p>
                            <p className="mt-1 text-[10px] text-[#98a2b3]">
                              Olivia Rhye · Today
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <div className="mt-1 h-2 w-2 rounded-full bg-[#12b76a]" />
                          <div>
                            <p className="text-xs font-medium">
                              Deal marked as won
                            </p>
                            <p className="mt-1 text-[10px] text-[#98a2b3]">
                              Drew Cano · Yesterday
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e9e7ff] text-[11px] font-bold text-[#5546d7]">
                AS
              </button>
            </div>
          </header>

          <div className="mx-auto max-w-[1500px] px-5 py-8 md:px-8 md:py-10">
            {/* Page intro */}
            <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
              <div>
                <div className="text-xs text-[#98a2b3]">
                  Friday, November 28, 2026
                </div>
                <h1 className="mt-2 text-2xl font-semibold tracking-[-1px] md:text-[30px]">
                  Good morning, Alex
                  <span className="ml-2">✦</span>
                </h1>
                <p className="mt-2 text-sm text-[#667085]">
                  Here&apos;s what&apos;s happening with your sales today.
                </p>
              </div>

              <button
                onClick={() => setShowAddLead(true)}
                className="flex items-center gap-2 rounded-lg bg-[#5546d7] px-5 py-3 text-xs font-semibold text-white shadow-[0_3px_10px_rgba(85,70,215,0.2)] transition hover:bg-[#4536c7]"
              >
                <Plus size={16} />
                Add new lead
              </button>
            </div>

            {/* Metric cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  label: "Total pipeline",
                  value: currency(totalValue),
                  change: "+12.8%",
                  icon: CircleDollarSign,
                  note: "vs. last month",
                  positive: true,
                  tint: "bg-[#e9e7ff] text-[#6657d9]",
                },
                {
                  label: "Active leads",
                  value: String(leads.length),
                  change: "+8.2%",
                  icon: Users,
                  note: "vs. last month",
                  positive: true,
                  tint: "bg-[#e4f3ed] text-[#15966a]",
                },
                {
                  label: "Deals won",
                  value: String(leads.filter((l) => l.status === "Won").length),
                  change: "+16.4%",
                  icon: CheckCircle2,
                  note: "vs. last month",
                  positive: true,
                  tint: "bg-[#e5efff] text-[#4285db]",
                },
                {
                  label: "Revenue closed",
                  value: currency(wonValue),
                  change: "-2.4%",
                  icon: TrendingUp,
                  note: "vs. last month",
                  positive: false,
                  tint: "bg-[#fff1e5] text-[#e58a42]",
                },
              ].map((metric) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.label}
                    className="rounded-xl border border-[#eaecf0] bg-white p-5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#667085]">
                        {metric.label}
                      </span>
                      <div className={`rounded-lg p-2 ${metric.tint}`}>
                        <Icon size={17} />
                      </div>
                    </div>
                    <div className="mt-5 text-[28px] font-semibold tracking-[-1px]">
                      {metric.value}
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-[10px]">
                      <span
                        className={`flex items-center gap-1 font-semibold ${
                          metric.positive
                            ? "text-[#12a56c]"
                            : "text-[#e05c58]"
                        }`}
                      >
                        {metric.positive ? (
                          <ArrowUpRight size={13} />
                        ) : (
                          <ArrowDownRight size={13} />
                        )}
                        {metric.change}
                      </span>
                      <span className="text-[#98a2b3]">{metric.note}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Charts and activity */}
            <div className="mt-6 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
              <section className="rounded-xl border border-[#eaecf0] bg-white p-5 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-sm font-semibold">
                      Revenue performance
                    </h2>
                    <p className="mt-1 text-[10px] text-[#98a2b3]">
                      Revenue generated over the last 7 months
                    </p>
                  </div>
                  <select className="rounded-lg border border-[#eaecf0] bg-white px-3 py-2 text-[10px] text-[#667085] outline-none">
                    <option>Last 7 months</option>
                    <option>This year</option>
                  </select>
                </div>

                <div className="mt-7 flex items-end gap-3">
                  <div className="text-3xl font-semibold tracking-tight">
                    ₹24.8L
                  </div>
                  <span className="mb-1 flex items-center gap-1 text-[10px] font-semibold text-[#12a56c]">
                    <ArrowUpRight size={13} /> 18.6%
                  </span>
                </div>

                <div className="mt-8 flex h-[185px] items-end justify-between gap-3 border-b border-l border-[#eaecf0] px-3 pb-0">
                  {[
                    { month: "May", value: 38, previous: 25 },
                    { month: "Jun", value: 52, previous: 35 },
                    { month: "Jul", value: 44, previous: 30 },
                    { month: "Aug", value: 70, previous: 46 },
                    { month: "Sep", value: 60, previous: 38 },
                    { month: "Oct", value: 84, previous: 50 },
                    { month: "Nov", value: 96, previous: 60 },
                  ].map((item) => (
                    <div
                      key={item.month}
                      className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                    >
                      <div className="flex h-full w-full items-end justify-center gap-1">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${item.previous}%` }}
                          transition={{ duration: 0.8 }}
                          className="w-[35%] rounded-t-sm bg-[#d9d6fb]"
                        />
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${item.value}%` }}
                          transition={{ duration: 0.8, delay: 0.1 }}
                          className="w-[35%] rounded-t-sm bg-[#7568e5]"
                        />
                      </div>
                      <span className="pb-3 text-[9px] text-[#98a2b3]">
                        {item.month}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex justify-center gap-6">
                  <span className="flex items-center gap-2 text-[10px] text-[#667085]">
                    <span className="h-2 w-2 rounded-sm bg-[#7568e5]" />
                    This period
                  </span>
                  <span className="flex items-center gap-2 text-[10px] text-[#667085]">
                    <span className="h-2 w-2 rounded-sm bg-[#d9d6fb]" />
                    Previous period
                  </span>
                </div>
              </section>

              <section className="rounded-xl border border-[#eaecf0] bg-white p-5 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold">
                      Today&apos;s activities
                    </h2>
                    <p className="mt-1 text-[10px] text-[#98a2b3]">
                      Your upcoming schedule
                    </p>
                  </div>
                  <button className="rounded-lg border border-[#eaecf0] p-2 text-[#667085]">
                    <CalendarDays size={16} />
                  </button>
                </div>

                <div className="mt-7 space-y-5">
                  {tasks.map((task, index) => (
                    <div key={task.title} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className="mt-1 h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: task.color }}
                        />
                        {index !== tasks.length - 1 && (
                          <div className="mt-2 h-10 w-px bg-[#eaecf0]" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold">
                          {task.title}
                        </div>
                        <div className="mt-1 truncate text-[10px] text-[#98a2b3]">
                          {task.detail}
                        </div>
                      </div>
                      <div className="whitespace-nowrap pt-0.5 text-[10px] text-[#667085]">
                        {task.time}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setActivePage("Activities")}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-[#eaecf0] py-3 text-[11px] font-semibold text-[#5546d7] transition hover:bg-[#f8f7ff]"
                >
                  View all activities
                  <ArrowUpRight size={14} />
                </button>
              </section>
            </div>

            {/* Leads */}
            <section className="mt-6 overflow-hidden rounded-xl border border-[#eaecf0] bg-white">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eaecf0] p-5 md:p-6">
                <div>
                  <h2 className="text-sm font-semibold">
                    {activePage === "Pipeline"
                      ? "Sales pipeline"
                      : activePage === "Leads"
                        ? "All leads"
                        : "Recent leads"}
                  </h2>
                  <p className="mt-1 text-[10px] text-[#98a2b3]">
                    Track prospects and move opportunities forward
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 rounded-lg border border-[#eaecf0] px-3 py-2 sm:hidden">
                    <Search size={14} className="text-[#98a2b3]" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search..."
                      className="w-24 bg-transparent text-xs outline-none"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-lg border border-[#eaecf0] bg-white px-3 py-2.5 text-[10px] outline-none"
                  >
                    <option value="All">All statuses</option>
                    {stages.map((stage) => (
                      <option key={stage}>{stage}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => setShowAddLead(true)}
                    className="flex items-center gap-2 rounded-lg border border-[#eaecf0] px-3 py-2.5 text-[10px] font-semibold hover:bg-[#f8f9fc]"
                  >
                    <Plus size={14} />
                    Add lead
                  </button>
                </div>
              </div>

              {activePage === "Pipeline" ? (
                <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-4">
                  {stages.map((stage) => {
                    const stageLeads = filteredLeads.filter(
                      (lead) => lead.status === stage
                    );
                    const stageValue = stageLeads.reduce(
                      (sum, lead) => sum + lead.value,
                      0
                    );

                    return (
                      <div
                        key={stage}
                        className="min-w-0 rounded-xl bg-[#f8f9fc] p-3"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-semibold">
                              {stage}
                            </div>
                            <div className="mt-1 text-[10px] text-[#98a2b3]">
                              {stageLeads.length} opportunities
                            </div>
                          </div>
                          <span className="text-[10px] font-semibold text-[#667085]">
                            {currency(stageValue)}
                          </span>
                        </div>

                        <div className="space-y-3">
                          {stageLeads.map((lead) => (
                            <button
                              key={lead.id}
                              onClick={() => setSelectedLead(lead)}
                              className="w-full rounded-lg border border-[#eaecf0] bg-white p-3 text-left transition hover:border-[#b7b0f2] hover:shadow-sm"
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className="flex h-8 w-8 items-center justify-center rounded-full text-[9px] font-bold text-[#344054]"
                                  style={{ backgroundColor: lead.color }}
                                >
                                  {lead.initials}
                                </div>
                                <div className="min-w-0">
                                  <div className="truncate text-xs font-semibold">
                                    {lead.name}
                                  </div>
                                  <div className="mt-0.5 truncate text-[10px] text-[#98a2b3]">
                                    {lead.company}
                                  </div>
                                </div>
                              </div>
                              <div className="mt-4 flex items-center justify-between border-t border-[#eaecf0] pt-3">
                                <span className="text-xs font-semibold">
                                  {currency(lead.value)}
                                </span>
                                <span className="text-[9px] text-[#98a2b3]">
                                  {lead.date}
                                </span>
                              </div>
                            </button>
                          ))}
                          {stageLeads.length === 0 && (
                            <div className="rounded-lg border border-dashed border-[#d0d5dd] py-8 text-center text-[10px] text-[#98a2b3]">
                              No leads in this stage
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[720px] text-left">
                    <thead>
                      <tr className="bg-[#fafbfc] text-[10px] font-semibold text-[#98a2b3]">
                        <th className="px-6 py-4">CONTACT</th>
                        <th className="px-5 py-4">COMPANY</th>
                        <th className="px-5 py-4">VALUE</th>
                        <th className="px-5 py-4">STATUS</th>
                        <th className="px-5 py-4">SOURCE</th>
                        <th className="px-5 py-4">ADDED</th>
                        <th className="px-5 py-4" />
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLeads.map((lead) => (
                        <tr
                          key={lead.id}
                          className="border-t border-[#eaecf0] transition hover:bg-[#fafbfc]"
                        >
                          <td className="px-6 py-4">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="flex items-center gap-3 text-left"
                            >
                              <div
                                className="flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-bold"
                                style={{ backgroundColor: lead.color }}
                              >
                                {lead.initials}
                              </div>
                              <div>
                                <div className="text-xs font-semibold">
                                  {lead.name}
                                </div>
                                <div className="mt-1 text-[10px] text-[#98a2b3]">
                                  {lead.email}
                                </div>
                              </div>
                            </button>
                          </td>
                          <td className="px-5 py-4 text-xs text-[#667085]">
                            {lead.company}
                          </td>
                          <td className="px-5 py-4 text-xs font-semibold">
                            {currency(lead.value)}
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={`rounded-full px-2.5 py-1.5 text-[9px] font-semibold ${
                                lead.status === "Won"
                                  ? "bg-[#e7f6ec] text-[#16834d]"
                                  : lead.status === "Qualified"
                                    ? "bg-[#e9e7ff] text-[#5b4acb]"
                                    : lead.status === "Contacted"
                                      ? "bg-[#fff3df] text-[#b7791f]"
                                      : "bg-[#f2f4f7] text-[#667085]"
                              }`}
                            >
                              {lead.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-xs text-[#667085]">
                            {lead.source}
                          </td>
                          <td className="px-5 py-4 text-xs text-[#98a2b3]">
                            {lead.date}
                          </td>
                          <td className="px-5 py-4">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="rounded-lg p-2 text-[#98a2b3] hover:bg-[#f2f4f7]"
                              aria-label="View lead"
                            >
                              <MoreHorizontal size={17} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredLeads.length === 0 && (
                    <div className="py-12 text-center text-xs text-[#98a2b3]">
                      No leads match your search.
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#eaecf0] px-5 py-4 text-[10px] text-[#98a2b3]">
                <span>
                  Showing {filteredLeads.length} of {leads.length} leads
                </span>
                <span>Demo workspace · Local sample data</span>
              </div>
            </section>

            {/* Bottom info */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[10px] text-[#98a2b3]">
              <span>© 2026 Nexus CRM · A product concept by Azoytrix</span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#12b76a]" />
                Demo environment active
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Add lead modal */}
      <AnimatePresence>
        {showAddLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddLead(false)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[#101828]/50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Create new lead</h3>
                  <p className="mt-1 text-xs text-[#98a2b3]">
                    Add a new prospect to your pipeline.
                  </p>
                </div>
                <button
                  onClick={() => setShowAddLead(false)}
                  aria-label="Close add lead form"
                >
                  <X size={19} className="text-[#98a2b3]" />
                </button>
              </div>

              <form onSubmit={addLead} className="mt-7 space-y-4">
                {[
                  {
                    label: "Full name",
                    key: "name",
                    placeholder: "e.g. Jordan Lee",
                    type: "text",
                  },
                  {
                    label: "Company",
                    key: "company",
                    placeholder: "Company name",
                    type: "text",
                  },
                  {
                    label: "Email address",
                    key: "email",
                    placeholder: "name@company.com",
                    type: "email",
                  },
                  {
                    label: "Estimated deal value (₹)",
                    key: "value",
                    placeholder: "500000",
                    type: "number",
                  },
                ].map((field) => (
                  <label key={field.key} className="block">
                    <span className="mb-2 block text-xs font-medium text-[#344054]">
                      {field.label}
                    </span>
                    <input
                      required
                      type={field.type}
                      value={newLead[field.key as keyof typeof newLead]}
                      onChange={(e) =>
                        setNewLead((current) => ({
                          ...current,
                          [field.key]: e.target.value,
                        }))
                      }
                      placeholder={field.placeholder}
                      className="w-full rounded-lg border border-[#d0d5dd] px-4 py-3 text-xs outline-none transition focus:border-[#7669e5] focus:ring-2 focus:ring-[#7669e5]/10"
                    />
                  </label>
                ))}

                <label className="block">
                  <span className="mb-2 block text-xs font-medium text-[#344054]">
                    Lead source
                  </span>
                  <select
                    value={newLead.source}
                    onChange={(e) =>
                      setNewLead((current) => ({
                        ...current,
                        source: e.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-[#d0d5dd] bg-white px-4 py-3 text-xs outline-none focus:border-[#7669e5]"
                  >
                    <option>Website</option>
                    <option>Referral</option>
                    <option>LinkedIn</option>
                    <option>Campaign</option>
                  </select>
                </label>

                <button
                  type="submit"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-[#5546d7] py-3.5 text-xs font-semibold text-white transition hover:bg-[#4536c7]"
                >
                  <Plus size={15} />
                  Create lead
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lead details */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLead(null)}
            className="fixed inset-0 z-[80] flex justify-end bg-[#101828]/40 backdrop-blur-sm"
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="h-full w-full max-w-[440px] overflow-y-auto bg-white p-6 shadow-2xl sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#667085]">
                  Lead details
                </span>
                <button
                  onClick={() => setSelectedLead(null)}
                  aria-label="Close lead details"
                >
                  <X size={19} className="text-[#98a2b3]" />
                </button>
              </div>

              <div className="mt-9 flex items-center gap-4">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold"
                  style={{ backgroundColor: selectedLead.color }}
                >
                  {selectedLead.initials}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedLead.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#98a2b3]">
                    {selectedLead.company}
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-xl bg-[#f8f9fc] p-5">
                <div className="text-[10px] font-semibold uppercase tracking-[1px] text-[#98a2b3]">
                  Potential deal value
                </div>
                <div className="mt-2 text-3xl font-semibold tracking-tight">
                  {currency(selectedLead.value)}
                </div>
                <div className="mt-3 flex items-center gap-2 text-[10px] text-[#667085]">
                  <span className="rounded-full bg-[#e9e7ff] px-2.5 py-1 font-semibold text-[#5546d7]">
                    {selectedLead.status}
                  </span>
                  via {selectedLead.source}
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-xs font-semibold">Contact information</h4>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-3 text-xs text-[#667085]">
                    <Mail size={16} className="text-[#98a2b3]" />
                    {selectedLead.email}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#667085]">
                    <Phone size={16} className="text-[#98a2b3]" />
                    {selectedLead.phone}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#667085]">
                    <Clock3 size={16} className="text-[#98a2b3]" />
                    Added {selectedLead.date}
                  </div>
                </div>
              </div>

              <div className="mt-9 border-t border-[#eaecf0] pt-7">
                <h4 className="text-xs font-semibold">Update lead stage</h4>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {stages.map((stage) => (
                    <button
                      key={stage}
                      onClick={() => updateStatus(selectedLead.id, stage)}
                      className={`rounded-lg border px-3 py-3 text-xs font-medium transition ${
                        selectedLead.status === stage
                          ? "border-[#7669e5] bg-[#f0efff] text-[#5546d7]"
                          : "border-[#eaecf0] text-[#667085] hover:bg-[#f8f9fc]"
                      }`}
                    >
                      {stage}
                      {selectedLead.status === stage && (
                        <Check size={12} className="ml-2 inline" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-[#eaecf0] p-5">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <Activity size={16} className="text-[#7669e5]" />
                  Activity timeline
                </div>
                <div className="mt-5 space-y-4">
                  <div className="flex gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#7669e5]" />
                    <div>
                      <div className="text-xs font-medium">Lead created</div>
                      <div className="mt-1 text-[10px] text-[#98a2b3]">
                        {selectedLead.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-[#d0d5dd]" />
                    <div>
                      <div className="text-xs font-medium">Initial review</div>
                      <div className="mt-1 text-[10px] text-[#98a2b3]">
                        Sample activity entry
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
