import { useState, useRef, useEffect } from "react";
import {
  User,
  GraduationCap,
  Heart,
  MapPin,
  Pencil,
  X,
  Save,
  CheckCircle2,
  BadgeCheck,
} from "lucide-react";

/* ─────────────────── INITIAL DATA ─────────────────── */

const INITIAL_EMPLOYEE = {
  employeeId: "CIPL1917",
  name: "Mohammed Zaid B",
  initials: "MZ",
  role: "Trainee Software Engineer",
  department: "React JS",
  email: "zaid@example.com",
  mobile: "+91 9876543210",
  reporting: "Aadil",
  joinDate: "01 Apr 2026",
  status: "Active",
  gender: "Male",
  // Qualification
  qualification: "Bachelor Degree",
  experience: "Fresher",
  certification: "React JS",
  cv: "Available",
  // Personal
  fatherName: "Not Updated",
  motherName: "Not Updated",
  bloodGroup: "O+",
  dob: "01 Jan 2000",
  pan: "ABCDE1234F",
  passport: "Not Updated",
  // Address
  permanentAddress: "Sample Permanent Address",
  residentialAddress: "Sample Residential Address",
};

const TABS = [
  { id: "basic", label: "Basic Details", Icon: User },
  { id: "qualification", label: "Qualification", Icon: GraduationCap },
  { id: "personal", label: "Personal", Icon: Heart },
  { id: "address", label: "Address & Communication", Icon: MapPin },
];

const MODAL_TABS = [
  { id: "basic", label: "Basic" },
  { id: "qualification", label: "Qualification" },
  { id: "personal", label: "Personal" },
  { id: "address", label: "Address" },
];

/* ─────────────────── INFO CARD ─────────────────── */

function InfoCard({ label, value, wide }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${wide ? "col-span-2" : ""}`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}

/* ─────────────────── EDIT MODAL ─────────────────── */

function EditModal({ employee, onSave, onClose }) {
  const [form, setForm] = useState({ ...employee });
  const [modalTab, setModalTab] = useState("basic");
  const overlayRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (overlayRef.current === e.target) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const Field = ({
    label,
    fieldKey,
    placeholder,
    as: As = "input",
    children,
  }) => (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
        {label}
      </label>
      {As === "select" ? (
        <select
          value={form[fieldKey] || ""}
          onChange={(e) => set(fieldKey, e.target.value)}
          className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-blue-500"
        >
          {children}
        </select>
      ) : (
        <input
          value={form[fieldKey] || ""}
          onChange={(e) => set(fieldKey, e.target.value)}
          placeholder={placeholder}
          className="h-10 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500"
        />
      )}
    </div>
  );

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/45 p-4 backdrop-blur-[3px]"
    >
      <div className="w-full max-w-xl overflow-hidden rounded-[24px] bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/70 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Edit Profile</h2>
            <p className="mt-0.5 text-sm text-slate-500">
              Update employee information below.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50"
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal tabs */}
        <div className="flex flex-wrap gap-2 px-6 pt-4">
          {MODAL_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setModalTab(t.id)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                modalTab === t.id
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="max-h-[58vh] overflow-y-auto px-6 py-5 space-y-4">
          {/* Basic */}
          {modalTab === "basic" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Employee ID" fieldKey="employeeId" />
                <Field label="Employee Name" fieldKey="name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Department" fieldKey="department" />
                <Field label="Role" fieldKey="role" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Gender" fieldKey="gender" as="select">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Field>
                <Field label="Reporting Person" fieldKey="reporting" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Join Date" fieldKey="joinDate" />
                <Field label="Status" fieldKey="status" as="select">
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>On Leave</option>
                </Field>
              </div>
            </>
          )}

          {/* Qualification */}
          {modalTab === "qualification" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Qualification"
                  fieldKey="qualification"
                  as="select"
                >
                  <option>Bachelor Degree</option>
                  <option>Master Degree</option>
                  <option>Diploma</option>
                  <option>PhD</option>
                </Field>
                <Field label="Experience" fieldKey="experience" as="select">
                  <option>Fresher</option>
                  <option>1–2 Years</option>
                  <option>3–5 Years</option>
                  <option>5+ Years</option>
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Certification" fieldKey="certification" />
                <Field label="Updated CV" fieldKey="cv" as="select">
                  <option>Available</option>
                  <option>Not Available</option>
                </Field>
              </div>
            </>
          )}

          {/* Personal */}
          {modalTab === "personal" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Field
                  label="Father Name"
                  fieldKey="fatherName"
                  placeholder="Enter father name"
                />
                <Field
                  label="Mother Name"
                  fieldKey="motherName"
                  placeholder="Enter mother name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Blood Group" fieldKey="bloodGroup" as="select">
                  {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(
                    (bg) => (
                      <option key={bg}>{bg}</option>
                    ),
                  )}
                </Field>
                <Field label="Date of Birth" fieldKey="dob" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="PAN Number" fieldKey="pan" />
                <Field
                  label="Passport"
                  fieldKey="passport"
                  placeholder="Enter passport number"
                />
              </div>
            </>
          )}

          {/* Address */}
          {modalTab === "address" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Email" fieldKey="email" />
                <Field label="Mobile" fieldKey="mobile" />
              </div>
              <Field label="Permanent Address" fieldKey="permanentAddress" />
              <Field
                label="Residential Address"
                fieldKey="residentialAddress"
              />
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button
            onClick={onClose}
            className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            <X size={14} /> Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="flex h-10 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Save size={14} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── MAIN PAGE ─────────────────── */

export default function EmployeeProfilePage() {
  const [employee, setEmployee] = useState(INITIAL_EMPLOYEE);
  const [activeTab, setActiveTab] = useState("basic");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updated) => {
    setEmployee(updated);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* EDIT MODAL */}
      {isEditing && (
        <EditModal
          employee={employee}
          onSave={handleSave}
          onClose={() => setIsEditing(false)}
        />
      )}

      {/* ── PROFILE HEADER ── */}
      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-[18px] bg-blue-600 text-2xl font-bold text-white">
              {employee.initials}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                  {employee.name}
                </h1>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <BadgeCheck size={12} /> {employee.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                {employee.role} · {employee.department}
              </p>
              <p className="mt-0.5 text-xs text-slate-400">
                Employee ID:{" "}
                <span className="font-semibold text-slate-600">
                  {employee.employeeId}
                </span>
                &nbsp;·&nbsp; Joined {employee.joinDate}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="flex h-11 items-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Pencil size={15} /> Edit Profile
          </button>
        </div>
      </div>

      {/* ── SUMMARY CARDS ── */}
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-6">
        {[
          { label: "Department", value: employee.department },
          { label: "Reporting To", value: employee.reporting },
          { label: "Join Date", value: employee.joinDate },
          { label: "Status", value: employee.status },
          { label: "Email", value: employee.email },
          { label: "Mobile", value: employee.mobile },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              {label}
            </p>
            <p className="mt-2 truncate text-sm font-semibold text-slate-800">
              {value}
            </p>
          </div>
        ))}
      </div>

      {/* ── TABS ── */}
      <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                activeTab === id
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── TAB CONTENT ── */}
      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
        {activeTab === "basic" && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <InfoCard label="Employee ID" value={employee.employeeId} />
            <InfoCard label="Employee Name" value={employee.name} />
            <InfoCard label="Department" value={employee.department} />
            <InfoCard label="Role" value={employee.role} />
            <InfoCard label="Gender" value={employee.gender} />
            <InfoCard label="Reporting Person" value={employee.reporting} />
          </div>
        )}

        {activeTab === "qualification" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard label="Qualification" value={employee.qualification} />
            <InfoCard label="Experience" value={employee.experience} />
            <InfoCard label="Certification" value={employee.certification} />
            <InfoCard label="Updated CV" value={employee.cv} />
          </div>
        )}

        {activeTab === "personal" && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <InfoCard label="Father Name" value={employee.fatherName} />
            <InfoCard label="Mother Name" value={employee.motherName} />
            <InfoCard label="Blood Group" value={employee.bloodGroup} />
            <InfoCard label="DOB" value={employee.dob} />
            <InfoCard label="PAN Number" value={employee.pan} />
            <InfoCard label="Passport" value={employee.passport} />
          </div>
        )}

        {activeTab === "address" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard label="Email" value={employee.email} />
            <InfoCard label="Mobile" value={employee.mobile} />
            <InfoCard
              label="Permanent Address"
              value={employee.permanentAddress}
              wide
            />
            <InfoCard
              label="Residential Address"
              value={employee.residentialAddress}
              wide
            />
          </div>
        )}
      </div>
    </div>
  );
}
