import React, { useEffect, useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Search,
  CalendarDays,
  Clock3,
  Eye,
  Download,
  Plus,
  ChevronLeft,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";

const TimesheetApprovalPage = () => {
  /* ─────────────────── STATE MANAGEMENT ─────────────────── */
  const [approvals, setApprovals] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState(null);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  /* ─────────────────── INITIAL DATA LOAD ─────────────────── */
  useEffect(() => {
    loadApprovals();
  }, []);

  const loadApprovals = async () => {
    try {
      const response = [
        {
          id: 1,
          fromDate: "01/06/2026",
          toDate: "07/06/2026",
          comments: "Weekly timesheet approval",
          status: "Pending",
        },
        {
          id: 2,
          fromDate: "10/05/2026",
          toDate: "15/05/2026",
          comments: "Sprint completion",
          status: "Approved",
        },
        {
          id: 3,
          fromDate: "24/04/2026",
          toDate: "30/04/2026",
          comments: "Monthly review submission",
          status: "Rejected",
        },
      ];
      setApprovals(response);
    } catch (error) {
      console.error(error);
    }
  };

  /* ─────────────────── ACTIONS ─────────────────── */
  const handleSubmit = async () => {
    if (!fromDate) {
      alert("Please select From Date");
      return;
    }
    if (!toDate) {
      alert("Please select To Date");
      return;
    }
    if (toDate < fromDate) {
      alert("To Date cannot be before From Date");
      return;
    }

    try {
      setLoading(true);
      const newApproval = {
        id: Date.now(),
        fromDate: fromDate.toLocaleDateString("en-GB"), // Formats as dd/mm/yyyy
        toDate: toDate.toLocaleDateString("en-GB"),
        comments: comments || "---",
        status: "Pending",
      };

      setApprovals((prev) => [newApproval, ...prev]);
      setShowModal(false);

      // Reset Form Fields
      setFromDate(null);
      setToDate(null);
      setComments("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────── COMPUTED STATS ─────────────────── */
  const stats = useMemo(() => {
    return {
      total: approvals.length,
      approved: approvals.filter((a) => a.status === "Approved").length,
      pending: approvals.filter((a) => a.status === "Pending").length,
    };
  }, [approvals]);

  /* ─────────────────── FILTER & PAGINATION LOGIC ─────────────────── */
  const filteredData = useMemo(() => {
    return approvals.filter((item) => {
      const matchesSearch =
        item.comments.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fromDate.includes(searchTerm) ||
        item.toDate.includes(searchTerm);

      const matchesStatus =
        statusFilter === "All Status" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [approvals, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const safePage = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, safePage]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10";
      case "Rejected":
        return "bg-red-50 text-red-700 ring-1 ring-red-600/10";
      default:
        return "bg-amber-50 text-amber-700 ring-1 ring-amber-600/10";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-sans">
      
      {/* ─── HEADER SECTION ─── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-bold tracking-tight text-slate-900">
            Timesheet Approval
          </h1>
          <p className="mt-1 text-sm font-medium text-blue-600/80">
            Manage and submit timesheet approval requests.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
            <Download size={16} className="text-slate-500" />
            Export
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={16} />
            New Request
          </button>
        </div>
      </div>

      {/* ─── STATS CARDS GRID ─── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 mb-8">
        {[
          {
            title: "TOTAL REQUESTS",
            value: stats.total,
            sub: "All generated submissions",
            border: "border-l-blue-500",
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
            Icon: Clock3,
          },
          {
            title: "APPROVED REQUESTS",
            value: stats.approved,
            sub: "Completed reviews",
            border: "border-l-emerald-500",
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
            Icon: CheckCircle2,
          },
          {
            title: "PENDING APPROVAL",
            value: stats.pending,
            sub: "Awaiting administrator action",
            border: "border-l-amber-500",
            iconBg: "bg-amber-50",
            iconColor: "text-amber-600",
            Icon: AlertCircle,
          },
        ].map(({ title, value, sub, border, iconBg, iconColor, Icon }) => (
          <div
            key={title}
            className={`relative overflow-hidden rounded-xl bg-white px-5 py-5 shadow-sm border-l-4 ${border}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  {title}
                </p>
                <h2 className="mt-3 text-[34px] font-bold leading-none tracking-tight text-slate-900">
                  {value}
                </h2>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}>
                <Icon size={18} className={iconColor} />
              </div>
            </div>
            <p className="mt-4 text-xs font-medium text-slate-500">{sub}</p>
          </div>
        ))}
      </div>

      {/* ─── MAIN FILTER & DATA TABLE CARD ─── */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        
        {/* FILTERS TOOLBAR */}
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search comments or dates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none"
            >
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        {/* TABLE COMPONENT */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-slate-50/70 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">From Date</th>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">To Date</th>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Comments</th>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-sm font-medium text-slate-400">No requests match your current criteria.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-700">{item.fromDate}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-700">{item.toDate}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{item.comments}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusStyle(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedApproval(item)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-blue-600"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION COMPONENT BAR */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-700">{paginatedData.length}</span> of{" "}
            <span className="font-semibold text-slate-700">{filteredData.length}</span> entries
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={safePage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="flex h-8 w-8 items-center justify-center rounded border border-slate-300 bg-white text-slate-600 transition disabled:opacity-40 hover:bg-slate-50"
            >
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setCurrentPage(pg)}
                className={`flex h-8 w-8 items-center justify-center rounded text-sm font-semibold ${
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
              className="flex h-8 w-8 items-center justify-center rounded border border-slate-300 bg-white text-slate-600 transition disabled:opacity-40 hover:bg-slate-50"
            >
              <ChevronLeft size={15} className="rotate-180" />
            </button>
          </div>
        </div>
      </div>

      {/* ─── NEW REQUEST MODAL (FORM WITH DATEPICKERS) ─── */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">New Approval Request</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block mb-1.5 text-xs font-bold text-slate-700 tracking-wide uppercase">
                    From Date *
                  </label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 z-10 pointer-events-none" />
                    <DatePicker
                      selected={fromDate}
                      onChange={(date) => setFromDate(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select From Date"
                      className="w-full h-11 pl-10 pr-4 border border-slate-200 rounded-xl text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1.5 text-xs font-bold text-slate-700 tracking-wide uppercase">
                    To Date *
                  </label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 z-10 pointer-events-none" />
                    <DatePicker
                      selected={toDate}
                      onChange={(date) => setToDate(date)}
                      minDate={fromDate}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select To Date"
                      className="w-full h-11 pl-10 pr-4 border border-slate-200 rounded-xl text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1.5 text-xs font-bold text-slate-700 tracking-wide uppercase">
                  Comments
                </label>
                <textarea
                  rows={4}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Enter dynamic workflow comments..."
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm resize-none focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-100">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-slate-200 bg-white text-sm font-semibold rounded-xl text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-sm font-semibold text-white rounded-xl shadow-sm transition disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── DETAIL VIEW MODAL ─── */}
      {selectedApproval && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-lg text-slate-900">Approval Details</h3>
              <button
                onClick={() => setSelectedApproval(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">From Date</p>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedApproval.fromDate}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">To Date</p>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedApproval.toDate}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-50">
                <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Comments</p>
                <p className="text-sm font-medium text-slate-700 mt-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {selectedApproval.comments}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-50">
                <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-1.5">Current Status</p>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusStyle(selectedApproval.status)}`}>
                  {selectedApproval.status}
                </span>
              </div>
            </div>
            
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedApproval(null)}
                className="px-4 py-2 border border-slate-200 bg-white text-xs font-bold rounded-xl text-slate-700 hover:bg-slate-50"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TimesheetApprovalPage;