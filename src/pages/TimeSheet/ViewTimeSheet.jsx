import { useMemo, useState, useRef, useEffect } from "react";
import {
  Search,
  CalendarDays,
  Clock3,
  Eye,
  Pencil,
  Trash2,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  BriefcaseBusiness,
  FolderKanban,
  CheckCircle2,
  AlertCircle,
  RefreshCcw,
  MoreVertical,
  X,
  Save,
  AlertTriangle,
  BadgeCheck,
  Clock,
  Wand2,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

/* ─────────────────── INITIAL DATA ─────────────────── */

const INITIAL_DATA = [
  {
    id: 1,
    date: "20/05/2026",
    project: "ERP Dashboard",
    module: "Frontend",
    task: "Build Timesheet UI Components",
    start: "10:15 AM",
    end: "08:00 PM",
    hours: "09:45",
    status: "Non Billable",
    type: "Fixed Price",
  },
  {
    id: 2,
    date: "19/05/2026",
    project: "CRM System",
    module: "Backend",
    task: "API Integration for Task Module",
    start: "09:30 AM",
    end: "06:30 PM",
    hours: "08:20",
    status: "Billable",
    type: "Time & Material",
  },
  {
    id: 3,
    date: "18/05/2026",
    project: "HRMS Portal",
    module: "Testing",
    task: "Responsive UI Testing",
    start: "11:00 AM",
    end: "07:00 PM",
    hours: "07:45",
    status: "Billable",
    type: "Retainer",
  },
  {
    id: 4,
    date: "17/05/2026",
    project: "Inventory System",
    module: "Frontend",
    task: "Sidebar Animation Improvements",
    start: "10:00 AM",
    end: "06:45 PM",
    hours: "08:10",
    status: "Non Billable",
    type: "Fixed Price",
  },
  {
    id: 5,
    date: "16/05/2026",
    project: "Analytics Dashboard",
    module: "Research",
    task: "Data Visualization Setup",
    start: "09:00 AM",
    end: "05:30 PM",
    hours: "08:00",
    status: "Billable",
    type: "Time & Material",
  },
  {
    id: 6,
    date: "15/05/2026",
    project: "Support System",
    module: "Support",
    task: "Fix Notification Bugs",
    start: "10:00 AM",
    end: "07:15 PM",
    hours: "08:40",
    status: "Billable",
    type: "Retainer",
  },
];

const PROJECTS = [
  "ERP Dashboard",
  "CRM System",
  "HRMS Portal",
  "Inventory System",
  "Analytics Dashboard",
  "Support System",
];
const MODULES = [
  "Frontend",
  "Backend",
  "Testing",
  "Research",
  "Support",
  "DevOps",
  "Design",
];
const TYPES = ["Fixed Price", "Time & Material", "Retainer"];

const EMPTY_FORM = {
  date: "",
  project: "",
  module: "",
  task: "",
  start: "",
  end: "",
  hours: "",
  status: "",
  type: "",
};

/* ─────────────────── STATUS BADGE ─────────────────── */

function StatusBadge({ s }) {
  const cls =
    s === "Billable"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-amber-50 text-amber-700";
  const Icon = s === "Billable" ? BadgeCheck : Clock;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${cls}`}
    >
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
        <div className="absolute right-0 top-11 z-50 min-w-[160px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <button
            onClick={() => {
              onView(item);
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
          >
            <Eye size={14} /> View Details
          </button>
          <button
            onClick={() => {
              onEdit(item);
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
          >
            <Pencil size={14} /> Edit Entry
          </button>
          <button className="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50">
            <Download size={14} /> Export
          </button>
          <div className="border-t border-slate-100" />
          <button
            onClick={() => {
              onDelete(item);
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
          >
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
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[3px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-[28px] bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="border-b border-slate-200 bg-slate-50/70 px-7 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  {item.project}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {item.module}
                </span>
                <StatusBadge s={item.status} />
              </div>
              <h2 className="mt-4 text-xl font-bold text-slate-900">
                {item.task}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{item.type}</p>
            </div>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
            >
              <X size={16} />
            </button>
          </div>
        </div>
        {/* Body */}
        <div className="space-y-4 p-7">
          {/* Date + Hours */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Date
              </p>
              <div className="mt-2 flex items-center gap-2">
                <CalendarDays size={15} className="text-blue-600" />
                <span className="font-semibold text-slate-800">
                  {item.date}
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Total Hours
              </p>
              <div className="mt-2 flex items-center gap-2">
                <Clock3 size={15} className="text-blue-600" />
                <span className="font-semibold text-slate-800">
                  {item.hours}
                </span>
              </div>
            </div>
          </div>
          {/* Start + End */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Start Time
              </p>
              <p className="mt-2 font-semibold text-slate-800">{item.start}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                End Time
              </p>
              <p className="mt-2 font-semibold text-slate-800">{item.end}</p>
            </div>
          </div>
          {/* Footer */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
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

function TimesheetFormModal({ mode, initialData, onSave, onClose }) {
  const [form, setForm] = useState(initialData || EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  useEffect(() => {
    if (form.start && form.end) {
      const start = new Date(`2000-01-01T${form.start}`);
      const end = new Date(`2000-01-01T${form.end}`);

      if (end > start) {
        const diffHours = (end - start) / (1000 * 60 * 60);

        setForm((prev) => ({
          ...prev,
          hours: diffHours.toFixed(2),
        }));
      }
    }
  }, [form.start, form.end]);
  const validate = () => {
    const e = {};
    if (!form.date.trim()) e.date = "Date is required.";
    if (!form.project) e.project = "Select a project.";
    if (!form.module) e.module = "Select a module.";
    if (!form.task.trim()) e.task = "Task description is required.";
    if (!form.start.trim()) e.start = "Start time is required.";
    if (!form.end.trim()) e.end = "End time is required.";
    if (!form.hours.trim()) e.hours = "Hours is required.";
    if (!form.status) e.status = "Select status.";
    if (!form.type) e.type = "Select billing type.";
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
            <h2 className="text-lg font-bold text-slate-900">
              {isEdit ? "Edit Timesheet Entry" : "Add Timesheet Entry"}
            </h2>
            <p className="mt-0.5 text-sm text-slate-500">
              {isEdit
                ? "Update the entry details below."
                : "Fill in all required fields."}
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
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5 space-y-4">
          {/* Date */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
              Date <span className="text-red-500">*</span>
            </label>

            <input
              type="date"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              className={`h-10 w-full rounded-xl border px-3 text-sm text-slate-700 outline-none focus:border-blue-500 ${
                errors.date ? "border-red-400" : "border-slate-200"
              }`}
            />

            {errors.date && (
              <p className="mt-1 text-xs text-red-500">{errors.date}</p>
            )}
          </div>{" "}
          {/* Project + Module */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                Project <span className="text-red-500">*</span>
              </label>
              <select
                value={form.project}
                onChange={(e) => set("project", e.target.value)}
                className={`h-10 w-full rounded-xl border bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 ${errors.project ? "border-red-400" : "border-slate-200"}`}
              >
                <option value="">Select project</option>
                {PROJECTS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              {errors.project && (
                <p className="mt-1 text-xs text-red-500">{errors.project}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                Module <span className="text-red-500">*</span>
              </label>
              <select
                value={form.module}
                onChange={(e) => set("module", e.target.value)}
                className={`h-10 w-full rounded-xl border bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 ${errors.module ? "border-red-400" : "border-slate-200"}`}
              >
                <option value="">Select module</option>
                {MODULES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              {errors.module && (
                <p className="mt-1 text-xs text-red-500">{errors.module}</p>
              )}
            </div>
          </div>
          {/* Task */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
              Task Description <span className="text-red-500">*</span>
            </label>
            <input
              value={form.task}
              onChange={(e) => set("task", e.target.value)}
              placeholder="Describe the task worked on"
              className={`h-10 w-full rounded-xl border px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 ${errors.task ? "border-red-400" : "border-slate-200"}`}
            />
            {errors.task && (
              <p className="mt-1 text-xs text-red-500">{errors.task}</p>
            )}
          </div>
          {/* Start + End */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                Start Time <span className="text-red-500">*</span>
              </label>

              <input
                type="time"
                value={form.start}
                onChange={(e) => set("start", e.target.value)}
                className={`h-10 w-full rounded-xl border px-3 text-sm text-slate-700 outline-none focus:border-blue-500 ${
                  errors.start ? "border-red-400" : "border-slate-200"
                }`}
              />

              {errors.start && (
                <p className="mt-1 text-xs text-red-500">{errors.start}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                End Time <span className="text-red-500">*</span>
              </label>

              <input
                type="time"
                value={form.end}
                onChange={(e) => set("end", e.target.value)}
                className={`h-10 w-full rounded-xl border px-3 text-sm text-slate-700 outline-none focus:border-blue-500 ${
                  errors.end ? "border-red-400" : "border-slate-200"
                }`}
              />

              {errors.end && (
                <p className="mt-1 text-xs text-red-500">{errors.end}</p>
              )}
            </div>
          </div>
          {/* Hours + Status + Type */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                Hours <span className="text-red-500">*</span>
              </label>

              <input
                value={form.hours}
                readOnly
                placeholder="Auto Calculated"
                className={`h-10 w-full rounded-xl border bg-slate-50 px-3 text-sm text-slate-700 outline-none ${
                  errors.hours ? "border-red-400" : "border-slate-200"
                }`}
              />

              {errors.hours && (
                <p className="mt-1 text-xs text-red-500">{errors.hours}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                className={`h-10 w-full rounded-xl border bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 ${errors.status ? "border-red-400" : "border-slate-200"}`}
              >
                <option value="">Select</option>
                <option value="Billable">Billable</option>
                <option value="Non Billable">Non Billable</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-xs text-red-500">{errors.status}</p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                value={form.type}
                onChange={(e) => set("type", e.target.value)}
                className={`h-10 w-full rounded-xl border bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500 ${errors.type ? "border-red-400" : "border-slate-200"}`}
              >
                <option value="">Select</option>
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="mt-1 text-xs text-red-500">{errors.type}</p>
              )}
            </div>
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
            onClick={() => {
              if (validate()) onSave(form);
            }}
            className="flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Save size={14} />
            {isEdit ? "Update Entry" : "Add Entry"}
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
            <h2 className="text-lg font-bold text-slate-900">Delete Entry</h2>
            <p className="mt-0.5 text-sm text-slate-500">
              This action cannot be undone.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50"
          >
            <X size={16} />
          </button>
        </div>
        <div className="px-6 py-5">
          <div className="flex items-start gap-3 rounded-xl bg-red-50 px-4 py-3">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-500" />
            <p className="text-sm text-red-700">
              Delete entry for{" "}
              <span className="font-semibold">
                "{item.project} — {item.task}"
              </span>
              ?
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button
            onClick={onClose}
            className="flex h-10 items-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex h-10 items-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-semibold text-white hover:bg-red-700"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── MAIN PAGE ─────────────────── */

export default function ModernTimesheetPage() {
  const [entries, setEntries] = useState(INITIAL_DATA);
  const [projectFilter, setProjectFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [nextId, setNextId] = useState(7);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Modals
  const [viewItem, setViewItem] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const navigate = useNavigate();
  /* ── stats ── */
  const stats = useMemo(
    () => ({
      billable: entries.filter((i) => i.status === "Billable").length,
      nonBillable: entries.filter((i) => i.status === "Non Billable").length,
      projects: new Set(entries.map((i) => i.project)).size,
      totalHours: entries
        .reduce((acc, i) => {
          const [h, m] = i.hours.split(":").map(Number);
          return acc + h + m / 60;
        }, 0)
        .toFixed(1),
    }),
    [entries],
  );

  /* ── filtered ── */
  const filteredData = useMemo(() => {
    return entries.filter((item) => {
      const mp = projectFilter === "All" || item.project === projectFilter;
      const mt = typeFilter === "All" || item.status === typeFilter;
      const ms =
        item.task.toLowerCase().includes(search.toLowerCase()) ||
        item.project.toLowerCase().includes(search.toLowerCase()) ||
        item.module.toLowerCase().includes(search.toLowerCase());
      return mp && mt && ms;
    });
  }, [entries, projectFilter, typeFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedData = filteredData.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage,
  );
  const startRow =
    filteredData.length === 0 ? 0 : (safePage - 1) * itemsPerPage + 1;
  const endRow = Math.min(safePage * itemsPerPage, filteredData.length);

  /* ── handlers ── */
  const handleAdd = (form) => {
    setEntries((prev) => [{ id: nextId, ...form }, ...prev]);
    setNextId((n) => n + 1);
    setAddModal(false);
  };

  const handleEdit = (form) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === editItem.id ? { ...e, ...form } : e)),
    );
    setEditItem(null);
  };

  const handleDelete = () => {
    setEntries((prev) => prev.filter((e) => e.id !== deleteItem.id));
    setDeleteItem(null);
  };

  const editFormData = editItem
    ? {
        date: editItem.date,
        project: editItem.project,
        module: editItem.module,
        task: editItem.task,
        start: editItem.start,
        end: editItem.end,
        hours: editItem.hours,
        status: editItem.status,
        type: editItem.type,
      }
    : null;


    const cardData = [
    {
      title: "FIXED PRICE",
      value: "Fixed Price",
      sub: "Click to view fixed budget projects",
      path: "/timesheet/fixedprice", // <-- Define your navigation paths here
      border: "border-l-emerald-500",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      Icon: Wand2,
    },
    {
      title: "TIME & MATERIAL",
      value: "T&M Contracts",
      sub: "Click to view hourly logged projects",
      path: "/timesheet/timematerial",
      border: "border-l-amber-500",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      Icon: Clock,
    },
    {
      title: "RETAINER",
      value: "Recurring",
      sub: "Click to view retainer agreements",
      path: "/timesheet/retainer",
      border: "border-l-red-500", 
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
      Icon: RefreshCw,
    },
  ];

  return (
    <div className="space-y-6">
      {/* ── MODALS ── */}
      {viewItem && (
        <ViewModal item={viewItem} onClose={() => setViewItem(null)} />
      )}
      {addModal && (
        <TimesheetFormModal
          mode="add"
          initialData={EMPTY_FORM}
          onSave={handleAdd}
          onClose={() => setAddModal(false)}
        />
      )}
      {editItem && (
        <TimesheetFormModal
          mode="edit"
          initialData={editFormData}
          onSave={handleEdit}
          onClose={() => setEditItem(null)}
        />
      )}
      {deleteItem && (
        <DeleteModal
          item={deleteItem}
          onConfirm={handleDelete}
          onClose={() => setDeleteItem(null)}
        />
      )}

      {/* ── HEADER ── */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Employee Management
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Timesheet Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Monitor working hours, billable tasks and project workflow.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <Download size={16} /> Export
          </button>
          <button
            onClick={() => setAddModal(true)}
            className="flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition-all hover:bg-blue-700"
          >
            <Plus size={16} /> Add Timesheet
          </button>
        </div>
      </div>

   {/* ── STATS / CARD GRID ── */}
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {cardData.map(({ title, value, sub, path, border, iconBg, iconColor, Icon }) => (
        <div
          key={title}
          onClick={() => navigate(path)}
          className={`relative overflow-hidden rounded bg-white px-5 py-5 shadow-sm  cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                {title}
              </p>
              <h2 className="mt-3 text-[34px] font-bold leading-none tracking-tight text-slate-900">
                {value}
              </h2>
            </div>
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}
            >
              <Icon size={18} className={iconColor} />
            </div>
          </div>
          <p className="mt-4 text-xs font-medium text-slate-500">{sub}</p>
        </div>
      ))}
    </div>

      {/* ── TABLE ── */}
      <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
        {/* TOOLBAR */}
        <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-2 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={projectFilter}
              onChange={(e) => {
                setProjectFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-8 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="All">All Projects</option>
              {PROJECTS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="h-8 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Billable">Billable</option>
              <option value="Non Billable">Non Billable</option>
            </select>

            <input
              type="date"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
                setCurrentPage(1);
              }}
              className="h-8 rounded-lg border border-slate-200 bg-white px-1 text-sm text-slate-700 outline-none focus:border-blue-500"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
                setCurrentPage(1);
              }}
              className="h-8 rounded-lg border border-slate-200 bg-white px-1 text-sm text-slate-700 outline-none focus:border-blue-500"
            />

            <button
              onClick={() => {
                setProjectFilter("All");
                setTypeFilter("All");
                setSearch("");
                setFromDate("");
                setToDate("");
                setCurrentPage(1);
              }}
              className="flex h-8 items-center gap-2 rounded-lg  bg-white px-1 text-sm text-slate-600 hover:text-rose-500"
            >
              <RefreshCcw size={15} />
            </button>
          </div>

          {/* RIGHT */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-8 items-center gap-2 rounded-lg border border-slate-200 bg-white px-2 focus-within:border-blue-500">
              <Search size={14} className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search task or project..."
                className="bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
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
                {[
                  "Date",
                  "Project",
                  "Module",
                  "Task",
                  "Start",
                  "End",
                  "Hours",
                  "Status",
                  "Action",
                ].map((head) => (
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
              {paginatedData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 transition-all hover:bg-blue-50/40"
                >
                  {/* DATE */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={13} className="text-blue-600" />
                      <span className="text-sm font-semibold text-slate-700">
                        {item.date}
                      </span>
                    </div>
                  </td>

                  {/* PROJECT */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                        <BriefcaseBusiness
                          size={13}
                          className="text-blue-600"
                        />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">
                        {item.project}
                      </span>
                    </div>
                  </td>

                  {/* MODULE */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      {item.module}
                    </span>
                  </td>

                  {/* TASK */}
                  <td className="min-w-[220px] px-5 py-4">
                    <p className="text-sm text-slate-600">{item.task}</p>
                  </td>

                  {/* START */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <span className="text-sm text-slate-600">{item.start}</span>
                  </td>

                  {/* END */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <span className="text-sm text-slate-600">{item.end}</span>
                  </td>

                  {/* HOURS */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Clock3 size={13} className="text-blue-600" />
                      <span className="text-sm font-semibold text-slate-700">
                        {item.hours}
                      </span>
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <StatusBadge s={item.status} />
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

              {/* EMPTY */}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                        <BriefcaseBusiness
                          size={28}
                          className="text-slate-400"
                        />
                      </div>
                      <p className="font-semibold text-slate-700">
                        No entries found.
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        Try adjusting filters or add a new entry.
                      </p>
                      <button
                        onClick={() => setAddModal(true)}
                        className="mt-4 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        <Plus size={14} /> Add Entry
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
            <span className="font-semibold text-slate-700">
              {filteredData.length}
            </span>{" "}
            records
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
              onClick={() => setCurrentPage((p) => p + 1)}
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
