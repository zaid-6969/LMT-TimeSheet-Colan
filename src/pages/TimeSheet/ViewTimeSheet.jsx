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
  BriefcaseBusiness,
  FolderKanban,
  CheckCircle2,
  AlertCircle,
  RefreshCcw,
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
  const [projectFilter, setProjectFilter] = useState("All");

  const [typeFilter, setTypeFilter] = useState("All");

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(5);

  // ================= FILTER =================

  const filteredData = useMemo(() => {
    return timesheetData.filter((item) => {
      const matchProject =
        projectFilter === "All" ? true : item.project === projectFilter;

      const matchType =
        typeFilter === "All" ? true : item.status === typeFilter;

      const matchSearch =
        item.task.toLowerCase().includes(search.toLowerCase()) ||
        item.project.toLowerCase().includes(search.toLowerCase());

      return matchProject && matchType && matchSearch;
    });
  }, [projectFilter, typeFilter, search]);

  // ================= PAGINATION =================

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // ================= COUNTS =================

  const billableHours = timesheetData.filter(
    (i) => i.status === "Billable",
  ).length;

  const nonBillableHours = timesheetData.filter(
    (i) => i.status === "Non Billable",
  ).length;

  const totalProjects = new Set(timesheetData.map((i) => i.project)).size;

  return (
    <div className="space-y-6">
      {/* ================= HERO ================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          {/* LEFT */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Employee Management
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Timesheet Dashboard
            </h1>

            <p className="mt-3 text-sm text-slate-500">
              Monitor employee working hours, billable tasks and project
              workflow with enterprise level dashboard experience.
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
              <Download size={17} />
              Export
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
              <Plus size={17} />
              Add Timesheet
            </button>
          </div>
        </div>

        {/* ================= STATS ================= */}

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {/* BILLABLE */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  BILLABLE
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  {billableHours}
                </h2>

                <p className="mt-2 text-xs text-slate-500">Billable entries</p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                <CheckCircle2 size={18} className="text-emerald-600" />
              </div>
            </div>
          </div>

          {/* NON BILLABLE */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  NON BILLABLE
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  {nonBillableHours}
                </h2>

                <p className="mt-2 text-xs text-slate-500">
                  Non billable entries
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
                <AlertCircle size={18} className="text-amber-600" />
              </div>
            </div>
          </div>

          {/* PROJECTS */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  PROJECTS
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  {totalProjects}
                </h2>

                <p className="mt-2 text-xs text-slate-500">Active projects</p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <FolderKanban size={18} className="text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= FILTER TOOLBAR ================= */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div
          className="
            flex flex-col gap-3
            border-b border-slate-200
            bg-white px-5 py-4
            xl:flex-row xl:items-center xl:justify-between
          "
        >
          {/* LEFT */}
          <div className="flex flex-wrap items-center gap-3">
            {/* PROJECT */}
            <select
              value={projectFilter}
              onChange={(e) => {
                setProjectFilter(e.target.value);

                setCurrentPage(1);
              }}
              className="
                h-10 rounded-xl
                border border-slate-200
                bg-white px-4
                text-sm font-medium text-slate-700
                outline-none
              "
            >
              <option value="All">All Projects</option>

              <option value="ERP Dashboard">ERP Dashboard</option>

              <option value="CRM System">CRM System</option>

              <option value="HRMS Portal">HRMS Portal</option>

              <option value="Inventory System">Inventory System</option>
            </select>

            {/* STATUS */}
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);

                setCurrentPage(1);
              }}
              className="
                h-10 rounded-xl
                border border-slate-200
                bg-white px-4
                text-sm font-medium text-slate-700
                outline-none
              "
            >
              <option value="All">All Status</option>

              <option value="Billable">Billable</option>

              <option value="Non Billable">Non Billable</option>
            </select>

            {/* FROM DATE */}
            <input
              type="date"
              className="
                h-10 rounded-xl
                border border-slate-200
                bg-white px-4
                text-sm font-medium text-slate-700
                outline-none
              "
            />

            {/* TO DATE */}
            <input
              type="date"
              className="
                h-10 rounded-xl
                border border-slate-200
                bg-white px-4
                text-sm font-medium text-slate-700
                outline-none
              "
            />

            {/* RESET */}
            <button
              onClick={() => {
                setProjectFilter("All");

                setTypeFilter("All");

                setSearch("");

                setCurrentPage(1);
              }}
              className="
                flex h-10 items-center gap-2
                rounded-xl border border-slate-200
                bg-white px-4
                text-sm font-medium text-slate-600
                transition-all hover:bg-slate-50
              "
            >
              <RefreshCcw size={14} />
              Reset
            </button>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            {/* SEARCH */}
            <div
              className="
                flex h-10 items-center gap-2
                rounded-xl border border-slate-200
                bg-white px-4
              "
            >
              <Search size={15} className="text-slate-400" />

              <input
                type="text"
                placeholder="Search task..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);

                  setCurrentPage(1);
                }}
                className="
                  bg-transparent text-sm
                  text-slate-700 outline-none
                  placeholder:text-slate-400
                "
              />
            </div>

            {/* SHOW */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Show</span>

              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));

                  setCurrentPage(1);
                }}
                className="
                  h-10 rounded-xl
                  border border-slate-200
                  bg-white px-3
                  text-sm font-medium text-slate-700
                  outline-none
                "
              >
                <option value={5}>5</option>

                <option value={10}>10</option>

                <option value={15}>15</option>
              </select>

              <span className="text-sm text-slate-500">per page</span>
            </div>
          </div>
        </div>

        {/* ================= TABLE TOP ================= */}

        <div
          className="
            flex items-center justify-between
            border-b border-slate-200
            px-6 py-5
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                flex h-12 w-12 items-center
                justify-center rounded-xl
                bg-blue-50
              "
            >
              <BriefcaseBusiness size={22} className="text-blue-600" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Timesheet Entries
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Total {filteredData.length} records
              </p>
            </div>
          </div>
        </div>

        {/* ================= TABLE HEADER ================= */}

        <div
          className="
            hidden xl:grid
            grid-cols-[1fr_1.2fr_1fr_2fr_1fr_1fr_1fr_1.2fr_130px]
            gap-4
            bg-slate-50
            px-6 py-4
            border-b border-slate-200
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
                font-semibold uppercase
                tracking-[0.14em]
                text-slate-400
              "
            >
              {head}
            </div>
          ))}
        </div>

        {/* ================= TABLE BODY ================= */}

        <div className="divide-y divide-slate-100">
          {paginatedData.map((item) => (
            <div
              key={item.id}
              className="
                  grid grid-cols-1
                  gap-5 px-6 py-5
                  transition-all
                  hover:bg-blue-50/20
                  xl:grid-cols-[1fr_1.2fr_1fr_2fr_1fr_1fr_1fr_1.2fr_130px]
                "
            >
              {/* DATE */}
              <div>
                <p className="text-xs text-slate-400">Date</p>

                <div className="mt-1 flex items-center gap-2">
                  <CalendarDays size={15} className="text-blue-600" />

                  <h3 className="font-semibold text-slate-700">{item.date}</h3>
                </div>
              </div>

              {/* PROJECT */}
              <div>
                <p className="text-xs text-slate-400">Project</p>

                <h3 className="mt-1 font-semibold text-slate-800">
                  {item.project}
                </h3>
              </div>

              {/* MODULE */}
              <div>
                <p className="text-xs text-slate-400">Module</p>

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

              {/* TASK */}
              <div>
                <p className="text-xs text-slate-400">Task</p>

                <h3 className="mt-1 text-sm leading-6 font-medium text-slate-700">
                  {item.task}
                </h3>
              </div>

              {/* START */}
              <div>
                <p className="text-xs text-slate-400">Start</p>

                <h3 className="mt-1 font-medium text-slate-700">
                  {item.start}
                </h3>
              </div>

              {/* END */}
              <div>
                <p className="text-xs text-slate-400">End</p>

                <h3 className="mt-1 font-medium text-slate-700">{item.end}</h3>
              </div>

              {/* HOURS */}
              <div>
                <p className="text-xs text-slate-400">Hours</p>

                <div className="mt-1 flex items-center gap-2">
                  <Clock3 size={15} className="text-blue-600" />

                  <h3 className="font-semibold text-slate-800">{item.hours}</h3>
                </div>
              </div>

              {/* STATUS */}
              <div>
                <p className="text-xs text-slate-400">Status</p>

                <span
                  className={`
                      mt-2 inline-flex items-center
                      rounded-full px-4 py-1.5
                      text-xs font-semibold

                      ${
                        item.status === "Billable"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
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
                      flex h-10 w-10
                      items-center justify-center
                      rounded-xl border border-slate-200
                      bg-white text-blue-600
                      transition-all hover:bg-blue-600 hover:text-white
                    "
                >
                  <Eye size={16} />
                </button>

                <button
                  className="
                      flex h-10 w-10
                      items-center justify-center
                      rounded-xl border border-slate-200
                      bg-white text-violet-600
                      transition-all hover:bg-violet-600 hover:text-white
                    "
                >
                  <Pencil size={16} />
                </button>

                <button
                  className="
                      flex h-10 w-10
                      items-center justify-center
                      rounded-xl border border-slate-200
                      bg-white text-red-500
                      transition-all hover:bg-red-500 hover:text-white
                    "
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= PAGINATION ================= */}

        <div
          className="
            flex items-center justify-between
            border-t border-slate-200
            bg-white px-6 py-5
          "
        >
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {paginatedData.length}
            </span>{" "}
            records
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl border border-slate-200
                bg-white text-slate-700
                hover:bg-slate-50
              "
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({
              length: totalPages,
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`
                    flex h-10 w-10
                    items-center justify-center
                    rounded-xl text-sm font-semibold
                    transition-all

                    ${
                      currentPage === index + 1
                        ? "bg-blue-600 text-white"
                        : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }
                  `}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl border border-slate-200
                bg-white text-slate-700
                hover:bg-slate-50
              "
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
