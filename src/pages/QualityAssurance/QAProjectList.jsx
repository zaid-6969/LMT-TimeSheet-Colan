import { useMemo, useState, useRef, useEffect } from "react";

import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Download,
  Plus,
  Clock3,
  Pencil,
  Trash2,
  FolderKanban,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCcw,
  ShieldCheck,
  MoreVertical,
  BadgeCheck,
  Loader,
  ClockIcon,
  X,
  Save,
  AlertTriangle,
} from "lucide-react";

// ================= DUMMY DATA =================

const INITIAL_QA_DATA = [
  {
    id: 1,
    project: "ERP Dashboard",
    tester: "John Doe",
    avatar: "J",
    avatarColor: "#2563EB",
    total: 24,
    priority: "High",
    status: "Active",
    module: "Frontend",
    date: "20 May 2026",
  },
  {
    id: 2,
    project: "CRM System",
    tester: "Sophia",
    avatar: "S",
    avatarColor: "#06B6D4",
    total: 18,
    priority: "Medium",
    status: "Completed",
    module: "Backend",
    date: "19 May 2026",
  },
  {
    id: 3,
    project: "HRMS Portal",
    tester: "David",
    avatar: "D",
    avatarColor: "#8B5CF6",
    total: 12,
    priority: "Low",
    status: "Pending",
    module: "Testing",
    date: "18 May 2026",
  },
  {
    id: 4,
    project: "Inventory System",
    tester: "Emma",
    avatar: "E",
    avatarColor: "#F97316",
    total: 32,
    priority: "High",
    status: "Active",
    module: "API",
    date: "17 May 2026",
  },
  {
    id: 5,
    project: "Billing Dashboard",
    tester: "William",
    avatar: "W",
    avatarColor: "#E11D48",
    total: 20,
    priority: "Medium",
    status: "Completed",
    module: "UI",
    date: "16 May 2026",
  },
  {
    id: 6,
    project: "Employee Tracker",
    tester: "Daniel",
    avatar: "D",
    avatarColor: "#059669",
    total: 15,
    priority: "Low",
    status: "Pending",
    module: "Research",
    date: "15 May 2026",
  },
];

const AVATAR_COLORS_MAP = {
  J: "#2563EB",
  S: "#06B6D4",
  D: "#8B5CF6",
  E: "#F97316",
  W: "#E11D48",
  M: "#059669",
};

const EMPTY_FORM = {
  project: "",
  tester: "",
  module: "",
  total: "",
  priority: "",
  status: "",
  date: "",
};

// ================= REUSABLE BADGES =================

function PriorityBadge({ p }) {
  const styles = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-amber-50 text-amber-600",
    Low: "bg-emerald-50 text-emerald-600",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[p]}`}
    >
      {p}
    </span>
  );
}

function StatusBadge({ s }) {
  const map = {
    Active: { cls: "bg-blue-50 text-blue-700", Icon: Loader },
    Completed: { cls: "bg-emerald-50 text-emerald-700", Icon: BadgeCheck },
    Pending: { cls: "bg-amber-50 text-amber-700", Icon: ClockIcon },
  };
  const { cls, Icon } = map[s] || map.Pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${cls}`}
    >
      <Icon size={11} className={s === "Active" ? "animate-spin" : ""} />
      {s}
    </span>
  );
}

// ================= ACTION MENU =================

function ActionMenu({ item, onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
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
        <div className="absolute right-0 top-11 z-50 min-w-[140px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <button 
            onClick={() => { onView(item); setOpen(false); }}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
          >
            <Eye size={14} />
            View
          </button>
          <button 
            onClick={() => { onEdit(item); setOpen(false); }}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
          >
            <Pencil size={14} />
            Edit
          </button>
          <button 
            onClick={() => { onDelete(item); setOpen(false); }}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

// ================= VIEW MODAL =================

function ViewModal({ item, onClose }) {
  if (!item) return null;
  return (
    <div onClick={onClose} className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[3px]">
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
        {/* Header */}
        <div className="border-b border-slate-200 bg-slate-50/70 px-7 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{item.module} Module</span>
                <PriorityBadge p={item.priority} />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-slate-900">{item.project}</h2>
              <p className="mt-1 text-sm text-slate-500">QA Tracking Information Summary</p>
            </div>
            <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
              <X size={16} />
            </button>
          </div>
        </div>
        {/* Body */}
        <div className="space-y-4 p-7">
          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold text-white"
              style={{ background: item.avatarColor || "#64748b" }}
            >
              {item.avatar}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Assigned Tester</p>
              <h3 className="mt-1 font-semibold text-slate-800">{item.tester}</h3>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Log Date</p>
              <h3 className="mt-1 font-semibold text-slate-800">{item.date}</h3>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Total Cases</p>
              <div className="mt-2 flex items-center gap-2 font-bold text-slate-800">
                <Clock3 size={16} className="text-blue-600" />
                {item.total} Cases Checked
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Status Overview</p>
              <div className="mt-2"><StatusBadge s={item.status} /></div>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={onClose} className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
              Close View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= FORM MODAL =================

function ProjectFormModal({ mode, initialData, onSave, onClose }) {
  const [form, setForm] = useState(initialData || EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.project.trim())      e.project = "Project designation name is required.";
    if (!form.tester.trim())       e.tester = "Tester assignment name is required.";
    if (!form.module.trim())       e.module = "Target workflow module location required.";
    if (!String(form.total).trim() || isNaN(form.total)) e.total = "Valid total testcase tally required.";
    if (!form.priority)            e.priority = "Select execution priority.";
    if (!form.status)              e.status = "Select testing state.";
    if (!form.date.trim())         e.date = "Monitored compilation log date required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const isEdit = mode === "edit";

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl overflow-hidden rounded-[24px] bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{isEdit ? "Edit QA Report" : "Add New QA Report"}</h2>
            <p className="mt-0.5 text-sm text-slate-500">{isEdit ? "Modify configuration specifications below." : "Provide input data values below to generate entry."}</p>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Project <span className="text-red-500">*</span></label>
              <input
                value={form.project}
                onChange={(e) => set("project", e.target.value)}
                placeholder="e.g. ERP Dashboard"
                className={`h-10 w-full rounded-xl border px-3 text-sm text-slate-700 outline-none focus:border-blue-500 ${errors.project ? "border-red-400" : "border-slate-200"}`}
              />
              {errors.project && <p className="mt-1 text-xs text-red-500">{errors.project}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Tester <span className="text-red-500">*</span></label>
              <input
                value={form.tester}
                onChange={(e) => set("tester", e.target.value)}
                placeholder="e.g. John Doe"
                className={`h-10 w-full rounded-xl border px-3 text-sm text-slate-700 outline-none focus:border-blue-500 ${errors.tester ? "border-red-400" : "border-slate-200"}`}
              />
              {errors.tester && <p className="mt-1 text-xs text-red-500">{errors.tester}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Module Name <span className="text-red-500">*</span></label>
              <input
                value={form.module}
                onChange={(e) => set("module", e.target.value)}
                placeholder="e.g. Frontend"
                className={`h-10 w-full rounded-xl border px-3 text-sm text-slate-700 outline-none focus:border-blue-500 ${errors.module ? "border-red-400" : "border-slate-200"}`}
              />
              {errors.module && <p className="mt-1 text-xs text-red-500">{errors.module}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Total Cases <span className="text-red-500">*</span></label>
              <input
                type="number"
                value={form.total}
                onChange={(e) => set("total", Number(e.target.value))}
                placeholder="e.g. 25"
                className={`h-10 w-full rounded-xl border px-3 text-sm text-slate-700 outline-none focus:border-blue-500 ${errors.total ? "border-red-400" : "border-slate-200"}`}
              />
              {errors.total && <p className="mt-1 text-xs text-red-500">{errors.total}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Status <span className="text-red-500">*</span></label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                className={`h-10 w-full rounded-xl border bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 ${errors.status ? "border-red-400" : "border-slate-200"}`}
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
              {errors.status && <p className="mt-1 text-xs text-red-500">{errors.status}</p>}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">Date Logged <span className="text-red-500">*</span></label>
            <input
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              placeholder="e.g. 20 May 2026"
              className={`h-10 w-full rounded-xl border px-3 text-sm text-slate-700 outline-none focus:border-blue-500 ${errors.date ? "border-red-400" : "border-slate-200"}`}
            />
            {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button onClick={onClose} className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            <X size={14} /> Cancel
          </button>
          <button
            onClick={() => { if (validate()) onSave(form); }}
            className="flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Save size={14} />
            {isEdit ? "Update Changes" : "Save Record"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ================= DELETE MODAL =================

function DeleteModal({ item, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Delete QA Report</h2>
            <p className="mt-0.5 text-sm text-slate-500">This action cannot be rolled back.</p>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50">
            <X size={16} />
          </button>
        </div>
        <div className="px-6 py-5">
          <div className="flex items-start gap-3 rounded-xl bg-red-50 px-4 py-3">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-500" />
            <p className="text-sm text-red-700">
              Are you sure you want to delete report for{" "}
              <span className="font-semibold">"{item.project}"</span>?
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button onClick={onClose} className="flex h-10 items-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex h-10 items-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-semibold text-white hover:bg-red-700">
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ================= MAIN COMPONENT =================

export default function QAProjectList() {
  const [qaData, setQaData] = useState(INITIAL_QA_DATA);
  const [projectStatus, setProjectStatus] = useState("All");
  const [projectFilter, setProjectFilter] = useState("All");
  const [testerFilter, setTesterFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [nextId, setNextId] = useState(7);

  // Modal Control States
  const [viewItem, setViewItem] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  // ── FILTER ──
  const filteredData = useMemo(() => {
    return qaData.filter((item) => {
      const matchStatus = projectStatus === "All" || item.status === projectStatus;
      const matchProject = projectFilter === "All" || item.project === projectFilter;
      const matchTester = testerFilter === "All" || item.tester === testerFilter;
      const matchPriority = priorityFilter === "All" || item.priority === priorityFilter;
      const matchSearch =
        item.project.toLowerCase().includes(search.toLowerCase()) ||
        item.tester.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchProject && matchTester && matchPriority && matchSearch;
    });
  }, [qaData, projectStatus, projectFilter, testerFilter, priorityFilter, search]);

  // ── Dynamic Unique Filter Options Arrays extracted from dynamic state data lists ──
  const uniqueProjectsList = useMemo(() => ["All", ...new Set(qaData.map(i => i.project))], [qaData]);
  const uniqueTestersList = useMemo(() => ["All", ...new Set(qaData.map(i => i.tester))], [qaData]);

  // ── PAGINATION ──
  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedData = filteredData.slice(
    (safePage - 1) * rowsPerPage,
    safePage * rowsPerPage,
  );
  const startRow = filteredData.length === 0 ? 0 : (safePage - 1) * rowsPerPage + 1;
  const endRow = Math.min(safePage * rowsPerPage, filteredData.length);

  // ── RESET ──
  const handleReset = () => {
    setProjectStatus("All");
    setProjectFilter("All");
    setTesterFilter("All");
    setPriorityFilter("All");
    setSearch("");
    setCurrentPage(1);
  };

  // ── COUNTS ──
  const activeCount = qaData.filter((i) => i.status === "Active").length;
  const completedCount = qaData.filter((i) => i.status === "Completed").length;
  const pendingCount = qaData.filter((i) => i.status === "Pending").length;

  // ── CRUD HANDLERS ──
  const handleAdd = (form) => {
    const letter = (form.tester[0] || "?").toUpperCase();
    const color = AVATAR_COLORS_MAP[letter] || "#64748b";
    setQaData((prev) => [
      ...prev,
      { id: nextId, ...form, avatar: letter, avatarColor: color },
    ]);
    setNextId((n) => n + 1);
    setAddModal(false);
  };

  const handleEdit = (form) => {
    const letter = (form.tester[0] || "?").toUpperCase();
    const color = AVATAR_COLORS_MAP[letter] || "#64748b";
    setQaData((prev) =>
      prev.map((item) => item.id === editItem.id ? { ...item, ...form, avatar: letter, avatarColor: color } : item)
    );
    setEditItem(null);
  };

  const handleDelete = () => {
    setQaData((prev) => prev.filter((item) => item.id !== deleteItem.id));
    setDeleteItem(null);
  };

  const editFormData = editItem
    ? {
        project: editItem.project,
        tester: editItem.tester,
        module: editItem.module,
        total: editItem.total,
        priority: editItem.priority,
        status: editItem.status,
        date: editItem.date,
      }
    : null;

  return (
    <div className="space-y-6">
      {/* ── MODALS ── */}
      {viewItem && <ViewModal item={viewItem} onClose={() => setViewItem(null)} />}
      {addModal && <ProjectFormModal mode="add" initialData={EMPTY_FORM} onSave={handleAdd} onClose={() => setAddModal(false)} />}
      {editItem && <ProjectFormModal mode="edit" initialData={editFormData} onSave={handleEdit} onClose={() => setEditItem(null)} />}
      {deleteItem && <DeleteModal item={deleteItem} onConfirm={handleDelete} onClose={() => setDeleteItem(null)} />}

      {/* ── HEADER ── */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Quality Assurance
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            QA Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Monitor QA reports, project testing progress and issue tracking.
          </p>
        </div>
      </div>

      {/* ── TABLE ── */}
      <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
        {/* TOOLBAR */}
        <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-2 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={projectStatus}
              onChange={(e) => { setProjectStatus(e.target.value); setCurrentPage(1); }}
              className="h-8 rounded-lg border border-slate-200 bg-white px-1 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>

            <select
              value={projectFilter}
              onChange={(e) => { setProjectFilter(e.target.value); setCurrentPage(1); }}
              className="h-8 rounded-lg border border-slate-200 bg-white px-1 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
            >
              {uniqueProjectsList.map(proj => (
                <option key={proj} value={proj}>{proj === "All" ? "All Projects" : proj}</option>
              ))}
            </select>

            <select
              value={testerFilter}
              onChange={(e) => { setTesterFilter(e.target.value); setCurrentPage(1); }}
              className="h-8 rounded-lg border border-slate-200 bg-white px-1 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
            >
              {uniqueTestersList.map(test => (
                <option key={test} value={test}>{test === "All" ? "All Testers" : test}</option>
              ))}
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => { setPriorityFilter(e.target.value); setCurrentPage(1); }}
              className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="All">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <button
              onClick={handleReset}
              className="flex h-8 items-center gap-2 rounded-lg bg-white px-1 text-sm text-slate-600 hover:text-rose-500"
            >
              <RefreshCcw size={15} />
            </button>
          </div>

          {/* RIGHT */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-8 items-center gap-2 rounded-lg border border-slate-200 bg-white px-1 focus-within:border-blue-500">
              <Search size={14} className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Search QA..."
                className="bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Show</span>
              <select
                value={rowsPerPage}
                onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                className="h-8 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 outline-none"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
              <span>per page</span>
            </div>
          </div>
        </div>

        {/* TABLE BODY */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100/70">
              <tr className="border-b border-slate-200">
                {["Project", "Tester", "Module", "Total Cases", "Priority", "Status", "Date", "Action"].map(
                  (head) => (
                    <th
                      key={head}
                      className="whitespace-nowrap px-5 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400"
                    >
                      {head}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 transition-all hover:bg-blue-50/40"
                >
                  {/* PROJECT */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                        <ShieldCheck size={17} className="text-blue-600" />
                      </div>
                      <p className="text-sm font-semibold text-slate-700">{item.project}</p>
                    </div>
                  </td>

                  {/* TESTER */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                        style={{ background: item.avatarColor + "22", color: item.avatarColor }}
                      >
                        {item.avatar}
                      </div>
                      <span className="text-sm text-slate-600">{item.tester}</span>
                    </div>
                  </td>

                  {/* MODULE */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {item.module}
                    </span>
                  </td>

                  {/* TOTAL CASES */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Clock3 size={15} className="text-blue-600" />
                      <span className="text-sm font-semibold text-slate-700">{item.total}</span>
                    </div>
                  </td>

                  {/* PRIORITY */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <PriorityBadge p={item.priority} />
                  </td>

                  {/* STATUS */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <StatusBadge s={item.status} />
                  </td>

                  {/* DATE */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <p className="text-sm text-slate-500">{item.date}</p>
                  </td>

                  {/* ACTION */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <ActionMenu 
                      item={item}
                      onView={setViewItem}
                      onEdit={(i) => setEditItem(i)}
                      onDelete={(i) => setDeleteItem(i)}
                    />
                  </td>
                </tr>
              ))}

        
            </tbody>
          </table>
        </div>

        {/* FOOTER / PAGINATION */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/50 px-5 py-1">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">{startRow}</span> to{" "}
            <span className="font-semibold text-slate-700">{endRow}</span> of{" "}
            <span className="font-semibold text-slate-700">{filteredData.length}</span> records
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={safePage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="flex h-8 w-8 items-center justify-center rounded border border-slate-300 bg-white text-slate-600 disabled:opacity-40"
            >
              <ChevronLeft size={15} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setCurrentPage(pg)}
                className={`flex h-8 w-8 items-center justify-center rounded text-sm font-semibold ${
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
              onClick={() => setCurrentPage((p) => p - 1)}
              className="flex h-8 w-8 items-center justify-center rounded border border-slate-300 bg-white text-slate-600 disabled:opacity-40"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}