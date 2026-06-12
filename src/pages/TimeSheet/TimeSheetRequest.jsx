import React, { useEffect, useState, useMemo } from "react";
import {
  Search,
  Clock3,
  Eye,
  Download,
  Plus,
  ChevronLeft,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  History
} from "lucide-react";

const TimesheetEditRequestPage = () => {
  /* ─────────────────── STATE MANAGEMENT ─────────────────── */
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    interval: "",
    validUpto: "",
    comments: "",
  });
  const [loading, setLoading] = useState(false);

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  /* ─────────────────── DATA INITIALIZATION ─────────────────── */
  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const mockData = [
        {
          id: 1,
          interval: "Last 7 Days",
          validUpto: "15 Days",
          comments: "Need to update working hours",
          status: "Pending",
        },
        {
          id: 2,
          interval: "Yesterday",
          validUpto: "7 Days",
          comments: "Wrong task entry link picked",
          status: "Approved",
        },
        {
          id: 3,
          interval: "Today",
          validUpto: "1 Day",
          comments: "Missed tracking breaks logs",
          status: "Rejected",
        },
      ];
      setRequests(mockData);
    } catch (error) {
      console.error(error);
    }
  };

  /* ─────────────────── FORM ACTIONS ─────────────────── */
  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.interval) {
      alert("Please select an Edit Interval");
      return;
    }
    if (!form.validUpto) {
      alert("Please select Validity Duration");
      return;
    }

    try {
      setLoading(true);
      const newRequest = {
        id: Date.now(),
        interval: form.interval,
        validUpto: form.validUpto,
        comments: form.comments || "---",
        status: "Pending",
      };

      setRequests((prev) => [newRequest, ...prev]);
      setShowModal(false);

      // Clear Form Fields
      setForm({
        interval: "",
        validUpto: "",
        comments: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────── CALCULATED STATS ─────────────────── */
  const stats = useMemo(() => {
    return {
      total: requests.length,
      approved: requests.filter((r) => r.status === "Approved").length,
      pending: requests.filter((r) => r.status === "Pending").length,
    };
  }, [requests]);

  /* ─────────────────── SEARCH, FILTERS & PAGINATION ─────────────────── */
  const filteredData = useMemo(() => {
    return requests.filter((item) => {
      const matchesSearch =
        item.comments.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.interval.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.validUpto.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All Status" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [requests, searchTerm, statusFilter]);

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
            Timesheet Edit Request
          </h1>
          <p className="mt-1 text-sm font-medium text-blue-600/80">
            Manage edit requests for submitted timesheets.
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

      {/* ─── METRIC STATS GRID ─── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 mb-8">
        {[
          {
            title: "TOTAL REQUESTS",
            value: stats.total,
            sub: "All submittals requested",
            border: "border-l-blue-500",
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
            Icon: History,
          },
          {
            title: "APPROVED CHANGES",
            value: stats.approved,
            sub: "Unlocked entries granted",
            border: "border-l-emerald-500",
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
            Icon: CheckCircle2,
          },
          {
            title: "PENDING REVIEW",
            value: stats.pending,
            sub: "Awaiting workspace authorization",
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

      {/* ─── INTERACTIVE FILTER & TABLE CONTAINER ─── */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        
        {/* INPUT FILTERS TOOLBAR */}
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search intervals, validity or reasons..."
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

        {/* DATA TABLE GRID */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-slate-50/70 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Interval</th>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Valid Upto</th>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Comments</th>
                <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center">
                    <p className="text-sm font-medium text-slate-400">No edit requests match your current criteria.</p>
                  </td>
                </tr>
              ) : (
                paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-700">{item.interval}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-700">{item.validUpto}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{item.comments}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusStyle(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      <button
                        onClick={() => setSelectedRequest(item)}
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

        {/* PAGINATION FOOTER */}
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

      {/* ─── ADD REQUEST FORM MODAL ─── */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">New Edit Request</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block mb-1.5 text-xs font-bold text-slate-700 tracking-wide uppercase">
                  Select Edit Interval *
                </label>
                <select
                  value={form.interval}
                  onChange={(e) => handleChange("interval", e.target.value)}
                  className="w-full h-11 px-4 border border-slate-200 bg-white rounded-xl text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Interval</option>
                  <option>Today</option>
                  <option>Yesterday</option>
                  <option>Last 3 Days</option>
                  <option>Last 7 Days</option>
                </select>
              </div>

              <div>
                <label className="block mb-1.5 text-xs font-bold text-slate-700 tracking-wide uppercase">
                  Edit Status Valid Upto *
                </label>
                <select
                  value={form.validUpto}
                  onChange={(e) => handleChange("validUpto", e.target.value)}
                  className="w-full h-11 px-4 border border-slate-200 bg-white rounded-xl text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select Validity</option>
                  <option>1 Day</option>
                  <option>3 Days</option>
                  <option>7 Days</option>
                  <option>15 Days</option>
                  <option>30 Days</option>
                </select>
              </div>

              <div>
                <label className="block mb-1.5 text-xs font-bold text-slate-700 tracking-wide uppercase">
                  Comments
                </label>
                <textarea
                  rows={4}
                  value={form.comments}
                  onChange={(e) => handleChange("comments", e.target.value)}
                  placeholder="State the justification reason details..."
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

      {/* ─── DETAIL PREVIEW COMPONENT MODAL ─── */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-lg text-slate-900">Request Details</h3>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Interval</p>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedRequest.interval}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Valid Upto</p>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedRequest.validUpto}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-50">
                <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">Comments / Reason</p>
                <p className="text-sm font-medium text-slate-700 mt-1 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {selectedRequest.comments}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-50">
                <p className="text-[11px] font-bold text-slate-400 tracking-wider uppercase mb-1.5">Request Status</p>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusStyle(selectedRequest.status)}`}>
                  {selectedRequest.status}
                </span>
              </div>
            </div>
            
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedRequest(null)}
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

export default TimesheetEditRequestPage;