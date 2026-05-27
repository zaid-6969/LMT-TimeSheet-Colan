import { useMemo, useState } from "react";

import {
  Search,
  FolderKanban,
  Eye,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Download,
  Plus,
  RefreshCcw,
  Clock3,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";

// ================= DUMMY DATA =================

const projectData = [
  {
    id: 1,
    name: "ERP System",
    client: "Infosys",
    employee: "John Doe",
    employeeShort: "J",
    task: "Develop Employee Dashboard",
    priority: "High",
    status: "Completed",
    deadline: "01–07 May 2026",
  },

  {
    id: 2,
    name: "Inventory System",
    client: "TCS",
    employee: "Sophia",
    employeeShort: "S",
    task: "Stock Management Integration",
    priority: "Medium",
    status: "Completed",
    deadline: "08–14 May 2026",
  },

  {
    id: 3,
    name: "Analytics Portal",
    client: "Google",
    employee: "Daniel",
    employeeShort: "D",
    task: "Create Charts and Reports",
    priority: "Medium",
    status: "Active",
    deadline: "15–21 May 2026",
  },

  {
    id: 4,
    name: "Client CRM",
    client: "Zoho",
    employee: "Emma",
    employeeShort: "E",
    task: "Lead Management Module",
    priority: "Low",
    status: "Pending",
    deadline: "22–28 May 2026",
  },

  {
    id: 5,
    name: "Finance App",
    client: "IBM",
    employee: "William",
    employeeShort: "W",
    task: "Payment Gateway Integration",
    priority: "High",
    status: "Review",
    deadline: "29–31 May 2026",
  },

  {
    id: 6,
    name: "Attendance App",
    client: "Adobe",
    employee: "Michael",
    employeeShort: "M",
    task: "Attendance Tracking UI",
    priority: "Medium",
    status: "Completed",
    deadline: "02–06 June 2026",
  },
];

export default function ProjectListPage() {
  const [search, setSearch] = useState("");

  const [activeTag, setActiveTag] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(5);

  // ================= FILTER =================

  const filteredProjects = useMemo(() => {
    return projectData.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.client.toLowerCase().includes(search.toLowerCase());

      const matchTag = activeTag === "All" ? true : item.status === activeTag;

      return matchSearch && matchTag;
    });
  }, [search, activeTag]);

  // ================= PAGINATION =================

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // ================= COUNTS =================

  const completedCount = projectData.filter(
    (i) => i.status === "Completed",
  ).length;

  const activeCount = projectData.filter((i) => i.status === "Active").length;

  const pendingCount = projectData.filter(
    (i) => i.status === "Pending" || i.status === "Review",
  ).length;

  return (
    <div className="space-y-6 bg-[#F8FAFC]">
      {/* ================= HERO ================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          {/* LEFT */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Project Management
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Project Workflow
            </h1>

            <p className="mt-3 text-sm text-slate-500">
              Manage employee and client projects efficiently with enterprise
              workflow tracking and monitoring.
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
              Add Project
            </button>
          </div>
        </div>

        {/* ================= STATS ================= */}

        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {/* TOTAL */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  TOTAL PROJECTS
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  {projectData.length}
                </h2>

                <p className="mt-2 text-xs text-slate-500">
                  Active project records
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <FolderKanban size={18} className="text-blue-600" />
              </div>
            </div>
          </div>

          {/* COMPLETED */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  COMPLETED
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  {completedCount}
                </h2>

                <p className="mt-2 text-xs text-slate-500">
                  Completed projects
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                <CheckCircle2 size={18} className="text-emerald-600" />
              </div>
            </div>
          </div>

          {/* ACTIVE */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  ACTIVE
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  {activeCount}
                </h2>

                <p className="mt-2 text-xs text-slate-500">Ongoing projects</p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <Loader2 size={18} className="text-blue-600" />
              </div>
            </div>
          </div>

          {/* PENDING */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  PENDING
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  {pendingCount}
                </h2>

                <p className="mt-2 text-xs text-slate-500">
                  Pending review projects
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
                <AlertCircle size={18} className="text-amber-600" />
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
            {/* STATUS */}
            <select
              value={activeTag}
              onChange={(e) => {
                setActiveTag(e.target.value);

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

              <option value="Active">Active</option>

              <option value="Completed">Completed</option>

              <option value="Pending">Pending</option>

              <option value="Review">Review</option>
            </select>

            {/* DATE */}
            <button
              className="
                flex h-10 items-center gap-2
                rounded-xl border border-slate-200
                bg-white px-4
                text-sm font-medium text-slate-700
              "
            >
              <CalendarDays size={15} />
              May 2026
            </button>

            {/* RESET */}
            <button
              onClick={() => {
                setActiveTag("All");

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
                placeholder="Search project..."
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
            </div>
          </div>
        </div>

        {/* ================= TABLE HEADER ================= */}

        <div
          className="
            hidden lg:grid
            grid-cols-[1.5fr_1fr_1.5fr_1fr_1fr_1fr_80px]
            gap-4
            border-b border-slate-200
            bg-slate-50
            px-6 py-4
          "
        >
          {[
            "PROJECT",
            "EMPLOYEE",
            "TASK",
            "PRIORITY",
            "STATUS",
            "DATE",
            "ACTION",
          ].map((head) => (
            <div
              key={head}
              className="
                text-[11px]
                font-semibold
                uppercase
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
          {paginatedProjects.map((project) => (
            <div
              key={project.id}
              className="
                  grid grid-cols-1
                  gap-5 px-6 py-5
                  transition-all
                  hover:bg-blue-50/20
                  lg:grid-cols-[1.5fr_1fr_1.5fr_1fr_1fr_1fr_80px]
                "
            >
              {/* PROJECT */}
              <div className="flex items-center gap-3">
                <div
                  className="
                      flex h-11 w-11 items-center
                      justify-center rounded-xl
                      bg-blue-50
                    "
                >
                  <FolderKanban size={20} className="text-blue-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {project.name}
                  </h3>

                  <p className="text-sm text-slate-400">{project.client}</p>
                </div>
              </div>

              {/* EMPLOYEE */}
              <div className="flex items-center gap-3">
                <div
                  className="
                      flex h-10 w-10 items-center
                      justify-center rounded-xl
                      bg-slate-100 text-sm
                      font-bold text-slate-700
                    "
                >
                  {project.employeeShort}
                </div>

                <p className="font-medium text-slate-700">{project.employee}</p>
              </div>

              {/* TASK */}
              <div>
                <h3 className="text-sm leading-6 font-medium text-slate-700">
                  {project.task}
                </h3>
              </div>

              {/* PRIORITY */}
              <div className="flex items-center">
                <span
                  className={`
                      inline-flex items-center
                      rounded-full px-4 py-1.5
                      text-xs font-semibold

                      ${
                        project.priority === "High"
                          ? "bg-red-50 text-red-600"
                          : project.priority === "Medium"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-emerald-50 text-emerald-600"
                      }
                    `}
                >
                  {project.priority}
                </span>
              </div>

              {/* STATUS */}
              <div className="flex items-center">
                <span
                  className={`
                      inline-flex items-center
                      rounded-full px-4 py-1.5
                      text-xs font-semibold

                      ${
                        project.status === "Completed"
                          ? "bg-emerald-50 text-emerald-600"
                          : project.status === "Active"
                            ? "bg-blue-50 text-blue-600"
                            : project.status === "Review"
                              ? "bg-violet-50 text-violet-600"
                              : "bg-amber-50 text-amber-600"
                      }
                    `}
                >
                  {project.status}
                </span>
              </div>

              {/* DATE */}
              <div>
                <h3 className="font-semibold text-slate-800">Week 1</h3>

                <p className="text-sm text-slate-400">{project.deadline}</p>
              </div>

              {/* ACTION */}
              <div className="flex items-center">
                <button
                  className="
                      flex h-10 w-10 items-center
                      justify-center rounded-xl
                      border border-slate-200
                      bg-white text-slate-500
                      transition-all hover:bg-blue-600
                      hover:text-white
                    "
                >
                  <Eye size={17} />
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
              {paginatedProjects.length}
            </span>{" "}
            records
          </p>

          <div className="flex items-center gap-2">
            {/* PREV */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`
                flex h-10 w-10 items-center
                justify-center rounded-xl border

                ${
                  currentPage === 1
                    ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }
              `}
            >
              <ChevronLeft size={17} />
            </button>

            {/* PAGES */}
            {Array.from({
              length: totalPages,
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`
                    flex h-10 w-10 items-center
                    justify-center rounded-xl
                    text-sm font-semibold transition-all

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

            {/* NEXT */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`
                flex h-10 w-10 items-center
                justify-center rounded-xl border

                ${
                  currentPage === totalPages
                    ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }
              `}
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
