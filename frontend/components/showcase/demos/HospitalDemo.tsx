
"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Bed,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  ClipboardList,
  HeartPulse,
  Menu,
  Plus,
  Search,
  Stethoscope,
  Users,
  Wallet,
  X,
} from "lucide-react";

const initialPatients = [
  { id: "PT-2041", name: "Emma Johnson", age: 34, department: "Cardiology", doctor: "Dr. Williams", time: "09:15 AM", priority: "High", status: "In consultation", initials: "EJ", color: "bg-rose-100 text-rose-700" },
  { id: "PT-2042", name: "Liam Anderson", age: 52, department: "Neurology", doctor: "Dr. Miller", time: "09:30 AM", priority: "Normal", status: "Waiting", initials: "LA", color: "bg-blue-100 text-blue-700" },
  { id: "PT-2043", name: "Olivia Brown", age: 28, department: "Orthopedics", doctor: "Dr. Davis", time: "10:00 AM", priority: "Normal", status: "Waiting", initials: "OB", color: "bg-violet-100 text-violet-700" },
  { id: "PT-2044", name: "Noah Wilson", age: 65, department: "General Medicine", doctor: "Dr. Taylor", time: "10:15 AM", priority: "Critical", status: "Emergency", initials: "NW", color: "bg-amber-100 text-amber-700" },
  { id: "PT-2045", name: "Ava Martinez", age: 41, department: "Dermatology", doctor: "Dr. Clark", time: "10:45 AM", priority: "Normal", status: "Completed", initials: "AM", color: "bg-emerald-100 text-emerald-700" },
];

const departments = [
  { name: "Cardiology", doctors: 8, patients: 42, icon: HeartPulse, color: "bg-rose-50 text-rose-600" },
  { name: "Neurology", doctors: 6, patients: 28, icon: Activity, color: "bg-violet-50 text-violet-600" },
  { name: "Orthopedics", doctors: 7, patients: 35, icon: Stethoscope, color: "bg-blue-50 text-blue-600" },
  { name: "General Medicine", doctors: 12, patients: 64, icon: ClipboardList, color: "bg-emerald-50 text-emerald-600" },
];

export default function HospitalDemo() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [patients, setPatients] = useState(initialPatients);
  const [search, setSearch] = useState("");
  const [showAppointment, setShowAppointment] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [department, setDepartment] = useState("Cardiology");
  const [appointmentTime, setAppointmentTime] = useState("11:00 AM");
  const [notice, setNotice] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const filteredPatients = useMemo(
    () => patients.filter((patient) =>
      `${patient.name} ${patient.id} ${patient.department}`
        .toLowerCase()
        .includes(search.toLowerCase())
    ),
    [patients, search]
  );

  const navigation = [
    { label: "Dashboard", icon: Activity },
    { label: "Patients", icon: Users },
    { label: "Appointments", icon: CalendarDays },
    { label: "Departments", icon: Stethoscope },
    { label: "Bed Management", icon: Bed },
    { label: "Billing", icon: Wallet },
  ];

  function createAppointment() {
    if (!patientName.trim()) return;

    const initials = patientName
      .trim()
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    setPatients((previous) => [
      {
        id: `PT-${2046 + previous.length - initialPatients.length}`,
        name: patientName.trim(),
        age: 30,
        department,
        doctor: "Dr. Available",
        time: appointmentTime,
        priority: "Normal",
        status: "Waiting",
        initials,
        color: "bg-cyan-100 text-cyan-700",
      },
      ...previous,
    ]);

    setPatientName("");
    setShowAppointment(false);
    setNotice("Appointment added to the sample patient queue.");
  }

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-slate-800">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#142b35] text-white transition-transform lg:static lg:translate-x-0 ${mobileMenu ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-400 text-[#142b35]">
                <HeartPulse size={23} />
              </div>
              <div>
                <p className="font-bold tracking-tight">MediCare+</p>
                <p className="text-[10px] tracking-widest text-teal-200/70">HOSPITAL SYSTEM</p>
              </div>
            </div>
            <button onClick={() => setMobileMenu(false)} className="lg:hidden" aria-label="Close menu">
              <X size={20} />
            </button>
          </div>

          <div className="px-4 py-7">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Workspace</p>
            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setActiveNav(item.label);
                      setMobileMenu(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${activeNav === item.label ? "bg-teal-400 font-semibold text-[#142b35]" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}
                  >
                    <Icon size={18} />
                    {item.label}
                    {item.label === "Appointments" && (
                      <span className="ml-auto rounded-full bg-rose-500 px-2 py-0.5 text-[10px] text-white">5</span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto p-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-teal-300">
                <Activity size={17} />
                <span className="text-xs font-semibold">System Status</span>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                All systems operational
              </div>
              <p className="mt-3 text-[10px] text-slate-500">Demo environment · Sample data</p>
            </div>
          </div>
        </aside>

        {/* Main area */}
        <main className="min-w-0 flex-1">
          <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 md:px-8">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileMenu(true)} className="text-slate-500 lg:hidden" aria-label="Open menu">
                <Menu size={22} />
              </button>
              <div>
                <p className="text-xs text-slate-400">MediCare+ / {activeNav}</p>
                <h1 className="text-lg font-bold text-slate-900">{activeNav}</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setNotice("No new hospital notifications.")} aria-label="Notifications" className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500">
                <Bell size={18} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
              </button>
              <div className="hidden items-center gap-3 border-l border-slate-200 pl-4 sm:flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-800">AD</div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Admin Desk</p>
                  <p className="text-xs text-slate-400">Hospital Administrator</p>
                </div>
                <ChevronDown size={15} className="text-slate-400" />
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1500px] space-y-7 p-5 md:p-8">
            {notice && (
              <div className="flex items-center justify-between rounded-xl border border-teal-100 bg-teal-50 px-4 py-3 text-sm text-teal-800">
                {notice}
                <button onClick={() => setNotice("")} aria-label="Dismiss"><X size={16} /></button>
              </div>
            )}

            <section className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm text-slate-500">Saturday, November 28, 2026</p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">Hospital Overview</h2>
                <p className="mt-2 text-sm text-slate-500">Your hospital operations at a glance.</p>
              </div>
              <button onClick={() => setShowAppointment(true)} className="flex items-center justify-center gap-2 rounded-xl bg-[#147d79] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-800/15 transition hover:bg-[#116b68]">
                <Plus size={18} />
                New Appointment
              </button>
            </section>

            {/* Summary cards */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Total Patients", value: "1,284", sub: "+8.4% this month", icon: Users, color: "bg-blue-50 text-blue-600" },
                { label: "Available Doctors", value: "48", sub: "Out of 56 doctors", icon: Stethoscope, color: "bg-teal-50 text-teal-700" },
                { label: "Appointments Today", value: String(128 + patients.length - initialPatients.length), sub: "18 remaining", icon: CalendarDays, color: "bg-violet-50 text-violet-600" },
                { label: "Available Beds", value: "32", sub: "68% occupancy", icon: Bed, color: "bg-amber-50 text-amber-600" },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}><Icon size={21} /></div>
                      <ArrowUpRight size={17} className="text-emerald-500" />
                    </div>
                    <p className="mt-5 text-sm text-slate-500">{stat.label}</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p className="mt-2 text-xs text-slate-400">{stat.sub}</p>
                  </div>
                );
              })}
            </section>

            {/* Patient queue and beds */}
            <section className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 md:flex-row md:items-center">
                  <div>
                    <h3 className="font-bold text-slate-900">Patient Queue</h3>
                    <p className="mt-1 text-xs text-slate-400">Today&apos;s appointments and consultations</p>
                  </div>
                  <div className="relative">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search patients..." className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-xs outline-none focus:border-teal-500 sm:w-52" />
                  </div>
                </div>
                <div className="divide-y divide-slate-100">
                  {filteredPatients.map((patient) => (
                    <div key={patient.id} className="flex flex-wrap items-center gap-3 px-5 py-4 transition hover:bg-slate-50">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${patient.color}`}>{patient.initials}</div>
                      <div className="min-w-[125px] flex-1">
                        <p className="text-sm font-semibold text-slate-800">{patient.name}</p>
                        <p className="mt-1 text-[11px] text-slate-400">{patient.id} · {patient.age} years</p>
                      </div>
                      <div className="hidden min-w-[115px] sm:block">
                        <p className="text-xs font-medium text-slate-700">{patient.department}</p>
                        <p className="mt-1 text-[11px] text-slate-400">{patient.doctor}</p>
                      </div>
                      <div className="hidden text-xs text-slate-500 md:block">{patient.time}</div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`rounded-full px-2 py-1 text-[9px] font-bold ${patient.priority === "Critical" ? "bg-rose-100 text-rose-700" : patient.priority === "High" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"}`}>{patient.priority}</span>
                        <span className={`text-[10px] font-medium ${patient.status === "Completed" ? "text-emerald-600" : patient.status === "Emergency" ? "text-rose-600" : "text-slate-400"}`}>{patient.status}</span>
                      </div>
                    </div>
                  ))}
                  {filteredPatients.length === 0 && (
                    <p className="px-5 py-10 text-center text-sm text-slate-400">No matching patients found.</p>
                  )}
                </div>
                <div className="border-t border-slate-100 px-5 py-4">
                  <button onClick={() => setActiveNav("Patients")} className="text-xs font-semibold text-teal-700 hover:text-teal-900">View all patients →</button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900">Bed Availability</h3>
                      <p className="mt-1 text-xs text-slate-400">Hospital capacity overview</p>
                    </div>
                    <Bed size={20} className="text-teal-600" />
                  </div>
                  <div className="mt-6 flex items-center gap-6">
                    <div className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full" style={{ background: "conic-gradient(#147d79 0% 68%, #e2e8f0 68% 100%)" }}>
                      <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white">
                        <span className="text-2xl font-bold text-slate-900">68%</span>
                        <span className="text-[10px] text-slate-400">Occupied</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div><p className="text-xl font-bold text-slate-900">68</p><p className="text-xs text-slate-400">Total beds</p></div>
                      <div><p className="text-xl font-bold text-teal-700">32</p><p className="text-xs text-slate-400">Available beds</p></div>
                    </div>
                  </div>
                  <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-[68%] rounded-full bg-teal-600" /></div>
                </div>

                <div className="rounded-2xl bg-[#142b35] p-5 text-white">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Emergency Response</p>
                    <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2 py-1 text-[9px] font-bold text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> READY</span>
                  </div>
                  <p className="mt-4 text-3xl font-bold">04<span className="ml-2 text-sm font-normal text-slate-400">response teams</span></p>
                  <p className="mt-2 text-xs text-slate-400">Sample operational status for this demo.</p>
                </div>
              </div>
            </section>

            {/* Departments */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">Medical Departments</h3>
                  <p className="mt-1 text-xs text-slate-400">Department activity overview</p>
                </div>
                <button onClick={() => setActiveNav("Departments")} className="text-xs font-semibold text-teal-700">All departments →</button>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {departments.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.name} className="rounded-xl border border-slate-100 p-4 transition hover:border-teal-200 hover:shadow-sm">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}><Icon size={20} /></div>
                      <p className="mt-4 text-sm font-semibold text-slate-800">{item.name}</p>
                      <div className="mt-3 flex justify-between text-xs text-slate-400">
                        <span>{item.doctors} doctors</span>
                        <span>{item.patients} patients</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <footer className="flex flex-col justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row">
              <p>© 2026 MediCare+ Hospital Management · Demo interface</p>
              <p>Care, coordination and clarity.</p>
            </footer>
          </div>
        </main>
      </div>

      {/* Appointment modal */}
      {showAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">New Appointment</h3>
                <p className="mt-1 text-xs text-slate-400">Add a sample patient appointment</p>
              </div>
              <button onClick={() => setShowAppointment(false)} aria-label="Close"><X size={20} className="text-slate-400" /></button>
            </div>
            <label className="mt-6 block text-xs font-semibold text-slate-600">Patient name</label>
            <input value={patientName} onChange={(event) => setPatientName(event.target.value)} placeholder="Enter patient name" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500" />
            <label className="mt-4 block text-xs font-semibold text-slate-600">Department</label>
            <select value={department} onChange={(event) => setDepartment(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500">
              {departments.map((item) => <option key={item.name}>{item.name}</option>)}
            </select>
            <label className="mt-4 block text-xs font-semibold text-slate-600">Appointment time</label>
            <select value={appointmentTime} onChange={(event) => setAppointmentTime(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-500">
              {["11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM"].map((time) => <option key={time}>{time}</option>)}
            </select>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowAppointment(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">Cancel</button>
              <button onClick={createAppointment} disabled={!patientName.trim()} className="rounded-xl bg-[#147d79] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50">Create Appointment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
