import { useMemo, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  X,
  Plus,
  Bell,
  MoreVertical,
  Filter,
  Download,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  TrendingUp,
  Briefcase,
  CalendarDays,
  AlertCircle,
} from "lucide-react";

// ================= DATA =================

const rfpData = [
  {
    id: 1,
    code: "RFP-1021",
    title: "ERP Dashboard Development",
    department: "Development",
    priority: "High",
    status: "Pending",
    date: "21 May 2026",
    week: "Week 3 · 15–21 May 2026",
    assignee: { name: "John Doe", initial: "J", color: "#6366f1" },
    description: "Build core ERP dashboard with real-time analytics.",
  },
  {
    id: 2,
    code: "RFP-1022",
    title: "HRMS Employee Portal",
    department: "UI/UX",
    priority: "Medium",
    status: "Approved",
    date: "20 May 2026",
    week: "Week 3 · 15–21 May 2026",
    assignee: { name: "Sophia Lin", initial: "S", color: "#ec4899" },
    description: "Design and implement employee self-service portal.",
  },
  {
    id: 3,
    code: "RFP-1023",
    title: "CRM Management System",
    department: "QA",
    priority: "Low",
    status: "Rejected",
    date: "19 May 2026",
    week: "Week 3 · 15–21 May 2026",
    assignee: { name: "Daniel Park", initial: "D", color: "#f59e0b" },
    description: "QA testing for full CRM lifecycle management.",
  },
  {
    id: 4,
    code: "RFP-1024",
    title: "Inventory Management System",
    department: "Support",
    priority: "High",
    status: "In Review",
    date: "18 May 2026",
    week: "Week 2 · 08–14 May 2026",
    assignee: { name: "Emma White", initial: "E", color: "#10b981" },
    description: "Support integration for inventory tracking modules.",
  },
  {
    id: 5,
    code: "RFP-1025",
    title: "Client Billing Dashboard",
    department: "Finance",
    priority: "Medium",
    status: "Approved",
    date: "17 May 2026",
    week: "Week 2 · 08–14 May 2026",
    assignee: { name: "William Chen", initial: "W", color: "#3b82f6" },
    description: "Automated billing and invoice generation system.",
  },
  {
    id: 6,
    code: "RFP-1026",
    title: "Employee Tracking Portal",
    department: "HR",
    priority: "Low",
    status: "Pending",
    date: "16 May 2026",
    week: "Week 2 · 08–14 May 2026",
    assignee: { name: "Priya Sharma", initial: "P", color: "#8b5cf6" },
    description: "Attendance and performance tracking portal for HR.",
  },
  {
    id: 7,
    code: "RFP-1027",
    title: "AI Analytics Dashboard",
    department: "Research",
    priority: "High",
    status: "In Review",
    date: "15 May 2026",
    week: "Week 2 · 08–14 May 2026",
    assignee: { name: "Alex Torres", initial: "A", color: "#06b6d4" },
    description: "Research AI-powered predictive analytics module.",
  },
  {
    id: 8,
    code: "RFP-1028",
    title: "Customer Support CRM",
    department: "Support",
    priority: "Medium",
    status: "Rejected",
    date: "14 May 2026",
    week: "Week 1 · 01–07 May 2026",
    assignee: { name: "Rachel Kim", initial: "R", color: "#f43f5e" },
    description: "Support ticket and CRM integration for customer team.",
  },
  {
    id: 9,
    code: "RFP-1029",
    title: "Sales Monitoring App",
    department: "Marketing",
    priority: "High",
    status: "Pending",
    date: "13 May 2026",
    week: "Week 1 · 01–07 May 2026",
    assignee: { name: "Marcus Lee", initial: "M", color: "#f97316" },
    description: "Real-time sales monitoring and campaign tracking.",
  },
  {
    id: 10,
    code: "RFP-1030",
    title: "Attendance Tracking System",
    department: "HR",
    priority: "Low",
    status: "Approved",
    date: "12 May 2026",
    week: "Week 1 · 01–07 May 2026",
    assignee: { name: "Nina Patel", initial: "N", color: "#a855f7" },
    description: "Biometric and digital attendance tracking for HR.",
  },
  {
    id: 11,
    code: "RFP-1031",
    title: "Project Management Portal",
    department: "Development",
    priority: "Medium",
    status: "In Review",
    date: "11 May 2026",
    week: "Week 1 · 01–07 May 2026",
    assignee: { name: "Chris Nguyen", initial: "C", color: "#0ea5e9" },
    description: "Agile project management with sprint tracking.",
  },
  {
    id: 12,
    code: "RFP-1032",
    title: "Employee Mobile App",
    department: "Mobile Team",
    priority: "High",
    status: "Approved",
    date: "10 May 2026",
    week: "Week 1 · 01–07 May 2026",
    assignee: { name: "Sara Ahmed", initial: "S", color: "#14b8a6" },
    description: "Cross-platform mobile app for employee services.",
  },
];

// ================= HELPERS =================

const STATUS_CONFIG = {
  Approved: {
    label: "Approved",
    icon: CheckCircle2,
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    dot: "bg-emerald-500",
    border: "border-emerald-200",
  },
  Pending: {
    label: "Pending",
    icon: Clock,
    bg: "bg-amber-50",
    text: "text-amber-600",
    dot: "bg-amber-500",
    border: "border-amber-200",
  },
  Rejected: {
    label: "Rejected",
    icon: XCircle,
    bg: "bg-red-50",
    text: "text-red-500",
    dot: "bg-red-500",
    border: "border-red-200",
  },
  "In Review": {
    label: "In Review",
    icon: Loader2,
    bg: "bg-blue-50",
    text: "text-blue-600",
    dot: "bg-blue-500",
    border: "border-blue-200",
  },
};

const PRIORITY_CONFIG = {
  High: { bg: "bg-red-100", text: "text-red-600", border: "border-red-200" },
  Medium: { bg: "bg-orange-100", text: "text-orange-500", border: "border-orange-200" },
  Low: { bg: "bg-green-100", text: "text-green-600", border: "border-green-200" },
};

// ================= DETAIL MODAL =================

function DetailModal({ item, onClose }) {
  if (!item) return null;
  const s = STATUS_CONFIG[item.status] || STATUS_CONFIG["Pending"];
  const p = PRIORITY_CONFIG[item.priority] || PRIORITY_CONFIG["Medium"];
  const SIcon = s.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#1e3a8a] to-[#1d4ed8] px-6 pt-6 pb-10">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <X size={16} />
          </button>
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-white">
              {item.code}
            </span>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-bold ${p.bg} ${p.text} ${p.border}`}
            >
              {item.priority} Priority
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-white leading-tight">{item.title}</h2>
          <p className="mt-1 text-sm text-blue-200">{item.department} Department</p>
        </div>

        {/* Body */}
        <div className="-mt-5 rounded-t-3xl bg-white px-6 pt-6 pb-6">
          {/* Assignee */}
          <div className="mb-5 flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl text-base font-extrabold text-white shadow"
              style={{ background: item.assignee.color }}
            >
              {item.assignee.initial}
            </div>
            <div>
              <p className="text-xs text-slate-400">Assigned To</p>
              <p className="font-bold text-slate-800">{item.assignee.name}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-slate-400">Submitted</p>
              <p className="font-semibold text-slate-700">{item.date}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-5 rounded-2xl bg-slate-50 p-4">
            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-400">
              Description
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
          </div>

          {/* Status */}
          <div className="mb-5 flex items-center gap-3 rounded-2xl border p-4" style={{ borderColor: "#e2e8f0" }}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.bg}`}>
              <SIcon size={18} className={s.text} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Current Status</p>
              <p className={`font-bold ${s.text}`}>{item.status}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-slate-400">Timeline</p>
              <p className="text-xs font-semibold text-slate-600">{item.week}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full rounded-2xl bg-gradient-to-r from-[#1d4ed8] to-[#2563eb] py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 hover:opacity-90 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ================= ACTION MENU =================

function ActionMenu({ item, onView }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:border-blue-300 hover:text-blue-600 transition"
      >
        <MoreVertical size={16} />
      </button>
      {open && (
        <div className="absolute right-0 top-11 z-20 w-44 rounded-2xl border border-slate-200 bg-white shadow-xl py-2">
          <button
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
            onClick={() => { onView(item); setOpen(false); }}
          >
            <Eye size={14} className="text-blue-500" /> View Details
          </button>
          <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">
            <Download size={14} className="text-slate-400" /> Download PDF
          </button>
          <div className="my-1 border-t border-slate-100" />
          <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50">
            <XCircle size={14} /> Withdraw
          </button>
        </div>
      )}
    </div>
  );
}

// ================= MAIN =================

export default function EmployeeRFPPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showNewRFP, setShowNewRFP] = useState(false);
  const itemsPerPage = 8;

  // Stats
  const stats = useMemo(() => ({
    total: rfpData.length,
    approved: rfpData.filter((r) => r.status === "Approved").length,
    pending: rfpData.filter((r) => r.status === "Pending").length,
    inReview: rfpData.filter((r) => r.status === "In Review").length,
    rejected: rfpData.filter((r) => r.status === "Rejected").length,
  }), []);

  const filteredData = useMemo(() => {
    return rfpData.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase()) ||
        item.assignee.name.toLowerCase().includes(search.toLowerCase());
      const matchStatus = status === "All" ? true : item.status === status;
      const matchPriority = priority === "All" ? true : item.priority === priority;
      return matchSearch && matchStatus && matchPriority;
    });
  }, [search, status, priority]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilter = () => {
    setSearch("");
    setStatus("All");
    setPriority("All");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#f1f5fb] p-4 md:p-6 font-sans">
      {/* DETAIL MODAL */}
      <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />

      {/* ===== HEADER ===== */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600">
              Employee Portal
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            My RFP Requests
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Track and manage your submitted proposals
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 shadow-sm hover:border-blue-300 hover:text-blue-600 transition">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>
          <button
            onClick={() => setShowNewRFP(true)}
            className="flex h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-[#1d4ed8] to-[#3b82f6] px-5 text-sm font-bold text-white shadow-lg shadow-blue-200 hover:opacity-90 transition"
          >
            <Plus size={16} /> New RFP
          </button>
        </div>
      </div>

      {/* ===== STAT CARDS ===== */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total RFPs", value: stats.total, icon: Briefcase, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Approved", value: stats.approved, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending", value: stats.pending, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "In Review", value: stats.inReview, icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg}`}>
                <Icon size={20} className={stat.color} />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  {stat.label}
                </p>
                <p className="text-2xl font-extrabold text-slate-800">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== FILTERS ===== */}
      <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by code, title or assignee..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-blue-400 focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter size={15} className="text-slate-400" />
          {/* Status */}
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setCurrentPage(1); }}
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none focus:border-blue-400 transition"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="In Review">In Review</option>
          </select>

          {/* Priority */}
          <select
            value={priority}
            onChange={(e) => { setPriority(e.target.value); setCurrentPage(1); }}
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none focus:border-blue-400 transition"
          >
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Reset */}
          <button
            onClick={resetFilter}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:border-red-300 hover:bg-red-50 hover:text-red-500 transition"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Table header info */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
              <FileText size={18} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800">RFP Records</h2>
              <p className="text-xs text-slate-500">
                Showing <span className="font-semibold text-slate-700">{paginatedData.length}</span> of{" "}
                <span className="font-semibold text-slate-700">{filteredData.length}</span> records
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600 sm:flex">
            Page {currentPage} of {Math.max(totalPages, 1)}
          </div>
        </div>

        {/* Column headers */}
        <div className="hidden grid-cols-[80px_110px_1fr_120px_100px_110px_160px_80px] border-b border-slate-100 bg-slate-50 lg:grid">
          {["", "RFP Code", "Title & Department", "Assignee", "Priority", "Status", "Date / Week", "Action"].map((h) => (
            <div key={h} className="px-4 py-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              {h}
            </div>
          ))}
        </div>

        {/* Rows */}
        {paginatedData.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center text-center">
            <AlertCircle size={36} className="mb-3 text-slate-300" />
            <h3 className="font-bold text-slate-600">No Records Found</h3>
            <p className="mt-1 text-sm text-slate-400">Try changing filters or search term.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {paginatedData.map((item) => {
              const s = STATUS_CONFIG[item.status] || STATUS_CONFIG["Pending"];
              const p = PRIORITY_CONFIG[item.priority] || PRIORITY_CONFIG["Medium"];
              const SIcon = s.icon;

              return (
                <div
                  key={item.id}
                  className="grid grid-cols-1 gap-3 px-4 py-4 transition hover:bg-slate-50 lg:grid-cols-[80px_110px_1fr_120px_100px_110px_160px_80px] lg:items-center"
                >
                  {/* Project Icon */}
                  <div className="flex items-center lg:justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                      <Briefcase size={18} className="text-indigo-500" />
                    </div>
                  </div>

                  {/* Code */}
                  <div>
                    <p className="text-[10px] text-slate-400 lg:hidden">RFP Code</p>
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-extrabold text-slate-700">
                      {item.code}
                    </span>
                  </div>

                  {/* Title + Department */}
                  <div>
                    <p className="text-[10px] text-slate-400 lg:hidden">Title</p>
                    <p className="font-semibold text-slate-800 leading-tight">{item.title}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{item.department}</p>
                  </div>

                  {/* Assignee */}
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white shadow"
                      style={{ background: item.assignee.color }}
                    >
                      {item.assignee.initial}
                    </div>
                    <span className="text-xs font-medium text-slate-700 leading-tight">
                      {item.assignee.name.split(" ")[0]}
                    </span>
                  </div>

                  {/* Priority */}
                  <div>
                    <p className="text-[10px] text-slate-400 lg:hidden">Priority</p>
                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${p.bg} ${p.text} ${p.border}`}>
                      {item.priority}
                    </span>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-[10px] text-slate-400 lg:hidden">Status</p>
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${s.bg} ${s.text} ${s.border}`}>
                      <SIcon size={11} />
                      {item.status}
                    </span>
                  </div>

                  {/* Date / Week */}
                  <div>
                    <p className="text-[10px] text-slate-400 lg:hidden">Date</p>
                    <div className="flex items-center gap-1.5">
                      <CalendarDays size={12} className="text-slate-400" />
                      <div>
                        <p className="text-xs font-semibold text-slate-700">{item.week.split("·")[0].trim()}</p>
                        <p className="text-[10px] text-slate-400">{item.week.split("·")[1]?.trim()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex items-center gap-2">
                    <ActionMenu item={item} onView={setSelectedItem} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ===== PAGINATION ===== */}
        {filteredData.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 bg-slate-50 px-6 py-4">
            <p className="text-sm text-slate-500">
              Showing <span className="font-bold text-slate-700">{paginatedData.length}</span> of{" "}
              <span className="font-bold text-slate-700">{filteredData.length}</span> records
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                  currentPage === 1
                    ? "cursor-not-allowed border-slate-200 bg-white text-slate-300"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition ${
                    currentPage === i + 1
                      ? "bg-gradient-to-r from-[#1d4ed8] to-[#3b82f6] text-white shadow shadow-blue-200 scale-105"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:text-blue-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border transition ${
                  currentPage === totalPages
                    ? "cursor-not-allowed border-slate-200 bg-white text-slate-300"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ===== NEW RFP TOAST ===== */}
      {showNewRFP && (
        <div className="fixed bottom-6 right-6 z-50 w-80 rounded-2xl border border-blue-200 bg-white p-5 shadow-2xl">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600">
                <Plus size={14} className="text-white" />
              </div>
              <p className="font-bold text-slate-800">New RFP</p>
            </div>
            <button onClick={() => setShowNewRFP(false)} className="text-slate-400 hover:text-slate-600">
              <X size={16} />
            </button>
          </div>
          <p className="text-sm text-slate-500">
            New RFP form submission would open here. Connect to your backend to enable this feature.
          </p>
          <button
            onClick={() => setShowNewRFP(false)}
            className="mt-4 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition"
          >
            Got it
          </button>
        </div>
      )}
    </div>
  );
}