import { useState, useMemo, useRef, useEffect } from "react";

import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock3,
  Bell,
  CircleCheckBig,
  TriangleAlert,
  ListTodo,
  Search,
  X,
  Plus,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  BellOff,
  BellRing,
  Loader,
} from "lucide-react";

/* ───────────────────────────────────────────── */

const todoEvents = {
  "2026-06-05": [
    {
      title: "Client Meeting",
      description: "Discuss ERP dashboard improvements with client.",
      time: "10:00 AM",
      status: "Pending",
      notification: true,
    },

    {
      title: "UI Development",
      description: "Complete timesheet dashboard responsive design.",
      time: "2:00 PM",
      status: "Completed",
      notification: false,
    },
  ],

  "2026-06-12": [
    {
      title: "Bug Fixing",
      description: "Fix sidebar collapse animation issues.",
      time: "11:30 AM",
      status: "In Progress",
      notification: true,
    },
  ],

  "2026-06-21": [
    {
      title: "Testing",
      description: "Test To-Do calendar responsiveness.",
      time: "9:00 AM",
      status: "Pending",
      notification: true,
    },

    {
      title: "Deployment",
      description: "Deploy latest employee dashboard updates.",
      time: "4:00 PM",
      status: "Completed",
      notification: false,
    },
  ],
};

/* ───────────────────────────────────────────── */

const months = [
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

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* ───────────────────────────────────────────── */

function StatusBadge({ status }) {
  const styles = {
    Completed: {
      cls: "bg-emerald-50 text-emerald-700",
      Icon: CircleCheckBig,
    },

    "In Progress": {
      cls: "bg-blue-50 text-blue-700",
      Icon: Loader,
    },

    Pending: {
      cls: "bg-amber-50 text-amber-700",
      Icon: TriangleAlert,
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

export default function CalendarToDo() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [selectedDate, setSelectedDate] = useState("2026-05-21");

  const [search, setSearch] = useState("");

  /* ───────────────────────────────────────── */

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  /* ───────────────────────────────────────── */

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);

      setCurrentYear((p) => p - 1);
    } else {
      setCurrentMonth((p) => p - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);

      setCurrentYear((p) => p + 1);
    } else {
      setCurrentMonth((p) => p + 1);
    }
  };

  /* ───────────────────────────────────────── */

  const handleSelectDate = (day) => {
    const formattedMonth = String(currentMonth + 1).padStart(2, "0");

    const formattedDay = String(day).padStart(2, "0");

    setSelectedDate(`${currentYear}-${formattedMonth}-${formattedDay}`);
  };

  /* ───────────────────────────────────────── */

  const selectedTodos = todoEvents[selectedDate] || [];

  const filteredTodos = useMemo(() => {
    if (!search.trim()) return selectedTodos;

    return selectedTodos.filter(
      (todo) =>
        todo.title.toLowerCase().includes(search.toLowerCase()) ||
        todo.description.toLowerCase().includes(search.toLowerCase()),
    );
  }, [selectedTodos, search]);

  /* ───────────────────────────────────────── */

  const todayString = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  /* ───────────────────────────────────────── */

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Employee Planner
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            To-Do Calendar
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage employee reminders, schedules and planning visually.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
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
            {months[currentMonth]} {currentYear}
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
            <Plus size={15} />
            Add Event
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_380px]">
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
            {days.map((day, i) => (
              <div
                key={day}
                className={`
                  py-4
                  text-center
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]

                  ${i === 0 || i === 6 ? "text-red-500" : "text-slate-400"}
                `}
              >
                {day}
              </div>
            ))}
          </div>

          {/* BODY */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => {
              if (!day) {
                return (
                  <div
                    key={index}
                    className="
                        min-h-[130px]
                        border-b
                        border-r
                        border-slate-100
                        bg-slate-50/40
                      "
                  />
                );
              }

              const formattedMonth = String(currentMonth + 1).padStart(2, "0");

              const formattedDay = String(day).padStart(2, "0");

              const fullDate = `${currentYear}-${formattedMonth}-${formattedDay}`;

              const hasEvents = todoEvents[fullDate];

              const isSelected = selectedDate === fullDate;

              const isToday = todayString === fullDate;

              return (
                <button
                  key={index}
                  onClick={() => handleSelectDate(day)}
                  className={`
                      relative
                      min-h-[130px]
                      border-b
                      border-r
                      border-slate-100
                      p-3
                      text-left
                      transition-all

                      ${isSelected ? "bg-blue-50/60" : "hover:bg-blue-50/30"}
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

                  {/* EVENTS */}
                  {hasEvents && (
                    <div className="mt-3 space-y-1.5">
                      {hasEvents.slice(0, 2).map((event, i) => (
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
                                    event.status === "Completed"
                                      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                      : event.status === "In Progress"
                                        ? "border-blue-500 bg-blue-50 text-blue-700"
                                        : "border-amber-500 bg-amber-50 text-amber-700"
                                  }
                                `}
                        >
                          {event.title}
                        </div>
                      ))}

                      {hasEvents.length > 2 && (
                        <div className="px-1 text-[10px] font-semibold text-slate-400">
                          +{hasEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  )}
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
                  {selectedDate}
                </h2>
              </div>
            </div>

            {selectedTodos.length > 0 && (
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
                <ListTodo size={12} />
                {selectedTodos.length} Tasks Scheduled
              </div>
            )}
          </div>

          {/* SEARCH */}
          {selectedTodos.length > 0 && (
            <div className="border-b border-slate-200 p-4">
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

          {/* TASKS */}
          <div className="max-h-[720px] overflow-y-auto p-4">
            {filteredTodos.length > 0 ? (
              <div className="space-y-3">
                {filteredTodos.map((todo, index) => (
                  <div
                    key={index}
                    className={`
                        overflow-hidden
                        rounded-2xl
                        border
                        border-slate-200
                        border-l-[3px]
                        bg-white
                        shadow-sm

                        ${
                          todo.status === "Completed"
                            ? "border-l-emerald-500"
                            : todo.status === "In Progress"
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
                          <ListTodo size={17} className="text-blue-600" />
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold leading-5 text-slate-800">
                            {todo.title}
                          </h3>

                          <p className="mt-1 text-sm leading-6 text-slate-500">
                            {todo.description}
                          </p>
                        </div>
                      </div>

                      <ActionMenu />
                    </div>

                    {/* FOOTER */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/40 px-4 py-3">
                      {/* META */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Clock3 size={12} />

                          {todo.time}
                        </div>

                        <div className="flex items-center gap-1.5">
                          {todo.notification ? (
                            <>
                              <BellRing size={12} />
                              Enabled
                            </>
                          ) : (
                            <>
                              <BellOff size={12} />
                              Disabled
                            </>
                          )}
                        </div>
                      </div>

                      {/* STATUS */}
                      <StatusBadge status={todo.status} />
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
                    : "Select a highlighted date to view scheduled reminders."}
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
                    Add Reminder
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
