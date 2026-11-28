
"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  GraduationCap,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Users,
  Wallet,
  X,
} from "lucide-react";

const students = [
  { id: "STU-1024", name: "Olivia Martin", grade: "Grade 10", section: "A", attendance: "Present", fee: "Paid", initials: "OM", color: "bg-blue-100 text-blue-700" },
  { id: "STU-1025", name: "Ethan Wilson", grade: "Grade 9", section: "B", attendance: "Present", fee: "Pending", initials: "EW", color: "bg-violet-100 text-violet-700" },
  { id: "STU-1026", name: "Sophia Anderson", grade: "Grade 8", section: "A", attendance: "Absent", fee: "Paid", initials: "SA", color: "bg-rose-100 text-rose-700" },
  { id: "STU-1027", name: "Noah Thompson", grade: "Grade 10", section: "C", attendance: "Present", fee: "Paid", initials: "NT", color: "bg-amber-100 text-amber-700" },
  { id: "STU-1028", name: "Ava Robinson", grade: "Grade 7", section: "B", attendance: "Present", fee: "Pending", initials: "AR", color: "bg-emerald-100 text-emerald-700" },
];

const schedule = [
  { time: "08:30 AM", subject: "Mathematics", teacher: "Mr. James", room: "Room 204", color: "bg-blue-500" },
  { time: "09:30 AM", subject: "Physics", teacher: "Mrs. Taylor", room: "Lab 02", color: "bg-violet-500" },
  { time: "10:30 AM", subject: "English", teacher: "Ms. Carter", room: "Room 108", color: "bg-amber-500" },
];

const events = [
  { day: "28", month: "NOV", title: "Science Exhibition", detail: "Main Auditorium · 10:00 AM", color: "bg-blue-100 text-blue-700" },
  { day: "02", month: "DEC", title: "Parent Teacher Meeting", detail: "School Campus · 09:00 AM", color: "bg-violet-100 text-violet-700" },
  { day: "05", month: "DEC", title: "Annual Sports Day", detail: "School Ground · 08:30 AM", color: "bg-amber-100 text-amber-700" },
];

export default function SchoolDemo() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentList, setStudentList] = useState(students);
  const [notice, setNotice] = useState("");

  const filteredStudents = useMemo(
    () =>
      studentList.filter((student) =>
        `${student.name} ${student.id} ${student.grade}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [studentList, search]
  );

  const navItems = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Students", icon: Users },
    { label: "Academics", icon: BookOpen },
    { label: "Attendance", icon: Activity },
    { label: "Fees & Finance", icon: Wallet },
    { label: "Calendar", icon: CalendarDays },
  ];

  function addStudent() {
    if (!studentName.trim()) return;

    const initials = studentName
      .trim()
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    setStudentList((previous) => [
      {
        id: `STU-${1029 + previous.length - students.length}`,
        name: studentName.trim(),
        grade: "Grade 8",
        section: "A",
        attendance: "Present",
        fee: "Pending",
        initials,
        color: "bg-cyan-100 text-cyan-700",
      },
      ...previous,
    ]);

    setStudentName("");
    setShowAdd(false);
    setNotice("Student added to the demo records.");
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-800">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:static lg:translate-x-0 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <GraduationCap size={23} />
              </div>
              <div>
                <p className="font-bold tracking-tight text-slate-900">EduSphere</p>
                <p className="text-xs text-slate-400">School Management</p>
              </div>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-slate-400 lg:hidden"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="px-4 py-7">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Main Menu
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setActiveTab(item.label);
                      setMenuOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                      activeTab === item.label
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                    {item.label === "Students" && (
                      <span className="ml-auto rounded-full bg-blue-100 px-2 py-0.5 text-[10px] text-blue-700">
                        1.2k
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mt-auto p-4">
            <div className="rounded-2xl bg-slate-900 p-5 text-white">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                <BookOpen size={18} />
              </div>
              <p className="text-sm font-semibold">Need assistance?</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                Explore the school management help center.
              </p>
              <button className="mt-4 text-xs font-semibold text-blue-300">
                Explore resources →
              </button>
            </div>
            <button className="mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-500 hover:bg-slate-50">
              <Settings size={18} />
              Settings
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-xl md:px-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMenuOpen(true)}
                className="text-slate-500 lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
              <div>
                <p className="text-xs text-slate-400">School / {activeTab}</p>
                <h1 className="text-lg font-bold text-slate-900">{activeTab}</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500"
                aria-label="Notifications"
                onClick={() => setNotice("You are all caught up on notifications.")}
              >
                <Bell size={18} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
              </button>
              <div className="hidden items-center gap-3 border-l border-slate-200 pl-4 sm:flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                  JD
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">John Davis</p>
                  <p className="text-xs text-slate-400">Administrator</p>
                </div>
                <ChevronDown size={15} className="text-slate-400" />
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1500px] space-y-7 p-5 md:p-8">
            {notice && (
              <div className="flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
                {notice}
                <button onClick={() => setNotice("")} aria-label="Dismiss">
                  <X size={16} />
                </button>
              </div>
            )}

            <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-slate-500">Saturday, November 28, 2026</p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                  Good morning, John 👋
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Here&apos;s what&apos;s happening at your school today.
                </p>
              </div>
              <button
                onClick={() => setShowAdd(true)}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
              >
                <Plus size={18} />
                Add New Student
              </button>
            </section>

            {/* Statistics */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Total Students", value: studentList.length + 1245, change: "+12.8%", icon: Users, color: "bg-blue-50 text-blue-600", trend: "up" },
                { label: "Teaching Staff", value: "86", change: "+4.2%", icon: GraduationCap, color: "bg-violet-50 text-violet-600", trend: "up" },
                { label: "Today's Attendance", value: "94.6%", change: "+2.4%", icon: Activity, color: "bg-emerald-50 text-emerald-600", trend: "up" },
                { label: "Fee Collection", value: "₹8.4L", change: "78% collected", icon: Wallet, color: "bg-amber-50 text-amber-600", trend: "down" },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}>
                        <Icon size={21} />
                      </div>
                      <MoreHorizontal size={19} className="text-slate-300" />
                    </div>
                    <p className="mt-5 text-sm text-slate-500">{stat.label}</p>
                    <div className="mt-1 flex flex-wrap items-end justify-between gap-2">
                      <p className="text-2xl font-bold tracking-tight text-slate-900">{stat.value}</p>
                      <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                        {stat.trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {stat.change}
                      </span>
                    </div>
                  </div>
                );
              })}
            </section>

            {/* Middle row */}
            <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900">Attendance Overview</h3>
                    <p className="mt-1 text-xs text-slate-400">Student attendance · Today</p>
                  </div>
                  <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-500">
                    This week <ChevronDown size={13} className="ml-2 inline" />
                  </button>
                </div>

                <div className="mt-8 flex flex-col items-center gap-8 sm:flex-row">
                  <div className="relative flex h-44 w-44 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: "conic-gradient(#2563eb 0% 72%, #10b981 72% 94.6%, #f59e0b 94.6% 97%, #e2e8f0 97% 100%)",
                    }}
                  >
                    <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
                      <span className="text-3xl font-bold text-slate-900">94.6%</span>
                      <span className="mt-1 text-xs text-slate-400">Present today</span>
                    </div>
                  </div>
                  <div className="w-full space-y-5">
                    {[
                      { label: "Present", value: "1,184", percent: "72%", color: "bg-blue-600" },
                      { label: "Late arrival", value: "372", percent: "22.6%", color: "bg-emerald-500" },
                      { label: "Absent", value: "42", percent: "2.5%", color: "bg-amber-500" },
                      { label: "Not marked", value: "15", percent: "2.9%", color: "bg-slate-200" },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="mb-2 flex justify-between text-xs">
                          <span className="flex items-center gap-2 font-medium text-slate-600">
                            <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                            {item.label}
                          </span>
                          <span className="font-semibold text-slate-800">{item.value} · {item.percent}</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                          <div className={`h-full rounded-full ${item.color}`} style={{ width: item.percent }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">Today&apos;s Timetable</h3>
                    <p className="mt-1 text-xs text-slate-400">Grade 10 · Section A</p>
                  </div>
                  <button className="text-xs font-semibold text-blue-600">Full schedule</button>
                </div>
                <div className="mt-6 space-y-5">
                  {schedule.map((item, index) => (
                    <div key={item.time} className="flex gap-3">
                      <div className="w-20 shrink-0 pt-1 text-xs font-medium text-slate-400">{item.time}</div>
                      <div className={`w-1 shrink-0 rounded-full ${item.color}`} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-800">{item.subject}</p>
                        <p className="mt-1 text-xs text-slate-400">{item.teacher} · {item.room}</p>
                      </div>
                      {index === 0 && (
                        <span className="h-fit rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-600">
                          Live
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-2 rounded-xl bg-blue-50 p-3 text-xs text-blue-700">
                  <Clock3 size={15} />
                  Next class starts at 09:30 AM
                </div>
              </div>
            </section>

            {/* Student records */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 md:flex-row md:items-center md:p-6">
                <div>
                  <h3 className="font-bold text-slate-900">Recent Students</h3>
                  <p className="mt-1 text-xs text-slate-400">Manage your student records</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className="relative min-w-[180px] flex-1 md:flex-none">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search students..."
                      className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-xs outline-none transition focus:border-blue-400"
                    />
                  </div>
                  <button className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600">
                    View all
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] text-left">
                  <thead className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="px-6 py-4">Student</th>
                      <th className="px-6 py-4">Student ID</th>
                      <th className="px-6 py-4">Class</th>
                      <th className="px-6 py-4">Attendance</th>
                      <th className="px-6 py-4">Fee Status</th>
                      <th className="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="transition hover:bg-slate-50/70">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${student.color}`}>
                              {student.initials}
                            </div>
                            <span className="text-sm font-semibold text-slate-800">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-500">{student.id}</td>
                        <td className="px-6 py-4 text-xs text-slate-500">{student.grade} · {student.section}</td>
                        <td className="px-6 py-4">
                          <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                            student.attendance === "Present"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-rose-50 text-rose-700"
                          }`}>
                            {student.attendance}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                            student.fee === "Paid"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-amber-50 text-amber-700"
                          }`}>
                            {student.fee}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setNotice(`Viewing ${student.name}'s sample student record.`)}
                            className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                          >
                            View details
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredStudents.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-400">
                          No matching students found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Events */}
            <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">Upcoming Events</h3>
                    <p className="mt-1 text-xs text-slate-400">What&apos;s coming up at school</p>
                  </div>
                  <button className="text-xs font-semibold text-blue-600">View calendar</button>
                </div>
                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  {events.map((event) => (
                    <div key={event.title} className="rounded-xl border border-slate-100 p-4 transition hover:border-blue-200">
                      <div className={`mb-4 flex h-12 w-12 flex-col items-center justify-center rounded-xl ${event.color}`}>
                        <span className="text-lg font-bold leading-none">{event.day}</span>
                        <span className="mt-1 text-[9px] font-bold">{event.month}</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800">{event.title}</p>
                      <p className="mt-2 text-[11px] leading-5 text-slate-400">{event.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-900 p-6 text-white">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-semibold tracking-wider">
                    ACADEMIC YEAR 2026–27
                  </span>
                  <GraduationCap size={23} className="text-blue-200" />
                </div>
                <h3 className="mt-8 text-2xl font-bold">Growing together, every day.</h3>
                <p className="mt-3 text-sm leading-6 text-blue-100/75">
                  Keep your school community connected with a unified platform for learning and administration.
                </p>
                <div className="mt-7 flex items-center justify-between border-t border-white/15 pt-5">
                  <div>
                    <p className="text-2xl font-bold">78%</p>
                    <p className="mt-1 text-xs text-blue-200">Annual fee collection</p>
                  </div>
                  <div className="h-12 w-12 rounded-full border-4 border-white/20 border-t-white" />
                </div>
              </div>
            </section>

            <footer className="flex flex-col justify-between gap-2 border-t border-slate-200 pt-5 text-xs text-slate-400 sm:flex-row">
              <p>© 2026 EduSphere School Management. Demo interface.</p>
              <p>Designed for smarter education.</p>
            </footer>
          </div>
        </main>
      </div>

      {/* Add student modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Add New Student</h3>
              <button onClick={() => setShowAdd(false)} aria-label="Close">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <p className="mt-2 text-sm text-slate-500">
              Add a sample student to the local demo records.
            </p>
            <label className="mt-6 block text-xs font-semibold text-slate-600">
              Student name
            </label>
            <input
              autoFocus
              value={studentName}
              onChange={(event) => setStudentName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") addStudent();
              }}
              placeholder="Enter full name"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowAdd(false)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={addStudent}
                disabled={!studentName.trim()}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
