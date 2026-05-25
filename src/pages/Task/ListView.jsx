import { useMemo, useState, useRef, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BriefcaseBusiness,
  Clock3,
  BadgeCheck,
  Loader,
  Eye,
  ClockIcon,
  CalendarDays,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

// ── DATA ────────────────────────────────────────────────────────
const taskData = {
  day: [
    { project: "ERP System", employee: "John Doe", avatar: "J", avatarColor: "#1a6aad", task: "Develop Employee Dashboard", priority: "High", status: "Completed", week: "Week 1", date: "01–07 May 2026" },
    { project: "Inventory System", employee: "Sophia", avatar: "S", avatarColor: "#00c8e0", task: "Stock Management Integration", priority: "Medium", status: "Completed", week: "Week 1", date: "01–07 May 2026" },
    { project: "Analytics Portal", employee: "Daniel", avatar: "D", avatarColor: "#7c5cbf", task: "Create Charts and Reports", priority: "Medium", status: "In Progress", week: "Week 2", date: "08–14 May 2026" },
    { project: "Client CRM", employee: "Emma", avatar: "E", avatarColor: "#f97316", task: "Lead Management Module", priority: "Low", status: "Pending", week: "Week 2", date: "08–14 May 2026" },
    { project: "Finance App", employee: "William", avatar: "W", avatarColor: "#c0365a", task: "Payment Gateway Integration", priority: "High", status: "In Review", week: "Week 3", date: "15–21 May 2026" },
    { project: "Inventory System", employee: "Sophia", avatar: "S", avatarColor: "#00c8e0", task: "Stock Management Integration", priority: "Medium", status: "Completed", week: "Week 1", date: "01–07 May 2026" },
    { project: "Inventory System", employee: "Sophia", avatar: "S", avatarColor: "#00c8e0", task: "Stock Management Integration", priority: "Medium", status: "Completed", week: "Week 1", date: "01–07 May 2026" },
    { project: "Inventory System", employee: "Sophia", avatar: "S", avatarColor: "#00c8e0", task: "Stock Management Integration", priority: "Medium", status: "Completed", week: "Week 1", date: "01–07 May 2026" },
    { project: "Inventory System", employee: "Sophia", avatar: "S", avatarColor: "#00c8e0", task: "Stock Management Integration", priority: "Medium", status: "Completed", week: "Week 1", date: "01–07 May 2026" },
    { project: "Inventory System", employee: "Sophia", avatar: "S", avatarColor: "#00c8e0", task: "Stock Management Integration", priority: "Medium", status: "Completed", week: "Week 1", date: "01–07 May 2026" },
    { project: "Inventory System", employee: "Sophia", avatar: "S", avatarColor: "#00c8e0", task: "Stock Management Integration", priority: "Medium", status: "Completed", week: "Week 1", date: "01–07 May 2026" },
    { project: "Inventory System", employee: "Sophia", avatar: "S", avatarColor: "#00c8e0", task: "Stock Management Integration", priority: "Medium", status: "Completed", week: "Week 1", date: "01–07 May 2026" },
    { project: "Inventory System", employee: "Sophia", avatar: "S", avatarColor: "#00c8e0", task: "Stock Management Integration", priority: "Medium", status: "Completed", week: "Week 1", date: "01–07 May 2026" },
    { project: "Inventory System", employee: "Sophia", avatar: "S", avatarColor: "#00c8e0", task: "Stock Management Integration", priority: "Medium", status: "Completed", week: "Week 1", date: "01–07 May 2026" },
  ],
  week: [],
  month: [],
};

const summaryCards = [
  { month: "MAY 2026", range: "01–31 May 2026", hours: "142:00 Hrs", total: "220:00 Hrs", progress: 82, label: "Good", excellent: false },
  { month: "APR 2026", range: "01–30 Apr 2026", hours: "205:00 Hrs", total: "220:00 Hrs", progress: 93, label: "Excellent", excellent: true },
];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const SHORT_MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// ── PRIORITY & STATUS STYLES ─────────────────────────────────────
function PriorityBadge({ p }) {
  const styles = {
    High: "bg-red-50 text-red-500",
    Medium: "bg-orange-50 text-orange-500",
    Low: "bg-green-50 text-green-600",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[p] || styles.Low}`}>
      {p}
    </span>
  );
}

function StatusBadge({ s }) {
  const map = {
    Completed:   { cls: "bg-green-50 text-green-600",   Icon: BadgeCheck },
    "In Progress":{ cls: "bg-blue-50 text-blue-600",    Icon: Loader },
    "In Review": { cls: "bg-purple-50 text-purple-600", Icon: Eye },
    Pending:     { cls: "bg-orange-50 text-orange-500", Icon: ClockIcon },
  };
  const { cls, Icon } = map[s] || map.Pending;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>
      <Icon size={11} />
      {s}
    </span>
  );
}

// ── CALENDAR PICKER ──────────────────────────────────────────────
function CalendarPicker({ selectedDate, onSelect }) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(selectedDate.year);
  const [viewMonth, setViewMonth] = useState(selectedDate.month);
  const [tempDay, setTempDay] = useState(selectedDate.day);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrev = new Date(viewYear, viewMonth, 0).getDate();

  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); };

  const handleApply = () => {
    onSelect({ day: tempDay, month: viewMonth, year: viewYear });
    setOpen(false);
  };

  const btnLabel = `${SHORT_MONTHS[selectedDate.month]} ${selectedDate.day}, ${selectedDate.year}`;

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push({ day: daysInPrev - firstDay + 1 + i, other: true });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, other: false });
  const remaining = 42 - firstDay - daysInMonth;
  for (let i = 1; i <= remaining; i++) cells.push({ day: i, other: true });

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 transition hover:border-blue-400 hover:text-blue-600"
      >
        <CalendarDays size={15} className="text-blue-600" />
        {btnLabel}
        <ChevronRight size={13} className={`ml-1 text-slate-400 transition-transform ${open ? "rotate-90" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-12 z-50 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
          {/* Nav */}
          <div className="mb-3 flex items-center justify-between">
            <button onClick={prevMonth} className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
              <ChevronLeft size={14} />
            </button>
            <div className="flex items-center gap-2">
              <select
                value={viewMonth}
                onChange={e => setViewMonth(Number(e.target.value))}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 outline-none"
              >
                {MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}
              </select>
              <select
                value={viewYear}
                onChange={e => setViewYear(Number(e.target.value))}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 outline-none"
              >
                {Array.from({ length: 11 }, (_, i) => 2020 + i).map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <button onClick={nextMonth} className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Day names */}
          <div className="mb-1 grid grid-cols-7 text-center">
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
              <div key={d} className="py-1 text-[10px] font-medium text-slate-400">{d}</div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-0.5">
            {cells.map((c, i) => {
              const isSelected = !c.other && c.day === tempDay && viewMonth === selectedDate.month && viewYear === selectedDate.year;
              const isToday = !c.other && c.day === 25 && viewMonth === 4 && viewYear === 2026;
              return (
                <button
                  key={i}
                  onClick={() => !c.other && setTempDay(c.day)}
                  className={`rounded-lg py-1.5 text-xs transition
                    ${c.other ? "text-slate-300 cursor-default" : "cursor-pointer hover:bg-blue-50 hover:text-blue-600"}
                    ${isToday && !isSelected ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white font-semibold" : ""}
                    ${isSelected ? "bg-blue-100 text-blue-700 font-semibold" : ""}
                  `}
                >
                  {c.day}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-3 flex justify-end gap-2 border-t border-slate-100 pt-3">
            <button onClick={() => setOpen(false)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-50">Cancel</button>
            <button onClick={handleApply} className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700">Apply</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── ACTION DROPDOWN ──────────────────────────────────────────────
function ActionMenu() {
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
        onClick={() => setOpen(o => !o)}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:bg-slate-50"
      >
        <MoreVertical size={15} />
      </button>
      {open && (
        <div className="absolute right-0 top-9 z-50 min-w-[130px] rounded-xl border border-slate-200 bg-white shadow-lg">
          <button
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-xs text-slate-600 hover:bg-slate-50 rounded-t-xl"
          >
            <Eye size={13} /> View
          </button>
          <button
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-xs text-slate-600 hover:bg-slate-50"
          >
            <Pencil size={13} /> Edit
          </button>
          <button
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-xs text-red-500 hover:bg-red-50 rounded-b-xl"
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

// ── MAIN COMPONENT ───────────────────────────────────────────────
export default function Li() {
  const [activeTab, setActiveTab] = useState("day");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedDate, setSelectedDate] = useState({ day: 22, month: 4, year: 2026 });

  const currentData = useMemo(() => taskData[activeTab] || [], [activeTab]);
  const totalPages = Math.max(1, Math.ceil(currentData.length / rowsPerPage));
  const paginatedData = currentData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const startRow = currentData.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, currentData.length);

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      {/* HEADER */}
      <div className="mb-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Timesheet Dashboard</h1>
            <p className="mt-1 text-sm text-slate-500">Track employee work logs and productivity</p>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="grid gap-4 lg:grid-cols-[1fr_290px]">
        {/* LEFT */}
        <div>
          {/* FILTER ROW */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <select
                value={activeTab}
                onChange={(e) => { setActiveTab(e.target.value); setCurrentPage(1); }}
                className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none"
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>

              <CalendarPicker selectedDate={selectedDate} onSelect={setSelectedDate} />
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Show</span>
              <select
                value={rowsPerPage}
                onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
              <span>per page</span>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* TABLE HEAD */}
            <div className="hidden grid-cols-7 bg-slate-50 px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400 md:grid">
              <div>Project</div>
              <div>Employee</div>
              <div>Task</div>
              <div>Priority</div>
              <div>Status</div>
              <div>Date</div>
              <div>Action</div>
            </div>

            {/* TABLE BODY */}
            <div>
              {paginatedData.length === 0 ? (
                <div className="p-10 text-center text-sm text-slate-400">No records for this period.</div>
              ) : (
                paginatedData.map((task, i) => (
                  <div
                    key={i}
                    className="grid gap-3 border-t border-slate-100 px-5 py-3.5 transition hover:bg-slate-50 md:grid-cols-7 md:items-center"
                  >
                    {/* PROJECT */}
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
                        <BriefcaseBusiness size={16} className="text-blue-600" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 leading-tight">{task.project}</span>
                    </div>

                    {/* EMPLOYEE */}
                    <div className="flex items-center gap-2">
                      <div
                        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-xs font-bold"
                        style={{ background: task.avatarColor + "22", color: task.avatarColor }}
                      >
                        {task.avatar}
                      </div>
                      <span className="text-sm text-slate-600">{task.employee}</span>
                    </div>

                    {/* TASK */}
                    <div className="text-sm text-slate-500 leading-snug">{task.task}</div>

                    {/* PRIORITY */}
                    <div><PriorityBadge p={task.priority} /></div>

                    {/* STATUS */}
                    <div><StatusBadge s={task.status} /></div>

                    {/* DATE */}
                    <div>
                      <div className="text-sm font-semibold text-slate-700">{task.week}</div>
                      <div className="text-xs text-slate-400">{task.date}</div>
                    </div>

                    {/* ACTION */}
                    <div><ActionMenu /></div>
                  </div>
                ))
              )}
            </div>

            {/* TABLE FOOTER */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 px-5 py-4">
              <span className="text-sm text-slate-500">
                Showing <b className="text-slate-700">{startRow}–{endRow}</b> of <b className="text-slate-700">{currentData.length}</b> records
              </span>
              <div className="flex items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => (
                  <button
                    key={pg}
                    onClick={() => setCurrentPage(pg)}
                    className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold transition ${
                      currentPage === pg
                        ? "bg-blue-600 text-white shadow-sm"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300"
                    }`}
                  >
                    {pg}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-40"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SUMMARY */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800">Timesheet Summary</h2>
          <p className="mt-1 text-sm text-slate-500">Hours overview</p>
          <div className="mt-4 space-y-4">
            {summaryCards.map((c, i) => (
              <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <div className="text-xs font-bold tracking-widest text-blue-600">{c.month}</div>
                    <div className="mt-1 text-xs text-slate-400">{c.range}</div>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-100">
                    <Clock3 size={16} className="text-cyan-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-slate-800">{c.hours}</div>
                <div className="mt-1 text-xs text-slate-400">of {c.total}</div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    style={{ width: `${c.progress}%` }}
                    className={`h-full rounded-full ${c.excellent ? "bg-green-500" : "bg-blue-600"}`}
                  />
                </div>
                <div className={`mt-2 text-right text-xs font-semibold ${c.excellent ? "text-green-600" : "text-blue-600"}`}>
                  {c.progress}%
                </div>
                <button
                  className={`mt-4 w-full rounded-xl py-2 text-sm font-semibold text-white shadow-sm ${
                    c.excellent ? "bg-green-500 hover:bg-green-600" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {c.label}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}