import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Search,
  MoreVertical,
  FolderKanban,
  CheckCircle2,
  PauseCircle,
  XCircle,
  SlidersHorizontal,
  Eye,
  Pencil,
  Plus,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const Retainer = () => {
  /* ─────────────────── STATE MANAGEMENT ─────────────────── */
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Dynamic entries count state

  const projects = [
    { id: 1, code: "ERP001", name: "ERP Portal", status: "Active" },
    { id: 2, code: "CRM001", name: "CRM System", status: "Hold" },
    { id: 3, code: "INV001", name: "Inventory Management", status: "Closed" },
    { id: 4, code: "HRM001", name: "HRMS Portal", status: "Active" },
    { id: 5, code: "POS001", name: "POS System", status: "Active" },
    { id: 6, code: "ACC001", name: "Accounting System", status: "Hold" },
  ];

  /* ─────────────────── FILTERING & METRICS ─────────────────── */
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesStatus = statusFilter === "All" || project.status === statusFilter;
      const matchesSearch =
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.code.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);

  const handleFilterChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleEntriesChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  /* ─────────────────── PAGINATION LOGIC ─────────────────── */
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage) || 1;
  const safePage = Math.min(currentPage, totalPages);
  
  const paginatedProjects = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage;
    return filteredProjects.slice(start, start + itemsPerPage);
  }, [filteredProjects, safePage, itemsPerPage]);

  const metrics = useMemo(() => {
    return {
      total: projects.length,
      active: projects.filter((p) => p.status === "Active").length,
      hold: projects.filter((p) => p.status === "Hold").length,
      closed: projects.filter((p) => p.status === "Closed").length,
    };
  }, [projects]);

  const getStatusStyles = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-emerald-700 ring-emerald-600/10";
      case "Hold":
        return "bg-amber-50 text-amber-700 ring-amber-600/10";
      case "Closed":
        return "bg-rose-50 text-rose-700 ring-rose-600/10";
      default:
        return "bg-slate-50 text-slate-700 ring-slate-600/10";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-sans">
      
      {/* ─── HEADER SECTION ─── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Project Management
          </p>
          <h1 className="text-[28px] font-bold tracking-tight text-slate-900 mt-0.5">
            Retainer Project List
          </h1>
          <p className="text-sm font-medium text-blue-600/80 mt-1">
            Manage, classify, and view structural organizational project assets.
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      {/* ─── METRIC RATIO SUMMARY DISPLAY ─── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="relative overflow-hidden rounded-xl bg-white px-5 py-5 shadow-sm border border-slate-200/60 border-l-4 border-l-blue-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">TOTAL PROJECTS</p>
              <h2 className="mt-3 text-[32px] font-bold tracking-tight text-slate-900 leading-none">{metrics.total}</h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FolderKanban size={18} />
            </div>
          </div>
          <p className="mt-4 text-xs font-medium text-slate-500">All structural system nodes</p>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-white px-5 py-5 shadow-sm border border-slate-200/60 border-l-4 border-l-emerald-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">ACTIVE STATUS</p>
              <h2 className="mt-3 text-[32px] font-bold tracking-tight text-slate-900 leading-none">{metrics.active}</h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <p className="mt-4 text-xs font-medium text-slate-500">Currently executing logs</p>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-white px-5 py-5 shadow-sm border border-slate-200/60 border-l-4 border-l-amber-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">HOLD STATUS</p>
              <h2 className="mt-3 text-[32px] font-bold tracking-tight text-slate-900 leading-none">{metrics.hold}</h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <PauseCircle size={18} />
            </div>
          </div>
          <p className="mt-4 text-xs font-medium text-slate-500">Temporarily paused items</p>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-white px-5 py-5 shadow-sm border border-slate-200/60 border-l-4 border-l-rose-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">CLOSED STATUS</p>
              <h2 className="mt-3 text-[32px] font-bold tracking-tight text-slate-900 leading-none">{metrics.closed}</h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <XCircle size={18} />
            </div>
          </div>
          <p className="mt-4 text-xs font-medium text-slate-500">Archived or finalized indices</p>
        </div>
      </div>

      {/* ─── FILTER CONTROL PANEL WITH TOP ROW ACTION BUTTON ─── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-6">
        
        {/* Header Action Row */}
        <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <SlidersHorizontal size={16} className="text-blue-600" />
            Workspace Filter Criteria
          </div>
          <button className="h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-blue-500/10 transition px-4">
            <Plus size={14} />
            Add Project
          </button>
        </div>
        
        {/* Form Inputs Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">
              Project Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="w-full h-11 border border-slate-200 bg-slate-50/50 rounded-xl px-4 text-sm font-medium focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Hold">Hold</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">
              Search Parameters
            </label>
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search project code or name..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full h-11 pl-10 pr-4 border border-slate-200 bg-slate-50/50 rounded-xl text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
              />
            </div>
          </div>

          <div>
            <button 
              onClick={() => {
                setStatusFilter("All");
                setSearch("");
                setCurrentPage(1);
              }}
              className="w-full h-11 border border-slate-200 hover:bg-slate-50 rounded-xl text-sm font-semibold text-slate-600 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* ─── DATA TABLE WORKSPACE WITH "SHOW ENTRIES" DROPDOWN ─── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Table Header Row containing Show Entries layout */}
        <div className="px-6 py-4 border-b border-slate-100 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="font-bold text-slate-900">Project Reference Repository</h2>
          
          {/* Entries Showing Select field */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            <span>Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => handleEntriesChange(e.target.value)}
              className="h-8 border border-slate-200 bg-slate-50 rounded-lg px-2 text-xs font-bold focus:outline-none focus:border-blue-500 text-slate-700"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-slate-50/70 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Project Code</th>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Project Name</th>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Operational Status</th>
                <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Action Grid</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedProjects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-16 text-sm font-medium text-slate-400">
                    No matching structural data found within selected vectors.
                  </td>
                </tr>
              ) : (
                paginatedProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-blue-600 tracking-wide">{project.code}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">{project.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${getStatusStyles(project.status)}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center relative whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button 
                          onClick={() => setActiveMenuId(activeMenuId === project.id ? null : project.id)}
                          className="p-2 rounded-lg border border-slate-100 hover:bg-slate-100 text-slate-500 transition"
                        >
                          <MoreVertical size={16} />
                        </button>
                        
                        {activeMenuId === project.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                            <div className="absolute right-24 mt-2 w-36 rounded-lg bg-white p-1 shadow-lg ring-1 ring-black/5 z-20 text-left border border-slate-100">
                              <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
                                <Eye size={14} className="text-slate-400" /> View Details
                              </button>
                              <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
                                <Pencil size={14} className="text-slate-400" /> Modify Matrix
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ─── PAGINATION PANEL ─── */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-white">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-700">{paginatedProjects.length}</span> of{" "}
            <span className="font-semibold text-slate-700">{filteredProjects.length}</span> recorded instances
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={safePage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white"
            >
              <ChevronLeft size={15} />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setCurrentPage(pg)}
                className={`flex h-8 w-8 items-center justify-center rounded text-xs font-bold transition-all shadow-sm ${
                  safePage === pg
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {pg}
              </button>
            ))}

            <button
              disabled={safePage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Retainer;