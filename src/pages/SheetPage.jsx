import { motion } from "framer-motion";
import {
  Database,
  FolderKanban,
  ClipboardList,
  Clock3,
  FileSpreadsheet,
  ShieldCheck,
  CalendarDays,
  ArrowRight,
  Bell,
  LogOut,
  User,
  Settings,
  ChevronDown,
  BriefcaseBusiness,
  ListTodo,
  TimerReset,
  TrendingUp,
  Search,
  Command,
  LayoutDashboard,
  ListChecks,
  Settings2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import image1 from "../assets/colan-logo-main.png";
import Footer from "../components/Footer";

/* ── Data (unchanged) ──────────────────────────── */
const modules = [
  {
    title: "Final Source",
    subtitle: "Source & Delivery Hub",
    description:
      "Centralize, manage and track all finalized project sources and delivery files efficiently.",
    icon: Database,
    route: "/final-source/list",
    iconBg: "#EEF2FF",
    iconColor: "#4F46E5",
  },
  {
    title: "Projects",
    subtitle: "Project Management",
    description:
      "Monitor ongoing projects, manage workflows and collaborate with teams in one workspace.",
    icon: FolderKanban,
    route: "/projects",
    iconBg: "#ECFDF5",
    iconColor: "#059669",
  },
  {
    title: "Tasks",
    subtitle: "Task Tracking System",
    description:
      "Create, assign and manage daily tasks with progress tracking and team coordination.",
    icon: ClipboardList,
    route: "/task/list",
    iconBg: "#FFFBEB",
    iconColor: "#D97706",
  },
  {
    title: "Timesheet",
    subtitle: "Work Hour Management",
    description:
      "Log working hours, manage employee timesheets and track productivity effectively.",
    icon: Clock3,
    route: "/timesheet/view",
    iconBg: "#F0F9FF",
    iconColor: "#0284C7",
  },
  {
    title: "RFP Estimation",
    subtitle: "Proposal & Costing",
    description:
      "Prepare accurate project estimations, proposals and resource planning for client requirements.",
    icon: FileSpreadsheet,
    route: "/rfp/list",
    iconBg: "#FFF1F2",
    iconColor: "#E11D48",
  },
  {
    title: "Quality Assurance",
    subtitle: "Testing & Validation",
    description:
      "Ensure software quality through systematic testing, issue tracking and compliance validation.",
    icon: ShieldCheck,
    route: "/qa/list",
    iconBg: "#F5F3FF",
    iconColor: "#7C3AED",
  },
  {
    title: "Dashboard",
    subtitle: "Business Overview",
    description:
      "Access key metrics, project insights and operational analytics from a centralized dashboard.",
    icon: LayoutDashboard,
    route: "/dashboard",
    iconBg: "#EFF6FF",
    iconColor: "#2563EB",
  },
  {
    title: "To Do",
    subtitle: "Personal Task Board",
    description:
      "Organize daily priorities, track pending activities and manage individual work efficiently.",
    icon: ListChecks,
    route: "/todolist/todolist",
    iconBg: "#ECFDF5",
    iconColor: "#059669",
  },
  {
    title: "Settings",
    subtitle: "System Configuration",
    description:
      "Manage application preferences, user settings and workspace configurations securely.",
    icon: Settings2,
    route: "/employee",
    iconBg: "#F8FAFC",
    iconColor: "#475569",
  },
];

const stats = [
  {
    title: "Active Projects",
    value: "12",
    icon: BriefcaseBusiness,
    color: "#2563EB",
  },
  { title: "Pending Tasks", value: "28", icon: ListTodo, color: "#D97706" },
  {
    title: "Hours This Week",
    value: "36h 45m",
    icon: TimerReset,
    color: "#059669",
  },
  {
    title: "Team Efficiency",
    value: "92%",
    icon: TrendingUp,
    color: "#7C3AED",
  },
];

const currentUser = {
  name: "Arjun Sharma",
  email: "arjun.sharma@gmail.com",
  role: "Software Engineer",
};

function getInitial(name) {
  return name ? name.charAt(0).toUpperCase() : "U";
}

/* ── Module Card ────────────────────────────────── */
function ModuleCard({ item, index, onClick }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="group cursor-pointer flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden"
      style={{
        boxShadow:
          "0 1px 3px rgba(15,23,42,0.04), 0 1px 2px rgba(15,23,42,0.03)",
        transition: "box-shadow 0.25s ease, border-color 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 8px 30px rgba(37,99,235,0.08), 0 2px 8px rgba(15,23,42,0.06)";
        e.currentTarget.style.borderColor = "#bfdbfe";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "0 1px 3px rgba(15,23,42,0.04), 0 1px 2px rgba(15,23,42,0.03)";
        e.currentTarget.style.borderColor = "rgba(226,232,240,0.8)";
      }}
    >
      {/* Card body */}
      <div className="flex-1 p-4">
        <div className="flex gap-3">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
            style={{ background: item.iconBg }}
          >
            <Icon
              size={22}
              style={{ color: item.iconColor }}
              strokeWidth={1.8}
            />
          </div>

          <div>
            {/* Title + subtitle */}
            <h2
              className="text-[17px] font-semibold text-slate-900 mb-0.5"
              style={{ letterSpacing: "-0.01em" }}
            >
              {item.title}
            </h2>
            <p className="text-[13px] font-medium text-slate-400">
              {item.subtitle}
            </p>
          </div>
        </div>
        <p className="text-[13px] font-medium text-slate-500">
          {item.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-100">
        <span
          className="text-[13.5px] font-semibold"
          style={{ color: "#6099f7" }}
        >
          Open Module
        </span>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
          style={{ background: "#EFF6FF", color: "#6099f7" }}
        >
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Page ──────────────────────────────────── */
export default function SheetPage() {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (userRef.current && !userRef.current.contains(e.target))
        setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#F8FAFC",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
      `}</style>

      {/* ══════════ NAVBAR ══════════ */}
      <header
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl"
        style={{ borderBottom: "1px solid #E9EEF4" }}
      >
        <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-6 md:px-10">
          {/* Logo */}
          <img
            src={image1}
            alt="Colan Infotech"
            className="h-9 object-contain"
          />

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Notification */}
            <button className="relative w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200">
              <Bell size={17} strokeWidth={1.8} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            {/* User */}
            <div ref={userRef} className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-bold text-white"
                  style={{ background: "#2563EB" }}
                >
                  {getInitial(currentUser.name)}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-[13px] font-semibold text-slate-800 leading-tight">
                    {currentUser.name}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    {currentUser.role}
                  </p>
                </div>
                <ChevronDown
                  size={14}
                  className={`text-slate-400 transition-transform duration-200 ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown */}
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-[calc(100%+8px)] w-[220px] rounded-2xl bg-white overflow-hidden"
                  style={{
                    border: "1px solid #E9EEF4",
                    boxShadow: "0 16px 48px rgba(15,23,42,0.10)",
                  }}
                >
                  <div
                    className="px-4 py-4"
                    style={{
                      background: "#F8FAFC",
                      borderBottom: "1px solid #E9EEF4",
                    }}
                  >
                    <p className="text-[13px] font-semibold text-slate-900">
                      {currentUser.name}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {currentUser.email}
                    </p>
                  </div>
                  {[
                    { icon: User, label: "Profile" },
                    { icon: Settings, label: "Account Settings" },
                  ].map(({ icon: Ic, label }) => (
                    <button
                      key={label}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <Ic size={15} strokeWidth={1.8} />
                      {label}
                    </button>
                  ))}
                  <div
                    style={{
                      height: "1px",
                      background: "#E9EEF4",
                      margin: "0 16px",
                    }}
                  />
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-rose-500 hover:bg-rose-50 transition-colors">
                    <LogOut size={15} strokeWidth={1.8} />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* HEADER // Hero section */}
      <div className="relative overflow-hidden bg-[#f8fbff] border-b border-[#e8eef7]">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 82% 40%, rgba(59,130,246,0.18), transparent 30%),
              radial-gradient(circle at 90% 60%, rgba(96,165,250,0.12), transparent 35%)
            `,
          }}
        />

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-2">
          <div className="flex items-center justify-between gap-8">
            {/* LEFT CONTENT */}
            <div className="z-10">
              <p className="text-[11px] font-extrabold tracking-[0.08em] uppercase text-blue-500 mb-2">
                Employee Workspace
              </p>

              <h1 className="text-[28px] md:text-[34px] font-extrabold text-[#111827] mb-1 leading-tight">
                Welcome back, {currentUser?.name || "Arjun Sharma"}
                <span className="ml-2">👋</span>
              </h1>

              <div className="flex flex-wrap items-center gap-3 mb-2">
                <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
                  <CalendarDays size={15} className="text-slate-400" />
                  <span>
                    {currentTime
                      ? currentTime.toLocaleDateString("en-IN", {
                          weekday: "long",
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                      : "Wednesday, 04 June 2026"}
                  </span>
                </div>

                <span className="w-px h-4 bg-slate-300" />

                <div className="flex items-center gap-2 text-[13px] font-medium text-slate-500">
                  <Clock3 size={15} className="text-slate-400" />
                  <span>
                    {currentTime
                      ? currentTime.toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "11:45 AM IST"}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-blue-400 bg-white shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-[11px] font-bold text-blue-600">
                    LIVE
                  </span>
                </div>
              </div>

              <p className="text-[14px] font-medium text-slate-500 mb-2">
                Manage your daily operations from a centralized workspace.
              </p>

              <div className="inline-flex items-center gap-2 py-2 rounded-full bg-emerald-100 px-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[12px] font-bold text-emerald-600">
                  Workspace Active
                </span>
              </div>
            </div>

            {/* RIGHT GLOBE DESIGN (RECALIBRATED & FIXED ACCURACY) */}
            <div className="hidden md:block absolute right-[-40px] top-0 w-[58%] h-full pointer-events-none overflow-hidden">
              <svg
                viewBox="0 0 1100 220"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.28" />
                    <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Premium mesh background waves */}
                {Array.from({ length: 55 }).map((_, i) => (
                  <path
                    key={i}
                    d={`
                      M0 ${240 + i}
                      C180 ${180 - i},
                      380 ${300 - i},
                      560 ${210 + i * 0.2}
                      C720 ${120 - i},
                      900 ${260 + i},
                      1100 ${180 + i * 0.2}
                    `}
                    fill="none"
                    stroke="#60A5FA"
                    strokeWidth="0.45"
                    opacity={0.09 - i * 0.001}
                  />
                ))}

                <path
                  d="M0 240 C250 150, 500 280, 700 190 C850 110, 980 250, 1100 170"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  opacity="0.6"
                />

                <path
                  d="M0 255 C250 180, 500 310, 720 210 C850 140, 980 280, 1100 210"
                  fill="none"
                  stroke="#93C5FD"
                  strokeWidth="1.2"
                  opacity="0.45"
                />

                {/* Primary highlight waves */}
                <path
                  d="M280 205 C380 150, 500 235, 590 175 C690 115, 790 185, 900 145"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="1.8"
                  opacity="0.65"
                />

                <path
                  d="M260 220 C360 165, 500 250, 600 190 C700 135, 800 195, 900 165"
                  fill="none"
                  stroke="#93C5FD"
                  strokeWidth="1"
                  opacity="0.35"
                />

                {/* Outer Orbit Glow Base (Centered at 790, 90) */}
                <circle
                  cx="790"
                  cy="90"
                  r="160"
                  fill="url(#globeGlow)"
                  opacity="0.9"
                />

                {/* Concentric Spherical Architecture (All aligned at 790, 90) */}
                <circle
                  cx="790"
                  cy="90"
                  r="132"
                  stroke="#60A5FA"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.16"
                />
                <circle
                  cx="790"
                  cy="90"
                  r="118"
                  stroke="#93C5FD"
                  strokeWidth="1.2"
                  opacity="0.45"
                />
                <circle
                  cx="790"
                  cy="90"
                  r="100"
                  stroke="#93C5FD"
                  strokeWidth="0.8"
                  opacity="0.35"
                />

                {/* Longitudinal / Latitudinal Ellipses */}
                <ellipse
                  cx="790"
                  cy="90"
                  rx="118"
                  ry="40"
                  stroke="#93C5FD"
                  strokeWidth="0.8"
                  opacity="0.35"
                />
                <ellipse
                  cx="790"
                  cy="90"
                  rx="118"
                  ry="72"
                  stroke="#93C5FD"
                  strokeWidth="0.8"
                  opacity="0.3"
                />
                <ellipse
                  cx="790"
                  cy="90"
                  ry="118"
                  rx="42"
                  stroke="#93C5FD"
                  strokeWidth="0.8"
                  opacity="0.3"
                />
                <ellipse
                  cx="790"
                  cy="90"
                  ry="118"
                  rx="75"
                  stroke="#93C5FD"
                  strokeWidth="0.8"
                  opacity="0.25"
                />

                {/* Perfectly Mapped Network Lines (Anchored relative to center) */}
                <g>
                  {[
                    [720, 60, 770, 40],
                    [770, 40, 830, 42],
                    [830, 42, 875, 80],
                    [875, 80, 850, 130],
                    [850, 130, 790, 155],
                    [790, 155, 735, 125],
                    [735, 125, 720, 60],
                    [720, 60, 810, 95],
                    [770, 40, 850, 130],
                    [735, 125, 830, 42],
                    [790, 155, 875, 80],
                    [770, 40, 790, 155],
                    [810, 95, 875, 80],
                    [810, 95, 735, 125],
                    [810, 95, 830, 42],
                  ].map(([x1, y1, x2, y2], i) => (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#2563EB"
                      strokeWidth="1.1"
                      opacity="0.4"
                    />
                  ))}
                </g>

                {/* Perfectly Mapped Structural Nodes */}
                <g>
                  {[
                    [720, 60, 3.5],
                    [770, 40, 3.5],
                    [830, 42, 4.5],
                    [875, 80, 5.5],
                    [850, 130, 5.5],
                    [790, 155, 5.5],
                    [735, 125, 4.5],
                    [810, 95, 6.5],
                    [890, 135, 3.5],
                    [700, 100, 3.5],
                  ].map(([cx, cy, r], i) => (
                    <circle
                      key={i}
                      cx={cx}
                      cy={cy}
                      r={r}
                      fill="#2563EB"
                      opacity="0.85"
                    />
                  ))}
                </g>

                {/* Balanced Ambient Particles */}
                <circle cx="620" cy="45" r="5" fill="#60A5FA" opacity="0.45" />
                <circle cx="660" cy="78" r="4" fill="#3B82F6" opacity="0.45" />
                <circle cx="590" cy="135" r="5" fill="#60A5FA" opacity="0.45" />
                <circle cx="570" cy="40" r="7" fill="#60A5FA" opacity="0.15" />
                <circle cx="550" cy="90" r="4" fill="#3B82F6" opacity="0.25" />
                <circle cx="890" cy="25" r="5" fill="#60A5FA" opacity="0.25" />
                <circle cx="930" cy="55" r="3" fill="#3B82F6" opacity="0.3" />

                <circle cx="520" cy="125" r="7" stroke="#60A5FA" strokeWidth="1" opacity="0.35" />
                <circle cx="910" cy="65" r="6" stroke="#3B82F6" strokeWidth="1" opacity="0.35" />
                <circle cx="970" cy="140" r="8" stroke="#60A5FA" strokeWidth="1" opacity="0.18" />
                <circle cx="935" cy="155" r="5" fill="#3B82F6" opacity="0.4" />

                {/* Wave Network Interface Nodes */}
                {[
                  [470, 165],
                  [510, 150],
                  [550, 175],
                  [590, 155],
                  [640, 140],
                  [680, 125],
                ].map(([cx, cy], i) => (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r="3"
                    fill="#3B82F6"
                    opacity="0.75"
                  />
                ))}

                {/* Tiny Floating Wave Sparks */}
                {[
                  [420, 170],
                  [450, 180],
                  [500, 160],
                  [540, 145],
                  [580, 150],
                  [620, 140],
                  [670, 130],
                  [710, 120],
                  [760, 135],
                ].map(([cx, cy], i) => (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r="2"
                    fill="#3B82F6"
                    opacity="0.5"
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ MODULES GRID ══════════ */}
      <main className="mx-auto max-w-[1400px] px-6 md:px-10 py-4 ">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {modules.map((item, index) => (
            <ModuleCard
              key={index}
              item={item}
              index={index}
              onClick={() => navigate(item.route)}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
