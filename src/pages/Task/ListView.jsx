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
  Filter,
  Search,
  ChevronDown,
  RotateCcw,
} from "lucide-react";

/* ───────────────────────────────────────────── */

const taskData = {
  day: [
    {
      project: "ERP System",
      employee: "John Doe",
      avatar: "J",
      avatarColor: "#2563EB",
      task: "Develop Employee Dashboard",
      priority: "High",
      status: "Completed",
      week: "Week 1",
      date: "01–07 May 2026",
    },

    {
      project: "Inventory System",
      employee: "Sophia",
      avatar: "S",
      avatarColor: "#06B6D4",
      task: "Stock Management Integration",
      priority: "Medium",
      status: "Completed",
      week: "Week 1",
      date: "01–07 May 2026",
    },

    {
      project: "Analytics Portal",
      employee: "Daniel",
      avatar: "D",
      avatarColor: "#8B5CF6",
      task: "Create Charts and Reports",
      priority: "Medium",
      status: "In Progress",
      week: "Week 2",
      date: "08–14 May 2026",
    },

    {
      project: "Client CRM",
      employee: "Emma",
      avatar: "E",
      avatarColor: "#F97316",
      task: "Lead Management Module",
      priority: "Low",
      status: "Pending",
      week: "Week 2",
      date: "08–14 May 2026",
    },

    {
      project: "Finance App",
      employee: "William",
      avatar: "W",
      avatarColor: "#E11D48",
      task: "Payment Gateway Integration",
      priority: "High",
      status: "In Review",
      week: "Week 3",
      date: "15–21 May 2026",
    },
  ],

  week: [],
  month: [],
};

/* ───────────────────────────────────────────── */

const MONTHS = [
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

const SHORT_MONTHS = [
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

/* ───────────────────────────────────────────── */

function PriorityBadge({ p }) {
  const styles = {
    High: "bg-red-50 text-red-600",

    Medium: "bg-amber-50 text-amber-600",

    Low: "bg-emerald-50 text-emerald-600",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${styles[p]}
      `}
    >
      {p}
    </span>
  );
}

function StatusBadge({ s }) {
  const map = {
    Completed: {
      cls: "bg-emerald-50 text-emerald-700",
      Icon: BadgeCheck,
    },

    "In Progress": {
      cls: "bg-blue-50 text-blue-700",
      Icon: Loader,
    },

    "In Review": {
      cls: "bg-purple-50 text-purple-700",
      Icon: Eye,
    },

    Pending: {
      cls: "bg-amber-50 text-amber-700",
      Icon: ClockIcon,
    },
  };

  const { cls, Icon } = map[s] || map.Pending;

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
        ${cls}
      `}
    >
      <Icon size={11} />

      {s}
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
        onClick={() => setOpen((o) => !o)}
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
          hover:border-blue-400
        "
      >
        <CalendarDays size={15} className="text-blue-600" />
        {SHORT_MONTHS[selectedDate.month]} {selectedDate.day},{" "}
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
              ✕
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

function ActionMenu() {
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
        onClick={() => setOpen((o) => !o)}
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

export default function TimesheetDashboard() {
  const [activeTab, setActiveTab] = useState("day");

  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [search, setSearch] = useState("");

  const [selectedDate, setSelectedDate] = useState({
    day: 22,
    month: 4,
    year: 2026,
  });

  const currentData = useMemo(() => {
    return (taskData[activeTab] || []).filter((task) =>
      task.project.toLowerCase().includes(search.toLowerCase()),
    );
  }, [activeTab, search]);

  const totalPages = Math.max(1, Math.ceil(currentData.length / rowsPerPage));

  const paginatedData = currentData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const startRow =
    currentData.length === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;

  const endRow = Math.min(currentPage * rowsPerPage, currentData.length);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Employee Productivity
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Timesheet Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Track employee work logs, productivity and task progress.
          </p>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "TOTAL HOURS",
            value: "142h",
            sub: "This month working hours",
            border: "border-l-blue-500",
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
            Icon: Clock3,
          },

          {
            title: "COMPLETED TASKS",
            value: "32",
            sub: "Tasks completed successfully",
            border: "border-l-emerald-500",
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
            Icon: BadgeCheck,
          },

          {
            title: "IN PROGRESS",
            value: "08",
            sub: "Tasks currently active",
            border: "border-l-amber-500",
            iconBg: "bg-amber-50",
            iconColor: "text-amber-600",
            Icon: Loader,
          },

          {
            title: "PRODUCTIVITY",
            value: "93%",
            sub: "Monthly performance score",
            border: "border-l-cyan-500",
            iconBg: "bg-cyan-50",
            iconColor: "text-cyan-600",
            Icon: BriefcaseBusiness,
          },
        ].map(({ title, value, sub, border, iconBg, iconColor, Icon }) => (
          <div
            key={title}
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
              `}
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

            <p className="mt-4 text-xs font-medium text-slate-500">{sub}</p>
          </div>
        ))}
      </div>

      {/* TABLE */}
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
              value={activeTab}
              onChange={(e) => {
                setActiveTab(e.target.value);

                setCurrentPage(1);
              }}
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

            <button
              onClick={() => setSearch("")}
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
                text-slate-600
                hover:bg-slate-50
              "
            >
              <RotateCcw size={14} />
              Reset
            </button>
          </div>

          {/* RIGHT */}
          <div className="flex flex-wrap items-center gap-2">
            {/* SEARCH */}
            <div
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
                focus-within:border-blue-500
              "
            >
              <Search size={14} className="text-slate-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search project..."
                className="
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
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));

                  setCurrentPage(1);
                }}
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

        {/* TABLE BODY */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            {/* HEADER */}
            <thead className="bg-slate-100/70">
              <tr className="border-b border-slate-200">
                {[
                  "Project",
                  "Employee",
                  "Task",
                  "Priority",
                  "Status",
                  "Date",
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

            {/* BODY */}
            <tbody>
              {paginatedData.map((task, i) => (
                <tr
                  key={i}
                  className="
                      border-b
                      border-slate-100
                      transition-all
                      hover:bg-blue-50/40
                    "
                >
                  {/* PROJECT */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-50
                          "
                      >
                        <BriefcaseBusiness
                          size={17}
                          className="text-blue-600"
                        />
                      </div>

                      <p className="text-sm font-semibold text-slate-700">
                        {task.project}
                      </p>
                    </div>
                  </td>

                  {/* EMPLOYEE */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-full
                            text-xs
                            font-bold
                          "
                        style={{
                          background: task.avatarColor + "22",

                          color: task.avatarColor,
                        }}
                      >
                        {task.avatar}
                      </div>

                      <span className="text-sm text-slate-600">
                        {task.employee}
                      </span>
                    </div>
                  </td>

                  {/* TASK */}
                  <td className="min-w-[260px] px-5 py-4">
                    <p className="text-sm text-slate-600">{task.task}</p>
                  </td>

                  {/* PRIORITY */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <PriorityBadge p={task.priority} />
                  </td>

                  {/* STATUS */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <StatusBadge s={task.status} />
                  </td>

                  {/* DATE */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        {task.week}
                      </p>

                      <p className="text-xs text-slate-400">{task.date}</p>
                    </div>
                  </td>

                  {/* ACTION */}
                  <td className="whitespace-nowrap px-5 py-4">
                    <ActionMenu />
                  </td>
                </tr>
              ))}

              {/* EMPTY */}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-16 text-center">
                    <p className="text-sm text-slate-400">No records found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div
          className="
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
            border-t
            border-slate-200
            bg-slate-50/50
            px-5
            py-4
          "
        >
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">{startRow}</span> to{" "}
            <span className="font-semibold text-slate-700">{endRow}</span> of{" "}
            <span className="font-semibold text-slate-700">
              {currentData.length}
            </span>{" "}
            records
          </p>

          {/* PAGINATION */}
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
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
                text-slate-600
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
            ).map((pg) => (
              <button
                key={pg}
                onClick={() => setCurrentPage(pg)}
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
                    currentPage === pg
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }
                `}
              >
                {pg}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
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
                text-slate-600
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
