import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Search,
  MoreVertical,
  SlidersHorizontal,
  Eye,
  Pencil,
  Plus,
  ChevronLeft,
  ChevronRight,
  X,
  Clock,
  CheckCircle2,
  PauseCircle,
  BriefcaseBusiness
} from "lucide-react";

const FixedPrice = () => {
  /* ─────────────────── STATE MANAGEMENT ─────────────────── */
  const [typeFilter, setTypeFilter] = useState("All"); 
  const [projectFilter, setProjectFilter] = useState("All"); // New Project Dropdown Filter
  const [search, setSearch] = useState("");
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Modals Toggle Toggles
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Form Field State Values
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newProject, setNewProject] = useState("");
  const [newModule, setNewModule] = useState("");
  const [newTask, setNewTask] = useState("");
  const [newStart, setNewStart] = useState("");
  const [newEnd, setNewEnd] = useState("");
  const [newHours, setNewHours] = useState("");
  const [newType, setNewType] = useState("Billable");

  // Main Records Dataset
  const [records, setRecords] = useState([
    { id: 1, date: "2026-06-10", project: "ERP Dashboard", module: "Frontend", task: "Build Timesheet UI Components", start: "10:15 AM", end: "08:00 PM", hours: 9.75, type: "Non Billable" },
    { id: 2, date: "2026-06-09", project: "CRM System", module: "Backend", task: "API Integration for Task Module", start: "09:00 AM", end: "06:00 PM", hours: 9.00, type: "Billable" },
    { id: 3, date: "2026-06-09", project: "Inventory Mgmt", module: "Database", task: "Schema Design & Optimization", start: "11:00 AM", end: "04:30 PM", hours: 5.50, type: "Billable" },
    { id: 4, date: "2026-06-08", project: "HRMS Portal", module: "Frontend", task: "Authentication Logic & Redux Setup", start: "08:30 AM", end: "05:00 PM", hours: 8.50, type: "Billable" },
    { id: 5, date: "2026-06-08", project: "POS System", module: "Testing", task: "Write End-to-End Cypress Tests", start: "01:00 PM", end: "06:00 PM", hours: 5.00, type: "Non Billable" },
    { id: 6, date: "2026-06-05", project: "Accounting App", module: "Backend", task: "Tax Calculation Engine Fixes", start: "10:00 AM", end: "07:30 PM", hours: 9.50, type: "Billable" },
    { id: 7, date: "2026-06-04", project: "ERP Dashboard", module: "DevOps", task: "Vercel Deployment & Secret Configs", start: "09:15 AM", end: "12:15 PM", hours: 3.00, type: "Non Billable" },
  ]);

  // Extract unique projects list dynamically for the selector filter choices
  const uniqueProjectsList = useMemo(() => {
    const list = records.map(r => r.project);
    return ["All", ...new Set(list)];
  }, [records]);

  /* ─────────────────── REAL-TIME HOURS METRICS LOGIC ─────────────────── */
  const metrics = useMemo(() => {
    const total = records.reduce((sum, item) => sum + item.hours, 0);
    const billable = records.filter(r => r.type === "Billable").reduce((sum, item) => sum + item.hours, 0);
    const nonBillable = records.filter(r => r.type === "Non Billable").reduce((sum, item) => sum + item.hours, 0);
    
    return {
      total: total.toFixed(2),
      billable: billable.toFixed(2),
      nonBillable: nonBillable.toFixed(2)
    };
  }, [records]);

  /* ─────────────────── REACTIVE FILTERING LOGIC ─────────────────── */
  const filteredRecords = useMemo(() => {
    return records.filter((item) => {
      const matchesType = typeFilter === "All" || item.type === typeFilter;
      const matchesProject = projectFilter === "All" || item.project === projectFilter;
      const matchesSearch =
        item.project.toLowerCase().includes(search.toLowerCase()) ||
        item.module.toLowerCase().includes(search.toLowerCase()) ||
        item.task.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesProject && matchesSearch;
    });
  }, [records, search, typeFilter, projectFilter]);

  /* ─────────────────── EVENT HANDLERS ─────────────────── */
  const handleTypeChange = (value) => {
    setTypeFilter(value);
    setCurrentPage(1);
  };

  const handleProjectFilterChange = (value) => {
    setProjectFilter(value);
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

  const handleResetFilters = () => {
    setTypeFilter("All");
    setProjectFilter("All");
    setSearch("");
    setCurrentPage(1);
  };

  // Open Actions View Handler
  const handleOpenViewModal = (item) => {
    setSelectedRecord(item);
    setIsViewModalOpen(true);
    setActiveMenuId(null);
  };

  // Open Edit Action Form Population
  const handleOpenEditModal = (item) => {
    setSelectedRecord(item);
    setNewDate(item.date);
    setNewProject(item.project);
    setNewModule(item.module);
    setNewTask(item.task);
    setNewStart(item.start);
    setNewEnd(item.end);
    setNewHours(item.hours.toString());
    setNewType(item.type);
    setIsEditModalOpen(true);
    setActiveMenuId(null);
  };

  const handleAddSubmission = (e) => {
    e.preventDefault();
    if (!newProject.trim() || !newHours) return;

    const newlyCreatedItem = {
      id: Date.now(),
      date: newDate || new Date().toISOString().split('T')[0],
      project: newProject,
      module: newModule || "General",
      task: newTask || "Development",
      start: newStart || "--",
      end: newEnd || "--",
      hours: parseFloat(newHours),
      type: newType
    };

    setRecords([newlyCreatedItem, ...records]);
    resetFormStates();
    setIsModalOpen(false);
    setCurrentPage(1);
  };

  const handleEditSubmission = (e) => {
    e.preventDefault();
    if (!selectedRecord) return;

    setRecords(records.map(rec => {
      if (rec.id === selectedRecord.id) {
        return {
          ...rec,
          date: newDate,
          project: newProject,
          module: newModule,
          task: newTask,
          start: newStart,
          end: newEnd,
          hours: parseFloat(newHours) || 0,
          type: newType
        };
      }
      return rec;
    }));

    resetFormStates();
    setIsEditModalOpen(false);
  };

  const resetFormStates = () => {
    setNewDate("");
    setNewProject("");
    setNewModule("");
    setNewTask("");
    setNewStart("");
    setNewEnd("");
    setNewHours("");
    setNewType("Billable");
    setSelectedRecord(null);
  };

  /* ─────────────────── PAGINATION COMPUTATION ─────────────────── */
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
  const safePage = Math.max(1, Math.min(currentPage, totalPages));
  
  const paginatedRecords = useMemo(() => {
    const startOffset = (safePage - 1) * itemsPerPage;
    const endOffset = startOffset + itemsPerPage;
    return filteredRecords.slice(startOffset, endOffset);
  }, [filteredRecords, safePage, itemsPerPage]);

  const recordStartIndex = filteredRecords.length === 0 ? 0 : (safePage - 1) * itemsPerPage + 1;
  const recordEndIndex = Math.min(safePage * itemsPerPage, filteredRecords.length);

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-sans">
      
      {/* ─── HEADER SECTION ─── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <p className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Project Management
          </p>
          <h1 className="text-[28px] font-bold tracking-tight text-slate-900 mt-0.5">
            Project List (Fixed Price)
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

      {/* ─── THREE TOP METRICS CARDS ROW ─── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
        {/* TOTAL HOURS CARD */}
        <div className="relative overflow-hidden rounded-xl bg-white px-5 py-5 shadow-sm border border-slate-200/60 border-l-4 border-l-blue-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">TOTAL HOURS</p>
              <h2 className="mt-3 text-[32px] font-bold tracking-tight text-slate-900 leading-none">{metrics.total} <span className="text-sm font-medium text-slate-400">hrs</span></h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Clock size={18} />
            </div>
          </div>
          <p className="mt-4 text-xs font-medium text-slate-500">All cumulative dashboard logged durations</p>
        </div>

        {/* BILLABLE HOURS CARD */}
        <div className="relative overflow-hidden rounded-xl bg-white px-5 py-5 shadow-sm border border-slate-200/60 border-l-4 border-l-emerald-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">BILLABLE HOURS</p>
              <h2 className="mt-3 text-[32px] font-bold tracking-tight text-slate-900 leading-none">{metrics.billable} <span className="text-sm font-medium text-slate-400">hrs</span></h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <p className="mt-4 text-xs font-medium text-slate-500">Production hours allocated to scope invoicing</p>
        </div>

        {/* NON-BILLABLE HOURS CARD */}
        <div className="relative overflow-hidden rounded-xl bg-white px-5 py-5 shadow-sm border border-slate-200/60 border-l-4 border-l-amber-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">NON-BILLABLE HOURS</p>
              <h2 className="mt-3 text-[32px] font-bold tracking-tight text-slate-900 leading-none">{metrics.nonBillable} <span className="text-sm font-medium text-slate-400">hrs</span></h2>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <PauseCircle size={18} />
            </div>
          </div>
          <p className="mt-4 text-xs font-medium text-slate-500">Internal operational administrative metrics</p>
        </div>
      </div>

      {/* ─── FILTER CRITERIA TOOLBAR ─── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 mb-6">
        <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
            <SlidersHorizontal size={16} className="text-blue-600" />
            Workspace Filter Criteria
          </div>
          
          <button 
            onClick={() => { resetFormStates(); setIsModalOpen(true); }}
            className="h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-blue-500/10 transition px-4"
          >
            <Plus size={14} />
            Add Entry
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">
              Project Name
            </label>
            <select
              value={projectFilter}
              onChange={(e) => handleProjectFilterChange(e.target.value)}
              className="w-full h-11 border border-slate-200 bg-slate-50/50 rounded-xl px-3 text-sm font-medium focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 cursor-pointer"
            >
              {uniqueProjectsList.map((proj, idx) => (
                <option key={idx} value={proj}>{proj === "All" ? "All Projects" : proj}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">
              Billing Scope Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full h-11 border border-slate-200 bg-slate-50/50 rounded-xl px-3 text-sm font-medium focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 cursor-pointer"
            >
              <option value="All">All Entry Types</option>
              <option value="Billable">Billable</option>
              <option value="Non Billable">Non Billable</option>
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
                placeholder="Search module or task descriptor..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full h-11 pl-10 pr-4 border border-slate-200 bg-slate-50/50 rounded-xl text-sm focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
              />
            </div>
          </div>

          <div>
            <button 
              onClick={handleResetFilters}
              className="w-full h-11 border border-slate-200 hover:bg-slate-50 rounded-xl text-sm font-semibold text-slate-600 transition"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* ─── CUSTOM TIME LOG DATA TABLE CARD ─── */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* RE-LOCATED DROPDOWN ALIGNED TO THE RIGHT SIDE */}
        <div className="px-6 py-4 border-b border-slate-100 bg-white flex items-center justify-between gap-4">
          <h2 className="font-bold text-slate-900">Project Timesheet Repository</h2>
          
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200/60">
            <span className="text-slate-500">Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => handleEntriesChange(e.target.value)}
              className="bg-transparent text-xs font-extrabold focus:outline-none text-blue-600 cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-slate-500">entries</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-slate-50/70 border-b border-slate-100">
              <tr>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Date</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Project</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Module</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Task</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Start Time</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">End Time</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Total Hours</th>
                <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Type</th>
                <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {paginatedRecords.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-16 text-sm font-medium text-slate-400">
                    No matching log data found within selected bounds.
                  </td>
                </tr>
              ) : (
                paginatedRecords.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-4 text-xs font-bold text-slate-500 whitespace-nowrap">{item.date}</td>
                    <td className="px-5 py-4 text-sm font-bold text-blue-600 tracking-wide">{item.project}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-slate-900">{item.module}</td>
                    <td className="px-5 py-4 text-sm text-slate-600 max-w-xs truncate" title={item.task}>{item.task}</td>
                    <td className="px-5 py-4 text-xs font-semibold text-slate-600 bg-slate-50/40">{item.start}</td>
                    <td className="px-5 py-4 text-xs font-semibold text-slate-600 bg-slate-50/40">{item.end}</td>
                    <td className="px-5 py-4 text-sm font-bold text-slate-900">{item.hours.toFixed(2)}</td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ${
                        item.type === "Billable" 
                          ? "bg-emerald-50 text-emerald-700 ring-emerald-600/10" 
                          : "bg-amber-50 text-amber-700 ring-amber-600/10"
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center relative whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button 
                          onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                          className="p-1.5 rounded-lg border border-slate-100 hover:bg-slate-100 text-slate-500 transition"
                        >
                          <MoreVertical size={15} />
                        </button>
                        
                        {activeMenuId === item.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setActiveMenuId(null)} />
                            <div className="absolute right-12 mt-1 w-32 rounded-lg bg-white p-1 shadow-lg ring-1 ring-black/5 z-20 text-left border border-slate-100">
                              <button 
                                type="button"
                                onClick={() => handleOpenViewModal(item)} 
                                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                              >
                                <Eye size={13} className="text-slate-400" /> View Log
                              </button>
                              <button 
                                type="button"
                                onClick={() => handleOpenEditModal(item)} 
                                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                              >
                                <Pencil size={13} className="text-slate-400" /> Edit Entry
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

        {/* ─── PAGINATION BAR CONTROL PANEL ─── */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-white">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-700">{recordStartIndex}</span> to{" "}
            <span className="font-semibold text-slate-700">{recordEndIndex}</span> of{" "}
            <span className="font-semibold text-slate-700">{filteredRecords.length}</span> recorded entries
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={safePage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
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
              onClick={() => setCurrentPage((p) => p - 1)}
              className="flex h-8 w-8 items-center justify-center rounded border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* ─── ADD ENTRY MODAL WINDOW ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-base">
                <Clock size={18} className="text-blue-600" /> Log Project Work Hours
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-600 transition"><X size={16} /></button>
            </div>
            <form onSubmit={handleAddSubmission} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Date</label>
                  <input type="date" required value={newDate} onChange={(e) => setNewDate(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Project Scope</label>
                  <input type="text" required placeholder="e.g. ERP Dashboard" value={newProject} onChange={(e) => setNewProject(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Module</label>
                  <input type="text" placeholder="e.g. Frontend" value={newModule} onChange={(e) => setNewModule(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Scope Category</label>
                  <select value={newType} onChange={(e) => setNewType(e.target.value)} className="w-full h-10 px-2 border border-slate-200 bg-white rounded-lg text-sm focus:border-blue-500 focus:outline-none">
                    <option value="Billable">Billable</option>
                    <option value="Non Billable">Non Billable</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Task Description</label>
                <input type="text" required placeholder="Describe task..." value={newTask} onChange={(e) => setNewTask(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Start Time</label>
                  <input type="text" placeholder="10:00 AM" value={newStart} onChange={(e) => setNewStart(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">End Time</label>
                  <input type="text" placeholder="06:30 PM" value={newEnd} onChange={(e) => setNewEnd(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Total Hours</label>
                  <input type="number" step="0.01" required placeholder="8.5" value={newHours} onChange={(e) => setNewHours(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none" />
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="h-10 px-4 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="h-10 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold">Commit Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── WORKING EDIT ENTRY MODAL WINDOW ─── */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-base">
                <Pencil size={16} className="text-blue-600" /> Modify Logged Parameters
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="p-1 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-600 transition"><X size={16} /></button>
            </div>
            <form onSubmit={handleEditSubmission} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Date</label>
                  <input type="date" required value={newDate} onChange={(e) => setNewDate(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Project</label>
                  <input type="text" required value={newProject} onChange={(e) => setNewProject(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Module</label>
                  <input type="text" required value={newModule} onChange={(e) => setNewModule(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Type</label>
                  <select value={newType} onChange={(e) => setNewType(e.target.value)} className="w-full h-10 px-2 border border-slate-200 bg-white rounded-lg text-sm focus:border-blue-500 focus:outline-none">
                    <option value="Billable">Billable</option>
                    <option value="Non Billable">Non Billable</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Task Log</label>
                <input type="text" required value={newTask} onChange={(e) => setNewTask(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Start</label>
                  <input type="text" value={newStart} onChange={(e) => setNewStart(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">End</label>
                  <input type="text" value={newEnd} onChange={(e) => setNewEnd(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Hours</label>
                  <input type="number" step="0.01" required value={newHours} onChange={(e) => setNewHours(e.target.value)} className="w-full h-10 px-3 border border-slate-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none" />
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="h-10 px-4 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel Changes</button>
                <button type="submit" className="h-10 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold">Save Dynamic Updates</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── WORKING VIEW LOG METRIC MODAL ─── */}
      {isViewModalOpen && selectedRecord && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-md rounded-xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-base">
                <BriefcaseBusiness size={18} className="text-blue-600" /> Operational Log View
              </h3>
              <button onClick={() => setIsViewModalOpen(false)} className="p-1 rounded-lg border border-slate-200 bg-white text-slate-400 hover:text-slate-600 transition"><X size={16} /></button>
            </div>
            <div className="p-6 space-y-3.5 text-sm">
              <div className="grid grid-cols-2 pb-2 border-b border-slate-100"><span className="text-slate-400 font-medium">Logged Date:</span><span className="text-slate-800 font-bold text-right">{selectedRecord.date}</span></div>
              <div className="grid grid-cols-2 pb-2 border-b border-slate-100"><span className="text-slate-400 font-medium">Project Name:</span><span className="text-blue-600 font-bold text-right">{selectedRecord.project}</span></div>
              <div className="grid grid-cols-2 pb-2 border-b border-slate-100"><span className="text-slate-400 font-medium">Module Focus:</span><span className="text-slate-800 font-semibold text-right">{selectedRecord.module}</span></div>
              <div className="pb-2 border-b border-slate-100"><span className="text-slate-400 block font-medium mb-1">Task Breakdown:</span><p className="text-slate-700 font-medium bg-slate-50 p-2.5 rounded-lg border border-slate-200/60 leading-relaxed">{selectedRecord.task}</p></div>
              <div className="grid grid-cols-3 gap-2 text-center bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <div><span className="text-[10px] block font-bold text-slate-400 uppercase">Start</span><span className="text-xs font-bold text-slate-700">{selectedRecord.start}</span></div>
                <div><span className="text-[10px] block font-bold text-slate-400 uppercase">End</span><span className="text-xs font-bold text-slate-700">{selectedRecord.end}</span></div>
                <div><span className="text-[10px] block font-bold text-slate-400 uppercase">Hours</span><span className="text-xs font-extrabold text-slate-900">{selectedRecord.hours.toFixed(2)}</span></div>
              </div>
              <div className="grid grid-cols-2 pt-2"><span className="text-slate-400 font-medium">Classification:</span><span className={`text-right text-xs font-bold ${selectedRecord.type === "Billable" ? "text-emerald-600" : "text-amber-600"}`}>{selectedRecord.type}</span></div>
              <div className="pt-4 flex justify-end"><button onClick={() => setIsViewModalOpen(false)} className="h-9 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition">Dismiss Panel</button></div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FixedPrice;