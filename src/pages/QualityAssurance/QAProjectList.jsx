import { useMemo, useState } from "react";

import {
  Search,
  ShieldCheck,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Download,
  Plus,
  Clock3,
  Pencil,
  Trash2,
  FolderKanban,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCcw,
} from "lucide-react";

// ================= DUMMY DATA =================

const qaData = [
  {
    id: 1,
    project: "ERP Dashboard",
    tester: "John Doe",
    total: 24,
    priority: "High",
    status: "Active",
    module: "Frontend",
    date: "20 May 2026",
  },

  {
    id: 2,
    project: "CRM System",
    tester: "Sophia",
    total: 18,
    priority: "Medium",
    status: "Completed",
    module: "Backend",
    date: "19 May 2026",
  },

  {
    id: 3,
    project: "HRMS Portal",
    tester: "David",
    total: 12,
    priority: "Low",
    status: "Pending",
    module: "Testing",
    date: "18 May 2026",
  },

  {
    id: 4,
    project: "Inventory System",
    tester: "Emma",
    total: 32,
    priority: "High",
    status: "Active",
    module: "API",
    date: "17 May 2026",
  },

  {
    id: 5,
    project: "Billing Dashboard",
    tester: "William",
    total: 20,
    priority: "Medium",
    status: "Completed",
    module: "UI",
    date: "16 May 2026",
  },

  {
    id: 6,
    project: "Employee Tracker",
    tester: "Daniel",
    total: 15,
    priority: "Low",
    status: "Pending",
    module: "Research",
    date: "15 May 2026",
  },
];

export default function QAProjectList() {
  const [projectStatus, setProjectStatus] = useState("All");

  const [projectFilter, setProjectFilter] = useState("All");

  const [testerFilter, setTesterFilter] = useState("All");

  const [priorityFilter, setPriorityFilter] = useState("All");

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // ================= FILTER =================

  const filteredData = useMemo(() => {
    return qaData.filter((item) => {
      const matchStatus =
        projectStatus === "All" ? true : item.status === projectStatus;

      const matchProject =
        projectFilter === "All" ? true : item.project === projectFilter;

      const matchTester =
        testerFilter === "All" ? true : item.tester === testerFilter;

      const matchPriority =
        priorityFilter === "All" ? true : item.priority === priorityFilter;

      const matchSearch =
        item.project.toLowerCase().includes(search.toLowerCase()) ||
        item.tester.toLowerCase().includes(search.toLowerCase());

      return (
        matchStatus &&
        matchProject &&
        matchTester &&
        matchPriority &&
        matchSearch
      );
    });
  }, [projectStatus, projectFilter, testerFilter, priorityFilter, search]);

  // ================= PAGINATION =================

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // ================= RESET =================

  const handleReset = () => {
    setProjectStatus("All");
    setProjectFilter("All");
    setTesterFilter("All");
    setPriorityFilter("All");
    setSearch("");
    setCurrentPage(1);
  };

  // ================= COUNTS =================

  const activeCount = qaData.filter((i) => i.status === "Active").length;

  const completedCount = qaData.filter((i) => i.status === "Completed").length;

  const pendingCount = qaData.filter((i) => i.status === "Pending").length;

  return (
    <div className="space-y-6">
      {/* ================= HERO ================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          {/* LEFT */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Quality Assurance
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              QA Dashboard
            </h1>

            <p className="mt-3 text-sm text-slate-500">
              Monitor QA reports, project testing progress and issue tracking
              with enterprise level dashboard experience.
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
              Add Report
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
                  {qaData.length}
                </h2>

                <p className="mt-2 text-xs text-slate-500">
                  QA monitored projects
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <FolderKanban size={18} className="text-blue-600" />
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

                <p className="mt-2 text-xs text-slate-500">
                  Active QA projects
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <Loader2 size={18} className="text-blue-600" />
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

                <p className="mt-2 text-xs text-slate-500">Completed testing</p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                <CheckCircle2 size={18} className="text-emerald-600" />
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

                <p className="mt-2 text-xs text-slate-500">Waiting approvals</p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
                <AlertCircle size={18} className="text-amber-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* ================= FILTER TOOLBAR ================= */}

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
              value={projectStatus}
              onChange={(e) => {
                setProjectStatus(e.target.value);

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
              <option>All</option>
              <option>Active</option>
              <option>Completed</option>
              <option>Pending</option>
            </select>

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
              <option>All</option>
              <option>ERP Dashboard</option>
              <option>CRM System</option>
              <option>HRMS Portal</option>
              <option>Inventory System</option>
            </select>

            {/* TESTER */}
            <select
              value={testerFilter}
              onChange={(e) => {
                setTesterFilter(e.target.value);

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
              <option>All</option>
              <option>John Doe</option>
              <option>Sophia</option>
              <option>David</option>
              <option>Emma</option>
            </select>

            {/* PRIORITY */}
            <select
              value={priorityFilter}
              onChange={(e) => {
                setPriorityFilter(e.target.value);

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
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            {/* RESET */}
            <button
              onClick={handleReset}
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
                placeholder="Search QA..."
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
          </div>
        </div>

        {/* ================= TABLE HEADER ================= */}

        <div
          className="
            hidden xl:grid
            grid-cols-[1.5fr_1.2fr_1fr_1fr_1fr_1fr_130px]
            gap-4
            border-b border-slate-200
            bg-slate-50
            px-6 py-4
          "
        >
          {[
            "PROJECT",
            "TESTER",
            "MODULE",
            "TOTAL",
            "PRIORITY",
            "STATUS",
            "ACTION",
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
                  xl:grid-cols-[1.5fr_1.2fr_1fr_1fr_1fr_1fr_130px]
                "
            >
              {/* PROJECT */}
              <div>
                <p className="text-xs text-slate-400">Project</p>

                <h3 className="mt-1 font-semibold text-slate-800">
                  {item.project}
                </h3>

                <p className="mt-1 text-sm text-slate-400">{item.date}</p>
              </div>

              {/* TESTER */}
              <div>
                <p className="text-xs text-slate-400">Tester</p>

                <h3 className="mt-1 text-sm font-medium text-slate-700">
                  {item.tester}
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

              {/* TOTAL */}
              <div>
                <p className="text-xs text-slate-400">Total Cases</p>

                <div className="mt-1 flex items-center gap-2">
                  <Clock3 size={15} className="text-blue-600" />

                  <h3 className="font-semibold text-slate-800">{item.total}</h3>
                </div>
              </div>

              {/* PRIORITY */}
              <div>
                <p className="text-xs text-slate-400">Priority</p>

                <span
                  className={`
                      mt-2 inline-flex items-center
                      rounded-full px-4 py-1.5
                      text-xs font-semibold

                      ${
                        item.priority === "High"
                          ? "bg-red-50 text-red-600"
                          : item.priority === "Medium"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-emerald-50 text-emerald-600"
                      }
                    `}
                >
                  {item.priority}
                </span>
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
                        item.status === "Active"
                          ? "bg-blue-50 text-blue-600"
                          : item.status === "Completed"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                      }
                    `}
                >
                  {item.status}
                </span>
              </div>

              {/* ACTION */}
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
            reports
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
