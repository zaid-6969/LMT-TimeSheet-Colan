import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  BriefcaseBusiness,
  BadgeCheck,
  CalendarDays,
  UserRound,
  X,
  Search,
} from "lucide-react";

// ─── DATA ─────────────────────────────────────
const taskEvents = {
  "2026-05-05": [
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

  "2026-05-21": [
    {
      project: "Inventory System",
      employee: "Emma",
      task: "Integrate API Endpoints",
      time: "9:30 AM – 12:30 PM",
      status: "Completed",
    },
    {
      project: "ERP System",
      employee: "William",
      task: "Create Calendar Components",
      time: "2:00 PM – 6:00 PM",
      status: "In Progress",
    },
  ],
};

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

const dow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function statusClass(s) {
  if (s === "Completed")
    return "bg-green-100 text-green-600";

  if (s === "In Progress")
    return "bg-blue-100 text-blue-600";

  return "bg-orange-100 text-orange-500";
}

function cardBorder(s) {
  if (s === "Completed") return "border-l-green-500";

  if (s === "In Progress") return "border-l-blue-500";

  return "border-l-orange-500";
}

// ─── COMPONENT ─────────────────────────────────────
export default function CalendarView() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    today.getMonth()
  );

  const [currentYear, setCurrentYear] = useState(
    today.getFullYear()
  );

  const [selectedDate, setSelectedDate] =
    useState("2026-05-21");

  const [search, setSearch] = useState("");

  // Calendar
  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  const firstDay = new Date(
    currentYear,
    currentMonth,
    1
  ).getDay();

  const calDays = [];

  for (let i = 0; i < firstDay; i++) {
    calDays.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    calDays.push(d);
  }

  // Month Navigation
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

    const d = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(
      today.getDate()
    ).padStart(2, "0")}`;

    setSelectedDate(d);
  };

  const selectDate = (day) => {
    const m = String(currentMonth + 1).padStart(2, "0");

    const d = String(day).padStart(2, "0");

    setSelectedDate(`${currentYear}-${m}-${d}`);
  };

  const todayStr = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(
    today.getDate()
  ).padStart(2, "0")}`;

  // Selected Tasks
  const rawTasks = taskEvents[selectedDate] || [];

  const selectedTasks = search.trim()
    ? rawTasks.filter(
        (t) =>
          t.task
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          t.project
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          t.employee
            .toLowerCase()
            .includes(search.toLowerCase())
      )
    : rawTasks;

  // Date Format
  const [sy, sm, sd] = selectedDate.split("-");

  const formattedDate = `${parseInt(sd)} ${
    monthNames[parseInt(sm) - 1]
  } ${sy}`;

  return (
    <div className="min-h-screen max-md:p-4 font-sans">
      {/* HEADER */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#1a6aad30] bg-[#1a6aad10] px-3 py-1">
            <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00c8e0]" />

            <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#1a6aad]">
              Task Calendar
            </span>
          </div>

          <h1 className="text-[28px] font-extrabold text-[#0d1f33]">
            Calendar View
          </h1>

          <p className="mt-1 text-sm text-[#7a96b0]">
            Track employee tasks and project schedules
            at a glance.
          </p>
        </div>

        {/* NAV */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1a6aad30] bg-white text-[#1a6aad] transition hover:bg-[#1a6aad10]"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex h-10 items-center gap-2 rounded-xl border border-[#1a6aad30] bg-white px-5 text-sm font-bold text-[#0d1f33] shadow-sm">
            <CalendarDays
              size={15}
              className="text-[#1a6aad]"
            />

            {monthNames[currentMonth]} {currentYear}
          </div>

          <button
            onClick={nextMonth}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#1a6aad30] bg-white text-[#1a6aad] transition hover:bg-[#1a6aad10]"
          >
            <ChevronRight size={18} />
          </button>

          <button
            onClick={goToday}
            className="h-10 rounded-xl bg-gradient-to-r from-[#1a6aad] to-[#3aa0f0] px-5 text-sm font-bold text-white shadow-md transition hover:-translate-y-[1px]"
          >
            Today
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="grid grid-cols-[1fr_360px] gap-5 max-[1080px]:grid-cols-1">
        {/* CALENDAR */}
        <div className="overflow-hidden rounded-3xl border border-[#1a6aad20] bg-white shadow-sm">
          {/* DAYS */}
          <div className="grid grid-cols-7 border-b border-[#1a6aad10] bg-[#f7fbff]">
            {dow.map((d, i) => (
              <div
                key={d}
                className={`py-4 text-center text-[11px] font-extrabold uppercase tracking-[0.08em]
                ${
                  i === 0 || i === 6
                    ? "text-[#c0365a]"
                    : "text-[#7a96b0]"
                }`}
              >
                {d}
              </div>
            ))}
          </div>

          {/* CALENDAR GRID */}
          <div className="grid grid-cols-7">
            {calDays.map((day, idx) => {
              if (!day) {
                return (
                  <div
                    key={idx}
                    className="min-h-[100px] border border-[#1a6aad10] bg-[#f7fbff]"
                  />
                );
              }

              const m = String(
                currentMonth + 1
              ).padStart(2, "0");

              const dStr = String(day).padStart(2, "0");

              const full = `${currentYear}-${m}-${dStr}`;

              const tasks = taskEvents[full] || [];

              const isToday = full === todayStr;

              const isSelected =
                full === selectedDate;

              return (
                <button
                  key={idx}
                  onClick={() => selectDate(day)}
                  className={`min-h-[100px] border border-[#1a6aad10] p-2 text-left transition hover:bg-[#1a6aad08]
                  ${
                    isSelected
                      ? "bg-[#1a6aad10]"
                      : ""
                  }
                  `}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold
                    ${
                      isSelected
                        ? "bg-gradient-to-r from-[#1a6aad] to-[#3aa0f0] text-white"
                        : isToday
                        ? "bg-[#1a6aad15] text-[#1a6aad]"
                        : "text-[#344a60]"
                    }`}
                  >
                    {day}
                  </div>

                  <div className="mt-2 flex flex-col gap-1">
                    {tasks
                      .slice(0, 2)
                      .map((t, i) => (
                        <div
                          key={i}
                          className={`truncate rounded-md border-l-2 px-2 py-[2px] text-[9px] font-bold
                          ${
                            t.status === "Completed"
                              ? "border-green-500 bg-green-100 text-green-600"
                              : t.status ===
                                "In Progress"
                              ? "border-blue-500 bg-blue-100 text-blue-600"
                              : "border-orange-500 bg-orange-100 text-orange-500"
                          }`}
                        >
                          {t.project}
                        </div>
                      ))}

                    {tasks.length > 2 && (
                      <div className="px-1 text-[9px] font-bold text-[#a0b4c8]">
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
        <div className="sticky top-5 overflow-hidden rounded-3xl border border-[#1a6aad20] bg-white shadow-sm">
          {/* HEADER */}
          <div className="border-b border-[#1a6aad10] bg-[#f7fbff] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a6aad15]">
                <CalendarDays
                  size={18}
                  className="text-[#1a6aad]"
                />
              </div>

              <div>
                <p className="text-[11px] font-semibold text-[#7a96b0]">
                  Selected Date
                </p>

                <h2 className="text-lg font-extrabold text-[#0d1f33]">
                  {formattedDate}
                </h2>
              </div>
            </div>

            {rawTasks.length > 0 && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#1a6aad15] px-3 py-1 text-[11px] font-bold text-[#1a6aad]">
                <BadgeCheck size={12} />
                {rawTasks.length} Tasks Scheduled
              </div>
            )}
          </div>

          {/* SEARCH */}
          {rawTasks.length > 0 && (
            <div className="relative border-b border-[#1a6aad10] p-4">
              <Search
                size={14}
                className="absolute left-7 top-1/2 -translate-y-1/2 text-[#a0b4c8]"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search tasks..."
                className="h-10 w-full rounded-xl border border-[#1a6aad20] bg-[#f4f8fd] pl-10 pr-10 text-sm outline-none transition focus:border-[#1a6aad] focus:bg-white"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-7 top-1/2 -translate-y-1/2 text-[#a0b4c8]"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          )}

          {/* TASK LIST */}
          <div className="flex max-h-[600px] flex-col gap-3 overflow-y-auto p-4">
            {selectedTasks.length > 0 ? (
              selectedTasks.map((task, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border border-[#1a6aad15] border-l-4 bg-white p-4 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md ${cardBorder(
                    task.status
                  )}`}
                >
                  {/* TOP */}
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1a6aad10]">
                        <BriefcaseBusiness
                          size={15}
                          className="text-[#1a6aad]"
                        />
                      </div>

                      <div className="text-xs font-semibold text-[#7a96b0]">
                        {task.project}
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold ${statusClass(
                        task.status
                      )}`}
                    >
                      <BadgeCheck size={10} />
                      {task.status}
                    </span>
                  </div>

                  {/* TASK */}
                  <h3 className="mb-3 text-sm font-bold leading-5 text-[#0d1f33]">
                    {task.task}
                  </h3>

                  {/* META */}
                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#7a96b0]">
                    <div className="flex items-center gap-1">
                      <UserRound size={12} />
                      {task.employee}
                    </div>

                    <div className="flex items-center gap-1">
                      <Clock3 size={12} />
                      {task.time}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1a6aad10]">
                  <CalendarDays
                    size={28}
                    className="text-[#a0b4c8]"
                  />
                </div>

                <h3 className="text-lg font-bold text-[#344a60]">
                  {search
                    ? "No matching tasks"
                    : "No Tasks Scheduled"}
                </h3>

                <p className="mt-2 text-sm text-[#a0b4c8]">
                  {search
                    ? `No tasks match "${search}"`
                    : "Select a highlighted date to view tasks."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}