import {
  BriefcaseBusiness,
  Clock3,
  FolderKanban,
  ListTodo,
  TrendingUp,
  CircleCheckBig,
  TriangleAlert,
  Users,
  CalendarDays,
  ClipboardCheck,
  FileSpreadsheet,
  TimerReset,
  Activity,
  ArrowUpRight,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

// ================= CHART DATA =================

const taskChartData = [
  { name: "Mon", completed: 8, pending: 3 },
  { name: "Tue", completed: 12, pending: 5 },
  { name: "Wed", completed: 10, pending: 4 },
  { name: "Thu", completed: 15, pending: 6 },
  { name: "Fri", completed: 18, pending: 2 },
];

const projectStatusData = [
  {
    name: "Completed",
    value: 45,
    color: "#10b981",
  },

  {
    name: "Active",
    value: 35,
    color: "#3b82f6",
  },

  {
    name: "Pending",
    value: 20,
    color: "#f59e0b",
  },
];

const productivityData = [
  { day: "Week 1", hours: 32 },
  { day: "Week 2", hours: 40 },
  { day: "Week 3", hours: 36 },
  { day: "Week 4", hours: 45 },
];

const timesheetData = [
  { day: "Mon", hours: 8 },
  { day: "Tue", hours: 9 },
  { day: "Wed", hours: 7 },
  { day: "Thu", hours: 10 },
  { day: "Fri", hours: 8 },
];

// ================= RECENT ACTIVITIES =================

const recentTasks = [
  {
    id: 1,
    task: "ERP Dashboard UI Design",
    employee: "John Doe",
    status: "Completed",
  },

  {
    id: 2,
    task: "Calendar API Integration",
    employee: "Sophia",
    status: "Pending",
  },

  {
    id: 3,
    task: "Timesheet Testing",
    employee: "David",
    status: "In Progress",
  },

  {
    id: 4,
    task: "RFP Management Module",
    employee: "Emma",
    status: "Completed",
  },
];

// ================= QUICK TABLE =================

const quickProjects = [
  {
    project: "ERP Dashboard",
    client: "Infosys",
    status: "Completed",
    progress: "100%",
  },

  {
    project: "CRM Portal",
    client: "TCS",
    status: "Active",
    progress: "72%",
  },

  {
    project: "Inventory System",
    client: "Google",
    status: "Pending",
    progress: "45%",
  },

  {
    project: "Timesheet Module",
    client: "Adobe",
    status: "Review",
    progress: "80%",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 bg-[#F8FAFC]">
      {/* ================= HERO ================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          {/* LEFT */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Employee Management System
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Dashboard Overview
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
              Monitor projects, tasks, employees, QA workflow, productivity and
              timesheet management with modern enterprise dashboard experience.
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <button
              className="
                flex h-11 items-center gap-2
                rounded-xl border border-slate-200
                bg-white px-5
                text-sm font-semibold text-slate-700
                transition-all hover:bg-slate-50
              "
            >
              <CalendarDays size={16} />
              May 2026
            </button>

            <button
              className="
                flex h-11 items-center gap-2
                rounded-xl bg-blue-600
                px-5
                text-sm font-semibold text-white
                transition-all hover:bg-blue-700
              "
            >
              <ArrowUpRight size={16} />
              Generate Report
            </button>
          </div>
        </div>

        {/* ================= STATS ================= */}

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Total Projects",
              value: "24",
              icon: FolderKanban,
              bg: "bg-blue-50",
              text: "text-blue-600",
            },

            {
              title: "Employees",
              value: "132",
              icon: Users,
              bg: "bg-violet-50",
              text: "text-violet-600",
            },

            {
              title: "Completed Tasks",
              value: "184",
              icon: CircleCheckBig,
              bg: "bg-emerald-50",
              text: "text-emerald-600",
            },

            {
              title: "Pending Tasks",
              value: "36",
              icon: TriangleAlert,
              bg: "bg-amber-50",
              text: "text-amber-600",
            },
          ].map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                key={index}
                className="
                  rounded-2xl border border-slate-200
                  bg-white p-5 shadow-sm
                "
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                      {card.title}
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-slate-900">
                      {card.value}
                    </h2>

                    <p className="mt-2 text-xs text-slate-500">
                      Updated this week
                    </p>
                  </div>

                  <div
                    className={`
                      flex h-11 w-11 items-center
                      justify-center rounded-xl
                      ${card.bg}
                    `}
                  >
                    <Icon size={20} className={card.text} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= SECOND STATS ================= */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Timesheets",
            value: "86",
            icon: FileSpreadsheet,
            bg: "bg-cyan-50",
            text: "text-cyan-600",
          },

          {
            title: "QA Reports",
            value: "41",
            icon: ClipboardCheck,
            bg: "bg-emerald-50",
            text: "text-emerald-600",
          },

          {
            title: "Working Hours",
            value: "245h",
            icon: TimerReset,
            bg: "bg-orange-50",
            text: "text-orange-500",
          },

          {
            title: "Productivity",
            value: "94%",
            icon: Activity,
            bg: "bg-violet-50",
            text: "text-violet-600",
          },
        ].map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="
                rounded-2xl border border-slate-200
                bg-white p-5 shadow-sm
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    {card.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-slate-900">
                    {card.value}
                  </h2>

                  <p className="mt-2 text-xs text-slate-500">
                    Current month analytics
                  </p>
                </div>

                <div
                  className={`
                    flex h-11 w-11 items-center
                    justify-center rounded-xl
                    ${card.bg}
                  `}
                >
                  <Icon size={20} className={card.text} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= MAIN GRID ================= */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* ================= LEFT ================= */}

        <div className="space-y-6 xl:col-span-2">
          {/* ================= BAR CHART ================= */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Weekly Task Analytics
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Completed vs pending task tracking
                </p>
              </div>

              <div
                className="
                  flex h-12 w-12 items-center
                  justify-center rounded-xl
                  bg-blue-50
                "
              >
                <TrendingUp size={22} className="text-blue-600" />
              </div>
            </div>

            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taskChartData}>
                  <XAxis dataKey="name" />

                  <Tooltip />

                  <Bar dataKey="completed" radius={[8, 8, 0, 0]} />

                  <Bar dataKey="pending" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ================= PRODUCTIVITY ================= */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Employee Productivity
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Weekly employee productivity hours
                </p>
              </div>

              <div
                className="
                  flex h-12 w-12 items-center
                  justify-center rounded-xl
                  bg-violet-50
                "
              >
                <Clock3 size={22} className="text-violet-600" />
              </div>
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="day" />

                  <Tooltip />

                  <Line type="monotone" dataKey="hours" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ================= TIMESHEET CHART ================= */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Timesheet Summary
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Employee working hours overview
                </p>
              </div>

              <div
                className="
                  flex h-12 w-12 items-center
                  justify-center rounded-xl
                  bg-cyan-50
                "
              >
                <FileSpreadsheet size={22} className="text-cyan-600" />
              </div>
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timesheetData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="day" />

                  <Tooltip />

                  <Area type="monotone" dataKey="hours" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ================= RIGHT ================= */}

        <div className="space-y-6">
          {/* ================= PROJECT STATUS ================= */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Project Status
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Overall project analytics
                </p>
              </div>

              <div
                className="
                  flex h-11 w-11 items-center
                  justify-center rounded-xl
                  bg-emerald-50
                "
              >
                <BriefcaseBusiness size={20} className="text-emerald-600" />
              </div>
            </div>

            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectStatusData}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 space-y-3">
              {projectStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: item.color,
                      }}
                    />

                    <span className="text-sm font-medium text-slate-600">
                      {item.name}
                    </span>
                  </div>

                  <span className="text-sm font-bold text-slate-700">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ================= RECENT TASKS ================= */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Recent Tasks
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Latest employee activities
                </p>
              </div>

              <div
                className="
                  flex h-11 w-11 items-center
                  justify-center rounded-xl
                  bg-orange-50
                "
              >
                <ListTodo size={20} className="text-orange-500" />
              </div>
            </div>

            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="
                      rounded-2xl border border-slate-200
                      p-4 transition-all hover:bg-slate-50
                    "
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {task.task}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {task.employee}
                      </p>
                    </div>

                    <span
                      className={`
                          rounded-full px-3 py-1.5
                          text-xs font-semibold

                          ${
                            task.status === "Completed"
                              ? "bg-emerald-100 text-emerald-600"
                              : task.status === "In Progress"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-amber-100 text-amber-600"
                          }
                        `}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= QUICK PROJECTS ================= */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Project Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Recent project records
                </p>
              </div>

              <div
                className="
                  flex h-11 w-11 items-center
                  justify-center rounded-xl
                  bg-blue-50
                "
              >
                <FolderKanban size={20} className="text-blue-600" />
              </div>
            </div>

            <div className="space-y-4">
              {quickProjects.map((item, index) => (
                <div
                  key={index}
                  className="
                      flex items-center justify-between
                      rounded-2xl border border-slate-200
                      p-4
                    "
                >
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {item.project}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">{item.client}</p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`
                          inline-flex rounded-full
                          px-3 py-1 text-xs font-semibold

                          ${
                            item.status === "Completed"
                              ? "bg-emerald-50 text-emerald-600"
                              : item.status === "Active"
                                ? "bg-blue-50 text-blue-600"
                                : item.status === "Review"
                                  ? "bg-violet-50 text-violet-600"
                                  : "bg-amber-50 text-amber-600"
                          }
                        `}
                    >
                      {item.status}
                    </span>

                    <p className="mt-2 text-sm font-bold text-slate-700">
                      {item.progress}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
