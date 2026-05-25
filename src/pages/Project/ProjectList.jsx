import { useMemo, useState } from "react";

import {
  Search,
  FolderKanban,
  Eye,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
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

  const itemsPerPage = 5;

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

  return (
    <div className="min-h-screen bg-[#f4f7fb] p-5">
      {/* ================= BACKGROUND GLOW ================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-blue-200/30 blur-3xl"></div>

        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-200/30 blur-3xl"></div>
      </div>

      {/* ================= PAGE ================= */}

      <div className="mx-auto max-w-[1400px]">
        {/* ================= HEADER ================= */}

        <div className="mb-6 rounded-[30px] border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-cyan-50 p-7 shadow-sm">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Project Management
          </p>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900">
                Project Workflow
              </h1>

              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-500">
                Manage employee and client projects efficiently with modern
                workflow tracking and smart monitoring.
              </p>
            </div>

            <div className="hidden xl:flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-xl shadow-blue-200">
              <FolderKanban size={30} />
            </div>
          </div>
        </div>

        {/* ================= FILTER SECTION ================= */}

        <div className="mb-6 rounded-[28px] border border-white/60 bg-white/80 p-5 shadow-lg backdrop-blur-xl">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            {/* TAGS */}

            <div className="flex items-center gap-3">
              <p className="text-sm font-medium text-slate-500">Status</p>

              <select
                value={activeTag}
                onChange={(e) => {
                  setActiveTag(e.target.value);
                  setCurrentPage(1);
                }}
                className="
      h-11
      rounded-2xl
      border border-slate-200
      bg-white
      px-4
      text-sm font-semibold
      text-slate-700
      shadow-sm
      outline-none
      transition-all
      focus:border-blue-400
      focus:ring-4
      focus:ring-blue-100
    "
              >
                <option value="All">All</option>

                <option value="Active">Active</option>

                <option value="Completed">Completed</option>

                <option value="Pending">Pending</option>

                <option value="Review">Review</option>
              </select>
            </div>

            {/* SEARCH */}

            <div className="flex h-[46px] w-full xl:w-[320px] items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm transition-all focus-within:border-blue-400 focus-within:shadow-md">
              <Search size={18} className="text-slate-400" />

              <input
                type="text"
                placeholder="Search project..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);

                  setCurrentPage(1);
                }}
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* ================= TABLE CONTAINER ================= */}

        <div
          className="
            overflow-hidden
            rounded-[28px]
            border border-slate-200
            bg-white
            shadow-[0_8px_30px_rgb(0,0,0,0.04)]
          "
        >
          {/* ================= TABLE HEADER ================= */}

          <div
            className="
              flex flex-col gap-4
              border-b border-slate-100
              px-6 py-5
              lg:flex-row lg:items-center lg:justify-between
            "
          >
            {/* LEFT */}

            <div className="flex items-center gap-4">
              <div
                className="
                  flex h-14 w-14
                  items-center justify-center
                  rounded-3xl
                  bg-blue-50
                "
              >
                <FolderKanban size={28} className="text-blue-600" />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Employee Tasks
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Total{" "}
                  <span className="font-bold text-slate-700">
                    {filteredProjects.length}
                  </span>{" "}
                  records
                </p>
              </div>
            </div>

            {/* RIGHT */}

            <div className="flex flex-wrap items-center gap-3">
              <button
                className="
                  flex h-11 items-center gap-2
                  rounded-2xl border border-slate-200
                  bg-white px-4
                  text-sm font-semibold text-slate-700
                  shadow-sm
                "
              >
                Today
              </button>

              <button
                className="
                  flex h-11 items-center gap-2
                  rounded-2xl border border-slate-200
                  bg-white px-4
                  text-sm font-semibold text-slate-700
                  shadow-sm
                "
              >
                <CalendarDays size={16} />
                May 22, 2026
              </button>
            </div>
          </div>

          {/* ================= TABLE ================= */}

          <div className="overflow-auto">
            {/* TABLE HEADING */}

            <div
              className="
                hidden
                grid-cols-[1.5fr_1fr_1.5fr_1fr_1fr_1fr_80px]
                gap-4
                border-b border-slate-100
                bg-slate-50
                px-6 py-4
                lg:grid
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
                    font-bold
                    tracking-[0.15em]
                    text-slate-400
                  "
                >
                  {head}
                </div>
              ))}
            </div>

            {/* TABLE BODY */}

            <div className="divide-y divide-slate-100">
              {paginatedProjects.map((project) => (
                <div
                  key={project.id}
                  className="
                      grid
                      grid-cols-1
                      gap-4
                      px-6 py-5
                      transition-all duration-300
                      hover:bg-blue-50/40
                      lg:grid-cols-[1.5fr_1fr_1.5fr_1fr_1fr_1fr_80px]
                    "
                >
                  {/* PROJECT */}

                  <div className="flex items-center gap-3">
                    <div
                      className="
                          flex h-11 w-11
                          items-center justify-center
                          rounded-2xl
                          bg-blue-50
                        "
                    >
                      <FolderKanban size={20} className="text-blue-600" />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-800">
                        {project.name}
                      </h3>

                      <p className="text-sm text-slate-400">{project.client}</p>
                    </div>
                  </div>

                  {/* EMPLOYEE */}

                  <div className="flex items-center gap-3">
                    <div
                      className="
                          flex h-10 w-10
                          items-center justify-center
                          rounded-xl
                          bg-slate-100
                          text-sm font-bold text-slate-700
                        "
                    >
                      {project.employeeShort}
                    </div>

                    <p className="font-medium text-slate-700">
                      {project.employee}
                    </p>
                  </div>

                  {/* TASK */}

                  <div>
                    <h3 className="font-medium leading-7 text-slate-700">
                      {project.task}
                    </h3>
                  </div>

                  {/* PRIORITY */}

                  <div className="flex items-center">
                    <span
                      className={`
                          inline-flex items-center
                          rounded-full
                          px-4 py-1.5
                          text-xs font-bold

                          ${
                            project.priority === "High"
                              ? "bg-red-50 text-red-600"
                              : project.priority === "Medium"
                                ? "bg-orange-50 text-orange-600"
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
                          rounded-full
                          px-4 py-1.5
                          text-xs font-bold

                          ${
                            project.status === "Completed"
                              ? "bg-emerald-50 text-emerald-600"
                              : project.status === "Active"
                                ? "bg-blue-50 text-blue-600"
                                : project.status === "Review"
                                  ? "bg-violet-50 text-violet-600"
                                  : "bg-orange-50 text-orange-600"
                          }
                        `}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* DATE */}

                  <div>
                    <h3 className="font-bold text-slate-800">Week 1</h3>

                    <p className="text-sm text-slate-400">{project.deadline}</p>
                  </div>

                  {/* ACTION */}

                  <div className="flex items-center">
                    <button
                      className="
                          flex h-11 w-11
                          items-center justify-center
                          rounded-2xl
                          border border-slate-200
                          bg-white
                          text-slate-500
                          shadow-sm
                          transition-all duration-300
                          hover:bg-blue-600
                          hover:text-white
                        "
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= PAGINATION ================= */}

          <div
            className="
              flex items-center justify-between
              border-t border-slate-100
              px-6 py-5
            "
          >
            {/* LEFT */}

            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-bold text-slate-700">
                {paginatedProjects.length}
              </span>{" "}
              records
            </p>

            {/* RIGHT */}

            <div className="flex items-center gap-2">
              {/* PREV */}

              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={`
                  flex h-11 w-11
                  items-center justify-center
                  rounded-2xl
                  border transition-all

                  ${
                    currentPage === 1
                      ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }
                `}
              >
                <ChevronLeft size={18} />
              </button>

              {/* PAGES */}

              {Array.from({
                length: totalPages,
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`
                    flex h-11 w-11
                    items-center justify-center
                    rounded-2xl
                    text-sm font-bold
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

              {/* NEXT */}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={`
                  flex h-11 w-11
                  items-center justify-center
                  rounded-2xl
                  border transition-all

                  ${
                    currentPage === totalPages
                      ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-300"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }
                `}
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
