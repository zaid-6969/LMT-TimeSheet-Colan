import { useMemo, useState, useRef, useEffect } from "react";
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
  X,
} from "lucide-react";

/* ================= INITIAL SEED DATA ================= */
const INITIAL_SOURCE_DATA = [
  {
    id: 1,
    code: "PRJ-1001",
    title: "ERP Dashboard UI",
    uploadOn: "21 May 2026",
    uploadBy: "John Doe",
    avatar: "J",
    avatarColor: "#2563EB",
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
    avatar: "S",
    avatarColor: "#06B6D4",
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
    avatar: "D",
    avatarColor: "#8B5CF6",
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
    avatar: "E",
    avatarColor: "#F97316",
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
    avatar: "W",
    avatarColor: "#E11D48",
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
    avatar: "D",
    avatarColor: "#059669",
    version: "v2.6",
    status: "Approved",
    size: "268 MB",
  },
];

/* ================= BADGES ================= */
function StatusBadge({ s }) {
  const map = {
    Approved: { cls: "bg-emerald-50 text-emerald-700", Icon: BadgeCheck },
    Pending: { cls: "bg-amber-50 text-amber-700", Icon: Clock3 },
    Rejected: { cls: "bg-red-50 text-red-600", Icon: AlertCircle },
  };
  const { cls, Icon } = map[s] || map.Pending;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${cls}`}>
      <Icon size={11} />
      {s}
    </span>
  );
}

/* ================= ACTION MENU ================= */
function ActionMenu({ onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all hover:bg-slate-50"
      >
        <MoreVertical size={15} />
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 min-w-[140px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <button
            onClick={() => { setOpen(false); onView(); }}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
          >
            <Eye size={14} /> View
          </button>
          <button
            onClick={() => { setOpen(false); onEdit(); }}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50"
          >
            <Pencil size={14} /> Edit
          </button>
          <button
            onClick={() => { setOpen(false); onDelete(); }}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

/* ================= MAIN COMPONENT ================= */
export default function FinalSourceList() {
  const [sources, setSources] = useState(INITIAL_SOURCE_DATA);
  const [projectStatus, setProjectStatus] = useState("All");
  const [versionFilter, setVersionFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("latest");

  /* Modal States */
  const [modalType, setModalType] = useState(null); // 'add' | 'edit' | 'view' | 'delete'
  const [selectedItem, setSelectedItem] = useState(null);

  /* Form States */
  const [formData, setFormData] = useState({ title: "", code: "", version: "v1.0", status: "Pending", size: "10 MB" });

  /* ── FILTER + SORT ── */
  const filteredData = useMemo(() => {
    let data = [...sources].filter((item) => {
      const matchStatus = projectStatus === "All" || item.status === projectStatus;
      
      let matchVersion = true;
      if (versionFilter !== "All") {
        matchVersion = item.version.startsWith(versionFilter);
      }

      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.code.toLowerCase().includes(search.toLowerCase()) ||
        item.uploadBy.toLowerCase().includes(search.toLowerCase());

      return matchStatus && matchVersion && matchSearch;
    });

    if (sortBy === "name-asc") data.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === "name-desc") data.sort((a, b) => b.title.localeCompare(a.title));
    if (sortBy === "status") data.sort((a, b) => a.status.localeCompare(b.status));
    if (sortBy === "latest") data.sort((a, b) => b.id - a.id);

    return data;
  }, [sources, projectStatus, versionFilter, search, sortBy]);

  /* ── PAGINATION ── */
  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  
  const paginatedData = useMemo(() => {
    return filteredData.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);
  }, [filteredData, safePage, rowsPerPage]);

  const startRow = filteredData.length === 0 ? 0 : (safePage - 1) * rowsPerPage + 1;
  const endRow = Math.min(safePage * rowsPerPage, filteredData.length);

  /* ── RESET ── */
  const handleReset = () => {
    setProjectStatus("All");
    setVersionFilter("All");
    setSearch("");
    setSortBy("latest");
    setRowsPerPage(10);
    setCurrentPage(1);
  };

  /* ── OPEN MODAL ACTIONS ── */
  const openAddModal = () => {
    setFormData({ title: "", code: `PRJ-${1000 + sources.length + 1}`, version: "v1.0", status: "Pending", size: "45 MB" });
    setModalType("add");
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setFormData({ title: item.title, code: item.code, version: item.version, status: item.status, size: item.size });
    setModalType("edit");
  };

  const openViewModal = (item) => {
    setSelectedItem(item);
    setModalType("view");
  };

  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setModalType("delete");
  };

  /* ── CRUD OPERATIONS ── */
  const handleSave = (e) => {
    e.preventDefault();
    if (modalType === "add") {
      const newRow = {
        id: Date.now(),
        code: formData.code || `PRJ-${Date.now().toString().slice(-4)}`,
        title: formData.title,
        uploadOn: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        uploadBy: "Current User",
        avatar: "C",
        avatarColor: "#2563EB",
        version: formData.version,
        status: formData.status,
        size: formData.size,
      };
      setSources([newRow, ...sources]);
    } else if (modalType === "edit") {
      setSources(sources.map((img) => (img.id === selectedItem.id ? { ...img, ...formData } : img)));
    }
    setModalType(null);
  };

  const handleDeleteConfirm = () => {
    setSources(sources.filter((s) => s.id !== selectedItem.id));
    setModalType(null);
  };

  /* ── SUMMARY COUNTS ── */
  const approvedCount = sources.filter((i) => i.status === "Approved").length;
  const pendingCount = sources.filter((i) => i.status === "Pending").length;
  const rejectedCount = sources.filter((i) => i.status === "Rejected").length;

  return (
    <div className="space-y-6">
      {/* ── HEADER ── */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Project Management</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Final Source Management</h1>
          <p className="mt-2 text-sm text-slate-500">Manage uploaded source files, project versions and approvals.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50">
            <Download size={16} /> Export
          </button>
          <button
            onClick={openAddModal}
            className="flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition-all hover:bg-blue-700"
          >
            <Plus size={16} /> Add Source
          </button>
        </div>
      </div>

      {/* ── SUMMARY CARDS ── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { title: "TOTAL SOURCES", value: sources.length, sub: "Uploaded source files", border: "border-l-blue-500", iconBg: "bg-blue-50", iconColor: "text-blue-600", Icon: FolderKanban },
          { title: "APPROVED", value: approvedCount, sub: "Approved projects", border: "border-l-emerald-500", iconBg: "bg-emerald-50", iconColor: "text-emerald-600", Icon: BadgeCheck },
          { title: "PENDING", value: pendingCount, sub: "Waiting approvals", border: "border-l-amber-500", iconBg: "bg-amber-50", iconColor: "text-amber-600", Icon: Clock3 },
          { title: "REJECTED", value: rejectedCount, sub: "Rejected files", border: "border-l-red-500", iconBg: "bg-red-50", iconColor: "text-red-600", Icon: AlertCircle },
        ].map(({ title, value, sub, border, iconBg, iconColor, Icon }) => (
          <div key={title} className={`relative overflow-hidden rounded-2xl border border-slate-200 border-l-[3px] ${border} bg-white px-5 py-5 shadow-sm`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{title}</p>
                <h2 className="mt-3 text-[34px] font-bold leading-none tracking-tight text-slate-900">{String(value).padStart(2, "0")}</h2>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}>
                <Icon size={18} className={iconColor} />
              </div>
            </div>
            <p className="mt-4 text-xs font-medium text-slate-500">{sub}</p>
          </div>
        ))}
      </div>

      {/* ── TABLE WRAPPER ── */}
      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
        {/* TOOLBAR */}
        <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT FILTERS */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={projectStatus}
              onChange={(e) => { setProjectStatus(e.target.value); setCurrentPage(1); }}
              className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="latest">Latest Uploader</option>
              <option value="name-asc">Name A–Z</option>
              <option value="name-desc">Name Z–A</option>
              <option value="status">Status Order</option>
            </select>

            <select
              value={versionFilter}
              onChange={(e) => { setVersionFilter(e.target.value); setCurrentPage(1); }}
              className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="All">All Versions</option>
              <option value="v1">v1.x</option>
              <option value="v2">v2.x</option>
              <option value="v3">v3.x</option>
            </select>

            <button onClick={handleReset} className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 hover:bg-slate-50">
              <RefreshCcw size={14} /> Reset
            </button>
          </div>

          {/* RIGHT SEARCH & PER PAGE */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 focus-within:border-blue-500">
              <Search size={14} className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Search sources..."
                className="bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Show</span>
              <select
                value={rowsPerPage}
                onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
              <span>per page</span>
            </div>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100/70">
              <tr className="border-b border-slate-200">
                {["Code", "Title", "Upload On", "Upload By", "Version", "Size", "Status", "Action"].map((head) => (
                  <th key={head} className="whitespace-nowrap px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.id} className="border-b border-slate-100 transition-all hover:bg-blue-50/40">
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                        <FileText size={16} className="text-blue-600" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">{item.code}</span>
                    </div>
                  </td>
                  <td className="min-w-[220px] px-5 py-4">
                    <p className="text-sm font-semibold text-slate-700">{item.title}</p>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={14} className="text-blue-600" />
                      <span className="text-sm text-slate-600">{item.uploadOn}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                        style={{ background: item.avatarColor + "22", color: item.avatarColor }}
                      >
                        {item.avatar}
                      </div>
                      <span className="text-sm text-slate-600">{item.uploadBy}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{item.version}</span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <span className="text-sm text-slate-600">{item.size}</span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <StatusBadge s={item.status} />
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <ActionMenu
                      onView={() => openViewModal(item)}
                      onEdit={() => openEditModal(item)}
                      onDelete={() => openDeleteModal(item)}
                    />
                  </td>
                </tr>
              ))}

              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                        <FileText size={28} className="text-slate-400" />
                      </div>
                      <p className="text-sm font-semibold text-slate-600">No Sources Found</p>
                      <p className="text-xs text-slate-400">Try changing filters or search keyword.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER / PAGINATION */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/50 px-5 py-4">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-700">{startRow}</span> to{" "}
            <span className="font-semibold text-slate-700">{endRow}</span> of{" "}
            <span className="font-semibold text-slate-700">{filteredData.length}</span> records
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={safePage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-40"
            >
              <ChevronLeft size={15} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setCurrentPage(pg)}
                className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold ${
                  safePage === pg ? "bg-blue-600 text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {pg}
              </button>
            ))}

            <button
              disabled={safePage === totalPages}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-40"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ================= MODALS OVERLAYS ================= */}

      {/* VIEW DETAILS MODAL */}
      {modalType === "view" && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-800">Source Profile View</h3>
              <button onClick={() => setModalType(null)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>
            <div className="mt-4 space-y-3.5">
              <div><span className="text-xs uppercase text-slate-400 font-medium">Code ID</span><p className="text-sm font-semibold text-slate-800">{selectedItem.code}</p></div>
              <div><span className="text-xs uppercase text-slate-400 font-medium">Title/Subject</span><p className="text-sm font-semibold text-slate-800">{selectedItem.title}</p></div>
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-xs uppercase text-slate-400 font-medium">Version</span><p className="text-sm text-slate-700">{selectedItem.version}</p></div>
                <div><span className="text-xs uppercase text-slate-400 font-medium">File Size</span><p className="text-sm text-slate-700">{selectedItem.size}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-xs uppercase text-slate-400 font-medium">Uploaded By</span><p className="text-sm text-slate-700">{selectedItem.uploadBy}</p></div>
                <div><span className="text-xs uppercase text-slate-400 font-medium">Date Stamp</span><p className="text-sm text-slate-700">{selectedItem.uploadOn}</p></div>
              </div>
              <div>
                <span className="text-xs uppercase text-slate-400 font-medium block mb-1">Status Badge</span>
                <StatusBadge s={selectedItem.status} />
              </div>
            </div>
            <button onClick={() => setModalType(null)} className="mt-6 w-full h-10 bg-slate-100 font-semibold text-slate-700 rounded-xl hover:bg-slate-200 transition">Close View</button>
          </div>
        </div>
      )}

      {/* ADD / EDIT MODAL FORMS */}
      {(modalType === "add" || modalType === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <form onSubmit={handleSave} className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-800">{modalType === "add" ? "Create New Source Record" : "Modify Source Properties"}</h3>
              <button type="button" onClick={() => setModalType(null)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Project Code Reference</label>
              <input type="text" required value={formData.code} onChange={(e) => setFormData({ ...formData, code: e.target.value })} className="w-full h-10 border border-slate-200 px-3 rounded-xl text-sm outline-none focus:border-blue-500" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Source Project Title</label>
              <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Analytics UI Build" className="w-full h-10 border border-slate-200 px-3 rounded-xl text-sm outline-none focus:border-blue-500" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Version Tag</label>
                <input type="text" required value={formData.version} onChange={(e) => setFormData({ ...formData, version: e.target.value })} className="w-full h-10 border border-slate-200 px-3 rounded-xl text-sm outline-none focus:border-blue-500" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500">Allocation Size</label>
                <input type="text" required value={formData.size} onChange={(e) => setFormData({ ...formData, size: e.target.value })} className="w-full h-10 border border-slate-200 px-3 rounded-xl text-sm outline-none focus:border-blue-500" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Review Approval Status</label>
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full h-10 border border-slate-200 px-3 rounded-xl bg-white text-sm outline-none focus:border-blue-500">
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button type="button" onClick={() => setModalType(null)} className="w-1/2 h-10 border border-slate-200 rounded-xl font-medium text-slate-600 hover:bg-slate-50 transition">Cancel</button>
              <button type="submit" className="w-1/2 h-10 bg-blue-600 rounded-xl font-semibold text-white hover:bg-blue-700 transition">Save Record</button>
            </div>
          </form>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {modalType === "delete" && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 mb-4">
              <Trash2 size={22} />
            </div>
            <h3 className="text-base font-bold text-slate-800">Remove Source File?</h3>
            <p className="text-sm text-slate-500 mt-1.5">Are you sure you want to delete <span className="font-semibold text-slate-700">{selectedItem.code}</span>? This item cannot be recovered.</p>
            <div className="flex items-center gap-2 mt-5">
              <button onClick={() => setModalType(null)} className="w-1/2 h-10 border border-slate-200 rounded-xl font-medium text-slate-600 hover:bg-slate-50 transition">Cancel</button>
              <button onClick={handleDeleteConfirm} className="w-1/2 h-10 bg-red-600 rounded-xl font-semibold text-white hover:bg-red-700 transition">Confirm Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}