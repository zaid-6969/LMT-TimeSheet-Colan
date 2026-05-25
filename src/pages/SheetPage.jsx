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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import image1 from "../assets/colan-logo-main.png";

const modules = [
  {
    title: "Final Source",
    description: "Manage and track final sources",
    icon: Database,
    route: "/final-source/list",
    gradient: "from-blue-700 to-sky-400",
    bgcolor: "bg-[#dff2fec2]",
  },
  {
    title: "Projects",
    description: "View and manage all projects",
    icon: FolderKanban,
    route: "/projects",
    gradient: "from-cyan-600 to-teal-400",
    bgcolor: "bg-[#cefafed1]",
  },
  {
    title: "Task",
    description: "Create, assign and track tasks",
    icon: ClipboardList,
    route: "/task/list",
    gradient: "from-indigo-700 to-blue-400",
    bgcolor: "bg-indigo-100",
  },
  {
    title: "Timesheet",
    description: "Track time and manage timesheets",
    icon: Clock3,
    route: "/timesheet/view",
    gradient: "from-green-600 to-lime-400",
    bgcolor: "bg-green-100",
  },
  {
    title: "RFP Estimation",
    description: "Manage RFPs and estimation process",
    icon: FileSpreadsheet,
    route: "/rfp/list",
    gradient: "from-rose-700 to-pink-500",
    bgcolor: "bg-[#ffe4e6c4]",
  },
  {
    title: "Quality Assurance",
    description: "Ensure quality and standards",
    icon: ShieldCheck,
    route: "/qa/list",
    gradient: "from-violet-700 to-purple-500",
    bgcolor: "bg-violet-100",
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
    <div className="min-h-screen bg-[#f0f5fb] font-sans">
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-blue-200/30 blur-3xl"></div>

        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-200/30 blur-3xl"></div>
      </div>

      {/* ================= TOPBAR ================= */}
      <header className="sticky top-0 z-50 flex h-[72px] items-center justify-between border-b border-blue-100 bg-white px-4 shadow-sm md:px-8">
        {/* Logo */}
        <div>
          <img src={image1} alt="logo" className="h-10 object-contain" />
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Bell */}
          <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-[#1a6aad] transition hover:bg-blue-100">
            <Bell size={18} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          </button>

          {/* User */}
          <div ref={userRef} className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-2 py-1.5 transition hover:bg-blue-100"
            >
              {/* Avatar */}
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-cyan-400 text-sm font-bold text-white shadow-md">
                {getInitial(currentUser.name)}
              </div>

              {/* Info */}
              <div className="hidden text-left sm:block">
                <p className="text-[13px] font-semibold text-slate-800">
                  {currentUser.name}
                </p>

                <p className="text-[11px] text-slate-500">{currentUser.role}</p>
              </div>

              <ChevronDown
                size={15}
                className={`text-slate-500 transition ${
                  userMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {userMenuOpen && (
              <div className="absolute right-0 top-[110%] w-[230px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                <div className="border-b border-slate-100 bg-gradient-to-br from-blue-50 to-cyan-50 px-4 py-4">
                  <p className="text-sm font-semibold text-slate-800">
                    {currentUser.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {currentUser.email}
                  </p>
                </div>

                <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">
                  <User size={16} />
                  Profile
                </button>

                <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-blue-50 hover:text-blue-700">
                  <Settings size={16} />
                  Account Settings
                </button>

                <div className="mx-3 h-px bg-slate-100"></div>

                <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-rose-600 transition hover:bg-rose-50">
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="mx-auto max-w-7xl px-4 pt-4 md:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-700">
          <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
           Welcome Back
        </div>

        <h1 className="mt-2 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
          Employee{" "}
          <span className="bg-gradient-to-r from-blue-700 to-sky-400 bg-clip-text text-transparent">
            Workspace
          </span>
        </h1>

        <p className="mt-4 max-w-xl text-[15px] leading-7 text-slate-500">
          Manage projects, timesheets, tasks and internal workflow efficiently
          from one place.
        </p>
      </section>

      {/* ================= CARDS ================= */}
      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 py-5  md:grid-cols-2 md:px-8 xl:grid-cols-3">
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
              whileHover={{ y: -8 }}
              onClick={() => navigate(item.route)}
              className="group cursor-pointer overflow-hidden rounded-l border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-2xl"
            >
              {/* INNER CONTENT */}
              <div
                className={`m-2 rounded p-4 ${item.bgcolor || "bg-slate-50"}`}
              >
                {/* Icon */}
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br ${item.gradient} text-white shadow-lg`}
                >
                  <Icon size={22} />
                </div>

                {/* Title */}
                <h2 className="text-[24px] font-extrabold text-slate-900">
                  {item.title}
                </h2>

                {/* Description */}
                <p className="text-sm leading-6 text-slate-500">
                  {item.description}
                </p>
              </div>

              {/* FOOTER */}
              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-100 px-6 py-2">
                <span className="text-lg font-semibold text-slate-800">
                  Explore
                </span>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-slate-700 shadow-sm transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
}
