
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Bell,
  ChevronDown,
  CircleHelp,
  LayoutDashboard,
  Menu,
  Plus,
  Search,
  Settings,
  Sparkles,
  X,
  TrendingUp,
  MoreHorizontal,
  Download,
} from "lucide-react";

import type { ShowcaseProject } from "@/lib/showcase";

type Props = {
  project: ShowcaseProject;
};

type RecordItem = ShowcaseProject["sampleRecords"][number];

const navigationIcons = [
  LayoutDashboard,
  TrendingUp,
  Search,
  Settings,
];

export default function DemoExperience({ project }: Props) {
  const [activeModule, setActiveModule] = useState(project.modules[0]);
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState(project.sampleRecords);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDetail, setNewDetail] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState("");

  const filteredRecords = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return records;

    return records.filter((record) =>
      `${record.name} ${record.detail} ${record.status} ${record.amount}`
        .toLowerCase()
        .includes(query)
    );
  }, [records, search]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const addRecord = () => {
    if (!newName.trim()) {
      notify("Please enter a name.");
      return;
    }

    const newRecord: RecordItem = {
      name: newName.trim(),
      detail: newDetail.trim() || "New sample entry",
      status: "New",
      amount: "Just added",
    };

    setRecords((current) => [newRecord, ...current]);
    setNewName("");
    setNewDetail("");
    setShowAddForm(false);
    notify("New sample record added.");
  };

  const handleNavigation = (module: string) => {
    setActiveModule(module);
    setSidebarOpen(false);

    if (module === "Settings") {
      setShowSettings(true);
    } else {
      setShowSettings(false);
    }
  };

  return (
    <main
      className="demo-experience"
      style={{
        "--demo-accent": project.accent,
        "--demo-accent-soft": project.accentSoft,
      } as React.CSSProperties}
    >
      <header className="demo-topbar">
        <div className="demo-brand">
          <Link href="/" className="demo-brand-mark">
            <span>A</span>
          </Link>

          <div>
            <strong>AZOYTRIX</strong>
            <span>EXPERIENCE LAB</span>
          </div>
        </div>

        <div className="demo-topbar-center">
          <span className="demo-breadcrumb-home">Experiences</span>
          <span>/</span>
          <strong>{project.title}</strong>
        </div>

        <div className="demo-topbar-actions">
          <button
            type="button"
            className="demo-icon-button demo-mobile-menu"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle navigation"
          >
            {sidebarOpen ? <X size={19} /> : <Menu size={19} />}
          </button>

          <button
            type="button"
            className="demo-icon-button"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="demo-notification-indicator" />
          </button>

          <button
            type="button"
            className="demo-avatar"
            aria-label="Demo profile"
            onClick={() => notify("Demo profile")}
          >
            A
          </button>
        </div>

        {showNotifications && (
          <div className="demo-floating-panel">
            <div className="demo-panel-heading">
              <strong>Notifications</strong>
              <button
                type="button"
                onClick={() => setShowNotifications(false)}
                aria-label="Close notifications"
              >
                <X size={16} />
              </button>
            </div>

            <div className="demo-notification">
              <span />
              <div>
                <strong>Welcome to the demo</strong>
                <p>Explore the available features and sample data.</p>
              </div>
            </div>

            <div className="demo-notification">
              <span />
              <div>
                <strong>Workspace ready</strong>
                <p>Your interactive preview is ready to explore.</p>
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="demo-workspace">
        <aside
          className={`demo-sidebar ${sidebarOpen ? "open" : ""}`}
        >
          <div className="demo-sidebar-project">
            <div className="demo-project-symbol">
              <Sparkles size={20} />
            </div>

            <div>
              <strong>{project.title}</strong>
              <span>Demo workspace</span>
            </div>

            <ChevronDown size={15} />
          </div>

          <div className="demo-sidebar-label">WORKSPACE</div>

          <nav className="demo-navigation">
            {project.modules.map((module, index) => {
              const Icon = navigationIcons[index % navigationIcons.length];

              return (
                <button
                  key={module}
                  type="button"
                  className={
                    activeModule === module
                      ? "demo-nav-item active"
                      : "demo-nav-item"
                  }
                  onClick={() => handleNavigation(module)}
                >
                  <Icon size={17} />
                  <span>{module}</span>
                  {index === 0 && <span className="demo-nav-indicator" />}
                </button>
              );
            })}
          </nav>

          <div className="demo-sidebar-bottom">
            <div className="demo-sidebar-label">SUPPORT</div>

            <button
              type="button"
              className="demo-nav-item"
              onClick={() => notify("This is a demonstration workspace.")}
            >
              <CircleHelp size={17} />
              <span>Help centre</span>
            </button>

            <button
              type="button"
              className="demo-nav-item"
              onClick={() => setShowSettings(true)}
            >
              <Settings size={17} />
              <span>Settings</span>
            </button>

            <div className="demo-powered">
              <span className="demo-powered-dot" />
              <span>Powered by Azoytrix</span>
            </div>
          </div>
        </aside>

        <section className="demo-main">
          <div className="demo-page-heading">
            <div>
              <div className="demo-back-row">
                <Link href="/#showcase">
                  <ArrowLeft size={15} />
                  Back to experiences
                </Link>

                <span className="demo-preview-badge">
                  <span />
                  LIVE PREVIEW
                </span>
              </div>

              <h1>{activeModule}</h1>
              <p>{project.description}</p>
            </div>

            <div className="demo-heading-actions">
              <button
                type="button"
                className="demo-secondary-button"
                onClick={() => notify("Sample report prepared for preview.")}
              >
                <Download size={16} />
                Export
              </button>

              <button
                type="button"
                className="demo-primary-button"
                onClick={() => setShowAddForm(true)}
              >
                <Plus size={17} />
                Add new
              </button>
            </div>
          </div>

          <div className="demo-welcome-banner">
            <div className="demo-welcome-copy">
              <span>WELCOME TO YOUR WORKSPACE</span>
              <h2>{project.headline}</h2>
              <p>
                Explore this interactive concept using sample demonstration data.
              </p>
            </div>

            <div className="demo-welcome-metric">
              <span>{project.primaryMetricLabel}</span>
              <strong>{project.primaryMetric}</strong>
              <small>
                <TrendingUp size={13} />
                Demo performance indicator
              </small>
            </div>

            <div className="demo-banner-decoration" />
          </div>

          <div className="demo-section-title">
            <div>
              <h2>Performance overview</h2>
              <p>Key indicators from your demonstration workspace.</p>
            </div>

            <button
              type="button"
              className="demo-period-button"
              onClick={() => notify("Showing the sample reporting period.")}
            >
              Last 30 days
              <ChevronDown size={15} />
            </button>
          </div>

          <div className="demo-metric-grid">
            {project.metrics.map((metric, index) => (
              <div className="demo-metric-card" key={metric.label}>
                <div className="demo-metric-top">
                  <span>{metric.label}</span>
                  <span className="demo-metric-icon">
                    <TrendingUp size={16} />
                  </span>
                </div>

                <strong>{metric.value}</strong>

                <div className="demo-metric-bottom">
                  <span className="demo-metric-change">
                    <TrendingUp size={13} />
                    {metric.change}
                  </span>
                  <span>vs previous period</span>
                </div>
              </div>
            ))}
          </div>

          <div className="demo-content-grid">
            <div className="demo-panel demo-chart-panel">
              <div className="demo-panel-heading">
                <div>
                  <h3>Activity overview</h3>
                  <p>Illustrative performance visualization</p>
                </div>

                <button
                  type="button"
                  className="demo-more-button"
                  onClick={() => notify("Chart options are available in this preview.")}
                  aria-label="Chart options"
                >
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <div className="demo-chart-summary">
                <strong>{project.primaryMetric}</strong>
                <span>
                  <TrendingUp size={14} />
                  Sample performance
                </span>
              </div>

              <div className="demo-chart">
                <div className="demo-chart-y-axis">
                  <span>100</span>
                  <span>75</span>
                  <span>50</span>
                  <span>25</span>
                  <span>0</span>
                </div>

                <div className="demo-chart-plot">
                  <div className="demo-chart-gridlines">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>

                  <svg
                    viewBox="0 0 600 190"
                    preserveAspectRatio="none"
                    role="img"
                    aria-label="Illustrative activity chart"
                  >
                    <defs>
                      <linearGradient id="demo-chart-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={project.accent} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={project.accent} stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M0 150 C45 142 55 110 100 122 S160 145 200 98 S265 118 300 80 S360 105 400 62 S470 82 500 40 S560 52 600 18 L600 190 L0 190 Z"
                      fill="url(#demo-chart-fill)"
                    />

                    <path
                      d="M0 150 C45 142 55 110 100 122 S160 145 200 98 S265 118 300 80 S360 105 400 62 S470 82 500 40 S560 52 600 18"
                      fill="none"
                      stroke={project.accent}
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>

                  <div className="demo-chart-x-axis">
                    <span>Week 01</span>
                    <span>Week 02</span>
                    <span>Week 03</span>
                    <span>Week 04</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="demo-panel demo-features-panel">
              <div className="demo-panel-heading">
                <div>
                  <h3>Workspace features</h3>
                  <p>Available capabilities</p>
                </div>
                <Sparkles size={18} />
              </div>

              <div className="demo-feature-list">
                {project.features.map((feature, index) => (
                  <div className="demo-feature-item" key={feature}>
                    <span className="demo-feature-check">
                      <span />
                    </span>

                    <div>
                      <strong>{feature}</strong>
                      <small>Included in this concept</small>
                    </div>

                    <ArrowUpRight size={15} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="demo-panel demo-records-panel">
            <div className="demo-panel-heading demo-records-heading">
              <div>
                <h3>{activeModule} records</h3>
                <p>
                  Explore and search the sample records in this workspace.
                </p>
              </div>

              <label className="demo-record-search">
                <Search size={16} />
                <input
                  type="search"
                  placeholder="Search records..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
            </div>

            <div className="demo-table-wrapper">
              <table className="demo-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Details</th>
                    <th>Status</th>
                    <th>Value / Reference</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRecords.map((record, index) => (
                    <tr key={`${record.name}-${index}`}>
                      <td>
                        <strong>{record.name}</strong>
                      </td>

                      <td>{record.detail}</td>

                      <td>
                        <span
                          className={`demo-status demo-status-${record.status
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                        >
                          {record.status}
                        </span>
                      </td>

                      <td>{record.amount}</td>
                    </tr>
                  ))}

                  {filteredRecords.length === 0 && (
                    <tr>
                      <td colSpan={4} className="demo-no-results">
                        No matching records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="demo-table-footer">
              Showing {filteredRecords.length} of {records.length} records
              <span>Demonstration data only</span>
            </div>
          </div>

          <footer className="demo-footer">
            <span>© {new Date().getFullYear()} AZOYTRIX</span>
            <span>ENGINEERING THE NEXT ERA.</span>
            <Link href="/#showcase">Explore more experiences</Link>
          </footer>
        </section>
      </div>

      {showAddForm && (
        <div
          className="demo-modal-backdrop"
          onClick={() => setShowAddForm(false)}
        >
          <div
            className="demo-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="demo-modal-heading">
              <div>
                <span>WORKSPACE ACTION</span>
                <h3>Add a new record</h3>
              </div>

              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                aria-label="Close dialog"
              >
                <X size={19} />
              </button>
            </div>

            <label>
              Record name
              <input
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
                placeholder="Enter a name"
                autoFocus
              />
            </label>

            <label>
              Description
              <input
                value={newDetail}
                onChange={(event) => setNewDetail(event.target.value)}
                placeholder="Enter additional details"
              />
            </label>

            <div className="demo-modal-actions">
              <button
                type="button"
                className="demo-secondary-button"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="demo-primary-button"
                onClick={addRecord}
              >
                <Plus size={16} />
                Create record
              </button>
            </div>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="demo-modal-backdrop" onClick={() => setShowSettings(false)}>
          <div
            className="demo-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="demo-modal-heading">
              <div>
                <span>WORKSPACE PREFERENCES</span>
                <h3>Settings</h3>
              </div>

              <button
                type="button"
                onClick={() => setShowSettings(false)}
                aria-label="Close settings"
              >
                <X size={19} />
              </button>
            </div>

            <p className="demo-settings-description">
              This is a demonstration workspace. These settings are illustrative
              and are not connected to a real account.
            </p>

            <div className="demo-settings-row">
              <span>Workspace</span>
              <strong>{project.title}</strong>
            </div>

            <div className="demo-settings-row">
              <span>Theme</span>
              <strong>Hybrid interface</strong>
            </div>

            <div className="demo-settings-row">
              <span>Data source</span>
              <strong>Local sample data</strong>
            </div>

            <button
              type="button"
              className="demo-primary-button demo-settings-close"
              onClick={() => setShowSettings(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div className="demo-toast">
          <span />
          {toast}
        </div>
      )}
    </main>
  );
}
