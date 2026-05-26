import { motion } from "framer-motion";
import {
  Database,
  FolderKanban,
  ClipboardList,
  Clock3,
  FileSpreadsheet,
  ShieldCheck,
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
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import image1 from "../assets/colan-logo-main.png";

const modules = [
  {
    title: "Final Source",
    subtitle: "Source & Delivery Hub",
    description:
      "Centralize, manage and track all finalized project sources and delivery files efficiently.",
    icon: Database,
    route: "/final-source/list",
  },

  {
    title: "Projects",
    subtitle: "Project Management",
    description:
      "Monitor ongoing projects, manage workflows and collaborate with teams in one workspace.",
    icon: FolderKanban,
    route: "/projects",
  },

  {
    title: "Tasks",
    subtitle: "Task Tracking System",
    description:
      "Create, assign and manage daily tasks with progress tracking and team coordination.",
    icon: ClipboardList,
    route: "/task/list",
  },

  {
    title: "Timesheet",
    subtitle: "Work Hour Management",
    description:
      "Log working hours, manage employee timesheets and track productivity effectively.",
    icon: Clock3,
    route: "/timesheet/view",
  },

  {
    title: "RFP Estimation",
    subtitle: "Proposal & Costing",
    description:
      "Prepare accurate project estimations, proposals and resource planning for client requirements.",
    icon: FileSpreadsheet,
    route: "/rfp/list",
  },

  {
    title: "Quality Assurance",
    subtitle: "Testing & Validation",
    description:
      "Ensure software quality through systematic testing, issue tracking and compliance validation.",
    icon: ShieldCheck,
    route: "/qa/list",
  },
];

const stats = [
  {
    title: "Active Projects",
    value: "12",
    icon: BriefcaseBusiness,
  },
  {
    title: "Pending Tasks",
    value: "28",
    icon: ListTodo,
  },
  {
    title: "Hours This Week",
    value: "36h 45m",
    icon: TimerReset,
  },
  {
    title: "Team Efficiency",
    value: "92%",
    icon: TrendingUp,
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

export default function SheetPage() {
  const navigate = useNavigate();

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const userRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[78px] max-w-[1500px] items-center justify-between px-4 md:px-8">
          {/* LOGO */}
          <div>
            <img src={image1} alt="logo" className="h-10 object-contain" />
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            {/* NOTIFICATION */}
            <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50 hover:text-[#2563EB]">
              <Bell size={19} />

              <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white"></span>
            </button>

            {/* USER */}
            <div ref={userRef} className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50"
              >
                {/* AVATAR */}
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2563EB] text-sm font-bold text-white shadow-md">
                  {getInitial(currentUser.name)}
                </div>

                {/* INFO */}
                <div className="hidden text-left sm:block">
                  <p className="text-[14px] font-semibold text-slate-800">
                    {currentUser.name}
                  </p>

                  <p className="text-[12px] text-slate-500">
                    {currentUser.role}
                  </p>
                </div>

                <ChevronDown
                  size={16}
                  className={`text-slate-500 transition ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* DROPDOWN */}
              {userMenuOpen && (
                <div className="absolute right-0 top-[110%] w-[240px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
                  <div className="border-b border-slate-100 bg-slate-50 px-5 py-5">
                    <p className="text-sm font-semibold text-slate-900">
                      {currentUser.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {currentUser.email}
                    </p>
                  </div>

                  <button className="flex w-full items-center gap-3 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-[#2563EB]">
                    <User size={17} />
                    Profile
                  </button>

                  <button className="flex w-full items-center gap-3 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-[#2563EB]">
                    <Settings size={17} />
                    Account Settings
                  </button>

                  <div className="mx-5 h-px bg-slate-100"></div>

                  <button className="flex w-full items-center gap-3 px-5 py-3 text-sm font-medium text-rose-600 transition hover:bg-rose-50">
                    <LogOut size={17} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#F7F9FC]">
        {/* RIGHT DESIGN */}
        <div className="absolute right-10 top-10 hidden lg:block">
          {/* DOTS */}
          <div className="absolute right-[260px] top-5 grid grid-cols-6 gap-2 opacity-40">
            {Array.from({ length: 36 }).map((_, i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-blue-300"
              ></span>
            ))}
          </div>

          {/* MOCK CARD */}
          <div className="h-[170px] w-[270px] rounded-3xl border border-blue-100 bg-white/70 p-5 shadow-[0_20px_60px_rgba(37,99,235,0.08)] backdrop-blur-xl">
            {/* TOP */}
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-3 w-28 rounded-full bg-slate-200"></div>
                <div className="h-3 w-20 rounded-full bg-slate-100"></div>
              </div>

              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-200"></div>
            </div>

            {/* GRAPH */}
            <div className="mt-8 flex items-end gap-3">
              <div className="h-10 w-3 rounded-full bg-blue-100"></div>
              <div className="h-14 w-3 rounded-full bg-blue-200"></div>
              <div className="h-8 w-3 rounded-full bg-blue-100"></div>
              <div className="h-16 w-3 rounded-full bg-blue-300"></div>
              <div className="h-12 w-3 rounded-full bg-blue-200"></div>
              <div className="h-20 w-3 rounded-full bg-blue-400"></div>
            </div>

            {/* LINES */}
            <div className="mt-6 space-y-3">
              <div className="h-2 w-full rounded-full bg-slate-100"></div>
              <div className="h-2 w-[70%] rounded-full bg-slate-100"></div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="mx-auto max-w-[1500px] px-4 pb-5 pt-5 md:px-8">
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#2563EB] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
            Welcome Back
          </div>

          {/* TITLE */}
          <h1 className="mt-4 max-w-[700px] text-5xl font-black leading-[1.05] tracking-[-0.04em] text-[#0F172A] md:text-7xl">
            Employee{" "}
            <span className="bg-gradient-to-r from-[#2563EB] to-[#3B82F6] bg-clip-text text-transparent">
              Workspace
            </span>
          </h1>

          {/* SUBTITLE */}
          <p className="mt-2 max-w-2xl text-[17px] leading-8 text-slate-500">
            Manage projects, timesheets, tasks and internal workflow efficiently
            from one place.
          </p>
        </div>
      </section>

      {/* ================= MODULES ================= */}
      <section className="mx-auto mt-5 grid max-w-[1500px] grid-cols-1 gap-6 px-4 pb-14 md:grid-cols-2 md:px-8 xl:grid-cols-3">
        {modules.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
              whileHover={{ y: -6 }}
              onClick={() => navigate(item.route)}
              className="group cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-blue-200 hover:shadow-[0_10px_40px_rgba(37,99,235,0.08)]"
            >
              {/* TOP */}
              <div className="m-2 p-4 bg-blue-50 flex-col rounded-lg items-center  border border-slate-200">
                <div className="50 flex gap-5 items-center">
                  {/* ICON */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2563EB] text-white">
                    <Icon size={28} />
                  </div>

                  <div>
                    {/* TITLE */}
                    <h2 className=" text-[28px] font-black tracking-tight text-slate-900">
                      {item.title}
                    </h2>

                    {/* DESC */}
                    <p className=" text-[15px] text-slate-800">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-[13px] text-slate-500">
                  {item.description}
                </p>
              </div>

              {/* FOOTER */}
              <div className="flex bg-blue-50 items-center justify-between border-t border-slate-200 px-7 py-2">
                <span className="text-lg font-semibold text-[#2563EB]">
                  Open Module
                </span>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-600 transition-all duration-300 group-hover:bg-[#2563EB] group-hover:text-white">
                  <ArrowRight size={18} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
}
