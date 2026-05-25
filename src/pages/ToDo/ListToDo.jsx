import { useState, useMemo, useRef, useEffect } from "react";
import {
  Plus, Search, BriefcaseBusiness, Pencil, Trash2,
  CircleCheckBig, Clock3, TriangleAlert, X, ChevronDown,
  Filter, SlidersHorizontal, BellOff, BellRing, Calendar,
  Tag, FileText, Save, RotateCcw, MoreVertical, Eye,
  ChevronLeft, ChevronRight, CalendarDays,
} from "lucide-react";

// ── DATA ─────────────────────────────────────────────────────────────────────
const MONTHS_LONG  = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const STATUS_CONFIG = {
  Completed:    { bg: "bg-green-50",  text: "text-green-600",  dot: "bg-green-500",  Icon: CircleCheckBig },
  "In Progress":{ bg: "bg-blue-50",   text: "text-blue-600",   dot: "bg-blue-500",   Icon: Clock3 },
  Pending:      { bg: "bg-orange-50", text: "text-orange-500", dot: "bg-orange-400", Icon: TriangleAlert },
};

const TYPE_COLORS = {
  Meeting:     "bg-violet-50 text-violet-700",
  Development: "bg-cyan-50 text-cyan-700",
  Testing:     "bg-pink-50 text-pink-700",
  Support:     "bg-teal-50 text-teal-700",
  Design:      "bg-lime-50 text-lime-700",
  Review:      "bg-orange-50 text-orange-600",
};

const INITIAL_TODOS = [
  { id: 1, type: "Meeting",     description: "Attend client meeting regarding ERP module improvements and gather feedback.", date: "21 May 2026", notification: true,  status: "Pending"      },
  { id: 2, type: "Development", description: "Complete employee timesheet dashboard UI with export and filter functionality.", date: "20 May 2026", notification: false, status: "Completed"    },
  { id: 3, type: "Testing",     description: "Test calendar task module responsiveness across all breakpoints.",              date: "19 May 2026", notification: true,  status: "In Progress"  },
  { id: 4, type: "Design",      description: "Create wireframes for the new HR onboarding portal with accessibility.",        date: "22 May 2026", notification: true,  status: "Pending"      },
  { id: 5, type: "Review",      description: "Code review for the payment gateway integration — check edge cases.",           date: "18 May 2026", notification: false, status: "Completed"    },
  { id: 6, type: "Support",     description: "Resolve open support tickets for the inventory system before EOD.",            date: "23 May 2026", notification: true,  status: "In Progress"  },
  { id: 7, type: "Meeting",     description: "Weekly sprint planning call with the backend and frontend teams.",              date: "24 May 2026", notification: false, status: "Pending"      },
];

const EMPTY_FORM = { type: "", description: "", date: "", notification: "Yes", status: "Pending" };

// ── HELPERS ───────────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
  const { Icon } = cfg;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      <Icon size={11} />
      {status}
    </span>
  );
}

function TypeBadge({ type }) {
  const cls = TYPE_COLORS[type] || "bg-slate-100 text-slate-600";
  return (
    <span className={`inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-semibold ${cls}`}>
      <Tag size={10} />
      {type}
    </span>
  );
}

// ── CALENDAR PICKER ───────────────────────────────────────────────────────────
function CalendarPicker({ selectedDate, onSelect }) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(selectedDate.year);
  const [viewMonth, setViewMonth] = useState(selectedDate.month);
  const [tempDay, setTempDay] = useState(selectedDate.day);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrev = new Date(viewYear, viewMonth, 0).getDate();

  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push({ day: daysInPrev - firstDay + 1 + i, other: true });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, other: false });
  const rem = 42 - firstDay - daysInMonth;
  for (let i = 1; i <= rem; i++) cells.push({ day: i, other: true });

  const label = `${MONTHS_SHORT[selectedDate.month]} ${selectedDate.day}, ${selectedDate.year}`;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:border-blue-400 hover:text-blue-600"
      >
        <CalendarDays size={15} className="text-blue-600" />
        {label}
        <ChevronDown size={13} className="text-slate-400" />
      </button>

      {open && (
        <div className="absolute left-0 top-12 z-50 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <button onClick={prevMonth} className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
              <ChevronLeft size={14} />
            </button>
            <div className="flex items-center gap-2">
              <select value={viewMonth} onChange={e => setViewMonth(Number(e.target.value))}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 outline-none">
                {MONTHS_LONG.map((m, i) => <option key={i} value={i}>{m}</option>)}
              </select>
              <select value={viewYear} onChange={e => setViewYear(Number(e.target.value))}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 outline-none">
                {Array.from({ length: 11 }, (_, i) => 2020 + i).map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <button onClick={nextMonth} className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="mb-1 grid grid-cols-7 text-center">
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
              <div key={d} className="py-1 text-[10px] font-medium text-slate-400">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5">
            {cells.map((c, i) => {
              const isSel = !c.other && c.day === tempDay && viewMonth === selectedDate.month && viewYear === selectedDate.year;
              const isToday = !c.other && c.day === 25 && viewMonth === 4 && viewYear === 2026;
              return (
                <button key={i} onClick={() => !c.other && setTempDay(c.day)}
                  className={`rounded-lg py-1.5 text-xs transition
                    ${c.other ? "text-slate-300 cursor-default" : "cursor-pointer hover:bg-blue-50 hover:text-blue-600"}
                    ${isToday && !isSel ? "bg-blue-600 text-white font-semibold" : ""}
                    ${isSel ? "bg-blue-100 text-blue-700 font-semibold" : ""}`}>
                  {c.day}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex justify-end gap-2 border-t border-slate-100 pt-3">
            <button onClick={() => setOpen(false)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-50">Cancel</button>
            <button onClick={() => { onSelect({ day: tempDay, month: viewMonth, year: viewYear }); setOpen(false); }}
              className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700">Apply</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── ACTION MENU ───────────────────────────────────────────────────────────────
function ActionMenu({ onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(o => !o)}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:bg-slate-50">
        <MoreVertical size={15} />
      </button>
      {open && (
        <div className="absolute right-0 top-9 z-50 min-w-[130px] rounded-xl border border-slate-200 bg-white shadow-lg">
          <button onClick={() => { onView(); setOpen(false); }}
            className="flex w-full items-center gap-2 rounded-t-xl px-4 py-2.5 text-xs text-slate-600 hover:bg-slate-50">
            <Eye size={13} /> View
          </button>
          <button onClick={() => { onEdit(); setOpen(false); }}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-xs text-slate-600 hover:bg-slate-50">
            <Pencil size={13} /> Edit
          </button>
          <button onClick={() => { onDelete(); setOpen(false); }}
            className="flex w-full items-center gap-2 rounded-b-xl px-4 py-2.5 text-xs text-red-500 hover:bg-red-50">
            <Trash2 size={13} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

// ── MODAL ─────────────────────────────────────────────────────────────────────
function TodoModal({ open, onClose, onSave, editData, viewData }) {
  const isEdit = !!editData;
  const isView = !!viewData;
  const data = editData || viewData;
  const [form, setForm] = useState(data || EMPTY_FORM);

  useEffect(() => { setForm(data || EMPTY_FORM); }, [open]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.type || !form.description) return;
    onSave({ ...form, id: editData?.id || Date.now(), date: form.date || "22 May 2026", notification: form.notification === "Yes" || form.notification === true });
    onClose();
  };

  if (!open) return null;

  const title = isView ? "View Task" : isEdit ? "Edit Task" : "Create New Task";
  const subtitle = isView ? "Task details" : isEdit ? "Update task details" : "Fill in the details to add a new to-do";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ background: "linear-gradient(135deg,#1565A8,#1A9AD6)" }}>
          <div>
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <p className="mt-0.5 text-sm text-blue-100">{subtitle}</p>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-white hover:bg-white/30 transition">
            <X size={17} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">Task Type</label>
              {isView ? (
                <TypeBadge type={form.type} />
              ) : (
                <div className="relative">
                  <select name="type" value={form.type} onChange={handleChange}
                    className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 transition">
                    <option value="">Select type...</option>
                    {["Development","Meeting","Testing","Support","Design","Review"].map(t => <option key={t}>{t}</option>)}
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">Due Date</label>
              {isView ? (
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium"><Calendar size={14} className="text-slate-400" />{form.date}</div>
              ) : (
                <input type="date" name="date" value={form.date} onChange={handleChange}
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none focus:border-blue-400 transition" />
              )}
            </div>
          </div>

          {(isEdit || isView) && (
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">Status</label>
              {isView ? <StatusBadge status={form.status} /> : (
                <div className="relative">
                  <select name="status" value={form.status} onChange={handleChange}
                    className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 pr-10 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 transition">
                    {["Pending","In Progress","Completed"].map(s => <option key={s}>{s}</option>)}
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              )}
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">Description</label>
            {isView ? (
              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-xl p-3 border border-slate-200">{form.description}</p>
            ) : (
              <textarea rows={4} name="description" value={form.description} onChange={handleChange}
                placeholder="Describe the task in detail..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-400 transition" />
            )}
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">Reminder Notification</label>
            {isView ? (
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${form.notification === true || form.notification === "Yes" ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-500"}`}>
                {form.notification === true || form.notification === "Yes" ? <><BellRing size={12} /> On</> : <><BellOff size={12} /> Off</>}
              </span>
            ) : (
              <div className="flex gap-3">
                {[{ val: "Yes", Icon: BellRing, label: "Enable" }, { val: "No", Icon: BellOff, label: "Disable" }].map(({ val, Icon, label }) => (
                  <label key={val} className={`flex flex-1 cursor-pointer items-center gap-3 rounded-xl border-2 p-3 text-sm font-semibold transition
                    ${form.notification === val ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-500"}`}>
                    <input type="radio" name="notification" value={val} checked={form.notification === val} onChange={handleChange} className="sr-only" />
                    <Icon size={16} /> {label} Reminder
                  </label>
                ))}
              </div>
            )}
          </div>

          {!isView && (
            <div className="flex gap-3 pt-1">
              <button onClick={handleSubmit}
                className="flex flex-1 h-11 items-center justify-center gap-2 rounded-xl font-bold text-sm text-white transition hover:opacity-90"
                style={{ background: "linear-gradient(135deg,#1565A8,#1A9AD6)" }}>
                <Save size={15} /> {isEdit ? "Save Changes" : "Create Task"}
              </button>
              <button onClick={onClose}
                className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
                <X size={15} /> Cancel
              </button>
            </div>
          )}
          {isView && (
            <div className="flex justify-end pt-1">
              <button onClick={onClose}
                className="h-10 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function TodoPage() {
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [viewTodo, setViewTodo] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState({ day: 25, month: 4, year: 2026 });
  const [activeView, setActiveView] = useState("day");

  const filtered = useMemo(() => todos.filter(t => {
    const matchSearch = t.description.toLowerCase().includes(search.toLowerCase()) || t.type.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || t.status === filterStatus;
    const matchType   = filterType   === "All" || t.type   === filterType;
    return matchSearch && matchStatus && matchType;
  }), [todos, search, filterStatus, filterType]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const paginated = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const startRow = filtered.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, filtered.length);

  const stats = useMemo(() => ({
    total:      todos.length,
    completed:  todos.filter(t => t.status === "Completed").length,
    inProgress: todos.filter(t => t.status === "In Progress").length,
    pending:    todos.filter(t => t.status === "Pending").length,
  }), [todos]);

  const handleSave = (data) => {
    if (data.id && todos.find(t => t.id === data.id)) setTodos(todos.map(t => t.id === data.id ? data : t));
    else setTodos([data, ...todos]);
    setEditTodo(null); setViewTodo(null);
  };

  const uniqueTypes = ["All", ...Array.from(new Set(todos.map(t => t.type)))];

  return (
    <>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}.row-anim{animation:fadeUp .25s ease both}`}</style>

      <div className="min-h-screen bg-slate-100 font-sans p-5 space-y-5">

        {/* PAGE HEADER */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-0.5">Daily Operations</p>
            <h1 className="text-xl font-bold text-slate-800">To-Do Management</h1>
            <p className="mt-0.5 text-sm text-slate-500">Track, manage and complete your employee tasks efficiently.</p>
          </div>
          <button onClick={() => { setEditTodo(null); setViewTodo(null); setModalOpen(true); }}
            className="flex h-10 items-center gap-2 rounded-xl px-5 text-sm font-bold text-white shadow-sm hover:opacity-90 transition"
            style={{ background: "linear-gradient(135deg,#1565A8,#1A9AD6)" }}>
            <Plus size={16} /> Add Task
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Total Tasks",   value: stats.total,      cls: "bg-blue-50",   iconCls: "text-blue-600",   Icon: BriefcaseBusiness },
            { label: "Completed",     value: stats.completed,  cls: "bg-green-50",  iconCls: "text-green-600",  Icon: CircleCheckBig },
            { label: "In Progress",   value: stats.inProgress, cls: "bg-sky-50",    iconCls: "text-sky-600",    Icon: Clock3 },
            { label: "Pending",       value: stats.pending,    cls: "bg-orange-50", iconCls: "text-orange-500", Icon: TriangleAlert },
          ].map(({ label, value, cls, iconCls, Icon }) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{label}</p>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${cls}`}>
                  <Icon size={18} className={iconCls} />
                </div>
              </div>
              <p className={`text-4xl font-black ${iconCls}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* TABLE CARD */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* TOOLBAR */}
          <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
            {/* LEFT — filter + calendar */}
            <div className="flex flex-wrap items-center gap-2">
              <select value={activeView} onChange={e => { setActiveView(e.target.value); setCurrentPage(1); }}
                className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none">
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>

              <CalendarPicker selectedDate={selectedDate} onSelect={setSelectedDate} />

              {/* Status filter */}
              <div className="relative">
                <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                  className="h-10 appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 transition">
                  {["All","Pending","In Progress","Completed"].map(s => <option key={s}>{s}</option>)}
                </select>
                <Filter size={13} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>

              {/* Type filter */}
              <div className="relative">
                <select value={filterType} onChange={e => { setFilterType(e.target.value); setCurrentPage(1); }}
                  className="h-10 appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 transition">
                  {uniqueTypes.map(t => <option key={t}>{t}</option>)}
                </select>
                <SlidersHorizontal size={13} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <ChevronDown size={13} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>

              {(search || filterStatus !== "All" || filterType !== "All") && (
                <button onClick={() => { setSearch(""); setFilterStatus("All"); setFilterType("All"); setCurrentPage(1); }}
                  className="flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 px-4 text-sm text-slate-500 hover:bg-slate-50 transition">
                  <RotateCcw size={13} /> Reset
                </button>
              )}
            </div>

            {/* RIGHT — search + show */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 w-52">
                <Search size={14} className="text-slate-400 flex-shrink-0" />
                <input value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                  placeholder="Search tasks..."
                  className="w-full bg-transparent text-sm outline-none placeholder-slate-400" />
                {search && <button onClick={() => setSearch("")}><X size={13} className="text-slate-400" /></button>}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>Show</span>
                <select value={rowsPerPage} onChange={e => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                  className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none">
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
                <span>per page</span>
              </div>
            </div>
          </div>

          {/* TABLE HEAD */}
          <div className="hidden grid-cols-7 bg-slate-50 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 md:grid"
            style={{ gridTemplateColumns: "1fr 1fr 2.5fr 1fr 1fr 1fr 80px" }}>
            <div>Type</div><div>Employee</div><div>Description</div><div>Due Date</div><div>Reminder</div><div>Status</div><div>Action</div>
          </div>

          {/* TABLE BODY */}
          <div>
            {paginated.length === 0 ? (
              <div className="p-14 text-center">
                <FileText size={40} className="mx-auto mb-3 text-slate-300" />
                <p className="text-sm font-semibold text-slate-400">No tasks found</p>
                <p className="text-xs text-slate-400 mt-1">Try adjusting your filters</p>
              </div>
            ) : paginated.map((todo, i) => (
              <div key={todo.id}
                className="row-anim grid gap-3 border-t border-slate-100 px-5 py-3.5 transition hover:bg-slate-50 md:items-center"
                style={{ gridTemplateColumns: "1fr 1fr 2.5fr 1fr 1fr 1fr 80px", animationDelay: `${i * 30}ms` }}>

                {/* TYPE */}
                <div><TypeBadge type={todo.type} /></div>

                {/* EMPLOYEE (derived from type for dummy) */}
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-xs font-bold"
                    style={{ background: "#1565A822", color: "#1565A8" }}>
                    {todo.type[0]}
                  </div>
                  <span className="text-sm text-slate-600 truncate">Employee</span>
                </div>

                {/* DESCRIPTION */}
                <div className={`text-sm leading-snug ${todo.status === "Completed" ? "line-through text-slate-400" : "text-slate-600"} truncate`} title={todo.description}>
                  {todo.description}
                </div>

                {/* DATE */}
                <div>
                  <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <Calendar size={12} className="text-slate-400" />
                    {todo.date}
                  </div>
                </div>

                {/* NOTIFICATION */}
                <div>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${todo.notification ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-500"}`}>
                    {todo.notification ? <BellRing size={11} /> : <BellOff size={11} />}
                    {todo.notification ? "On" : "Off"}
                  </span>
                </div>

                {/* STATUS */}
                <div><StatusBadge status={todo.status} /></div>

                {/* ACTION */}
                <div>
                  <ActionMenu
                    onView={() => { setViewTodo({ ...todo, notification: todo.notification ? "Yes" : "No" }); setEditTodo(null); setModalOpen(true); }}
                    onEdit={() => { setEditTodo({ ...todo, notification: todo.notification ? "Yes" : "No" }); setViewTodo(null); setModalOpen(true); }}
                    onDelete={() => setDeleteConfirm(todo.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4">
            <span className="text-sm text-slate-500">
              Showing <b className="text-slate-700">{startRow}–{endRow}</b> of <b className="text-slate-700">{filtered.length}</b> records
            </span>
            <div className="flex items-center gap-2">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-40">
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => (
                <button key={pg} onClick={() => setCurrentPage(pg)}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold transition ${currentPage === pg ? "bg-blue-600 text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300"}`}>
                  {pg}
                </button>
              ))}
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-40">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      <TodoModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditTodo(null); setViewTodo(null); }}
        onSave={handleSave}
        editData={editTodo}
        viewData={viewTodo}
      />

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
              <Trash2 size={26} className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Task?</h3>
            <p className="text-sm text-slate-500 mb-6">This action cannot be undone. The task will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => { setTodos(todos.filter(t => t.id !== deleteConfirm)); setDeleteConfirm(null); }}
                className="flex-1 h-11 rounded-xl bg-red-500 font-bold text-sm text-white hover:bg-red-600 transition">Delete</button>
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 h-11 rounded-xl border border-slate-200 font-semibold text-sm text-slate-600 hover:bg-slate-50 transition">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}