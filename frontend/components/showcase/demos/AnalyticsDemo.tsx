
"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  CreditCard,
  Download,
  Globe2,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Search,
  Settings,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";

import DemoButton from "@/components/showcase/shared/DemoButton";
import DemoModal from "@/components/showcase/shared/DemoModal";

const navigation = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Analytics", icon: BarChart3 },
  { label: "Customers", icon: Users },
  { label: "Transactions", icon: CreditCard },
  { label: "Products", icon: ShoppingBag },
];

const transactions = [
  {
    id: "#TRX-8291",
    customer: "Olivia Rhye",
    email: "olivia@example.com",
    product: "Pro Subscription",
    amount: "$249.00",
    status: "Completed",
    initials: "OR",
  },
  {
    id: "#TRX-8290",
    customer: "Phoenix Baker",
    email: "phoenix@example.com",
    product: "Enterprise Plan",
    amount: "$599.00",
    status: "Completed",
    initials: "PB",
  },
  {
    id: "#TRX-8289",
    customer: "Lana Steiner",
    email: "lana@example.com",
    product: "Starter Plan",
    amount: "$49.00",
    status: "Pending",
    initials: "LS",
  },
  {
    id: "#TRX-8288",
    customer: "Demi Wilkinson",
    email: "demi@example.com",
    product: "Pro Subscription",
    amount: "$249.00",
    status: "Completed",
    initials: "DW",
  },
  {
    id: "#TRX-8287",
    customer: "Candice Wu",
    email: "candice@example.com",
    product: "Business Plan",
    amount: "$399.00",
    status: "Refunded",
    initials: "CW",
  },
];

const chartData = {
  "7 days": [32, 45, 38, 60, 49, 72, 65, 82, 70, 94, 78, 100],
  "30 days": [28, 39, 35, 54, 47, 62, 57, 77, 68, 88, 76, 100],
  "90 days": [18, 31, 29, 43, 38, 58, 52, 69, 61, 81, 74, 100],
};

const trafficSources = [
  { name: "Direct", visitors: "8,549", percent: 42, color: "#6366f1" },
  { name: "Organic Search", visitors: "5,284", percent: 28, color: "#06b6d4" },
  { name: "Social Media", visitors: "3,142", percent: 19, color: "#a78bfa" },
  { name: "Referral", visitors: "1,826", percent: 11, color: "#f59e0b" },
];

export default function AnalyticsDemo() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [period, setPeriod] = useState("30 days");
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exported, setExported] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((transaction) =>
        `${transaction.customer} ${transaction.id} ${transaction.product}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  );

  const currentChart = chartData[period as keyof typeof chartData];

  const stats = [
    {
      label: "Total Revenue",
      value: period === "7 days" ? "$18,245" : period === "90 days" ? "$284,592" : "$84,254",
      change: "+12.8%",
      positive: true,
      icon: CreditCard,
      iconClass: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Total Customers",
      value: period === "7 days" ? "1,284" : period === "90 days" ? "18,492" : "8,549",
      change: "+8.2%",
      positive: true,
      icon: Users,
      iconClass: "bg-cyan-50 text-cyan-600",
    },
    {
      label: "Total Orders",
      value: period === "7 days" ? "842" : period === "90 days" ? "12,843" : "3,642",
      change: "+5.4%",
      positive: true,
      icon: ShoppingBag,
      iconClass: "bg-violet-50 text-violet-600",
    },
    {
      label: "Conversion Rate",
      value: "3.24%",
      change: "-0.8%",
      positive: false,
      icon: Activity,
      iconClass: "bg-amber-50 text-amber-600",
    },
  ];

  function handleExport() {
    const csv = [
      "Transaction ID,Customer,Email,Product,Amount,Status",
      ...transactions.map((item) =>
        [
          item.id,
          item.customer,
          item.email,
          item.product,
          item.amount,
          item.status,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "azoytrix-analytics-report.csv";
    link.click();

    URL.revokeObjectURL(url);
    setExported(true);
  }

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-900">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-[250px] flex-col border-r border-slate-200 bg-white transition-transform lg:static lg:translate-x-0 ${
            mobileMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-[76px] items-center justify-between border-b border-slate-100 px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <BarChart3 size={21} />
              </div>
              <div>
                <p className="text-lg font-bold tracking-tight">Nexus</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Analytics Suite
                </p>
              </div>
            </div>

            <button
              onClick={() => setMobileMenu(false)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
              aria-label="Close menu"
            >
              <X size={19} />
            </button>
          </div>

          <div className="px-4 pt-7">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Workspace
            </p>

            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = activeNav === item.label;

                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setActiveNav(item.label);
                      setMobileMenu(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                      active
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                    {item.label === "Transactions" && (
                      <span className="ml-auto rounded-md bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">
                        12
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mt-9 px-4">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              General
            </p>

            <button
              onClick={() => setShowSettings(true)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <Settings size={18} />
              Settings
            </button>

            <button
              onClick={() => setShowSettings(true)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <CircleHelp size={18} />
              Help & Support
            </button>
          </div>

          <div className="mt-auto p-4">
            <div className="rounded-2xl bg-slate-950 p-4 text-white">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">
                  Pro Workspace
                </span>
                <span className="rounded-md bg-indigo-500/20 px-2 py-1 text-[9px] font-bold text-indigo-300">
                  ACTIVE
                </span>
              </div>
              <p className="text-sm font-semibold">Your insights, upgraded.</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                Explore your business performance in one place.
              </p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[72%] rounded-full bg-indigo-400" />
              </div>
              <p className="mt-2 text-[10px] text-slate-400">
                Workspace health · 72%
              </p>
            </div>

            <div className="mt-5 flex items-center gap-3 px-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                JD
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold">Jordan Davis</p>
                <p className="truncate text-[10px] text-slate-400">
                  Admin Account
                </p>
              </div>
              <MoreHorizontal size={18} className="text-slate-400" />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          {/* Top navigation */}
          <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl sm:px-7 lg:px-9">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenu(true)}
                className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={21} />
              </button>

              <div>
                <p className="text-[10px] font-medium text-slate-400">
                  Workspace / {activeNav}
                </p>
                <h1 className="text-sm font-bold text-slate-900 sm:text-base">
                  {activeNav}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500 md:flex">
                <Search size={15} />
                <span>Search anything...</span>
                <kbd className="ml-5 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[9px]">
                  /
                </kbd>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 transition hover:bg-slate-50"
                  aria-label="Notifications"
                >
                  <Bell size={17} />
                  <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white" />
                </button>

                {showNotifications && (
                  <div className="absolute right-0 top-12 z-50 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                    <p className="font-bold text-slate-900">Notifications</p>
                    <div className="mt-4 space-y-3 text-xs">
                      <p className="rounded-xl bg-indigo-50 p-3 text-indigo-800">
                        Your weekly revenue report is ready.
                      </p>
                      <p className="rounded-xl bg-slate-50 p-3 text-slate-600">
                        You received 12 new customer signups.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="hidden h-8 w-px bg-slate-200 sm:block" />

              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                  JD
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-bold">Jordan Davis</p>
                  <p className="text-[10px] text-slate-400">Administrator</p>
                </div>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1500px] space-y-7 p-4 sm:p-7 lg:p-9">
            {/* Page heading */}
            <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-600">
                    Live overview
                  </p>
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  Good morning, Jordan
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Here's what's happening with your business today.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1">
                  {(["7 days", "30 days", "90 days"] as const).map((item) => (
                    <button
                      key={item}
                      onClick={() => setPeriod(item)}
                      className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                        period === item
                          ? "bg-indigo-600 text-white shadow-sm"
                          : "text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <DemoButton
                  variant="secondary"
                  icon={<Download size={15} />}
                  onClick={() => {
                    setExported(false);
                    setShowExportModal(true);
                  }}
                >
                  Export
                </DemoButton>
              </div>
            </section>

            {/* KPI cards */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.025)] transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-500">
                        {stat.label}
                      </p>
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.iconClass}`}
                      >
                        <Icon size={18} />
                      </div>
                    </div>

                    <div className="mt-5 flex items-end justify-between gap-2">
                      <p className="text-2xl font-bold tracking-tight text-slate-950">
                        {stat.value}
                      </p>
                      <span
                        className={`mb-1 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-bold ${
                          stat.positive
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-rose-50 text-rose-600"
                        }`}
                      >
                        {stat.positive ? (
                          <ArrowUpRight size={12} />
                        ) : (
                          <ArrowDownRight size={12} />
                        )}
                        {stat.change}
                      </span>
                    </div>

                    <p className="mt-2 text-[10px] text-slate-400">
                      Compared to previous period
                    </p>
                  </div>
                );
              })}
            </section>

            {/* Chart and traffic */}
            <section className="grid gap-5 xl:grid-cols-[1.7fr_1fr]">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Revenue Overview
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Revenue performance over the selected period
                    </p>
                  </div>
                  <button className="rounded-lg border border-slate-200 p-2 text-slate-400 hover:bg-slate-50">
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                <div className="mt-6 flex items-end gap-3">
                  <p className="text-3xl font-bold tracking-tight text-slate-950">
                    {period === "7 days"
                      ? "$18,245.00"
                      : period === "90 days"
                        ? "$284,592.00"
                        : "$84,254.00"}
                  </p>
                  <span className="mb-1 inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                    <ArrowUpRight size={14} />
                    12.8%
                  </span>
                </div>

                <div className="mt-5 h-[220px] w-full">
                  <svg
                    viewBox="0 0 720 220"
                    preserveAspectRatio="none"
                    className="h-full w-full overflow-visible"
                    role="img"
                    aria-label={`Revenue chart for ${period}`}
                  >
                    <defs>
                      <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {[35, 80, 125, 170].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2="720"
                        y2={y}
                        stroke="#e9edf5"
                        strokeDasharray="4 5"
                      />
                    ))}

                    <path
                      d={`M ${currentChart
                        .map((value, index) => `${index * 65.4},${180 - value * 1.45}`)
                        .join(" L ")} L 719,190 L 0,190 Z`}
                      fill="url(#revenueFill)"
                    />

                    <path
                      d={`M ${currentChart
                        .map((value, index) => `${index * 65.4},${180 - value * 1.45}`)
                        .join(" L ")}`}
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />

                    {currentChart.map((value, index) => (
                      <circle
                        key={index}
                        cx={index * 65.4}
                        cy={180 - value * 1.45}
                        r="3"
                        fill="#6366f1"
                        stroke="white"
                        strokeWidth="2"
                      />
                    ))}
                  </svg>
                </div>

                <div className="mt-2 flex justify-between text-[10px] font-medium text-slate-400">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day) => (
                      <span key={day}>{day}</span>
                    )
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Traffic Sources
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Where visitors come from
                    </p>
                  </div>
                  <Globe2 size={18} className="text-slate-400" />
                </div>

                <div className="mt-7 flex items-center justify-center">
                  <div
                    className="relative flex h-40 w-40 items-center justify-center rounded-full"
                    style={{
                      background:
                        "conic-gradient(#6366f1 0% 42%, #06b6d4 42% 70%, #a78bfa 70% 89%, #f59e0b 89% 100%)",
                    }}
                  >
                    <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
                      <p className="text-2xl font-bold text-slate-950">18.8k</p>
                      <p className="text-[10px] text-slate-400">Visitors</p>
                    </div>
                  </div>
                </div>

                <div className="mt-7 space-y-4">
                  {trafficSources.map((source) => (
                    <div key={source.name}>
                      <div className="mb-2 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ background: source.color }}
                          />
                          <span className="font-medium text-slate-600">
                            {source.name}
                          </span>
                        </div>
                        <span className="font-bold text-slate-800">
                          {source.percent}%
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${source.percent}%`,
                            background: source.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Transactions */}
            <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
              <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:px-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Recent Transactions
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    A summary of your latest customer activity
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2">
                    <Search size={14} className="text-slate-400" />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search transactions"
                      className="w-36 bg-transparent text-xs outline-none placeholder:text-slate-400 sm:w-44"
                    />
                  </div>
                  <button
                    onClick={() => setSearch("")}
                    className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left">
                  <thead>
                    <tr className="bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      <th className="px-6 py-4">Transaction</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredTransactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="transition hover:bg-slate-50/70"
                      >
                        <td className="px-6 py-4 text-xs font-semibold text-slate-500">
                          {transaction.id}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-bold text-indigo-700">
                              {transaction.initials}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-800">
                                {transaction.customer}
                              </p>
                              <p className="mt-1 text-[10px] text-slate-400">
                                {transaction.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-500">
                          {transaction.product}
                        </td>
                        <td className="px-6 py-4 text-xs font-bold text-slate-800">
                          {transaction.amount}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-lg px-2.5 py-1.5 text-[10px] font-bold ${
                              transaction.status === "Completed"
                                ? "bg-emerald-50 text-emerald-600"
                                : transaction.status === "Pending"
                                  ? "bg-amber-50 text-amber-600"
                                  : "bg-rose-50 text-rose-600"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-800">
                            <MoreHorizontal size={17} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredTransactions.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-10 text-center text-sm text-slate-400"
                        >
                          No transactions match your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col justify-between gap-2 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center">
                <p className="text-[10px] text-slate-400">
                  Showing {filteredTransactions.length} of {transactions.length} transactions
                </p>
                <button
                  onClick={() => setActiveNav("Transactions")}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                >
                  View all transactions →
                </button>
              </div>
            </section>

            {/* Footer */}
            <footer className="flex flex-col justify-between gap-2 pb-3 text-[10px] text-slate-400 sm:flex-row">
              <p>© 2026 Nexus Analytics. All rights reserved.</p>
              <p className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                All systems operational
                <span className="mx-1">·</span>
                Powered by Azoytrix
              </p>
            </footer>
          </div>
        </main>
      </div>

      {/* Export modal */}
      <DemoModal
        open={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export analytics report"
        description="Download the sample transaction data as a CSV file."
      >
        <div className="space-y-4">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                <Download size={19} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">
                  Transaction report
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  CSV file · {transactions.length} sample records
                </p>
              </div>
            </div>
          </div>

          {exported && (
            <p className="text-xs font-semibold text-emerald-600">
              Your report download has been started.
            </p>
          )}

          <div className="flex justify-end gap-2">
            <DemoButton
              variant="secondary"
              onClick={() => setShowExportModal(false)}
            >
              Close
            </DemoButton>
            <DemoButton onClick={handleExport} icon={<Download size={15} />}>
              Download CSV
            </DemoButton>
          </div>
        </div>
      </DemoModal>

      {/* Settings modal */}
      <DemoModal
        open={showSettings}
        onClose={() => setShowSettings(false)}
        title="Workspace settings"
        description="Manage your demo workspace preferences."
      >
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-sm font-semibold text-slate-800">
              Workspace name
            </p>
            <p className="mt-1 text-xs text-slate-500">Nexus Analytics</p>
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-sm font-semibold text-slate-800">
              Account email
            </p>
            <p className="mt-1 text-xs text-slate-500">
              jordan@example.com
            </p>
          </div>
          <div className="flex justify-end">
            <DemoButton onClick={() => setShowSettings(false)}>
              Done
            </DemoButton>
          </div>
        </div>
      </DemoModal>
    </div>
  );
}
