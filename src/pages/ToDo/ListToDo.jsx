import { useState, useMemo, useRef, useEffect } from "react";
import {
  Plus,
  Search,
  RefreshCcw ,
  Pencil,
  Trash2,
  CircleCheckBig,
  Clock3,
  TriangleAlert,
  X,
  ChevronDown,
  Filter,
  SlidersHorizontal,
  BellOff,
  BellRing,
  Calendar,
  Save,
  MoreVertical,
  Eye,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  AlertTriangle,
} from "lucide-react";

/* ─────────────────── CONSTANTS ─────────────────── */

const MONTHS_SHORT = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

const STATUS_CONFIG = {
  Completed: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    Icon: CircleCheckBig,
  },
  "In Progress": {
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
    Icon: Clock3,
  },
  Pending: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
    Icon: TriangleAlert,
  },
};

const TYPE_COLORS = {
  Meeting: "bg-slate-100 text-slate-700",
  Development: "bg-blue-50 text-blue-700",
  Testing: "bg-purple-50 text-purple-700",
  Support: "bg-cyan-50 text-cyan-700",
  Design: "bg-pink-50 text-pink-700",
  Review: "bg-amber-50 text-amber-700",
  Documentation: "bg-green-50 text-green-700",
};

const AVATAR_COLORS = [
  { bg: "bg-blue-100", text: "text-blue-700" },
  { bg: "bg-emerald-100", text: "text-emerald-700" },
  { bg: "bg-purple-100", text: "text-purple-700" },
  { bg: "bg-pink-100", text: "text-pink-700" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-cyan-100", text: "text-cyan-700" },
];

const INITIAL_TODOS = [
  { id: 1, type: "Meeting",       employee: "John Doe",    description: "Attend client meeting regarding ERP module improvements.", date: "2026-05-21", notification: true,  status: "Pending"     },
  { id: 2, type: "Development",   employee: "Sophia Lee",  description: "Complete employee timesheet dashboard UI.",                date: "2026-05-20", notification: false, status: "Completed"   },
  { id: 3, type: "Testing",       employee: "Daniel Park", description: "Test calendar task module responsiveness.",               date: "2026-05-19", notification: true,  status: "In Progress" },
  { id: 4, type: "Design",        employee: "Emma Wilson", description: "Create wireframes for onboarding flow.",                  date: "2026-05-22", notification: true,  status: "Pending"     },
  { id: 5, type: "Documentation", employee: "William Chen",description: "Update API documentation for v2 release.",               date: "2026-05-23", notification: false, status: "Pending"     },
  { id: 6, type: "Review",        employee: "Alice Brown", description: "Review pull requests for Q2 feature release.",           date: "2026-05-24", notification: true,  status: "In Progress" },
  { id: 7, type: "Support",       employee: "Bob Martin",  description: "Resolve critical support tickets from enterprise clients.",date: "2026-05-18", notification: false, status: "Completed"  },
];

const EMPTY_FORM = {
  type: "",
  employee: "",
  description: "",
  date: "",
  status: "",
  notification: false,
};

/* ─────────────────── HELPERS ─────────────────── */

function avatarColorFor(name = "") {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + h;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

function initials(name = "") {
  const p = name.trim().split(" ");
  return p.length >= 2
    ? (p[0][0] + p[1][0]).toUpperCase()
    : (name[0] || "?").toUpperCase();
}

function formatDate(iso) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${parseInt(d)} ${MONTHS_SHORT[parseInt(m) - 1]} ${y}`;
}

/* ─────────────────── SMALL COMPONENTS ─────────────────── */

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status];
  if (!cfg) return null;
  const { Icon } = cfg;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      <Icon size={11} />
      {status}
    </span>
  );
}

function TypeBadge({ type }) {
  const cls = TYPE_COLORS[type] || "bg-slate-100 text-slate-700";
  return (
    <span className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold ${cls}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {type}
    </span>
  );
}

/* ─────────────────── CALENDAR PICKER ─────────────────── */

function CalendarPicker({ selectedDate, onSelect }) {
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
        onClick={() => setOpen((p) => !p)}
        className="flex h-8 items-center gap-2 rounded-lg border border-slate-200 bg-white px-1 text-sm font-medium text-slate-700 transition-all hover:border-blue-500"
      >
        <CalendarDays size={15} className="text-slate-400" />
        {MONTHS_SHORT[selectedDate.month]} {selectedDate.day}, {selectedDate.year}
        <ChevronDown size={13} className="text-slate-400" />
      </button>

      {open && (
        <div className="absolute left-0 top-12 z-50 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-700">Select Date</p>
            <button
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-100"
            >
              <X size={14} className="text-slate-500" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <button
                key={d}
                onClick={() => { onSelect({ ...selectedDate, day: d }); setOpen(false); }}
                className={`flex h-9 items-center justify-center rounded-lg text-sm transition-all ${
                  d === selectedDate.day
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────── ACTION MENU ─────────────────── */

function ActionMenu({ onView, onEdit, onDelete }) {
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
        onClick={() => setOpen((p) => !p)}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:bg-slate-50"
      >
        <MoreVertical size={15} />
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 min-w-[140px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <button
            onClick={() => { onView(); setOpen(false); }}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
          >
            <Eye size={14} /> View
          </button>
          <button
            onClick={() => { onEdit(); setOpen(false); }}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
          >
            <Pencil size={14} /> Edit
          </button>
          <button
            onClick={() => { onDelete(); setOpen(false); }}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

/* ─────────────────── ADD / EDIT MODAL ─────────────────── */

function TaskModal({ mode, initialData, onSave, onClose }) {
  const [form, setForm] = useState(initialData || EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.type)        e.type        = "Please select a task type.";
    if (!form.employee.trim()) e.employee = "Employee name is required.";
    if (!form.description.trim()) e.description = "Description is required.";
    if (!form.date)        e.date        = "Please select a due date.";
    if (!form.status)      e.status      = "Please select a status.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(form);
  };

  const isEdit = mode === "edit";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {isEdit ? "Edit Task" : "Add New Task"}
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">
              {isEdit ? "Update the task details below." : "Fill in the details to create a new task."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 px-6 py-5">

          {/* Row 1: Type + Employee */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                Task Type <span className="text-red-500">*</span>
              </label>
              <select
                value={form.type}
                onChange={(e) => set("type", e.target.value)}
                className={`h-10 w-full rounded-xl border bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 ${
                  errors.type ? "border-red-400" : "border-slate-200"
                }`}
              >
                <option value="">Select type</option>
                {Object.keys(TYPE_COLORS).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.type && <p className="mt-1 text-xs text-red-500">{errors.type}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                Employee Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.employee}
                onChange={(e) => set("employee", e.target.value)}
                placeholder="Enter name"
                className={`h-10 w-full rounded-xl border bg-white px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 ${
                  errors.employee ? "border-red-400" : "border-slate-200"
                }`}
              />
              {errors.employee && <p className="mt-1 text-xs text-red-500">{errors.employee}</p>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Enter task description..."
              rows={3}
              className={`w-full resize-none rounded-xl border bg-white px-3 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 ${
                errors.description ? "border-red-400" : "border-slate-200"
              }`}
            />
            {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
          </div>

          {/* Row 2: Date + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                Due Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
                className={`h-10 w-full rounded-xl border bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 ${
                  errors.date ? "border-red-400" : "border-slate-200"
                }`}
              />
              {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                className={`h-10 w-full rounded-xl border bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 ${
                  errors.status ? "border-red-400" : "border-slate-200"
                }`}
              >
                <option value="">Select status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              {errors.status && <p className="mt-1 text-xs text-red-500">{errors.status}</p>}
            </div>
          </div>

          {/* Reminder Toggle */}
          <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-700">Reminder Notification</p>
              <p className="text-xs text-slate-400">Enable task reminder alerts</p>
            </div>
            <button
              type="button"
              onClick={() => set("notification", !form.notification)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                form.notification ? "bg-blue-600" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                  form.notification ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button
            onClick={onClose}
            className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            <X size={14} /> Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Save size={14} />
            {isEdit ? "Update Task" : "Save Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── VIEW MODAL ─────────────────── */

function ViewModal({ todo, onClose }) {
  const ac = avatarColorFor(todo.employee);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Task Details</h2>
            <p className="mt-0.5 text-sm text-slate-500">Full information about this task.</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          {/* Employee */}
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
            <div className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${ac.bg} ${ac.text}`}>
              {initials(todo.employee)}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">{todo.employee}</p>
              <p className="text-xs text-slate-400">Employee</p>
            </div>
          </div>

          {/* Type + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">Type</p>
              <TypeBadge type={todo.type} />
            </div>
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">Status</p>
              <StatusBadge status={todo.status} />
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">Description</p>
            <p className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700">
              {todo.description}
            </p>
          </div>

          {/* Date + Reminder */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">Due Date</p>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar size={14} className="text-slate-400" />
                {formatDate(todo.date)}
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">Reminder</p>
              {todo.notification ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  <BellRing size={11} /> On
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                  <BellOff size={11} /> Off
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-200 px-6 py-4">
          <button
            onClick={onClose}
            className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── DELETE MODAL ─────────────────── */

function DeleteModal({ todo, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Delete Task</h2>
            <p className="mt-0.5 text-sm text-slate-500">This action cannot be undone.</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <div className="flex items-start gap-3 rounded-xl bg-red-50 px-4 py-3">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-500" />
            <p className="text-sm text-red-700">
              Are you sure you want to delete{" "}
              <span className="font-semibold">"{todo.description.slice(0, 40)}..."</span>?
              All task data will be permanently removed.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button
            onClick={onClose}
            className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex h-10 items-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-semibold text-white hover:bg-red-700"
          >
            <Trash2 size={14} /> Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── MAIN PAGE ─────────────────── */

export default function TodoPage() {
  const [todos, setTodos]               = useState(INITIAL_TODOS);
  const [search, setSearch]             = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterType, setFilterType]     = useState("All");
  const [rowsPerPage, setRowsPerPage]   = useState(5);
  const [currentPage, setCurrentPage]   = useState(1);
  const [activeView, setActiveView]     = useState("day");
  const [selectedDate, setSelectedDate] = useState({ day: 25, month: 4, year: 2026 });
  const [nextId, setNextId]             = useState(8);

  // Modals
  const [addModal, setAddModal]         = useState(false);
  const [editTodo, setEditTodo]         = useState(null);   // todo object
  const [viewTodo, setViewTodo]         = useState(null);   // todo object
  const [deleteTodo, setDeleteTodo]     = useState(null);   // todo object

  /* ── filtered list ── */
  const filtered = useMemo(() => {
    return todos.filter((t) => {
      const ms =
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.type.toLowerCase().includes(search.toLowerCase()) ||
        (t.employee || "").toLowerCase().includes(search.toLowerCase());
      const mst = filterStatus === "All" || t.status === filterStatus;
      const mt  = filterType === "All"   || t.type   === filterType;
      return ms && mst && mt;
    });
  }, [todos, search, filterStatus, filterType]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const safePage   = Math.min(currentPage, totalPages);
  const paginated  = filtered.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);

  const stats = useMemo(() => ({
    total:      todos.length,
    completed:  todos.filter((t) => t.status === "Completed").length,
    inProgress: todos.filter((t) => t.status === "In Progress").length,
    pending:    todos.filter((t) => t.status === "Pending").length,
  }), [todos]);

  const uniqueTypes = ["All", ...new Set(todos.map((t) => t.type))];
  const startRow    = filtered.length === 0 ? 0 : (safePage - 1) * rowsPerPage + 1;
  const endRow      = Math.min(safePage * rowsPerPage, filtered.length);

  /* ── handlers ── */
  const handleAdd = (form) => {
    setTodos((prev) => [...prev, { id: nextId, ...form }]);
    setNextId((n) => n + 1);
    setAddModal(false);
  };

  const handleEdit = (form) => {
    setTodos((prev) => prev.map((t) => (t.id === editTodo.id ? { ...t, ...form } : t)));
    setEditTodo(null);
  };

  const handleDelete = () => {
    setTodos((prev) => prev.filter((t) => t.id !== deleteTodo.id));
    setDeleteTodo(null);
  };

  /* ── reset page on filter change ── */
  const changeFilter = (setter) => (val) => { setter(val); setCurrentPage(1); };

  return (
    <div className="space-y-6">

      {/* ── MODALS ── */}
      {addModal && (
        <TaskModal
          mode="add"
          initialData={EMPTY_FORM}
          onSave={handleAdd}
          onClose={() => setAddModal(false)}
        />
      )}
      {editTodo && (
        <TaskModal
          mode="edit"
          initialData={{ ...editTodo }}
          onSave={handleEdit}
          onClose={() => setEditTodo(null)}
        />
      )}
      {viewTodo && (
        <ViewModal todo={viewTodo} onClose={() => setViewTodo(null)} />
      )}
      {deleteTodo && (
        <DeleteModal
          todo={deleteTodo}
          onConfirm={handleDelete}
          onClose={() => setDeleteTodo(null)}
        />
      )}

      {/* ── HEADER ── */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Task Management
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            To-Do List
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Manage employee tasks, deadlines and work progress.
          </p>
        </div>

        <button
          onClick={() => setAddModal(true)}
          className="flex h-11 items-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white transition-all hover:bg-blue-700"
        >
          <Plus size={16} />
          Add Task
        </button>
      </div>

      {/* ── TABLE CARD ── */}
      <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">

        {/* TOOLBAR */}
        <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-2 lg:flex-row lg:items-center lg:justify-between">

          {/* Left */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={activeView}
              onChange={(e) => setActiveView(e.target.value)}
              className="h-8 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>

            <CalendarPicker selectedDate={selectedDate} onSelect={setSelectedDate} />

            {/* Status filter */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => changeFilter(setFilterStatus)(e.target.value)}
                className="h-8 appearance-none rounded-lg border border-slate-200 bg-white pl-8  text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
              >
                {["All", "Pending", "In Progress", "Completed"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <Filter size={13} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            {/* Type filter */}
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => changeFilter(setFilterType)(e.target.value)}
                className="h-8 appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-8 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
              >
                {uniqueTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
              <SlidersHorizontal size={13} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            <button
              onClick={() => setSearch("")}
              className="flex items-center gap-2  bg-white px-1 text-sm text-slate-600   hover:text-red-500"
            >
               <RefreshCcw size={15}/>
            </button>
          </div>

          {/* Right */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-8 w-56 items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 focus-within:border-blue-500">
              <Search size={14} className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Search tasks..."
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
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

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                {["Type", "Employee", "Description", "Due Date", "Reminder", "Status", "Action"].map((h) => (
                  <th
                    key={h}
                    className="whitespace-nowrap px-5 py-2 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-sm text-slate-400">
                    No tasks found. Try adjusting filters or{" "}
                    <button onClick={() => setAddModal(true)} className="text-blue-600 underline">
                      add a new task
                    </button>
                    .
                  </td>
                </tr>
              ) : (
                paginated.map((todo) => {
                  const ac = avatarColorFor(todo.employee);
                  return (
                    <tr key={todo.id} className="border-b border-slate-100 transition-all hover:bg-blue-50/40">

                      {/* Type */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <TypeBadge type={todo.type} />
                      </td>

                      {/* Employee */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${ac.bg} ${ac.text}`}>
                            {initials(todo.employee)}
                          </div>
                          <p className="text-sm font-medium text-slate-700">{todo.employee}</p>
                        </div>
                      </td>

                      {/* Description */}
                      <td className="min-w-[280px] px-5 py-4">
                        <p className="line-clamp-1 text-sm text-slate-600">{todo.description}</p>
                      </td>

                      {/* Date */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar size={14} className="text-slate-400" />
                          {formatDate(todo.date)}
                        </div>
                      </td>

                      {/* Reminder */}
                      <td className="whitespace-nowrap px-5 py-4">
                        {todo.notification ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            <BellRing size={11} /> On
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                            <BellOff size={11} /> Off
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <StatusBadge status={todo.status} />
                      </td>

                      {/* Action */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <ActionMenu
                          onView={()   => setViewTodo(todo)}
                          onEdit={()   => setEditTodo(todo)}
                          onDelete={()  => setDeleteTodo(todo)}
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col gap-3 border-t border-slate-200 px-5 py-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">{startRow}</span> to{" "}
            <span className="font-semibold text-slate-700">{endRow}</span> of{" "}
            <span className="font-semibold text-slate-700">{filtered.length}</span>{" "}
            entries
          </p>

          <div className="flex items-center gap-1">
            <button
              disabled={safePage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="flex h-8 w-8 items-center justify-center rounded border border-slate-300 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft size={15} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex h-8 w-8 items-center justify-center rounded text-sm font-semibold ${
                  safePage === page
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={safePage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="flex h-8 w-8 items-center justify-center rounded border border-slate-300 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}