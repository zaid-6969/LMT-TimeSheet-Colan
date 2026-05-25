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
} from "recharts";

// ================= CHART DATA =================

const taskChartData = [
  {
    name: "Mon",
    completed: 8,
    pending: 3,
  },

  {
    name: "Tue",
    completed: 12,
    pending: 5,
  },

  {
    name: "Wed",
    completed: 10,
    pending: 4,
  },

  {
    name: "Thu",
    completed: 15,
    pending: 6,
  },

  {
    name: "Fri",
    completed: 18,
    pending: 2,
  },
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
  {
    day: "Week 1",
    hours: 32,
  },

  {
    day: "Week 2",
    hours: 40,
  },

  {
    day: "Week 3",
    hours: 36,
  },

  {
    day: "Week 4",
    hours: 45,
  },
];

// ================= RECENT TASKS =================

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

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] p-6 overflow-hidden">
      {/* ================= HEADER ================= */}

      <div className="mb-6">
        <p className="text-sm font-semibold text-blue-600 mb-2">
          Employee Management System
        </p>

        <h1 className="text-4xl font-bold text-slate-800">
          Dashboard Overview
        </h1>

        <p className="text-slate-500 mt-3 text-lg">
          Monitor projects, employee productivity,
          tasks and timesheets in real-time.
        </p>
      </div>

      {/* ================= TOP STATS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        {/* CARD */}

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
            bg: "bg-orange-50",
            text: "text-orange-500",
          },
        ].map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="
              bg-white
              rounded-3xl
              border border-slate-200
              p-5
              shadow-sm
              hover:shadow-md
              transition-all duration-300
            "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm">
                    {card.title}
                  </p>

                  <h2 className="text-4xl font-bold text-slate-800 mt-3">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`
                  w-16 h-16
                  rounded-2xl
                  flex items-center justify-center
                  ${card.bg}
                `}
                >
                  <Icon
                    size={30}
                    className={card.text}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= MAIN GRID ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* ================= LEFT SECTION ================= */}

        <div className="xl:col-span-2 space-y-6">
          {/* ================= BAR CHART ================= */}

          <div
            className="
            bg-white
            rounded-3xl
            border border-slate-200
            shadow-sm
            p-6
          "
          >
            {/* TOP */}

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Weekly Task Analytics
                </h2>

                <p className="text-slate-500 mt-1">
                  Completed vs Pending tasks
                </p>
              </div>

              <div
                className="
                w-14 h-14
                rounded-2xl
                bg-blue-50
                flex items-center justify-center
              "
              >
                <TrendingUp
                  size={28}
                  className="text-blue-600"
                />
              </div>
            </div>

            {/* CHART */}

            <div className="h-[320px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <BarChart
                  data={taskChartData}
                >
                  <XAxis dataKey="name" />

                  <Tooltip />

                  <Bar
                    dataKey="completed"
                    radius={[10, 10, 0, 0]}
                  />

                  <Bar
                    dataKey="pending"
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ================= LINE CHART ================= */}

          <div
            className="
            bg-white
            rounded-3xl
            border border-slate-200
            shadow-sm
            p-6
          "
          >
            {/* TOP */}

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Employee Productivity
                </h2>

                <p className="text-slate-500 mt-1">
                  Weekly productivity hours
                </p>
              </div>

              <div
                className="
                w-14 h-14
                rounded-2xl
                bg-violet-50
                flex items-center justify-center
              "
              >
                <Clock3
                  size={28}
                  className="text-violet-600"
                />
              </div>
            </div>

            {/* CHART */}

            <div className="h-[300px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <LineChart
                  data={productivityData}
                >
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="day" />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="hours"
                    strokeWidth={4}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SECTION ================= */}

        <div className="space-y-6">
          {/* ================= PIE CHART ================= */}

          <div
            className="
            bg-white
            rounded-3xl
            border border-slate-200
            shadow-sm
            p-6
          "
          >
            {/* TOP */}

            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Project Status
                </h2>

                <p className="text-slate-500 text-sm mt-1">
                  Overall project progress
                </p>
              </div>

              <div
                className="
                w-12 h-12
                rounded-2xl
                bg-emerald-50
                flex items-center justify-center
              "
              >
                <BriefcaseBusiness
                  size={24}
                  className="text-emerald-600"
                />
              </div>
            </div>

            {/* CHART */}

            <div className="h-[260px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>
                  <Pie
                    data={projectStatusData}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                  >
                    {projectStatusData.map(
                      (entry, index) => (
                        <Cell
                          key={index}
                          fill={entry.color}
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* LEGEND */}

            <div className="space-y-3 mt-3">
              {projectStatusData.map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor:
                            item.color,
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
                )
              )}
            </div>
          </div>

          {/* ================= RECENT TASKS ================= */}

          <div
            className="
            bg-white
            rounded-3xl
            border border-slate-200
            shadow-sm
            p-6
          "
          >
            {/* TOP */}

            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Recent Tasks
                </h2>

                <p className="text-slate-500 text-sm mt-1">
                  Latest employee activities
                </p>
              </div>

              <div
                className="
                w-12 h-12
                rounded-2xl
                bg-orange-50
                flex items-center justify-center
              "
              >
                <ListTodo
                  size={24}
                  className="text-orange-500"
                />
              </div>
            </div>

            {/* TASKS */}

            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="
                  p-4
                  rounded-2xl
                  border border-slate-200
                  hover:shadow-sm
                  transition-all duration-300
                "
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {task.task}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        {task.employee}
                      </p>
                    </div>

                    <span
                      className={`
                      px-3 py-1.5
                      rounded-full
                      text-xs font-semibold

                      ${
                        task.status ===
                        "Completed"
                          ? "bg-emerald-100 text-emerald-600"
                          : task.status ===
                            "In Progress"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-orange-100 text-orange-600"
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

          {/* ================= QUICK STATS ================= */}

          <div
            className="
            bg-gradient-to-r
            from-blue-600
            to-violet-600
            rounded-3xl
            p-6
            text-white
            shadow-lg
          "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">
                  Upcoming Meetings
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  12
                </h2>
              </div>

              <div
                className="
                w-16 h-16
                rounded-2xl
                bg-white/20
                flex items-center justify-center
              "
              >
                <CalendarDays size={30} />
              </div>
            </div>

            <p className="mt-5 text-sm opacity-90 leading-relaxed">
              Scheduled meetings and employee
              discussions for this week.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}