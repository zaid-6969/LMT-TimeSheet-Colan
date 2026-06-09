import { useState, useMemo, useRef, useEffect } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  BriefcaseBusiness,
  BadgeCheck,
  CalendarDays,
  UserRound,
  Search,
  X,
  Eye,
  Loader,
  ClockIcon,
  MoreVertical,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

/* ───────────────────────────────────────────── */

const taskEvents = {
  "2026-06-05": [
    {
      project: "ERP Dashboard",
      employee: "John Doe",
      task: "Create Timesheet Calendar UI",
      time: "10:00 AM – 1:00 PM",
      status: "In Progress",
    },

    {
      project: "HRMS Portal",
      employee: "Sophia",
      task: "Fix Authentication Bugs",
      time: "3:00 PM – 5:00 PM",
      status: "Completed",
    },
  ],

  "2026-06-21": [
    {
      project: "Inventory System",
      employee: "Emma",
      task: "Integrate API Endpoints",
      time: "9:30 AM – 12:30 PM",
      status: "Completed",
    },
    {
      project: "ERP Dashboard",
      employee: "John Doe",
      task: "Create Timesheet Calendar UI",
      time: "10:00 AM – 1:00 PM",
      status: "In Progress",
    },

    {
      project: "HRMS Portal",
      employee: "Sophia",
      task: "Fix Authentication Bugs",
      time: "3:00 PM – 5:00 PM",
      status: "Completed",
    },
    {
      project: "ERP System",
      employee: "William",
      task: "Create Calendar Components",
      time: "2:00 PM – 6:00 PM",
      status: "In Progress",
    },

    {
      project: "Finance App",
      employee: "Daniel",
      task: "Prepare Reports Dashboard",
      time: "11:00 AM – 2:00 PM",
      status: "Pending",
    },
  ],
};

/* ───────────────────────────────────────────── */

const monthNames = [
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

const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* ───────────────────────────────────────────── */

function StatusBadge({ status }) {
  const styles = {
    Completed: {
      cls: "bg-emerald-50 text-emerald-700",
      Icon: BadgeCheck,
    },

    "In Progress": {
      cls: "bg-blue-50 text-blue-700",
      Icon: Loader,
    },

    Pending: {
      cls: "bg-amber-50 text-amber-700",
      Icon: ClockIcon,
    },
  };

  const { cls, Icon } = styles[status] || styles.Pending;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        px-3
        py-1
        text-[11px]
        font-semibold
        ${cls}
      `}
    >
      <Icon size={11} />
      {status}
    </span>
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

export default function CalendarView() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [selectedDate, setSelectedDate] = useState("2026-05-21");

  const [search, setSearch] = useState("");

  /* ───────────────────────────────────────── */

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const calDays = [];

  for (let i = 0; i < firstDay; i++) {
    calDays.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    calDays.push(d);
  }

  /* ───────────────────────────────────────── */

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);

      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);

      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const goToday = () => {
    setCurrentMonth(today.getMonth());

    setCurrentYear(today.getFullYear());

    const d = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(today.getDate()).padStart(2, "0")}`;

    setSelectedDate(d);
  };

  const selectDate = (day) => {
    const m = String(currentMonth + 1).padStart(2, "0");

    const d = String(day).padStart(2, "0");

    setSelectedDate(`${currentYear}-${m}-${d}`);
  };

  /* ───────────────────────────────────────── */

  const todayStr = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  /* ───────────────────────────────────────── */

  const rawTasks = taskEvents[selectedDate] || [];

  const selectedTasks = useMemo(() => {
    if (!search.trim()) return rawTasks;

    return rawTasks.filter(
      (t) =>
        t.task.toLowerCase().includes(search.toLowerCase()) ||
        t.project.toLowerCase().includes(search.toLowerCase()) ||
        t.employee.toLowerCase().includes(search.toLowerCase()),
    );
  }, [rawTasks, search]);

  /* ───────────────────────────────────────── */

  const [sy, sm, sd] = selectedDate.split("-");

  const formattedDate = `${parseInt(sd)} ${monthNames[parseInt(sm) - 1]} ${sy}`;

  /* ───────────────────────────────────────── */

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Task Scheduling
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Calendar View
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage employee schedules, meetings and project tasks.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={prevMonth}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-600
              transition-all
              hover:bg-slate-50
            "
          >
            <ChevronLeft size={16} />
          </button>

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
              px-5
              text-sm
              font-semibold
              text-slate-700
            "
          >
            <CalendarDays size={15} className="text-blue-600" />
            {monthNames[currentMonth]} {currentYear}
          </div>

          <button
            onClick={nextMonth}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-600
              transition-all
              hover:bg-slate-50
            "
          >
            <ChevronRight size={16} />
          </button>

          <button
            onClick={goToday}
            className="
              flex
              h-10
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
            Today
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
        {/* CALENDAR */}
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
          {/* DAYS */}
          <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
            {shortDays.map((day, i) => (
              <div
                key={day}
                className={`
                  py-4
                  text-center
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.14em]

                  ${i === 0 || i === 6 ? "text-red-500" : "text-slate-400"}
                `}
              >
                {day}
              </div>
            ))}
          </div>

          {/* GRID */}
          <div className="grid grid-cols-7">
            {calDays.map((day, idx) => {
              if (!day) {
                return (
                  <div
                    key={idx}
                    className="
                      min-h-[130px]
                      border
                      border-slate-100
                      bg-slate-50/40
                    "
                  />
                );
              }

              const m = String(currentMonth + 1).padStart(2, "0");

              const dStr = String(day).padStart(2, "0");

              const full = `${currentYear}-${m}-${dStr}`;

              const tasks = taskEvents[full] || [];

              const isToday = full === todayStr;

              const isSelected = full === selectedDate;

              return (
                <button
                  key={idx}
                  onClick={() => selectDate(day)}
                  className={`
                    min-h-[130px]
                    border
                    border-slate-100
                    p-3
                    text-left
                    transition-all
                    hover:bg-blue-50/30

                    ${isSelected ? "bg-blue-50/60" : ""}
                  `}
                >
                  {/* DATE */}
                  <div
                    className={`
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      text-sm
                      font-bold

                      ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : isToday
                            ? "bg-blue-50 text-blue-600"
                            : "text-slate-700"
                      }
                    `}
                  >
                    {day}
                  </div>

                  {/* TASKS */}
                  <div className="mt-3 flex flex-col gap-1.5">
                    {tasks.slice(0, 2).map((t, i) => (
                      <div
                        key={i}
                        className={`
                            truncate
                            rounded-lg
                            border-l-[3px]
                            px-2
                            py-1
                            text-[10px]
                            font-semibold

                            ${
                              t.status === "Completed"
                                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                : t.status === "In Progress"
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-amber-500 bg-amber-50 text-amber-700"
                            }
                          `}
                      >
                        {t.project}
                      </div>
                    ))}

                    {tasks.length > 2 && (
                      <div className="px-1 text-[10px] font-semibold text-slate-400">
                        +{tasks.length - 2} more
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL */}
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
          {/* HEADER */}
          <div className="border-b border-slate-200 bg-slate-50/60 p-5">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-50
                "
              >
                <CalendarDays size={18} className="text-blue-600" />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Selected Date
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {formattedDate}
                </h2>
              </div>
            </div>

            {/* STATS */}
            {rawTasks.length > 0 && (
              <div
                className="
                  mt-4
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-blue-50
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-blue-700
                "
              >
                <BadgeCheck size={12} />
                {rawTasks.length} Tasks Scheduled
              </div>
            )}
          </div>

          {/* SEARCH */}
          {rawTasks.length > 0 && (
            <div className=" border-b border-slate-200 p-4">
              <div
                className="
                  relative
                  flex
                  h-11
                  items-center
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-4
                  focus-within:border-blue-500
                "
              >
                <Search size={15} className="text-slate-400" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tasks..."
                  className="
                    w-full
                    bg-transparent
                    px-3
                    text-sm
                    text-slate-700
                    outline-none
                    placeholder:text-slate-400
                  "
                />

                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="text-slate-400"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TASK LIST */}
          <div className="max-h-[500px]  overflow-y-auto p-4">
            {selectedTasks.length > 0 ? (
              <div className="space-y-3">
                {selectedTasks.map((task, i) => (
                  <div
                    key={i}
                    className={`
                        overflow-hidden
                        rounded-2xl
                        border
                        border-slate-200
                        border-l-[3px]
                        bg-white
                        shadow-sm

                        ${
                          task.status === "Completed"
                            ? "border-l-emerald-500"
                            : task.status === "In Progress"
                              ? "border-l-blue-500"
                              : "border-l-amber-500"
                        }
                      `}
                  >
                    {/* TOP */}
                    <div className="flex items-start justify-between gap-3 p-4">
                      <div className="flex gap-3">
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

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                            {task.project}
                          </p>

                          <h3 className="mt-1 text-sm font-semibold leading-5 text-slate-800">
                            {task.task}
                          </h3>
                        </div>
                      </div>

                      <ActionMenu />
                    </div>

                    {/* BOTTOM */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/40 px-4 py-3">
                      {/* META */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <UserRound size={12} />

                          {task.employee}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Clock3 size={12} />

                          {task.time}
                        </div>
                      </div>

                      {/* STATUS */}
                      <StatusBadge status={task.status} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div
                  className="
                    mb-5
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-3xl
                    bg-slate-100
                  "
                >
                  <CalendarDays size={32} className="text-slate-400" />
                </div>

                <h3 className="text-lg font-bold text-slate-700">
                  {search ? "No matching tasks" : "No Tasks Scheduled"}
                </h3>

                <p className="mt-2 max-w-[260px] text-sm leading-6 text-slate-500">
                  {search
                    ? `No tasks match "${search}".`
                    : "Select a highlighted date to view scheduled employee tasks."}
                </p>

                {!search && (
                  <button
                    className="
                      mt-6
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
                    <Plus size={15} />
                    Add Schedule
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
