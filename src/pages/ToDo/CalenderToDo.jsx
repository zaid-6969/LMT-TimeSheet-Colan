import { useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock3,
  Bell,
  CircleCheckBig,
  TriangleAlert,
  ListTodo,
} from "lucide-react";

// ================= DUMMY TODO EVENTS =================

const todoEvents = {
  "2026-05-05": [
    {
      title: "Client Meeting",
      description:
        "Discuss ERP dashboard improvements with client.",
      time: "10:00 AM",
      status: "Pending",
      notification: true,
    },

    {
      title: "UI Development",
      description:
        "Complete timesheet dashboard responsive design.",
      time: "2:00 PM",
      status: "Completed",
      notification: false,
    },
  ],

  "2026-05-12": [
    {
      title: "Bug Fixing",
      description:
        "Fix sidebar collapse animation issues.",
      time: "11:30 AM",
      status: "In Progress",
      notification: true,
    },
  ],

  "2026-05-21": [
    {
      title: "Testing",
      description:
        "Test To-Do calendar responsiveness.",
      time: "9:00 AM",
      status: "Pending",
      notification: true,
    },

    {
      title: "Deployment",
      description:
        "Deploy latest employee dashboard updates.",
      time: "4:00 PM",
      status: "Completed",
      notification: false,
    },
  ],
};

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

export default function CalendarToDo() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] =
    useState(today.getMonth());

  const [currentYear, setCurrentYear] =
    useState(today.getFullYear());

  const [selectedDate, setSelectedDate] =
    useState("2026-05-21");

  // ================= CALENDAR =================

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

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // ================= MONTH NAVIGATION =================

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  // ================= SELECT DATE =================

  const handleSelectDate = (day) => {
    const formattedMonth = String(
      currentMonth + 1
    ).padStart(2, "0");

    const formattedDay = String(day).padStart(
      2,
      "0"
    );

    setSelectedDate(
      `${currentYear}-${formattedMonth}-${formattedDay}`
    );
  };

  const selectedTodos =
    todoEvents[selectedDate] || [];

  return (
    <div className="min-h-screen bg-[#f3f6fb] p-4 md:p-6 font-sans">
      {/* ================= HEADER ================= */}

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        {/* LEFT */}

        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#1565A830] bg-[#1565A810] px-3 py-1">
            <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00c8e0]" />

            <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#1565A8]">
              Employee Planner
            </span>
          </div>

          <h1 className="text-[30px] font-extrabold text-slate-800">
            To-Do Calendar
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage employee reminders and schedules
            visually.
          </p>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-400 hover:text-blue-600"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm">
            <CalendarDays
              size={15}
              className="text-blue-600"
            />

            {months[currentMonth]} {currentYear}
          </div>

          <button
            onClick={nextMonth}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-400 hover:text-blue-600"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* ================= MAIN GRID ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-5">
        {/* ================= CALENDAR ================= */}

        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
          {/* DAYS */}

          <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50">
            {[
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
            ].map((day) => (
              <div
                key={day}
                className="
                py-4
                text-center
                text-[11px]
                font-extrabold
                uppercase
                tracking-[0.08em]
                text-slate-400
              "
              >
                {day}
              </div>
            ))}
          </div>

          {/* CALENDAR BODY */}

          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => {
              const formattedMonth = String(
                currentMonth + 1
              ).padStart(2, "0");

              const formattedDay = String(
                day
              ).padStart(2, "0");

              const fullDate = `${currentYear}-${formattedMonth}-${formattedDay}`;

              const hasEvents =
                todoEvents[fullDate];

              const isSelected =
                selectedDate === fullDate;

              return (
                <button
                  key={index}
                  disabled={!day}
                  onClick={() =>
                    handleSelectDate(day)
                  }
                  className={`
                  relative
                  min-h-[120px]
                  border-b border-r border-slate-100
                  p-3
                  text-left
                  transition-all duration-300

                  ${
                    day
                      ? "hover:bg-blue-50/60"
                      : "bg-slate-50/30 cursor-default"
                  }

                  ${
                    isSelected
                      ? "bg-gradient-to-br from-blue-50 to-cyan-50"
                      : ""
                  }
                `}
                >
                  {day && (
                    <>
                      {/* DATE */}

                      <div
                        className={`
                        flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-bold transition-all

                        ${
                          isSelected
                            ? "bg-gradient-to-r from-[#0d8bff] to-[#00a6ff] text-white shadow-lg"
                            : "text-slate-700"
                        }
                      `}
                      >
                        {day}
                      </div>

                      {/* TASK COUNT */}

                      {hasEvents && (
                        <div className="mt-3 space-y-2">
                          <div
                            className="
                            rounded-xl
                            bg-blue-100
                            px-2 py-1
                            text-[10px]
                            font-bold
                            text-blue-600
                            shadow-sm
                          "
                          >
                            {hasEvents.length} To-Do
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= RIGHT PANEL ================= */}

        <div className="h-fit overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)]">
          {/* TOP */}

          <div className="border-b border-slate-100 bg-slate-50 p-6">
            <div className="flex items-center gap-3">
              <div
                className="
              w-14 h-14
              rounded-2xl
              bg-blue-50
              flex items-center justify-center
            "
              >
                <CalendarDays
                  className="text-blue-600"
                  size={28}
                />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Selected Date
                </p>

                <h2 className="text-2xl font-bold text-slate-800">
                  {selectedDate}
                </h2>
              </div>
            </div>
          </div>

          {/* TODO LIST */}

          <div className="space-y-5 p-6">
            {selectedTodos.length > 0 ? (
              selectedTodos.map(
                (todo, index) => (
                  <div
                    key={index}
                    className="
                    rounded-3xl
                    border border-slate-200
                    bg-white
                    p-5
                    shadow-sm
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:shadow-lg
                  "
                  >
                    {/* TITLE */}

                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-800">
                          {todo.title}
                        </h3>

                        <p className="text-slate-500 text-sm mt-1 leading-6">
                          {
                            todo.description
                          }
                        </p>
                      </div>

                      {todo.status ===
                      "Completed" ? (
                        <div
                          className="
                          w-11 h-11
                          rounded-2xl
                          bg-emerald-50
                          flex items-center justify-center
                        "
                        >
                          <CircleCheckBig
                            size={22}
                            className="text-emerald-500"
                          />
                        </div>
                      ) : (
                        <div
                          className="
                          w-11 h-11
                          rounded-2xl
                          bg-orange-50
                          flex items-center justify-center
                        "
                        >
                          <TriangleAlert
                            size={22}
                            className="text-orange-500"
                          />
                        </div>
                      )}
                    </div>

                    {/* TIME */}

                    <div className="flex items-center gap-3 mb-4">
                      <Clock3
                        size={18}
                        className="text-blue-500"
                      />

                      <span className="text-sm font-medium text-slate-600">
                        {todo.time}
                      </span>
                    </div>

                    {/* NOTIFICATION */}

                    <div className="flex items-center gap-3 mb-5">
                      <Bell
                        size={18}
                        className="text-violet-500"
                      />

                      <span className="text-sm font-medium text-slate-600">
                        Notification{" "}
                        {todo.notification
                          ? "Enabled"
                          : "Disabled"}
                      </span>
                    </div>

                    {/* STATUS */}

                    <span
                      className={`
                      inline-flex items-center gap-2
                      px-4 py-2
                      rounded-full
                      text-xs font-semibold

                      ${
                        todo.status ===
                        "Completed"
                          ? "bg-emerald-100 text-emerald-600"
                          : todo.status ===
                            "In Progress"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-orange-100 text-orange-600"
                      }
                    `}
                    >
                      <ListTodo size={14} />

                      {todo.status}
                    </span>
                  </div>
                )
              )
            ) : (
              <div className="flex h-[450px] flex-col items-center justify-center text-center">
                <div
                  className="
                  mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100
                "
                >
                  <CalendarDays
                    size={36}
                    className="text-slate-400"
                  />
                </div>

                <h3 className="text-xl font-bold text-slate-700">
                  No To-Do Found
                </h3>

                <p className="text-slate-500 mt-2">
                  No reminders available for selected
                  date.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}