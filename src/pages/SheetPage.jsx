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
          style={{ color: "#2563EB" }}
        >
          Open Module
        </span>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
          style={{ background: "#EFF6FF", color: "#2563EB" }}
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(37,99,235,0.12),transparent_35%)]" />

        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 py-8">
          <div className="flex items-center justify-between gap-8">
            {/* LEFT CONTENT */}
            <div className="z-10">
              <p className="text-[11px] font-extrabold tracking-[0.08em] uppercase text-blue-500 mb-3">
                Employee Workspace
              </p>

              <h1 className="text-[28px] md:text-[34px] font-extrabold text-[#111827] mb-4 leading-tight">
                Welcome back, {currentUser?.name || "Arjun Sharma"}
                <span className="ml-2">👋</span>
              </h1>

              <div className="flex flex-wrap items-center gap-3 mb-4">
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

              <p className="text-[14px] font-medium text-slate-500 mb-5">
                Manage your daily operations from a centralized workspace.
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[12px] font-bold text-emerald-600">
                  Workspace Active
                </span>
              </div>
            </div>

            {/* RIGHT GLOBE DESIGN */}
            <div className="hidden md:block absolute right-0 top-0 w-[58%] h-full pointer-events-none">
              <svg
                viewBox="0 0 700 220"
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

                  <linearGradient id="waveBlue" x1="0" y1="0" x2="700" y2="0">
                    <stop stopColor="#60A5FA" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#3B82F6" stopOpacity="0.22" />
                    <stop offset="1" stopColor="#60A5FA" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* bottom flowing waves */}

                {Array.from({ length: 12 }).map((_, i) => (
                  <path
                    key={`wave-${i}`}
                    d={`M0 ${170 + i * 4} C140 ${110 + i * 2}, 250 ${
                      230 - i * 3
                    }, 370 ${160 + i} C470 ${115 + i}, 560 ${145 + i}, 700 ${
                      90 + i * 2
                    }`}
                    stroke="url(#waveBlue)"
                    strokeWidth="0.8"
                    opacity="0.35"
                  />
                ))}

                {/* globe glow */}
                <circle cx="520" cy="95" r="105" fill="url(#globeGlow)" />

                {/* globe outer lines */}
                <circle
                  cx="520"
                  cy="95"
                  r="92"
                  stroke="#93C5FD"
                  strokeWidth="1"
                  opacity="0.45"
                />
                <circle
                  cx="520"
                  cy="95"
                  r="78"
                  stroke="#93C5FD"
                  strokeWidth="0.8"
                  opacity="0.35"
                />
                <ellipse
                  cx="520"
                  cy="95"
                  rx="92"
                  ry="32"
                  stroke="#93C5FD"
                  strokeWidth="0.8"
                  opacity="0.35"
                />
                <ellipse
                  cx="520"
                  cy="95"
                  rx="92"
                  ry="58"
                  stroke="#93C5FD"
                  strokeWidth="0.8"
                  opacity="0.3"
                />
                <ellipse
                  cx="520"
                  cy="95"
                  rx="34"
                  ry="92"
                  stroke="#93C5FD"
                  strokeWidth="0.8"
                  opacity="0.3"
                />
                <ellipse
                  cx="520"
                  cy="95"
                  rx="62"
                  ry="92"
                  stroke="#93C5FD"
                  strokeWidth="0.8"
                  opacity="0.25"
                />

                {/* network lines */}

                {[
                  [450, 55, 500, 38],

                  [500, 38, 555, 40],

                  [555, 40, 598, 78],

                  [598, 78, 575, 125],

                  [575, 125, 520, 150],

                  [520, 150, 465, 120],

                  [465, 120, 450, 55],

                  [450, 55, 540, 92],

                  [500, 38, 575, 125],

                  [465, 120, 555, 40],

                  [520, 150, 598, 78],

                  [500, 38, 520, 150],

                  [540, 92, 598, 78],

                  [540, 92, 465, 120],

                  [540, 92, 555, 40],
                ].map(([x1, y1, x2, y2], i) => (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#3B82F6"
                    strokeWidth="1"
                    opacity="0.35"
                  />
                ))}

                {/* nodes */}

                {[
                  [450, 55, 3],

                  [500, 38, 3],

                  [555, 40, 4],

                  [598, 78, 5],

                  [575, 125, 5],

                  [520, 150, 5],

                  [465, 120, 4],

                  [540, 92, 6],

                  [610, 130, 3],

                  [430, 95, 3],
                ].map(([cx, cy, r], i) => (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={r}
                    fill="#3B82F6"
                    opacity="0.75"
                  />
                ))}

                {/* floating dots */}
                <circle cx="350" cy="45" r="5" fill="#60A5FA" opacity="0.45" />
                <circle cx="390" cy="78" r="4" fill="#3B82F6" opacity="0.45" />
                <circle cx="320" cy="135" r="5" fill="#60A5FA" opacity="0.45" />
                <circle
                  cx="250"
                  cy="125"
                  r="7"
                  stroke="#60A5FA"
                  opacity="0.35"
                />
                <circle
                  cx="640"
                  cy="65"
                  r="6"
                  stroke="#3B82F6"
                  opacity="0.35"
                />
                <circle cx="665" cy="155" r="5" fill="#3B82F6" opacity="0.4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ MODULES GRID ══════════ */}
      <main className="mx-auto max-w-[1400px] px-6 md:px-10 py-8 pb-16">
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
