import { useMemo, useState, useRef, useEffect } from "react";
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
  Layers3,
  ArrowUpRight,
  BadgeCheck,
  Save,
  AlertTriangle,
  Pencil,
  Trash2,
} from "lucide-react";

/* ─────────────────── INITIAL DATA ─────────────────── */

const INITIAL_RFP = [
  {
    id: 1,
    code: "RFP-1021",
    title: "ERP Dashboard Development",
    department: "Development",
    priority: "High",
    status: "Pending",
    date: "2026-05-21",
    week: "Week 3 · 15–21 May 2026",
    assignee: { name: "John Doe", initial: "J", color: "#2563eb" },
    description: "Build core ERP dashboard with real-time analytics.",
  },
  {
    id: 2,
    code: "RFP-1022",
    title: "HRMS Employee Portal",
    department: "UI/UX",
    priority: "Medium",
    status: "Approved",
    date: "2026-05-20",
    week: "Week 3 · 15–21 May 2026",
    assignee: { name: "Sophia Lin", initial: "S", color: "#db2777" },
    description: "Design and implement employee self-service portal.",
  },
  {
    id: 3,
    code: "RFP-1023",
    title: "CRM Management System",
    department: "QA",
    priority: "Low",
    status: "Rejected",
    date: "2026-05-19",
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
    date: "2026-05-18",
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
    date: "2026-05-17",
    week: "Week 2 · 08–14 May 2026",
    assignee: { name: "William Chen", initial: "W", color: "#3b82f6" },
    description: "Automated billing and invoice generation system.",
  },
];

const DEPARTMENTS = ["Development", "UI/UX", "QA", "Support", "Finance", "HR", "DevOps", "Marketing"];
const WEEKS = [
  "Week 1 · 01–07 May 2026",
  "Week 2 · 08–14 May 2026",
  "Week 3 · 15–21 May 2026",
  "Week 4 · 22–28 May 2026",
];

const EMPTY_FORM = {
  title: "", department: "", priority: "", status: "",
  date: "", week: "", description: "",
  assigneeName: "", assigneeInitial: "", assigneeColor: "#2563eb",
};

/* ─────────────────── CONFIG ─────────────────── */

const STATUS_CONFIG = {
  Approved:  { icon: CheckCircle2, bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  Pending:   { icon: Clock,        bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200"   },
  Rejected:  { icon: XCircle,      bg: "bg-red-50",     text: "text-red-600",     border: "border-red-200"     },
  "In Review": { icon: Loader2,    bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200"    },
};

const PRIORITY_CONFIG = {
  High:   { bg: "bg-red-50",     text: "text-red-600",     border: "border-red-200"     },
  Medium: { bg: "bg-amber-50",   text: "text-amber-600",   border: "border-amber-200"   },
  Low:    { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
};

const AVATAR_COLORS = ["#2563eb", "#db2777", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#06b6d4", "#ef4444"];

function formatDate(iso) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
}

/* ─────────────────── ACTION MENU ─────────────────── */

function ActionMenu({ item, onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:bg-slate-50"
      >
        <MoreVertical size={15} />
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 min-w-[170px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <button
            onClick={() => { onView(item); setOpen(false); }}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
          >
            <Eye size={14} /> View Details
          </button>
          <button
            onClick={() => { onEdit(item); setOpen(false); }}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
          >
            <Pencil size={14} /> Edit RFP
          </button>
          <button className="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50">
            <Download size={14} /> Download PDF
          </button>
          <div className="border-t border-slate-100" />
          <button
            onClick={() => { onDelete(item); setOpen(false); }}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

/* ─────────────────── DETAIL MODAL ─────────────────── */

function DetailModal({ item, onClose }) {
  if (!item) return null;
  const status = STATUS_CONFIG[item.status];
  const priority = PRIORITY_CONFIG[item.priority];
  const StatusIcon = status.icon;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[3px]"
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl overflow-hidden rounded-[28px] bg-white shadow-2xl">

        {/* Header */}
        <div className="border-b border-slate-200 bg-slate-50/70 px-7 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{item.code}</span>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${priority.bg} ${priority.text} ${priority.border}`}>
                  {item.priority} Priority
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-slate-900">{item.title}</h2>
              <p className="mt-1 text-sm text-slate-500">{item.department} Department</p>
            </div>
            <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-5 p-7">
          {/* Assignee */}
          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold text-white" style={{ background: item.assignee.color }}>
              {item.assignee.initial}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Assigned To</p>
              <h3 className="mt-1 font-semibold text-slate-800">{item.assignee.name}</h3>
            </div>
            <div className="ml-auto">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Submitted Date</p>
              <h3 className="mt-1 font-semibold text-slate-800">{formatDate(item.date)}</h3>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Description</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
          </div>

          {/* Status + Timeline */}
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${status.bg}`}>
              <StatusIcon size={20} className={status.text} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Current Status</p>
              <h3 className={`mt-1 font-semibold ${status.text}`}>{item.status}</h3>
            </div>
            <div className="ml-auto">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Timeline</p>
              <h3 className="mt-1 text-sm font-semibold text-slate-700">{item.week}</h3>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
              Close
            </button>
            <button className="flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700">
              <Download size={15} /> Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── ADD / EDIT MODAL ─────────────────── */

function RFPFormModal({ mode, initialData, nextCode, onSave, onClose }) {
  const [form, setForm] = useState(initialData || EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const setAssigneeName = (val) => {
    const parts = val.trim().split(" ");
    const ini = parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : (val[0] || "?").toUpperCase();
    setForm((f) => ({ ...f, assigneeName: val, assigneeInitial: ini }));
    setErrors((e) => ({ ...e, assigneeName: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim())        e.title        = "Title is required.";
    if (!form.department)          e.department   = "Select a department.";
    if (!form.priority)            e.priority     = "Select priority.";
    if (!form.status)              e.status       = "Select status.";
    if (!form.date)                e.date         = "Select a date.";
    if (!form.week)                e.week         = "Select a week.";
    if (!form.description.trim())  e.description  = "Description is required.";
    if (!form.assigneeName.trim()) e.assigneeName = "Assignee name is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(form);
  };

  const isEdit = mode === "edit";

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl overflow-hidden rounded-[24px] bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{isEdit ? "Edit RFP" : "New RFP Request"}</h2>
            <p className="mt-0.5 text-sm text-slate-500">
              {isEdit ? "Update the RFP details below." : `Creating ${nextCode} — fill in all required fields.`}
            </p>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5 space-y-4">

          {/* Title */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">Project Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Enter project title"
              className={`h-10 w-full rounded-xl border px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 ${errors.title ? "border-red-400" : "border-slate-200"}`}
            />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
          </div>

          {/* Department + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Department <span className="text-red-500">*</span></label>
              <select
                value={form.department}
                onChange={(e) => set("department", e.target.value)}
                className={`h-10 w-full rounded-xl border bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 ${errors.department ? "border-red-400" : "border-slate-200"}`}
              >
                <option value="">Select dept</option>
                {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
              {errors.department && <p className="mt-1 text-xs text-red-500">{errors.department}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Priority <span className="text-red-500">*</span></label>
              <select
                value={form.priority}
                onChange={(e) => set("priority", e.target.value)}
                className={`h-10 w-full rounded-xl border bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 ${errors.priority ? "border-red-400" : "border-slate-200"}`}
              >
                <option value="">Select priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              {errors.priority && <p className="mt-1 text-xs text-red-500">{errors.priority}</p>}
            </div>
          </div>

          {/* Status + Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Status <span className="text-red-500">*</span></label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                className={`h-10 w-full rounded-xl border bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 ${errors.status ? "border-red-400" : "border-slate-200"}`}
              >
                <option value="">Select status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="In Review">In Review</option>
              </select>
              {errors.status && <p className="mt-1 text-xs text-red-500">{errors.status}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Submission Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                className={`h-10 w-full rounded-xl border px-3 text-sm text-slate-700 outline-none focus:border-blue-500 ${errors.date ? "border-red-400" : "border-slate-200"}`}
              />
              {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
            </div>
          </div>

          {/* Week */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">Timeline Week <span className="text-red-500">*</span></label>
            <select
              value={form.week}
              onChange={(e) => set("week", e.target.value)}
              className={`h-10 w-full rounded-xl border bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 ${errors.week ? "border-red-400" : "border-slate-200"}`}
            >
              <option value="">Select week</option>
              {WEEKS.map((w) => <option key={w} value={w}>{w}</option>)}
            </select>
            {errors.week && <p className="mt-1 text-xs text-red-500">{errors.week}</p>}
          </div>

          {/* Assignee Name + Color */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">Assignee Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.assigneeName}
              onChange={(e) => setAssigneeName(e.target.value)}
              placeholder="Enter assignee name"
              className={`h-10 w-full rounded-xl border px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 ${errors.assigneeName ? "border-red-400" : "border-slate-200"}`}
            />
            {errors.assigneeName && <p className="mt-1 text-xs text-red-500">{errors.assigneeName}</p>}
          </div>

          {/* Avatar Color */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">Avatar Color</label>
            <div className="flex gap-2 flex-wrap">
              {AVATAR_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => set("assigneeColor", c)}
                  className="h-8 w-8 rounded-full border-2 transition-all"
                  style={{ background: c, borderColor: form.assigneeColor === c ? "#1e293b" : "transparent" }}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">Description <span className="text-red-500">*</span></label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe the RFP project..."
              rows={3}
              className={`w-full resize-none rounded-xl border px-3 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 ${errors.description ? "border-red-400" : "border-slate-200"}`}
            />
            {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button onClick={onClose} className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            <X size={14} /> Cancel
          </button>
          <button onClick={handleSave} className="flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700">
            <Save size={14} />
            {isEdit ? "Update RFP" : "Submit RFP"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── DELETE MODAL ─────────────────── */

function DeleteModal({ item, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Delete RFP</h2>
            <p className="mt-0.5 text-sm text-slate-500">This action cannot be undone.</p>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50">
            <X size={16} />
          </button>
        </div>
        <div className="px-6 py-5">
          <div className="flex items-start gap-3 rounded-xl bg-red-50 px-4 py-3">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-500" />
            <p className="text-sm text-red-700">
              Are you sure you want to delete{" "}
              <span className="font-semibold">"{item.code} – {item.title}"</span>?
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button onClick={onClose} className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex h-10 items-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-semibold text-white hover:bg-red-700">
            <Trash2 size={14} /> Delete RFP
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── MAIN PAGE ─────────────────── */

export default function EmployeeRFPPage() {
  const [rfpList, setRfpList]         = useState(INITIAL_RFP);
  const [search, setSearch]           = useState("");
  const [status, setStatus]           = useState("All");
  const [priority, setPriority]       = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [nextId, setNextId]           = useState(6);

  // Modals
  const [viewItem, setViewItem]       = useState(null);
  const [addModal, setAddModal]       = useState(false);
  const [editItem, setEditItem]       = useState(null);
  const [deleteItem, setDeleteItem]   = useState(null);

  const itemsPerPage = 6;
  const nextCode = `RFP-${1020 + nextId}`;

  /* ── stats ── */
  const stats = useMemo(() => ({
    total:    rfpList.length,
    approved: rfpList.filter((r) => r.status === "Approved").length,
    pending:  rfpList.filter((r) => r.status === "Pending").length,
    inReview: rfpList.filter((r) => r.status === "In Review").length,
  }), [rfpList]);

  /* ── filtered ── */
  const filteredData = useMemo(() => {
    return rfpList.filter((item) => {
      const ms =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase()) ||
        item.assignee.name.toLowerCase().includes(search.toLowerCase());
      const mst = status   === "All" || item.status   === status;
      const mp  = priority === "All" || item.priority === priority;
      return ms && mst && mp;
    });
  }, [rfpList, search, status, priority]);

  const totalPages    = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const safePage      = Math.min(currentPage, totalPages);
  const paginatedData = filteredData.slice((safePage - 1) * itemsPerPage, safePage * itemsPerPage);

  /* ── handlers ── */
  const handleAdd = (form) => {
    const ini = form.assigneeInitial || (form.assigneeName[0] || "?").toUpperCase();
    setRfpList((prev) => [
      ...prev,
      {
        id: nextId,
        code: nextCode,
        title: form.title,
        department: form.department,
        priority: form.priority,
        status: form.status,
        date: form.date,
        week: form.week,
        description: form.description,
        assignee: { name: form.assigneeName, initial: ini, color: form.assigneeColor },
      },
    ]);
    setNextId((n) => n + 1);
    setAddModal(false);
  };

  const handleEdit = (form) => {
    const ini = form.assigneeInitial || (form.assigneeName[0] || "?").toUpperCase();
    setRfpList((prev) =>
      prev.map((r) =>
        r.id === editItem.id
          ? {
              ...r,
              title: form.title,
              department: form.department,
              priority: form.priority,
              status: form.status,
              date: form.date,
              week: form.week,
              description: form.description,
              assignee: { name: form.assigneeName, initial: ini, color: form.assigneeColor },
            }
          : r
      )
    );
    setEditItem(null);
  };

  const handleDelete = () => {
    setRfpList((prev) => prev.filter((r) => r.id !== deleteItem.id));
    setDeleteItem(null);
  };

  const editFormData = editItem
    ? {
        title: editItem.title,
        department: editItem.department,
        priority: editItem.priority,
        status: editItem.status,
        date: editItem.date,
        week: editItem.week,
        description: editItem.description,
        assigneeName: editItem.assignee.name,
        assigneeInitial: editItem.assignee.initial,
        assigneeColor: editItem.assignee.color,
      }
    : null;

  /* ── render ── */
  return (
    <div className="space-y-6">

      {/* ── MODALS ── */}
      {viewItem   && <DetailModal  item={viewItem}   onClose={() => setViewItem(null)} />}
      {addModal   && <RFPFormModal mode="add"  initialData={EMPTY_FORM}  nextCode={nextCode} onSave={handleAdd}  onClose={() => setAddModal(false)} />}
      {editItem   && <RFPFormModal mode="edit" initialData={editFormData} nextCode=""        onSave={handleEdit} onClose={() => setEditItem(null)} />}
      {deleteItem && <DeleteModal  item={deleteItem} onConfirm={handleDelete} onClose={() => setDeleteItem(null)} />}

      {/* ── HEADER ── */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Employee Portal</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">My RFP Requests</h1>
          <p className="mt-2 text-sm text-slate-500">Track and manage your submitted proposals and approvals.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
            <Bell size={18} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <button
            onClick={() => setAddModal(true)}
            className="flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition-all hover:bg-blue-700"
          >
            <Plus size={15} /> New RFP
          </button>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[
          { label: "TOTAL RFP",  value: stats.total,    icon: Layers3,    bg: "bg-blue-50",    iconColor: "text-blue-600",    border: "border-l-blue-500"    },
          { label: "APPROVED",   value: stats.approved, icon: BadgeCheck, bg: "bg-emerald-50", iconColor: "text-emerald-600", border: "border-l-emerald-500" },
          { label: "PENDING",    value: stats.pending,  icon: Clock,      bg: "bg-amber-50",   iconColor: "text-amber-600",   border: "border-l-amber-500"   },
          { label: "IN REVIEW",  value: stats.inReview, icon: TrendingUp, bg: "bg-cyan-50",    iconColor: "text-cyan-600",    border: "border-l-cyan-500"    },
        ].map(({ label, value, icon: Icon, bg, iconColor, border }) => (
          <div
            key={label}
            className={`relative overflow-hidden rounded-2xl border border-slate-200 border-l-[3px] ${border} bg-white px-5 py-5 shadow-sm`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</p>
                <h2 className="mt-3 text-[34px] font-bold leading-none tracking-tight text-slate-900">{value}</h2>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${bg}`}>
                <Icon size={18} className={iconColor} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── FILTER BAR ── */}
      <div className="flex flex-col gap-3 rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex h-10 flex-1 items-center rounded-xl border border-slate-200 bg-white px-4 focus-within:border-blue-500">
          <Search size={14} className="text-slate-400" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            placeholder="Search by code, title or assignee..."
            className="w-full bg-transparent px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Filter size={14} className="text-slate-400" />
          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setCurrentPage(1); }}
            className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="In Review">In Review</option>
          </select>
          <select
            value={priority}
            onChange={(e) => { setPriority(e.target.value); setCurrentPage(1); }}
            className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
          >
            <option value="All">All Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button
            onClick={() => { setSearch(""); setStatus("All"); setPriority("All"); setCurrentPage(1); }}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:bg-red-50 hover:text-red-500"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* ── TABLE ── */}
      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">

        {/* Table top bar */}
        <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-50/60 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <FileText size={19} className="text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-800">RFP Records</h2>
              <p className="mt-1 text-xs text-slate-500">Showing {filteredData.length} total records</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700">
            <ArrowUpRight size={12} />
            Page {safePage} of {Math.max(totalPages, 1)}
          </div>
        </div>

        {/* Column headers */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100/70">
              <tr className="border-b border-slate-200">
                {["RFP Code", "Project", "Assignee", "Priority", "Status", "Timeline", "Action"].map((head) => (
                  <th
                    key={head}
                    className="whitespace-nowrap px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedData.map((item) => {
                const statusConfig   = STATUS_CONFIG[item.status];
                const priorityConfig = PRIORITY_CONFIG[item.priority];
                const StatusIcon     = statusConfig.icon;

                return (
                  <tr
                    key={item.id}
                    className="transition-all hover:bg-blue-50/40"
                  >
                    {/* Code */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{item.code}</span>
                    </td>

                    {/* Title */}
                    <td className="min-w-[220px] px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                          <Briefcase size={17} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                          <p className="mt-0.5 text-xs text-slate-400">{item.department}</p>
                        </div>
                      </div>
                    </td>

                    {/* Assignee */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                          style={{ background: item.assignee.color }}
                        >
                          {item.assignee.initial}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-700">{item.assignee.name}</p>
                          <p className="text-xs text-slate-400">Team Member</p>
                        </div>
                      </div>
                    </td>

                    {/* Priority */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${priorityConfig.bg} ${priorityConfig.text} ${priorityConfig.border}`}>
                        {item.priority}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                        <StatusIcon size={11} /> {item.status}
                      </span>
                    </td>

                    {/* Timeline */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex items-start gap-2">
                        <CalendarDays size={13} className="mt-0.5 text-slate-400" />
                        <div>
                          <p className="text-sm font-semibold text-slate-700">{formatDate(item.date)}</p>
                          <p className="mt-0.5 text-xs text-slate-400">{item.week}</p>
                        </div>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <ActionMenu
                        item={item}
                        onView={setViewItem}
                        onEdit={(i) => setEditItem(i)}
                        onDelete={(i) => setDeleteItem(i)}
                      />
                    </td>
                  </tr>
                );
              })}

              {/* Empty state */}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-20 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100">
                        <AlertCircle size={34} className="text-slate-400" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-700">No Records Found</h3>
                      <p className="mt-2 text-sm text-slate-500">Try changing filters or search keyword.</p>
                      <button
                        onClick={() => setAddModal(true)}
                        className="mt-4 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        <Plus size={14} /> Create New RFP
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        {filteredData.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 bg-slate-50/50 px-6 py-4">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">{(safePage - 1) * itemsPerPage + 1}</span> to{" "}
              <span className="font-semibold text-slate-700">{Math.min(safePage * itemsPerPage, filteredData.length)}</span> of{" "}
              <span className="font-semibold text-slate-700">{filteredData.length}</span> records
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={safePage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-40"
              >
                <ChevronLeft size={15} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <button
                  key={pg}
                  onClick={() => setCurrentPage(pg)}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold ${
                    safePage === pg
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {pg}
                </button>
              ))}
              <button
                disabled={safePage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-40"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}