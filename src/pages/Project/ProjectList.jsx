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
  MoreVertical,
  Pencil,
  Trash2,
  X,
  Save,
  AlertTriangle,
  BadgeCheck,
  Loader2,
  Clock3,
  LayoutGrid,
  List,
  ArrowLeft,
  Users,
  DollarSign,
  CalendarCheck,
  TrendingUp,
  FileText,
  Shield,
  CheckCircle,
} from "lucide-react";

/* ─────────── PALETTE (matches Colan Infotech website) ─────────── */
// bg:       #f4f6fb  (page background — same cool off-white as the site)
// surface:  #ffffff  (cards / panels)
// border:   #e8ecf4  (subtle borders)
// accent:   #2563eb  (primary blue from the site)
// accent2:  #eff4ff  (very light blue tint)
// text:     #0f172a / #475569 / #94a3b8

const AVATAR_COLORS = {
  J: "#2563eb",
  S: "#e11d48",
  D: "#f59e0b",
  E: "#10b981",
  W: "#8b5cf6",
  M: "#0ea5e9",
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
    deadline: "02–06 Jun 2026",
  },
];

const WEEKS = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"];
const EMPTY = {
  name: "",
  client: "",
  employee: "",
  task: "",
  priority: "",
  status: "",
  week: "",
  deadline: "",
};

/* ─────────── BADGES ─────────── */
function PriorityBadge({ p }) {
  const map = {
    High: "bg-red-50 text-red-600 ring-1 ring-red-100",
    Medium: "bg-amber-50 text-amber-600 ring-1 ring-amber-100",
    Low: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100",
  };
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${map[p]}`}
    >
      {p}
    </span>
  );
}

function StatusBadge({ s }) {
  const map = {
    Completed: {
      cls: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
      Icon: BadgeCheck,
    },
    Active: {
      cls: "bg-blue-50 text-blue-700 ring-1 ring-blue-100",
      Icon: Loader2,
    },
    Review: {
      cls: "bg-violet-50 text-violet-700 ring-1 ring-violet-100",
      Icon: Eye,
    },
    Pending: {
      cls: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
      Icon: Clock3,
    },
  };
  const { cls, Icon } = map[s] || map.Pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${cls}`}
    >
      <Icon size={10} />
      {s}
    </span>
  );
}

/* ─────────── AVATAR ─────────── */
function Avatar({ short, size = 32 }) {
  const c = AVATAR_COLORS[short] || "#64748b";
  return (
    <div
      style={{
        width: size,
        height: size,
        background: c + "18",
        color: c,
        borderRadius: "50%",
        flexShrink: 0,
      }}
      className="flex items-center justify-center text-xs font-bold"
    >
      {short}
    </div>
  );
}

/* ─────────── DROPDOWN MENU ─────────── */
function ActionMenu({ item, onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all"
      >
        <MoreVertical size={14} />
      </button>
      {open && (
        <div className="absolute right-0 top-10 z-50 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
          {[
            {
              label: "View Details",
              icon: <Eye size={13} />,
              action: () => {
                onView(item);
                setOpen(false);
              },
            },
            {
              label: "Edit Project",
              icon: <Pencil size={13} />,
              action: () => {
                onEdit(item);
                setOpen(false);
              },
            },
          ].map(({ label, icon, action }) => (
            <button
              key={label}
              onClick={action}
              className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-[13px] text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              {icon}
              {label}
            </button>
          ))}
          <div className="border-t border-slate-100 my-1" />
          <button
            onClick={() => {
              onDelete(item);
              setOpen(false);
            }}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-[13px] text-red-500 hover:bg-red-50"
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

/* ─────────── FORM MODAL ─────────── */
function FormModal({ mode, initialData, onSave, onClose }) {
  const [form, setForm] = useState(initialData || EMPTY);
  const [errors, setErrors] = useState({});
  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.client.trim()) e.client = "Required";
    if (!form.employee.trim()) e.employee = "Required";
    if (!form.task.trim()) e.task = "Required";
    if (!form.priority) e.priority = "Required";
    if (!form.status) e.status = "Required";
    if (!form.week) e.week = "Required";
    if (!form.deadline.trim()) e.deadline = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const fieldClass = (k) =>
    `h-9 w-full rounded-lg border px-3 text-[13px] text-slate-700 outline-none placeholder:text-slate-300 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-50 ${errors[k] ? "border-red-400" : "border-slate-200"}`;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl shadow-slate-300/40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="text-[15px] font-bold text-slate-900">
              {mode === "edit" ? "Edit Project" : "Add New Project"}
            </h2>
            <p className="text-[12px] text-slate-400 mt-0.5">
              {mode === "edit"
                ? "Update project details below."
                : "Fill all fields to create a project."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50"
          >
            <X size={14} />
          </button>
        </div>
        {/* Body */}
        <div className="max-h-[68vh] overflow-y-auto px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              ["name", "Project Name", "e.g. ERP System"],
              ["client", "Client", "e.g. Infosys"],
            ].map(([k, label, ph]) => (
              <div key={k}>
                <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
                  {label} <span className="text-red-400">*</span>
                </label>
                <input
                  value={form[k]}
                  onChange={(e) => set(k, e.target.value)}
                  placeholder={ph}
                  className={fieldClass(k)}
                />
                {errors[k] && (
                  <p className="text-[11px] text-red-400 mt-1">{errors[k]}</p>
                )}
              </div>
            ))}
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
              Employee <span className="text-red-400">*</span>
            </label>
            <input
              value={form.employee}
              onChange={(e) => set("employee", e.target.value)}
              placeholder="Employee name"
              className={fieldClass("employee")}
            />
            {errors.employee && (
              <p className="text-[11px] text-red-400 mt-1">{errors.employee}</p>
            )}
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
              Task Description <span className="text-red-400">*</span>
            </label>
            <input
              value={form.task}
              onChange={(e) => set("task", e.target.value)}
              placeholder="Describe the task"
              className={fieldClass("task")}
            />
            {errors.task && (
              <p className="text-[11px] text-red-400 mt-1">{errors.task}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              ["priority", "Priority", ["High", "Medium", "Low"]],
              [
                "status",
                "Status",
                ["Active", "Completed", "Pending", "Review"],
              ],
            ].map(([k, label, opts]) => (
              <div key={k}>
                <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
                  {label} <span className="text-red-400">*</span>
                </label>
                <select
                  value={form[k]}
                  onChange={(e) => set(k, e.target.value)}
                  className={fieldClass(k)}
                >
                  <option value="">Select</option>
                  {opts.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                {errors[k] && (
                  <p className="text-[11px] text-red-400 mt-1">{errors[k]}</p>
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
                Week <span className="text-red-400">*</span>
              </label>
              <select
                value={form.week}
                onChange={(e) => set("week", e.target.value)}
                className={fieldClass("week")}
              >
                <option value="">Select</option>
                {WEEKS.map((w) => (
                  <option key={w}>{w}</option>
                ))}
              </select>
              {errors.week && (
                <p className="text-[11px] text-red-400 mt-1">{errors.week}</p>
              )}
            </div>
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
                Deadline <span className="text-red-400">*</span>
              </label>
              <input
                value={form.deadline}
                onChange={(e) => set("deadline", e.target.value)}
                placeholder="01–07 May 2026"
                className={fieldClass("deadline")}
              />
              {errors.deadline && (
                <p className="text-[11px] text-red-400 mt-1">
                  {errors.deadline}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-6 py-4">
          <button
            onClick={onClose}
            className="h-9 rounded-lg border border-slate-200 px-4 text-[13px] font-semibold text-slate-500 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (validate()) onSave(form);
            }}
            className="flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-4 text-[13px] font-semibold text-white hover:bg-blue-700"
          >
            <Save size={13} />
            {mode === "edit" ? "Update Project" : "Add Project"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── DELETE MODAL ─────────── */
function DeleteModal({ item, onConfirm, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white shadow-2xl shadow-slate-300/40 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-[15px] font-bold text-slate-900">
            Delete Project
          </h2>
          <button
            onClick={onClose}
            className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50"
          >
            <X size={14} />
          </button>
        </div>
        <div className="px-5 py-4">
          <div className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-100 px-4 py-3">
            <AlertTriangle size={16} className="text-red-500 mt-0.5 shrink-0" />
            <p className="text-[13px] text-red-700">
              Delete <strong>"{item.name}"</strong>? This cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-4">
          <button
            onClick={onClose}
            className="h-9 rounded-lg border border-slate-200 px-4 text-[13px] font-semibold text-slate-500 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex h-9 items-center gap-1.5 rounded-lg bg-red-600 px-4 text-[13px] font-semibold text-white hover:bg-red-700"
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── DETAIL PAGE ─────────── */
function DetailPage({ item, onBack }) {
  const [tab, setTab] = useState("overview");
  const c = AVATAR_COLORS[item.employeeShort] || "#64748b";
  const progress =
    { Completed: 100, Review: 80, Active: 60, Pending: 30 }[item.status] || 40;
  const prjCode = `PRJ-${(17800000000 + item.id * 12345678).toString().slice(0, 13)}`;

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "description", label: "Description" },
    { id: "team", label: "Team" },
    { id: "budget", label: "Budget" },
  ];

  const wfSteps = [
    { label: "Project Created", done: true },
    { label: "Design Phase", done: item.status !== "Pending" },
    {
      label: "Development",
      done:
        item.status === "Completed" ||
        item.status === "Review" ||
        item.status === "Active",
    },
    { label: "Delivery", done: item.status === "Completed" },
  ];

  const teamMembers = [
    { role: "Project Manager", code: "CIPL6767" },
    { role: "Team Leader", code: "CIPL0007" },
    { role: "Frontend Developer", code: "CIPL0029" },
    { role: "Project Coordinator", code: "CIPL1111" },
  ];

  return (
    <div className="space-y-5">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[13px] font-semibold text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft size={15} /> Back to Projects
      </button>

      {/* Hero Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Top strip */}
        <div className="h-1.5 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600" />
        <div className="px-6 pt-5 pb-6">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <FolderKanban size={22} className="text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 leading-tight">
                  {item.name}
                </h1>
                <p className="text-[13px] text-slate-400 mt-0.5">
                  {item.client} · Web Application
                </p>
              </div>
            </div>
            <StatusBadge s={item.status} />
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-3">
            {[
              {
                label: "Progress",
                icon: <TrendingUp size={15} className="text-blue-500" />,
                value: `${progress}%`,
                sub: item.status,
              },
              {
                label: "Team Members",
                icon: <Users size={15} className="text-violet-500" />,
                value: "4",
                sub: "Active",
              },
              {
                label: "Deadline",
                icon: <CalendarCheck size={15} className="text-amber-500" />,
                value: item.week,
                sub: item.deadline,
              },
              {
                label: "Budget",
                icon: <DollarSign size={15} className="text-emerald-500" />,
                value: "₹0",
                sub: "Allocated",
              },
            ].map(({ label, icon, value, sub }) => (
              <div
                key={label}
                className="rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3"
              >
                <div className="flex items-center gap-1.5 mb-2">
                  {icon}
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    {label}
                  </span>
                </div>
                <div className="text-[18px] font-bold text-slate-800 leading-none">
                  {value}
                </div>
                <div className="text-[11px] text-slate-400 mt-1">{sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-slate-100 px-6 flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-3 text-[13px] font-semibold border-b-2 -mb-px transition-colors ${
                tab === t.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-400 hover:text-slate-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {tab === "overview" && (
        <div className="space-y-4">
          {/* Info grid */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-[13px] font-bold text-slate-700 mb-4">
              Project Information
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {[
                ["Project Code", prjCode],
                ["Project Mode", "Fixed Bid"],
                ["Department", "Web Application"],
                ["Technology", "React, Node.js"],
                ["Priority", null, <PriorityBadge key="p" p={item.priority} />],
                ["Start Date", "2026-05-01"],
                ["Assigned To", item.employee],
                ["Client", item.client],
              ].map(([label, val, node]) => (
                <div key={label}>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-1">
                    {label}
                  </p>
                  {node || (
                    <p className="text-[13px] font-semibold text-slate-700">
                      {val}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Workflow */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-[13px] font-bold text-slate-700 mb-4">
              Workflow Status
            </h3>
            <div className="flex gap-3">
              {wfSteps.map((step, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-xl border p-4 ${
                    step.done
                      ? "border-emerald-100 bg-emerald-50/50"
                      : "border-slate-100 bg-slate-50"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center mb-3 ${
                      step.done ? "bg-emerald-100" : "bg-slate-200"
                    }`}
                  >
                    {step.done ? (
                      <CheckCircle size={15} className="text-emerald-600" />
                    ) : (
                      <Clock3 size={13} className="text-slate-400" />
                    )}
                  </div>
                  <p className="text-[12px] font-bold text-slate-700">
                    {step.label}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Stage updated and actively monitored.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "description" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <FileText size={15} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-[13px] font-bold text-slate-700">
                Project Description
              </h3>
              <p className="text-[11px] text-slate-400">
                Scope and requirement details.
              </p>
            </div>
          </div>
          <p className="text-[13px] text-slate-600 leading-relaxed">
            {item.task}. This project involves comprehensive planning, design,
            and execution phases to deliver the highest quality output to{" "}
            <strong className="text-slate-800">{item.client}</strong>. The team
            is responsible for all deliverables within the specified timeline of{" "}
            <strong className="text-slate-800">{item.deadline}</strong>.
          </p>
        </div>
      )}

      {tab === "team" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-[13px] font-bold text-slate-700 mb-4">
            Team Members
          </h3>
          <div className="space-y-2">
            {teamMembers.map(({ role, code }) => (
              <div
                key={code}
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3"
              >
                <Avatar short={item.employeeShort} size={36} />
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-slate-700">
                    {item.employee}
                  </p>
                  <p className="text-[11px] text-slate-400">{code}</p>
                </div>
                <p className="text-[12px] text-slate-500 font-medium">{role}</p>
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 ring-1 ring-emerald-100">
                  <BadgeCheck size={10} /> Active
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "budget" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-[13px] font-bold text-slate-700 mb-4">
            Budget Details
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  {[
                    "Est. Hours",
                    "Est. Cost",
                    "Approved Hours",
                    "Approved Cost",
                    "Status",
                  ].map((h) => (
                    <th
                      key={h}
                      className="pb-3 pr-6 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-4 pr-6 text-[13px] text-slate-600">
                    0 hrs
                  </td>
                  <td className="py-4 pr-6 text-[13px] text-slate-600">₹0</td>
                  <td className="py-4 pr-6 text-[13px] text-slate-600">
                    0 hrs
                  </td>
                  <td className="py-4 pr-6 text-[13px] text-slate-600">₹0</td>
                  <td className="py-4">
                    <StatusBadge s="Active" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────── CARD ─────────── */
function ProjectCard({ project, onView, onEdit, onDelete }) {
  const c = AVATAR_COLORS[project.employeeShort] || "#64748b";
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group">
      {/* Top */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
            <FolderKanban size={18} className="text-blue-600" />
          </div>
          <div>
            <p className="text-[14px] font-bold text-slate-800 leading-tight">
              {project.name}
            </p>
            <p className="text-[12px] text-slate-400 mt-0.5">
              {project.client}
            </p>
          </div>
        </div>
        <ActionMenu
          item={project}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>

      {/* Task */}
      <p className="text-[12px] text-slate-500 bg-slate-50 rounded-lg px-3 py-2 mb-3 leading-relaxed">
        {project.task}
      </p>

      {/* Badges */}
      <div className="flex items-center gap-2 mb-4">
        <PriorityBadge p={project.priority} />
        <StatusBadge s={project.status} />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-3">
        <div className="flex items-center gap-2">
          <Avatar short={project.employeeShort} size={28} />
          <span className="text-[12px] font-semibold text-slate-600">
            {project.employee}
          </span>
        </div>
        <div className="text-right">
          <p className="text-[12px] font-bold text-slate-700">{project.week}</p>
          <p className="text-[11px] text-slate-400">{project.deadline}</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────── MAIN PAGE ─────────── */
export default function ProjectListPage() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [view, setView] = useState("card"); // "card" | "table"
  const [nextId, setNextId] = useState(7);

  const [viewItem, setViewItem] = useState(null); // detail page
  const [addOpen, setAddOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDel] = useState(null);

  /* filtered */
  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        const ms = [p.name, p.client, p.employee].some((v) =>
          v.toLowerCase().includes(search.toLowerCase()),
        );
        const mst = statusFilter === "All" || p.status === statusFilter;
        return ms && mst;
      }),
    [projects, search, statusFilter],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, totalPages);
  const items = filtered.slice((safePage - 1) * perPage, safePage * perPage);
  const start = filtered.length ? (safePage - 1) * perPage + 1 : 0;
  const end = Math.min(safePage * perPage, filtered.length);

  /* handlers */
  const handleAdd = (form) => {
    const short = (form.employee[0] || "?").toUpperCase();
    setProjects((p) => [...p, { id: nextId, ...form, employeeShort: short }]);
    setNextId((n) => n + 1);
    setAddOpen(false);
  };
  const handleEdit = (form) => {
    const short = (form.employee[0] || "?").toUpperCase();
    setProjects((p) =>
      p.map((x) =>
        x.id === editItem.id ? { ...x, ...form, employeeShort: short } : x,
      ),
    );
    setEditItem(null);
  };
  const handleDelete = () => {
    setProjects((p) => p.filter((x) => x.id !== deleteItem.id));
    setDel(null);
  };

  const editFormData = editItem
    ? {
        name: editItem.name,
        client: editItem.client,
        employee: editItem.employee,
        task: editItem.task,
        priority: editItem.priority,
        status: editItem.status,
        week: editItem.week,
        deadline: editItem.deadline,
      }
    : null;

  /* ── DETAIL VIEW ── */
  if (viewItem)
    return (
      <div className="min-h-screen ">
        <DetailPage item={viewItem} onBack={() => setViewItem(null)} />
      </div>
    );

  return (
    <div className="min-h-screen space-y-5">
      {/* Modals */}
      {addOpen && (
        <FormModal
          mode="add"
          initialData={EMPTY}
          onSave={handleAdd}
          onClose={() => setAddOpen(false)}
        />
      )}
      {editItem && (
        <FormModal
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
          onClose={() => setDel(null)}
        />
      )}

      {/* Page header */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600 mb-1">
          Project Management
        </p>
        <h1 className="text-[28px] font-extrabold text-slate-900 tracking-tight">
          Project Workflow
        </h1>
        <p className="text-[13px] text-slate-400 mt-1">
          Manage employee and client projects with enterprise workflow tracking.
        </p>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        {/* Left */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="h-8 rounded-lg border border-slate-200 bg-[#f4f6fb] px-3 text-[13px] font-medium text-slate-700 outline-none focus:border-blue-400"
          >
            {["All", "Active", "Completed", "Pending", "Review"].map((s) => (
              <option key={s} value={s}>
                {s === "All" ? "All Status" : s}
              </option>
            ))}
          </select>

          <button className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 bg-[#f4f6fb] px-3 text-[13px] font-medium text-slate-600 hover:border-blue-300">
            <CalendarDays size={13} className="text-blue-500" /> May 2026
          </button>

          <button
            onClick={() => {
              setStatus("All");
              setSearch("");
              setPage(1);
            }}
            className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-200 bg-[#f4f6fb] text-slate-400 hover:text-blue-600 hover:border-blue-300 transition-colors"
            title="Reset filters"
          >
            <RefreshCcw size={13} />
          </button>

          {/* View toggle */}
          <div className="flex border border-slate-200 rounded-lg overflow-hidden bg-[#f4f6fb]">
            {[
              ["card", <LayoutGrid size={13} />],
              ["table", <List size={13} />],
            ].map(([v, icon]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`w-8 h-8 flex items-center justify-center transition-colors ${
                  view === v
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {icon}
              </button>
            ))}
          </div>

          <button
            onClick={() => setAddOpen(true)}
            className="flex h-8 items-center gap-1.5 rounded-lg bg-blue-600 px-3 text-[13px] font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            <Plus size={13} /> Add Project
          </button>
        </div>

        {/* Right */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex items-center">
            <Search size={13} className="absolute left-3 text-slate-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search projects…"
              className="h-8 pl-8 pr-3 rounded-lg border border-slate-200 bg-[#f4f6fb] text-[13px] text-slate-700 outline-none focus:border-blue-400 w-48"
            />
          </div>
          <div className="flex items-center gap-2 text-[13px] text-slate-500">
            Show
            <select
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="h-8 w-14 rounded-lg border border-slate-200 bg-[#f4f6fb] text-[13px] text-slate-700 outline-none"
            >
              {[5, 10, 15].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
            page
          </div>
        </div>
      </div>

      {/* CARD VIEW */}
      {view === "card" &&
        (items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <FolderKanban size={28} className="text-slate-300" />
            </div>
            <p className="text-[15px] font-semibold text-slate-600">
              No projects found
            </p>
            <p className="text-[13px] text-slate-400 mt-1">
              Try adjusting your filters or add a new project.
            </p>
            <button
              onClick={() => setAddOpen(true)}
              className="mt-4 flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-[13px] font-semibold text-white hover:bg-blue-700"
            >
              <Plus size={13} /> Add Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onView={setViewItem}
                onEdit={(i) => setEditItem(i)}
                onDelete={(i) => setDel(i)}
              />
            ))}
          </div>
        ))}

      {/* TABLE VIEW */}
      {view === "table" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50/80">
                <tr className="border-b border-slate-100">
                  {[
                    "Project",
                    "Employee",
                    "Task",
                    "Priority",
                    "Status",
                    "Date",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-16 text-center text-[13px] text-slate-400"
                    >
                      No projects found.
                    </td>
                  </tr>
                ) : (
                  items.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-slate-50 hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                            <FolderKanban size={15} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold text-slate-800">
                              {p.name}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {p.client}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <Avatar short={p.employeeShort} size={28} />
                          <span className="text-[13px] text-slate-600 font-medium">
                            {p.employee}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 max-w-[200px]">
                        <p className="text-[12px] text-slate-500 truncate">
                          {p.task}
                        </p>
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <PriorityBadge p={p.priority} />
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <StatusBadge s={p.status} />
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <p className="text-[13px] font-semibold text-slate-700">
                          {p.week}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {p.deadline}
                        </p>
                      </td>
                      <td className="px-5 py-3.5">
                        <ActionMenu
                          item={p}
                          onView={setViewItem}
                          onEdit={(i) => setEditItem(i)}
                          onDelete={(i) => setDel(i)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[13px] text-slate-500">
          Showing <span className="font-semibold text-slate-700">{start}</span>{" "}
          to <span className="font-semibold text-slate-700">{end}</span> of{" "}
          <span className="font-semibold text-slate-700">
            {filtered.length}
          </span>{" "}
          records
        </p>
        <div className="flex items-center gap-1.5">
          <button
            disabled={safePage === 1}
            onClick={() => setPage((p) => p - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 disabled:opacity-30 hover:enabled:border-blue-300 hover:enabled:text-blue-600"
          >
            <ChevronLeft size={14} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
            <button
              key={pg}
              onClick={() => setPage(pg)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-semibold transition-colors ${
                safePage === pg
                  ? "bg-blue-600 text-white border border-blue-600"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {pg}
            </button>
          ))}
          <button
            disabled={safePage === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 disabled:opacity-30 hover:enabled:border-blue-300 hover:enabled:text-blue-600"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
