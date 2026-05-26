import { useState, useMemo, useRef, useEffect } from "react";
import {
  Plus,
  Search,
  BriefcaseBusiness,
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
  Tag,
  FileText,
  Save,
  RotateCcw,
  MoreVertical,
  Eye,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

/* ───────────────────────────────────────────── */

const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
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
};

const INITIAL_TODOS = [
  {
    id: 1,
    type: "Meeting",
    description: "Attend client meeting regarding ERP module improvements.",
    date: "21 May 2026",
    notification: true,
    status: "Pending",
  },

  {
    id: 2,
    type: "Development",
    description: "Complete employee timesheet dashboard UI.",
    date: "20 May 2026",
    notification: false,
    status: "Completed",
  },

  {
    id: 3,
    type: "Testing",
    description: "Test calendar task module responsiveness.",
    date: "19 May 2026",
    notification: true,
    status: "In Progress",
  },

  {
    id: 4,
    type: "Design",
    description: "Create wireframes for onboarding flow.",
    date: "22 May 2026",
    notification: true,
    status: "Pending",
  },

  {
    id: 5,
    type: "Documentation",
    description: "Update API documentation for v2 release.",
    date: "23 May 2026",
    notification: false,
    status: "Pending",
  },
  {
    id: 5,
    type: "Documentation",
    description: "Update API documentation for v2 release.",
    date: "23 May 2026",
    notification: false,
    status: "Pending",
  },
  {
    id: 5,
    type: "Documentation",
    description: "Update API documentation for v2 release.",
    date: "23 May 2026",
    notification: false,
    status: "Pending",
  },
];

/* ───────────────────────────────────────────── */

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status];
  const { Icon } = cfg;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${cfg.bg}
        ${cfg.text}
      `}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />

      <Icon size={11} />

      {status}
    </span>
  );
}

function TypeBadge({ type }) {
  const cls = TYPE_COLORS[type] || "bg-slate-100 text-slate-700";

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1
        rounded-lg
        px-2.5
        py-1
        text-xs
        font-semibold
        ${cls}
      `}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />

      {type}
    </span>
  );
}

/* ───────────────────────────────────────────── */

function CalendarPicker({ selectedDate, onSelect }) {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex
          h-10
          items-center
          gap-2
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          text-sm
          font-medium
          text-slate-700
          transition-all
          hover:border-blue-500
        "
      >
        <CalendarDays size={15} className="text-slate-400" />
        {MONTHS_SHORT[selectedDate.month]} {selectedDate.day},{" "}
        {selectedDate.year}
        <ChevronDown size={13} className="text-slate-400" />
      </button>

      {open && (
        <div
          className="
            absolute
            left-0
            top-12
            z-50
            w-72
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-4
            shadow-xl
          "
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-700">Select Date</p>

            <button
              onClick={() => setOpen(false)}
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                hover:bg-slate-100
              "
            >
              <X size={14} className="text-slate-500" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <button
                key={d}
                onClick={() => {
                  onSelect({
                    ...selectedDate,
                    day: d,
                  });

                  setOpen(false);
                }}
                className={`
                  flex
                  h-9
                  items-center
                  justify-center
                  rounded-lg
                  text-sm
                  transition-all

                  ${
                    d === selectedDate.day
                      ? "bg-blue-600 text-white"
                      : "hover:bg-slate-100 text-slate-600"
                  }
                `}
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

/* ───────────────────────────────────────────── */

function ActionMenu({ onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          bg-white
          text-slate-500
          transition-all
          hover:bg-slate-50
        "
      >
        <MoreVertical size={15} />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            top-11
            z-50
            min-w-[140px]
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-xl
          "
        >
          <button
            onClick={() => {
              onView();
              setOpen(false);
            }}
            className="
              flex
              w-full
              items-center
              gap-2
              px-4
              py-3
              text-sm
              text-slate-600
              hover:bg-slate-50
            "
          >
            <Eye size={14} />
            View
          </button>

          <button
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="
              flex
              w-full
              items-center
              gap-2
              px-4
              py-3
              text-sm
              text-slate-600
              hover:bg-slate-50
            "
          >
            <Pencil size={14} />
            Edit
          </button>

          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="
              flex
              w-full
              items-center
              gap-2
              px-4
              py-3
              text-sm
              text-red-600
              hover:bg-red-50
            "
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────────────────────────── */

export default function TodoPage() {
  const [todos, setTodos] = useState(INITIAL_TODOS);

  const [search, setSearch] = useState("");

  const [filterStatus, setFilterStatus] = useState("All");

  const [filterType, setFilterType] = useState("All");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedDate, setSelectedDate] = useState({
    day: 25,
    month: 4,
    year: 2026,
  });

  const [activeView, setActiveView] = useState("day");

  const filtered = useMemo(() => {
    return todos.filter((todo) => {
      const matchSearch =
        todo.description.toLowerCase().includes(search.toLowerCase()) ||
        todo.type.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        filterStatus === "All" || todo.status === filterStatus;

      const matchType = filterType === "All" || todo.type === filterType;

      return matchSearch && matchStatus && matchType;
    });
  }, [todos, search, filterStatus, filterType]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));

  const paginated = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const stats = useMemo(
    () => ({
      total: todos.length,

      completed: todos.filter((t) => t.status === "Completed").length,

      inProgress: todos.filter((t) => t.status === "In Progress").length,

      pending: todos.filter((t) => t.status === "Pending").length,
    }),
    [todos],
  );

  const uniqueTypes = ["All", ...new Set(todos.map((t) => t.type))];

  const startRow =
    filtered.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;

  const endRow = Math.min(currentPage * rowsPerPage, filtered.length);

  return (
    <div className="space-y-6">
      {/* HEADER */}
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
          className="
            flex
            h-11
            items-center
            gap-2
            rounded-xl
            bg-blue-600
            px-5
            text-sm
            font-semibold
            text-white
            transition-all
            hover:bg-blue-700
          "
        >
          <Plus size={16} />
          Add Task
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "TOTAL TASKS",
            value: stats.total,
            sub: "All assigned tasks",
            color: "blue",
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
            border: "border-l-blue-500",
            Icon: BriefcaseBusiness,
          },

          {
            label: "COMPLETED",
            value: stats.completed,
            sub: "Completed tasks",
            color: "emerald",
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
            border: "border-l-emerald-500",
            Icon: CircleCheckBig,
          },

          {
            label: "IN PROGRESS",
            value: stats.inProgress,
            sub: "Tasks in progress",
            color: "blue",
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
            border: "border-l-blue-400",
            Icon: Clock3,
          },

          {
            label: "PENDING",
            value: stats.pending,
            sub: "Tasks pending",
            color: "amber",
            iconBg: "bg-amber-50",
            iconColor: "text-amber-600",
            border: "border-l-amber-500",
            Icon: TriangleAlert,
          },
        ].map(({ label, value, sub, iconBg, iconColor, border, Icon }) => (
          <div
            key={label}
            className={`
          relative
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          border-l-[3px]
          ${border}
          bg-white
          px-5
          py-5
          shadow-sm
          transition-all
          hover:border-slate-300
        `}
          >
            {/* TOP */}
            <div className="flex items-start justify-between">
              {/* TEXT */}
              <div>
                <p
                  className="
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-slate-400
              "
                >
                  {label}
                </p>

                <h2
                  className="
                mt-3
                text-[34px]
                font-bold
                leading-none
                tracking-tight
                text-slate-900
              "
                >
                  {value}
                </h2>
              </div>

              {/* ICON */}
              <div
                className={`
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              ${iconBg}
            `}
              >
                <Icon size={18} className={iconColor} />
              </div>
            </div>

            {/* BOTTOM TEXT */}
            <p
              className="
            mt-4
            text-xs
            font-medium
            text-slate-500
          "
            >
              {sub}
            </p>
          </div>
        ))}
      </div>

      {/* TABLE CARD */}
      <div
        className="
          overflow-hidden
          rounded-[24px]
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >
        {/* TOOLBAR */}
        <div
          className="
            flex
            flex-col
            gap-3
            border-b
            border-slate-200
            px-5
            py-4
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* LEFT */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={activeView}
              onChange={(e) => setActiveView(e.target.value)}
              className="
                h-10
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                text-sm
                font-medium
                text-slate-700
                outline-none
                focus:border-blue-500
              "
            >
              <option value="day">Today</option>

              <option value="week">This Week</option>

              <option value="month">This Month</option>
            </select>

            <CalendarPicker
              selectedDate={selectedDate}
              onSelect={setSelectedDate}
            />

            {/* STATUS */}
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="
                  h-10
                  appearance-none
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  pl-9
                  pr-8
                  text-sm
                  font-medium
                  text-slate-700
                  outline-none
                  focus:border-blue-500
                "
              >
                {["All", "Pending", "In Progress", "Completed"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>

              <Filter
                size={13}
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />
            </div>

            {/* TYPE */}
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="
                  h-10
                  appearance-none
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  pl-9
                  pr-8
                  text-sm
                  font-medium
                  text-slate-700
                  outline-none
                  focus:border-blue-500
                "
              >
                {uniqueTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>

              <SlidersHorizontal
                size={13}
                className="
                  pointer-events-none
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-wrap items-center gap-2">
            {/* SEARCH */}
            <div
              className="
                flex
                h-10
                w-56
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                focus-within:border-blue-500
              "
            >
              <Search size={14} className="text-slate-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
                className="
                  w-full
                  bg-transparent
                  text-sm
                  text-slate-700
                  outline-none
                  placeholder:text-slate-400
                "
              />
            </div>

            {/* SHOW */}
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Show</span>

              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="
                  h-10
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-3
                  text-sm
                  text-slate-700
                  outline-none
                "
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
                {[
                  "Type",
                  "Employee",
                  "Description",
                  "Due Date",
                  "Reminder",
                  "Status",
                  "Action",
                ].map((head) => (
                  <th
                    key={head}
                    className="
                      whitespace-nowrap
                      px-5
                      py-4
                      text-left
                      text-[11px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-slate-400
                    "
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginated.map((todo) => (
                <tr
                  key={todo.id}
                  className="
                      border-b
                      border-slate-100
                      transition-all
                      hover:bg-blue-50/40
                    "
                >
                  <td className="whitespace-nowrap px-5 py-4">
                    <TypeBadge type={todo.type} />
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            bg-slate-100
                            text-xs
                            font-bold
                            text-slate-600
                          "
                      >
                        {todo.type.charAt(0)}
                      </div>

                      <p className="text-sm font-medium text-slate-700">
                        Employee
                      </p>
                    </div>
                  </td>

                  <td className="min-w-[280px] px-5 py-4">
                    <p className="line-clamp-1 text-sm text-slate-600">
                      {todo.description}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar size={14} className="text-slate-400" />

                      {todo.date}
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    {todo.notification ? (
                      <span
                        className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            bg-blue-50
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            text-blue-700
                          "
                      >
                        <BellRing size={11} />
                        On
                      </span>
                    ) : (
                      <span
                        className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            bg-slate-100
                            px-3
                            py-1
                            text-xs
                            font-semibold
                            text-slate-500
                          "
                      >
                        <BellOff size={11} />
                        Off
                      </span>
                    )}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <StatusBadge status={todo.status} />
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <ActionMenu
                      onView={() => {}}
                      onEdit={() => {}}
                      onDelete={() => {}}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div
          className="
            flex
            flex-col
            gap-3
            border-t
            border-slate-200
            px-5
            py-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">{startRow}</span> to{" "}
            <span className="font-semibold text-slate-700">{endRow}</span> of{" "}
            <span className="font-semibold text-slate-700">
              {filtered.length}
            </span>{" "}
            entries
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-500
                hover:bg-slate-50
                disabled:opacity-40
              "
            >
              <ChevronLeft size={15} />
            </button>

            {Array.from(
              {
                length: totalPages,
              },
              (_, i) => i + 1,
            ).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  text-sm
                  font-semibold

                  ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }
                `}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-500
                hover:bg-slate-50
                disabled:opacity-40
              "
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
