import { useMemo, useState, useRef, useEffect } from "react";

import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  X,
  Plus,
  Bell,
  MoreVertical,
  Filter,
  Download,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  TrendingUp,
  Briefcase,
  CalendarDays,
  AlertCircle,
  Layers3,
  ArrowUpRight,
  Users,
  BadgeCheck,
} from "lucide-react";

/* ───────────────────────────────────────────── */

const rfpData = [
  {
    id: 1,
    code: "RFP-1021",
    title: "ERP Dashboard Development",
    department: "Development",
    priority: "High",
    status: "Pending",
    date: "21 May 2026",
    week: "Week 3 · 15–21 May 2026",
    assignee: {
      name: "John Doe",
      initial: "J",
      color: "#2563eb",
    },
    description: "Build core ERP dashboard with real-time analytics.",
  },

  {
    id: 2,
    code: "RFP-1022",
    title: "HRMS Employee Portal",
    department: "UI/UX",
    priority: "Medium",
    status: "Approved",
    date: "20 May 2026",
    week: "Week 3 · 15–21 May 2026",
    assignee: {
      name: "Sophia Lin",
      initial: "S",
      color: "#db2777",
    },
    description: "Design and implement employee self-service portal.",
  },

  {
    id: 3,
    code: "RFP-1023",
    title: "CRM Management System",
    department: "QA",
    priority: "Low",
    status: "Rejected",
    date: "19 May 2026",
    week: "Week 3 · 15–21 May 2026",
    assignee: {
      name: "Daniel Park",
      initial: "D",
      color: "#f59e0b",
    },
    description: "QA testing for full CRM lifecycle management.",
  },

  {
    id: 4,
    code: "RFP-1024",
    title: "Inventory Management System",
    department: "Support",
    priority: "High",
    status: "In Review",
    date: "18 May 2026",
    week: "Week 2 · 08–14 May 2026",
    assignee: {
      name: "Emma White",
      initial: "E",
      color: "#10b981",
    },
    description: "Support integration for inventory tracking modules.",
  },

  {
    id: 5,
    code: "RFP-1025",
    title: "Client Billing Dashboard",
    department: "Finance",
    priority: "Medium",
    status: "Approved",
    date: "17 May 2026",
    week: "Week 2 · 08–14 May 2026",
    assignee: {
      name: "William Chen",
      initial: "W",
      color: "#3b82f6",
    },
    description: "Automated billing and invoice generation system.",
  },
];

/* ───────────────────────────────────────────── */

const STATUS_CONFIG = {
  Approved: {
    icon: CheckCircle2,
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },

  Pending: {
    icon: Clock,
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },

  Rejected: {
    icon: XCircle,
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-200",
  },

  "In Review": {
    icon: Loader2,
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
  },
};

const PRIORITY_CONFIG = {
  High: {
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-200",
  },

  Medium: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-200",
  },

  Low: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-200",
  },
};

/* ───────────────────────────────────────────── */

function ActionMenu({ item, onView }) {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="
          flex
          h-9
          w-9
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
        <MoreVertical size={15} />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            top-11
            z-50
            min-w-[170px]
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-xl
          "
        >
          <button
            onClick={() => {
              onView(item);

              setOpen(false);
            }}
            className="
              flex
              w-full
              items-center
              gap-2
              px-4
              py-3
              text-sm
              text-slate-600
              hover:bg-slate-50
            "
          >
            <Eye size={14} />
            View Details
          </button>

          <button
            className="
              flex
              w-full
              items-center
              gap-2
              px-4
              py-3
              text-sm
              text-slate-600
              hover:bg-slate-50
            "
          >
            <Download size={14} />
            Download PDF
          </button>

          <div className="border-t border-slate-100" />

          <button
            className="
              flex
              w-full
              items-center
              gap-2
              px-4
              py-3
              text-sm
              text-red-600
              hover:bg-red-50
            "
          >
            <XCircle size={14} />
            Withdraw
          </button>
        </div>
      )}
    </div>
  );
}

/* ───────────────────────────────────────────── */

function DetailModal({ item, onClose }) {
  if (!item) return null;

  const status = STATUS_CONFIG[item.status];

  const priority = PRIORITY_CONFIG[item.priority];

  const StatusIcon = status.icon;

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        bg-slate-900/40
        backdrop-blur-[3px]
        p-4
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          max-w-2xl
          overflow-hidden
          rounded-[28px]
          bg-white
          shadow-2xl
        "
      >
        {/* TOP */}
        <div
          className="
            border-b
            border-slate-200
            bg-slate-50/70
            px-7
            py-6
          "
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="
                    rounded-full
                    bg-blue-50
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    text-blue-700
                  "
                >
                  {item.code}
                </span>

                <span
                  className={`
                    rounded-full
                    border
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    ${priority.bg}
                    ${priority.text}
                    ${priority.border}
                  `}
                >
                  {item.priority} Priority
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-bold text-slate-900">
                {item.title}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {item.department} Department
              </p>
            </div>

            <button
              onClick={onClose}
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
                hover:bg-slate-50
              "
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="space-y-5 p-7">
          {/* ASSIGNEE */}
          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                text-sm
                font-bold
                text-white
              "
              style={{
                background: item.assignee.color,
              }}
            >
              {item.assignee.initial}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Assigned To
              </p>

              <h3 className="mt-1 font-semibold text-slate-800">
                {item.assignee.name}
              </h3>
            </div>

            <div className="ml-auto">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Submitted Date
              </p>

              <h3 className="mt-1 font-semibold text-slate-800">{item.date}</h3>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
              Description
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              {item.description}
            </p>
          </div>

          {/* STATUS */}
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5">
            <div
              className={`
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                ${status.bg}
              `}
            >
              <StatusIcon size={20} className={status.text} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Current Status
              </p>

              <h3 className={`mt-1 font-semibold ${status.text}`}>
                {item.status}
              </h3>
            </div>

            <div className="ml-auto">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                Timeline
              </p>

              <h3 className="mt-1 text-sm font-semibold text-slate-700">
                {item.week}
              </h3>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="
                h-11
                rounded-xl
                border
                border-slate-200
                bg-white
                px-5
                text-sm
                font-semibold
                text-slate-600
                hover:bg-slate-50
              "
            >
              Close
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
                hover:bg-blue-700
              "
            >
              <Download size={15} />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────── */

export default function EmployeeRFPPage() {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const [priority, setPriority] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedItem, setSelectedItem] = useState(null);

  const itemsPerPage = 6;

  /* ───────────────────────────────────────── */

  const stats = useMemo(
    () => ({
      total: rfpData.length,

      approved: rfpData.filter((r) => r.status === "Approved").length,

      pending: rfpData.filter((r) => r.status === "Pending").length,

      inReview: rfpData.filter((r) => r.status === "In Review").length,
    }),
    [],
  );

  /* ───────────────────────────────────────── */

  const filteredData = useMemo(() => {
    return rfpData.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase()) ||
        item.assignee.name.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === "All" ? true : item.status === status;

      const matchPriority =
        priority === "All" ? true : item.priority === priority;

      return matchSearch && matchStatus && matchPriority;
    });
  }, [search, status, priority]);

  /* ───────────────────────────────────────── */

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  /* ───────────────────────────────────────── */

  return (
    <div className="space-y-6">
      {/* MODAL */}
      <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />

      {/* HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Employee Portal
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            My RFP Requests
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Track and manage your submitted proposals and approvals.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <button
            className="
              relative
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-500
              hover:bg-slate-50
            "
          >
            <Bell size={18} />

            <span
              className="
                absolute
                right-2
                top-2
                h-2
                w-2
                rounded-full
                bg-red-500
              "
            />
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
            <Plus size={15} />
            New RFP
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[
          {
            label: "TOTAL RFP",
            value: stats.total,
            icon: Layers3,
            bg: "bg-blue-50",
            text: "text-blue-600",
          },

          {
            label: "APPROVED",
            value: stats.approved,
            icon: BadgeCheck,
            bg: "bg-emerald-50",
            text: "text-emerald-600",
          },

          {
            label: "PENDING",
            value: stats.pending,
            icon: Clock,
            bg: "bg-amber-50",
            text: "text-amber-600",
          },

          {
            label: "IN REVIEW",
            value: stats.inReview,
            icon: TrendingUp,
            bg: "bg-cyan-50",
            text: "text-cyan-600",
          },
        ].map(({ label, value, icon: Icon, bg, text }) => (
          <div
            key={label}
            className="
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
              "
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  {label}
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                  {value}
                </h2>
              </div>

              <div
                className={`
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    ${bg}
                  `}
              >
                <Icon size={18} className={text} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FILTER */}
      <div
        className="
          flex
          flex-col
          gap-3
          rounded-[24px]
          border
          border-slate-200
          bg-white
          p-4
          shadow-sm
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* SEARCH */}
        <div
          className="
            flex
            h-11
            flex-1
            items-center
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            focus-within:border-blue-500
          "
        >
          <Search size={15} className="text-slate-400" />

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);

              setCurrentPage(1);
            }}
            placeholder="Search by code, title or assignee..."
            className="
              w-full
              bg-transparent
              px-3
              text-sm
              text-slate-700
              outline-none
              placeholder:text-slate-400
            "
          />
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 pr-1">
            <Filter size={14} className="text-slate-400" />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
              h-11
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
            <option value="All">All Status</option>

            <option value="Pending">Pending</option>

            <option value="Approved">Approved</option>

            <option value="Rejected">Rejected</option>

            <option value="In Review">In Review</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="
              h-11
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
            <option value="All">All Priority</option>

            <option value="High">High</option>

            <option value="Medium">Medium</option>

            <option value="Low">Low</option>
          </select>

          <button
            onClick={() => {
              setSearch("");

              setStatus("All");

              setPriority("All");
            }}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-400
              hover:bg-red-50
              hover:text-red-500
            "
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div
        className="
          overflow-hidden
          rounded-[24px]
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      >
        {/* TOP */}
        <div
          className="
            flex
            flex-col
            gap-4
            border-b
            border-slate-200
            bg-slate-50/60
            px-6
            py-5
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-blue-50
              "
            >
              <FileText size={19} className="text-blue-600" />
            </div>

            <div>
              <h2 className="font-semibold text-slate-800">RFP Records</h2>

              <p className="mt-1 text-xs text-slate-500">
                Showing {filteredData.length} total records
              </p>
            </div>
          </div>

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-blue-50
              px-4
              py-2
              text-xs
              font-semibold
              text-blue-700
            "
          >
            <ArrowUpRight size={12} />
            Page {currentPage} of {Math.max(totalPages, 1)}
          </div>
        </div>

        {/* TABLE HEADER */}
        <div
          className="
            hidden
            grid-cols-[100px_1fr_180px_120px_150px_160px_80px]
            border-b
            border-slate-200
            bg-slate-50
            lg:grid
          "
        >
          {[
            "RFP Code",
            "Project",
            "Assignee",
            "Priority",
            "Status",
            "Timeline",
            "Action",
          ].map((head) => (
            <div
              key={head}
              className="
                px-5
                py-4
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

        {/* ROWS */}
        <div className="divide-y divide-slate-100">
          {paginatedData.map((item) => {
            const statusConfig = STATUS_CONFIG[item.status];

            const priorityConfig = PRIORITY_CONFIG[item.priority];

            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={item.id}
                className="
                    grid
                    grid-cols-1
                    gap-4
                    px-5
                    py-5
                    transition-all
                    hover:bg-blue-50/20
                    lg:grid-cols-[100px_1fr_180px_120px_150px_160px_80px]
                    lg:items-center
                  "
              >
                {/* CODE */}
                <div>
                  <span
                    className="
                        rounded-lg
                        bg-slate-100
                        px-3
                        py-1
                        text-xs
                        font-bold
                        text-slate-700
                      "
                  >
                    {item.code}
                  </span>
                </div>

                {/* TITLE */}
                <div className="flex gap-3">
                  <div
                    className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-50
                      "
                  >
                    <Briefcase size={18} className="text-blue-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {item.department}
                    </p>
                  </div>
                </div>

                {/* ASSIGNEE */}
                <div className="flex items-center gap-3">
                  <div
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        text-sm
                        font-bold
                        text-white
                      "
                    style={{
                      background: item.assignee.color,
                    }}
                  >
                    {item.assignee.initial}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-700">
                      {item.assignee.name}
                    </h3>

                    <p className="text-xs text-slate-400">Team Member</p>
                  </div>
                </div>

                {/* PRIORITY */}
                <div>
                  <span
                    className={`
                        inline-flex
                        rounded-full
                        border
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        ${priorityConfig.bg}
                        ${priorityConfig.text}
                        ${priorityConfig.border}
                      `}
                  >
                    {item.priority}
                  </span>
                </div>

                {/* STATUS */}
                <div>
                  <span
                    className={`
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        ${statusConfig.bg}
                        ${statusConfig.text}
                        ${statusConfig.border}
                      `}
                  >
                    <StatusIcon size={12} />

                    {item.status}
                  </span>
                </div>

                {/* TIMELINE */}
                <div className="flex items-start gap-2">
                  <CalendarDays size={14} className="mt-0.5 text-slate-400" />

                  <div>
                    <h3 className="text-sm font-semibold text-slate-700">
                      {item.date}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">{item.week}</p>
                  </div>
                </div>

                {/* ACTION */}
                <div>
                  <ActionMenu item={item} onView={setSelectedItem} />
                </div>
              </div>
            );
          })}

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
                <AlertCircle size={34} className="text-slate-400" />
              </div>

              <h3 className="text-lg font-bold text-slate-700">
                No Records Found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try changing filters or search keyword.
              </p>
            </div>
          )}
        </div>

        {/* FOOTER */}
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
              records
            </p>

            {/* PAGINATION */}
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
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

              {Array.from(
                {
                  length: totalPages,
                },
                (_, i) => i + 1,
              ).map((pg) => (
                <button
                  key={pg}
                  onClick={() => setCurrentPage(pg)}
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
                      currentPage === pg
                        ? "bg-blue-600 text-white"
                        : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }
                  `}
                >
                  {pg}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
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
