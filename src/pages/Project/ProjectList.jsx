import { useMemo, useState, useRef, useEffect } from "react";
import {
  Search,
  FolderKanban,
  Eye,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Download,
  Plus,
  RefreshCcw,
  CheckCircle2,
  Loader2,
  AlertCircle,
  MoreVertical,
  Pencil,
  Trash2,
  X,
  Save,
  AlertTriangle,
  BriefcaseBusiness,
  Users,
  BadgeCheck,
  Clock3,
} from "lucide-react";

/* ─────────────────── INITIAL DATA ─────────────────── */

const AVATAR_COLORS = {
  J: "#2563eb",
  S: "#db2777",
  D: "#f59e0b",
  E: "#10b981",
  W: "#3b82f6",
  M: "#8b5cf6",
};

const INITIAL_PROJECTS = [
  {
    id: 1,
    name: "ERP System",
    client: "Infosys",
    employee: "John Doe",
    employeeShort: "J",
    task: "Develop Employee Dashboard",
    priority: "High",
    status: "Completed",
    week: "Week 1",
    deadline: "01–07 May 2026",
  },
  {
    id: 2,
    name: "Inventory System",
    client: "TCS",
    employee: "Sophia",
    employeeShort: "S",
    task: "Stock Management Integration",
    priority: "Medium",
    status: "Completed",
    week: "Week 2",
    deadline: "08–14 May 2026",
  },
  {
    id: 3,
    name: "Analytics Portal",
    client: "Google",
    employee: "Daniel",
    employeeShort: "D",
    task: "Create Charts and Reports",
    priority: "Medium",
    status: "Active",
    week: "Week 3",
    deadline: "15–21 May 2026",
  },
  {
    id: 4,
    name: "Client CRM",
    client: "Zoho",
    employee: "Emma",
    employeeShort: "E",
    task: "Lead Management Module",
    priority: "Low",
    status: "Pending",
    week: "Week 4",
    deadline: "22–28 May 2026",
  },
  {
    id: 5,
    name: "Finance App",
    client: "IBM",
    employee: "William",
    employeeShort: "W",
    task: "Payment Gateway Integration",
    priority: "High",
    status: "Review",
    week: "Week 5",
    deadline: "29–31 May 2026",
  },
  {
    id: 6,
    name: "Attendance App",
    client: "Adobe",
    employee: "Michael",
    employeeShort: "M",
    task: "Attendance Tracking UI",
    priority: "Medium",
    status: "Completed",
    week: "Week 6",
    deadline: "02–06 June 2026",
  },
];

const WEEKS = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"];
const EMPTY_FORM = {
  name: "", client: "", employee: "", task: "",
  priority: "", status: "", week: "", deadline: "",
};

/* ─────────────────── BADGE HELPERS ─────────────────── */

function PriorityBadge({ p }) {
  const styles = {
    High:   "bg-red-50 text-red-600",
    Medium: "bg-amber-50 text-amber-600",
    Low:    "bg-emerald-50 text-emerald-600",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[p]}`}>
      {p}
    </span>
  );
}

function StatusBadge({ s }) {
  const map = {
    Completed: { cls: "bg-emerald-50 text-emerald-700", Icon: BadgeCheck  },
    Active:    { cls: "bg-blue-50 text-blue-700",       Icon: Loader2     },
    Review:    { cls: "bg-purple-50 text-purple-700",   Icon: Eye         },
    Pending:   { cls: "bg-amber-50 text-amber-700",     Icon: Clock3      },
  };
  const { cls, Icon } = map[s] || map.Pending;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>
      <Icon size={11} />
      {s}
    </span>
  );
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
        <div className="absolute right-0 top-11 z-50 min-w-[160px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <button onClick={() => { onView(item); setOpen(false); }}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50">
            <Eye size={14} /> View Details
          </button>
          <button onClick={() => { onEdit(item); setOpen(false); }}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50">
            <Pencil size={14} /> Edit Project
          </button>
          <button className="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50">
            <Download size={14} /> Export
          </button>
          <div className="border-t border-slate-100" />
          <button onClick={() => { onDelete(item); setOpen(false); }}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50">
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

/* ─────────────────── VIEW MODAL ─────────────────── */

function ViewModal({ item, onClose }) {
  if (!item) return null;
  const avatarColor = AVATAR_COLORS[item.employeeShort] || "#64748b";
  return (
    <div onClick={onClose} className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[3px]">
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-xl overflow-hidden rounded-[28px] bg-white shadow-2xl">
        {/* Header */}
        <div className="border-b border-slate-200 bg-slate-50/70 px-7 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{item.client}</span>
                <PriorityBadge p={item.priority} />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-slate-900">{item.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{item.task}</p>
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
              style={{ background: avatarColor }}
            >
              {item.employeeShort}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Assigned Employee</p>
              <h3 className="mt-1 font-semibold text-slate-800">{item.employee}</h3>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Timeline</p>
              <h3 className="mt-1 font-semibold text-slate-800">{item.week}</h3>
              <p className="text-xs text-slate-400">{item.deadline}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Status</p>
              <div className="mt-2"><StatusBadge s={item.status} /></div>
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Priority</p>
              <div className="mt-2"><PriorityBadge p={item.priority} /></div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 hover:bg-slate-50">
              Close
            </button>
            <button className="flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700">
              <Download size={15} /> Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── FORM MODAL ─────────────────── */

function ProjectFormModal({ mode, initialData, onSave, onClose }) {
  const [form, setForm] = useState(initialData || EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())     e.name     = "Project name is required.";
    if (!form.client.trim())   e.client   = "Client is required.";
    if (!form.employee.trim()) e.employee = "Employee name is required.";
    if (!form.task.trim())     e.task     = "Task description is required.";
    if (!form.priority)        e.priority = "Select priority.";
    if (!form.status)          e.status   = "Select status.";
    if (!form.week)            e.week     = "Select a week.";
    if (!form.deadline.trim()) e.deadline = "Deadline is required.";
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
            <h2 className="text-lg font-bold text-slate-900">{isEdit ? "Edit Project" : "Add New Project"}</h2>
            <p className="mt-0.5 text-sm text-slate-500">{isEdit ? "Update the project details below." : "Fill in all required fields to add a project."}</p>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5 space-y-4">
          {/* Name + Client */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Project Name <span className="text-red-500">*</span></label>
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="e.g. ERP System"
                className={`h-10 w-full rounded-xl border px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 ${errors.name ? "border-red-400" : "border-slate-200"}`}
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Client <span className="text-red-500">*</span></label>
              <input
                value={form.client}
                onChange={(e) => set("client", e.target.value)}
                placeholder="e.g. Infosys"
                className={`h-10 w-full rounded-xl border px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 ${errors.client ? "border-red-400" : "border-slate-200"}`}
              />
              {errors.client && <p className="mt-1 text-xs text-red-500">{errors.client}</p>}
            </div>
          </div>

          {/* Employee */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">Employee <span className="text-red-500">*</span></label>
            <input
              value={form.employee}
              onChange={(e) => set("employee", e.target.value)}
              placeholder="Enter employee name"
              className={`h-10 w-full rounded-xl border px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 ${errors.employee ? "border-red-400" : "border-slate-200"}`}
            />
            {errors.employee && <p className="mt-1 text-xs text-red-500">{errors.employee}</p>}
          </div>

          {/* Task */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">Task Description <span className="text-red-500">*</span></label>
            <input
              value={form.task}
              onChange={(e) => set("task", e.target.value)}
              placeholder="Describe the task"
              className={`h-10 w-full rounded-xl border px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 ${errors.task ? "border-red-400" : "border-slate-200"}`}
            />
            {errors.task && <p className="mt-1 text-xs text-red-500">{errors.task}</p>}
          </div>

          {/* Priority + Status */}
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
                <option value="Review">Review</option>
              </select>
              {errors.status && <p className="mt-1 text-xs text-red-500">{errors.status}</p>}
            </div>
          </div>

          {/* Week + Deadline */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Week <span className="text-red-500">*</span></label>
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
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Deadline <span className="text-red-500">*</span></label>
              <input
                value={form.deadline}
                onChange={(e) => set("deadline", e.target.value)}
                placeholder="e.g. 01–07 May 2026"
                className={`h-10 w-full rounded-xl border px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 ${errors.deadline ? "border-red-400" : "border-slate-200"}`}
              />
              {errors.deadline && <p className="mt-1 text-xs text-red-500">{errors.deadline}</p>}
            </div>
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
            {isEdit ? "Update Project" : "Add Project"}
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
            <h2 className="text-lg font-bold text-slate-900">Delete Project</h2>
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
              <span className="font-semibold">"{item.name}"</span>?
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

/* ─────────────────── MAIN PAGE ─────────────────── */

export default function ProjectListPage() {
  const [projects, setProjects]       = useState(INITIAL_PROJECTS);
  const [search, setSearch]           = useState("");
  const [activeTag, setActiveTag]     = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [nextId, setNextId]           = useState(7);

  // Modals
  const [viewItem, setViewItem]       = useState(null);
  const [addModal, setAddModal]       = useState(false);
  const [editItem, setEditItem]       = useState(null);
  const [deleteItem, setDeleteItem]   = useState(null);

  /* ── stats ── */
  const stats = useMemo(() => ({
    total:     projects.length,
    completed: projects.filter((i) => i.status === "Completed").length,
    active:    projects.filter((i) => i.status === "Active").length,
    pending:   projects.filter((i) => i.status === "Pending" || i.status === "Review").length,
  }), [projects]);

  /* ── filtered ── */
  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      const ms =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.client.toLowerCase().includes(search.toLowerCase()) ||
        item.employee.toLowerCase().includes(search.toLowerCase());
      const mt = activeTag === "All" || item.status === activeTag;
      return ms && mt;
    });
  }, [projects, search, activeTag]);

  const totalPages        = Math.max(1, Math.ceil(filteredProjects.length / itemsPerPage));
  const safePage          = Math.min(currentPage, totalPages);
  const paginatedProjects = filteredProjects.slice((safePage - 1) * itemsPerPage, safePage * itemsPerPage);
  const startRow          = filteredProjects.length === 0 ? 0 : (safePage - 1) * itemsPerPage + 1;
  const endRow            = Math.min(safePage * itemsPerPage, filteredProjects.length);

  /* ── handlers ── */
  const handleAdd = (form) => {
    const short = (form.employee[0] || "?").toUpperCase();
    setProjects((prev) => [
      ...prev,
      { id: nextId, ...form, employeeShort: short },
    ]);
    setNextId((n) => n + 1);
    setAddModal(false);
  };

  const handleEdit = (form) => {
    const short = (form.employee[0] || "?").toUpperCase();
    setProjects((prev) =>
      prev.map((p) => p.id === editItem.id ? { ...p, ...form, employeeShort: short } : p)
    );
    setEditItem(null);
  };

  const handleDelete = () => {
    setProjects((prev) => prev.filter((p) => p.id !== deleteItem.id));
    setDeleteItem(null);
  };

  const editFormData = editItem
    ? { name: editItem.name, client: editItem.client, employee: editItem.employee,
        task: editItem.task, priority: editItem.priority, status: editItem.status,
        week: editItem.week, deadline: editItem.deadline }
    : null;

  return (
    <div className="space-y-6">

      {/* ── MODALS ── */}
      {viewItem   && <ViewModal        item={viewItem}   onClose={() => setViewItem(null)} />}
      {addModal   && <ProjectFormModal mode="add"  initialData={EMPTY_FORM}  onSave={handleAdd}  onClose={() => setAddModal(false)} />}
      {editItem   && <ProjectFormModal mode="edit" initialData={editFormData} onSave={handleEdit} onClose={() => setEditItem(null)} />}
      {deleteItem && <DeleteModal      item={deleteItem} onConfirm={handleDelete} onClose={() => setDeleteItem(null)} />}

      {/* ── HEADER ── */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Project Management</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Project Workflow</h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage employee and client projects with enterprise workflow tracking.
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
              value={activeTag}
              onChange={(e) => { setActiveTag(e.target.value); setCurrentPage(1); }}
              className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Review">Review</option>
            </select>

            <button className="flex h-8 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 hover:border-blue-400">
              <CalendarDays size={15} className="text-blue-600" /> May 2026
            </button>

            <button
              onClick={() => { setActiveTag("All"); setSearch(""); setCurrentPage(1); }}
              className="flex items-center gap-2 rounded-lg  bg-white px-2 text-sm text-slate-600 hover:text-rose-500"
            >
              <RefreshCcw size={15} />
            </button>
          </div>

          {/* RIGHT */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-8 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 focus-within:border-blue-500">
              <Search size={14} className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Search project..."
                className="bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                className="h-8 rounded-lg border border-slate-200 bg-white  text-sm text-slate-700 outline-none"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
              <span>per page</span>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100/70">
              <tr className="border-b border-slate-200">
                {["Project", "Employee", "Task", "Priority", "Status", "Date", "Action"].map((head) => (
                  <th
                    key={head}
                    className="whitespace-nowrap px-5 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedProjects.map((project) => {
                const avatarColor = AVATAR_COLORS[project.employeeShort] || "#64748b";
                return (
                  <tr key={project.id} className="border-b border-slate-100 transition-all hover:bg-blue-50/40">
                    {/* PROJECT */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                          <FolderKanban size={17} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-700">{project.name}</p>
                          <p className="text-xs text-slate-400">{project.client}</p>
                        </div>
                      </div>
                    </td>

                    {/* EMPLOYEE */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                          style={{ background: avatarColor + "22", color: avatarColor }}
                        >
                          {project.employeeShort}
                        </div>
                        <span className="text-sm text-slate-600">{project.employee}</span>
                      </div>
                    </td>

                    {/* TASK */}
                    <td className="min-w-[240px] px-5 py-4">
                      <p className="text-sm text-slate-600">{project.task}</p>
                    </td>

                    {/* PRIORITY */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <PriorityBadge p={project.priority} />
                    </td>

                    {/* STATUS */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <StatusBadge s={project.status} />
                    </td>

                    {/* DATE */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <p className="text-sm font-semibold text-slate-700">{project.week}</p>
                      <p className="text-xs text-slate-400">{project.deadline}</p>
                    </td>

                    {/* ACTION */}
                    <td className="whitespace-nowrap px-5 py-4">
                      <ActionMenu
                        item={project}
                        onView={setViewItem}
                        onEdit={(i) => setEditItem(i)}
                        onDelete={(i) => setDeleteItem(i)}
                      />
                    </td>
                  </tr>
                );
              })}

              {/* EMPTY */}
              {paginatedProjects.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                        <FolderKanban size={28} className="text-slate-400" />
                      </div>
                      <p className="font-semibold text-slate-700">No projects found.</p>
                      <p className="mt-1 text-sm text-slate-400">Try adjusting filters or add a new project.</p>
                      <button
                        onClick={() => setAddModal(true)}
                        className="mt-4 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        <Plus size={14} /> Add Project
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/50 px-5 py-2">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">{startRow}</span> to{" "}
            <span className="font-semibold text-slate-700">{endRow}</span> of{" "}
            <span className="font-semibold text-slate-700">{filteredProjects.length}</span>{" "}
            records
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
      </div>
    </div>
  );
}