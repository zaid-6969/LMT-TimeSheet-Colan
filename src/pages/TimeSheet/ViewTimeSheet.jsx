import { useMemo, useState } from "react";

import {
  Search,
  CalendarDays,
  Clock3,
  Eye,
  Pencil,
  Trash2,
  Download,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
  BriefcaseBusiness,
} from "lucide-react";

// ================= DUMMY DATA =================

const timesheetData = [
  {
    id: 1,
    date: "20/05/2026",
    project: "ERP Dashboard",
    module: "Frontend",
    task: "Build Timesheet UI Components",
    start: "10:15 AM",
    end: "08:00 PM",
    hours: "09:45",
    status: "Non Billable",
    type: "Fixed Price",
  },

  {
    id: 2,
    date: "19/05/2026",
    project: "CRM System",
    module: "Backend",
    task: "API Integration for Task Module",
    start: "09:30 AM",
    end: "06:30 PM",
    hours: "08:20",
    status: "Billable",
    type: "Time & Material",
  },

  {
    id: 3,
    date: "18/05/2026",
    project: "HRMS Portal",
    module: "Testing",
    task: "Responsive UI Testing",
    start: "11:00 AM",
    end: "07:00 PM",
    hours: "07:45",
    status: "Billable",
    type: "Retainer",
  },

  {
    id: 4,
    date: "17/05/2026",
    project: "Inventory System",
    module: "Frontend",
    task: "Sidebar Animation Improvements",
    start: "10:00 AM",
    end: "06:45 PM",
    hours: "08:10",
    status: "Non Billable",
    type: "Fixed Price",
  },

  {
    id: 5,
    date: "16/05/2026",
    project: "Analytics Dashboard",
    module: "Research",
    task: "Data Visualization Setup",
    start: "09:00 AM",
    end: "05:30 PM",
    hours: "08:00",
    status: "Billable",
    type: "Time & Material",
  },

  {
    id: 6,
    date: "15/05/2026",
    project: "Support System",
    module: "Support",
    task: "Fix Notification Bugs",
    start: "10:00 AM",
    end: "07:15 PM",
    hours: "08:40",
    status: "Billable",
    type: "Retainer",
  },
];

export default function ModernTimesheetPage() {
  const [projectFilter, setProjectFilter] =
    useState("All");

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 5;

  // ================= FILTER =================

  const filteredData = useMemo(() => {
    return timesheetData.filter((item) => {
      const matchProject =
        projectFilter === "All"
          ? true
          : item.project === projectFilter;

      const matchType =
        typeFilter === "All"
          ? true
          : item.status === typeFilter;

      const matchSearch =
        item.task
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.project
          .toLowerCase()
          .includes(search.toLowerCase());

      return (
        matchProject &&
        matchType &&
        matchSearch
      );
    });
  }, [projectFilter, typeFilter, search]);

  // ================= PAGINATION =================

  const totalPages = Math.ceil(
    filteredData.length / itemsPerPage
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen overflow-hidden bg-[#f4f7fb] p-6">
      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-blue-200/30 blur-3xl"></div>

        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cyan-200/30 blur-3xl"></div>
      </div>

      {/* ================= PAGE ================= */}

      <div className="mx-auto max-w-[1600px]">
        {/* ================= HERO ================= */}

        <div
          className="
            relative overflow-hidden
            rounded-[36px]
            border border-white/60
            bg-gradient-to-br
            from-white
            via-blue-50
            to-cyan-50
            p-8
            shadow-[0_10px_40px_rgba(15,23,42,0.06)]
          "
        >
          <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-blue-100/40 blur-3xl"></div>

          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-cyan-100/40 blur-3xl"></div>

          <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
            {/* LEFT */}

            <div>
              <p
                className="
                  mb-3 inline-flex items-center gap-2
                  rounded-full border border-blue-200
                  bg-blue-50
                  px-4 py-1.5
                  text-xs font-bold uppercase tracking-[0.2em]
                  text-blue-700
                "
              >
                <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                Employee Management
              </p>

              <h1 className="text-5xl font-black tracking-tight text-slate-900">
                Timesheet Dashboard
              </h1>

              <p
                className="
                  mt-4 max-w-2xl
                  text-[15px] leading-7
                  text-slate-500
                "
              >
                Monitor employee working hours, billable tasks,
                project activities and workflow tracking with a
                professional enterprise dashboard.
              </p>
            </div>

            {/* RIGHT STATS */}

            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  title: "Billable",
                  value: "128h",
                  bg: "from-emerald-500 to-green-500",
                },

                {
                  title: "Non Billable",
                  value: "62h",
                  bg: "from-orange-400 to-amber-500",
                },

                {
                  title: "Projects",
                  value: "14",
                  bg: "from-blue-600 to-cyan-500",
                },
              ].map((card, index) => (
                <div
                  key={index}
                  className={`
                    relative overflow-hidden
                    rounded-3xl
                    bg-gradient-to-br
                    ${card.bg}
                    px-6 py-5
                    text-white
                    shadow-lg
                  `}
                >
                  <div className="relative z-10">
                    <p className="text-xs opacity-90">
                      {card.title}
                    </p>

                    <h2 className="mt-3 text-3xl font-black">
                      {card.value}
                    </h2>
                  </div>

                  <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-white/10"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= FILTER ================= */}

        <div
          className="
            mt-6
            rounded-[32px]
            border border-white/60
            bg-white/80
            p-6
            shadow-[0_8px_30px_rgba(15,23,42,0.04)]
            backdrop-blur-xl
          "
        >
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            {/* LEFT */}

            <div className="flex items-center gap-4">
              <div
                className="
                  flex h-14 w-14
                  items-center justify-center
                  rounded-3xl
                  bg-gradient-to-br
                  from-blue-600
                  to-cyan-500
                  text-white
                  shadow-lg shadow-blue-200
                "
              >
                <Filter size={26} />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Smart Filters
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Quickly filter reports and projects
                </p>
              </div>
            </div>

            {/* SEARCH */}

            <div
              className="
                flex h-[48px]
                w-full xl:w-[340px]
                items-center gap-3
                rounded-2xl
                border border-slate-200
                bg-white
                px-4
                shadow-sm
                transition-all
                focus-within:border-blue-400
                focus-within:ring-4
                focus-within:ring-blue-100
              "
            >
              <Search
                size={18}
                className="text-slate-400"
              />

              <input
                type="text"
                placeholder="Search task..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="
                  w-full bg-transparent
                  text-sm font-medium
                  outline-none
                  placeholder:text-slate-400
                "
              />
            </div>
          </div>

          {/* FILTER OPTIONS */}

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* PROJECT */}

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                Project
              </label>

              <select
                value={projectFilter}
                onChange={(e) => {
                  setProjectFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="
                  h-11 w-full rounded-2xl
                  border border-slate-200
                  bg-white px-4
                  text-sm font-semibold text-slate-700
                  shadow-sm outline-none
                  focus:border-blue-400
                  focus:ring-4 focus:ring-blue-100
                "
              >
                <option value="All">All</option>
                <option value="ERP Dashboard">
                  ERP Dashboard
                </option>
                <option value="CRM System">
                  CRM System
                </option>
                <option value="HRMS Portal">
                  HRMS Portal
                </option>
                <option value="Inventory System">
                  Inventory System
                </option>
              </select>
            </div>

            {/* STATUS */}

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                Status
              </label>

              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="
                  h-11 w-full rounded-2xl
                  border border-slate-200
                  bg-white px-4
                  text-sm font-semibold text-slate-700
                  shadow-sm outline-none
                  focus:border-blue-400
                  focus:ring-4 focus:ring-blue-100
                "
              >
                <option value="All">All</option>
                <option value="Billable">
                  Billable
                </option>
                <option value="Non Billable">
                  Non Billable
                </option>
              </select>
            </div>

            {/* FROM DATE */}

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                From Date
              </label>

              <input
                type="date"
                className="
                  h-11 w-full rounded-2xl
                  border border-slate-200
                  bg-white px-4
                  text-sm font-semibold text-slate-700
                  shadow-sm outline-none
                  focus:border-blue-400
                  focus:ring-4 focus:ring-blue-100
                "
              />
            </div>

            {/* TO DATE */}

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                To Date
              </label>

              <input
                type="date"
                className="
                  h-11 w-full rounded-2xl
                  border border-slate-200
                  bg-white px-4
                  text-sm font-semibold text-slate-700
                  shadow-sm outline-none
                  focus:border-blue-400
                  focus:ring-4 focus:ring-blue-100
                "
              />
            </div>
          </div>
        </div>

        {/* ================= ACTION BAR ================= */}

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT */}

          <div>
            <h2 className="text-3xl font-black text-slate-900">
              Thursday, 21 May 2026
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-5">
              <p className="font-semibold text-slate-700">
                Billable :
                <span className="ml-2 text-emerald-600">
                  08:20
                </span>
              </p>

              <p className="font-semibold text-slate-700">
                Non Billable :
                <span className="ml-2 text-orange-500">
                  09:30
                </span>
              </p>

              <p className="font-semibold text-slate-700">
                Total :
                <span className="ml-2 text-blue-600">
                  17:50
                </span>
              </p>
            </div>
          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-3">
            <button
              className="
                flex h-11 items-center gap-2
                rounded-2xl
                bg-gradient-to-r
                from-blue-600 to-cyan-500
                px-5
                text-sm font-semibold text-white
                shadow-lg shadow-blue-200
                transition-all duration-300
                hover:scale-105
              "
            >
              <Plus size={18} />
              Add Timesheet
            </button>

            <button
              className="
                flex h-11 items-center gap-2
                rounded-2xl border border-slate-200
                bg-white px-5
                text-sm font-semibold text-slate-700
                shadow-sm
                hover:bg-slate-50
              "
            >
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        {/* ================= TABLE ================= */}

        <div
          className="
            mt-6
            overflow-hidden
            rounded-[32px]
            border border-white/60
            bg-white/90
            shadow-[0_10px_40px_rgba(15,23,42,0.06)]
            backdrop-blur-xl
          "
        >
          {/* TABLE TOP */}

          <div
            className="
              flex items-center justify-between
              border-b border-slate-100
              px-6 py-5
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  flex h-14 w-14
                  items-center justify-center
                  rounded-3xl
                  bg-blue-50
                "
              >
                <BriefcaseBusiness
                  size={26}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Timesheet Entries
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Total {filteredData.length} records
                </p>
              </div>
            </div>
          </div>

          {/* HEADER */}

          <div
            className="
              hidden xl:grid
              grid-cols-[1fr_1.2fr_1fr_2fr_1fr_1fr_1fr_1.2fr_130px]
              gap-4
              bg-gradient-to-r from-slate-50 to-blue-50
              px-6 py-4
              border-b border-slate-100
            "
          >
            {[
              "DATE",
              "PROJECT",
              "MODULE",
              "TASK",
              "START",
              "END",
              "HOURS",
              "STATUS",
              "ACTIONS",
            ].map((head) => (
              <div
                key={head}
                className="
                  text-[11px]
                  font-bold uppercase
                  tracking-[0.15em]
                  text-slate-500
                "
              >
                {head}
              </div>
            ))}
          </div>

          {/* BODY */}

          <div className="divide-y divide-slate-100">
            {paginatedData.map((item) => (
              <div
                key={item.id}
                className="
                  grid grid-cols-1
                  gap-5 px-6 py-5
                  transition-all duration-300
                  hover:bg-blue-50/40
                  xl:grid-cols-[1fr_1.2fr_1fr_2fr_1fr_1fr_1fr_1.2fr_130px]
                "
              >
                <div>
                  <p className="text-xs text-slate-400">
                    Date
                  </p>

                  <h3 className="mt-1 font-semibold text-slate-700">
                    {item.date}
                  </h3>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Project
                  </p>

                  <h3 className="mt-1 font-bold text-slate-800">
                    {item.project}
                  </h3>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Module
                  </p>

                  <span
                    className="
                      mt-2 inline-flex items-center
                      rounded-full bg-slate-100
                      px-4 py-1.5
                      text-xs font-semibold text-slate-700
                    "
                  >
                    {item.module}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Task
                  </p>

                  <h3 className="mt-1 leading-7 text-[15px] font-medium text-slate-700">
                    {item.task}
                  </h3>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Start
                  </p>

                  <h3 className="mt-1 font-semibold text-slate-700">
                    {item.start}
                  </h3>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    End
                  </p>

                  <h3 className="mt-1 font-semibold text-slate-700">
                    {item.end}
                  </h3>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Hours
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <Clock3
                      size={15}
                      className="text-blue-600"
                    />

                    <h3 className="font-bold text-slate-800">
                      {item.hours}
                    </h3>
                  </div>
                </div>

                {/* STATUS */}

                <div>
                  <p className="text-xs text-slate-400">
                    Status
                  </p>

                  <span
                    className={`
                      mt-2 inline-flex items-center
                      rounded-full px-4 py-1.5
                      text-xs font-bold

                      ${
                        item.status === "Billable"
                          ? "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200"
                          : "bg-orange-50 text-orange-600 ring-1 ring-orange-200"
                      }
                    `}
                  >
                    {item.status}
                  </span>
                </div>

                {/* ACTIONS */}

                <div className="flex items-center gap-2">
                  <button
                    className="
                      flex h-10 w-10 items-center justify-center
                      rounded-2xl
                      bg-blue-50 text-blue-600
                      transition-all duration-300
                      hover:bg-blue-600 hover:text-white
                    "
                  >
                    <Eye size={17} />
                  </button>

                  <button
                    className="
                      flex h-10 w-10 items-center justify-center
                      rounded-2xl
                      bg-violet-50 text-violet-600
                      transition-all duration-300
                      hover:bg-violet-600 hover:text-white
                    "
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    className="
                      flex h-10 w-10 items-center justify-center
                      rounded-2xl
                      bg-red-50 text-red-500
                      transition-all duration-300
                      hover:bg-red-500 hover:text-white
                    "
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}

          <div
            className="
              flex items-center justify-between
              border-t border-slate-100
              bg-white px-6 py-5
            "
          >
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-bold text-slate-700">
                {paginatedData.length}
              </span>{" "}
              records
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((prev) => prev - 1)
                }
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-2xl border border-slate-200
                  bg-white text-slate-700
                  shadow-sm hover:bg-slate-50
                "
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({
                length: totalPages,
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setCurrentPage(index + 1)
                  }
                  className={`
                    flex h-11 w-11 items-center justify-center
                    rounded-2xl text-sm font-bold
                    transition-all duration-300

                    ${
                      currentPage === index + 1
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-200"
                        : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }
                  `}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage((prev) => prev + 1)
                }
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-2xl border border-slate-200
                  bg-white text-slate-700
                  shadow-sm hover:bg-slate-50
                "
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}