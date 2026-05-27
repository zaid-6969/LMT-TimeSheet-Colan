import { useMemo, useState } from "react";

import {
  Search,
  Plus,
  FileText,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Download,
  CalendarDays,
  FolderKanban,
  BadgeCheck,
  Clock3,
  AlertCircle,
  RefreshCcw,
  MoreVertical,
} from "lucide-react";

/* ================= DUMMY DATA ================= */

const finalSourceData = [
  {
    id: 1,
    code: "PRJ-1001",
    title: "ERP Dashboard UI",
    uploadOn: "21 May 2026",
    uploadBy: "John Doe",
    version: "v2.1",
    status: "Approved",
    size: "245 MB",
  },

  {
    id: 2,
    code: "PRJ-1002",
    title: "CRM Management System",
    uploadOn: "20 May 2026",
    uploadBy: "Sophia",
    version: "v1.8",
    status: "Pending",
    size: "178 MB",
  },

  {
    id: 3,
    code: "PRJ-1003",
    title: "Employee Portal",
    uploadOn: "18 May 2026",
    uploadBy: "David",
    version: "v3.0",
    status: "Rejected",
    size: "326 MB",
  },

  {
    id: 4,
    code: "PRJ-1004",
    title: "Inventory Dashboard",
    uploadOn: "17 May 2026",
    uploadBy: "Emma",
    version: "v2.4",
    status: "Approved",
    size: "194 MB",
  },

  {
    id: 5,
    code: "PRJ-1005",
    title: "Timesheet System",
    uploadOn: "16 May 2026",
    uploadBy: "William",
    version: "v1.3",
    status: "Pending",
    size: "142 MB",
  },

  {
    id: 6,
    code: "PRJ-1006",
    title: "Billing Portal",
    uploadOn: "15 May 2026",
    uploadBy: "Daniel",
    version: "v2.6",
    status: "Approved",
    size: "268 MB",
  },
];

/* ================= COMPONENT ================= */

export default function FinalSourceList() {
  const [projectStatus, setProjectStatus] = useState("All");

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [sortBy, setSortBy] = useState("latest");

  /* ================= FILTER ================= */

  const filteredData = useMemo(() => {
    let data = [...finalSourceData];

    /* SEARCH */
    data = data.filter((item) => {
      const matchStatus =
        projectStatus === "All" ? true : item.status === projectStatus;

      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase()) ||
        item.uploadBy.toLowerCase().includes(search.toLowerCase());

      return matchStatus && matchSearch;
    });

    /* SORT */
    if (sortBy === "name-asc") {
      data.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortBy === "name-desc") {
      data.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (sortBy === "status") {
      data.sort((a, b) => a.status.localeCompare(b.status));
    }

    return data;
  }, [projectStatus, search, sortBy]);

  /* ================= PAGINATION ================= */

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  /* ================= RESET ================= */

  const handleReset = () => {
    setProjectStatus("All");

    setSearch("");

    setSortBy("latest");

    setItemsPerPage(5);

    setCurrentPage(1);
  };

  /* ================= COUNTS ================= */

  const approvedCount = finalSourceData.filter(
    (i) => i.status === "Approved",
  ).length;

  const pendingCount = finalSourceData.filter(
    (i) => i.status === "Pending",
  ).length;

  const rejectedCount = finalSourceData.filter(
    (i) => i.status === "Rejected",
  ).length;

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        {/* LEFT */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Project Management
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Final Source Management
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage uploaded source files, project versions and approvals.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <button
            className="
              flex
              h-11
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
              transition-all
              hover:bg-slate-50
            "
          >
            <Download size={16} />
            Export
          </button>

          <button
            className="
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
            <Plus size={16} />
            Add Source
          </button>
        </div>
      </div>

      {/* ================= STATS ================= */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {/* TOTAL */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                TOTAL SOURCES
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                {finalSourceData.length}
              </h2>

              <p className="mt-2 text-xs text-slate-500">
                Uploaded source files
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <FolderKanban size={18} className="text-blue-600" />
            </div>
          </div>
        </div>

        {/* APPROVED */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                APPROVED
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                {approvedCount}
              </h2>

              <p className="mt-2 text-xs text-slate-500">Approved projects</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
              <BadgeCheck size={18} className="text-emerald-600" />
            </div>
          </div>
        </div>

        {/* PENDING */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                PENDING
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                {pendingCount}
              </h2>

              <p className="mt-2 text-xs text-slate-500">Waiting approvals</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
              <Clock3 size={18} className="text-amber-600" />
            </div>
          </div>
        </div>

        {/* REJECTED */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                REJECTED
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                {rejectedCount}
              </h2>

              <p className="mt-2 text-xs text-slate-500">Rejected files</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
              <AlertCircle size={18} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* ================= TABLE TOOLBAR ================= */}

        <div
          className="
            flex
            flex-col
            gap-3
            border-b
            border-slate-200
            bg-white
            px-5
            py-4
            xl:flex-row
            xl:items-center
            xl:justify-between
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
                h-10
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                text-sm
                font-medium
                text-slate-700
                outline-none
              "
            >
              <option value="All">All</option>

              <option value="Approved">Approved</option>

              <option value="Pending">Pending</option>

              <option value="Rejected">Rejected</option>
            </select>

            {/* SORT */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="
                h-10
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                text-sm
                font-medium
                text-slate-700
                outline-none
              "
            >
              <option value="latest">Latest</option>

              <option value="name-asc">Name A-Z</option>

              <option value="name-desc">Name Z-A</option>

              <option value="status">Status</option>
            </select>

            {/* VERSION */}
            <select
              className="
                h-10
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                text-sm
                font-medium
                text-slate-700
                outline-none
              "
            >
              <option>All Versions</option>

              <option>v1.0</option>

              <option>v2.0</option>

              <option>v3.0</option>
            </select>

            {/* RESET */}
            <button
              onClick={handleReset}
              className="
                flex
                h-10
                items-center
                gap-2
                rounded-xl
                border
                border-slate-200
                bg-white
                px-4
                text-sm
                font-medium
                text-slate-600
                transition-all
                hover:bg-slate-50
              "
            >
              <RefreshCcw size={14} />
              Reset
            </button>
          </div>

          {/* RIGHT */}
          <div className="flex flex-wrap items-center gap-3">
            {/* SEARCH */}
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
                px-4
              "
            >
              <Search size={15} className="text-slate-400" />

              <input
                type="text"
                placeholder="Search sources..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);

                  setCurrentPage(1);
                }}
                className="
                  bg-transparent
                  text-sm
                  text-slate-700
                  outline-none
                  placeholder:text-slate-400
                "
              />
            </div>

            {/* SHOW ENTRIES */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Show</span>

              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));

                  setCurrentPage(1);
                }}
                className="
                  h-10
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-3
                  text-sm
                  font-medium
                  text-slate-700
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

        {/* ================= TABLE HEADER ================= */}

        <div
          className="
            hidden
            grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr_100px]
            border-b
            border-slate-200
            bg-slate-50
            px-6
            py-4
            xl:grid
          "
        >
          {[
            "CODE",
            "TITLE",
            "UPLOAD ON",
            "UPLOAD BY",
            "VERSION",
            "SIZE",
            "STATUS",
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
          {paginatedData.map((item) => (
            <div
              key={item.id}
              className="
                  grid
                  grid-cols-1
                  gap-5
                  px-6
                  py-5
                  transition-all
                  hover:bg-blue-50/20
                  xl:grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr_100px]
                "
            >
              {/* CODE */}
              <div>
                <p className="text-xs text-slate-400 xl:hidden">Code</p>

                <h3 className="mt-1 font-semibold text-slate-800">
                  {item.code}
                </h3>
              </div>

              {/* TITLE */}
              <div>
                <p className="text-xs text-slate-400 xl:hidden">Title</p>

                <h3 className="mt-1 font-semibold text-slate-800">
                  {item.title}
                </h3>
              </div>

              {/* DATE */}
              <div>
                <p className="text-xs text-slate-400 xl:hidden">Upload On</p>

                <div className="mt-1 flex items-center gap-2">
                  <CalendarDays size={14} className="text-blue-600" />

                  <span className="text-sm font-medium text-slate-700">
                    {item.uploadOn}
                  </span>
                </div>
              </div>

              {/* UPLOAD BY */}
              <div>
                <p className="text-xs text-slate-400 xl:hidden">Upload By</p>

                <span className="mt-1 text-sm font-medium text-slate-700">
                  {item.uploadBy}
                </span>
              </div>

              {/* VERSION */}
              <div>
                <p className="text-xs text-slate-400 xl:hidden">Version</p>

                <span
                  className="
                      mt-1
                      inline-flex
                      rounded-full
                      bg-blue-50
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-blue-700
                    "
                >
                  {item.version}
                </span>
              </div>

              {/* SIZE */}
              <div>
                <p className="text-xs text-slate-400 xl:hidden">Size</p>

                <span className="mt-1 text-sm font-medium text-slate-700">
                  {item.size}
                </span>
              </div>

              {/* STATUS */}
              <div>
                <p className="text-xs text-slate-400 xl:hidden">Status</p>

                <span
                  className={`
                      mt-1
                      inline-flex
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-semibold

                      ${
                        item.status === "Approved"
                          ? "bg-emerald-50 text-emerald-700"
                          : item.status === "Pending"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-red-50 text-red-600"
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
                      flex
                      h-10
                      w-10
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
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* EMPTY */}
          {paginatedData.length === 0 && (
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
                <FileText size={32} className="text-slate-400" />
              </div>

              <h3 className="text-lg font-bold text-slate-700">
                No Sources Found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try changing filters or search keyword.
              </p>
            </div>
          )}
        </div>

        {/* ================= FOOTER ================= */}

        {filteredData.length > 0 && (
          <div
            className="
              flex
              flex-wrap
              items-center
              justify-between
              gap-4
              border-t
              border-slate-200
              bg-slate-50/50
              px-6
              py-4
            "
          >
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {paginatedData.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {filteredData.length}
              </span>{" "}
              sources
            </p>

            {/* PAGINATION */}
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
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
                  disabled:opacity-40
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
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      text-sm
                      font-semibold

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
                  disabled:opacity-40
                "
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
