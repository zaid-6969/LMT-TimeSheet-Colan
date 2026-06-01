import React, { useState } from "react";
import {
  User,
  GraduationCap,
  Heart,
  MapPin,
  Edit,
  Mail,
  Phone,
  Briefcase,
} from "lucide-react";

export default function EmployeeProfilePage() {
  const [activeTab, setActiveTab] = useState("basic");
  const [isEditing, setIsEditing] = useState(false);

  const employee = {
    employeeId: "CIPL1917",
    name: "Mohammed Zaid B",
    role: "Trainee Software Engineer",
    department: "React JS",
    email: "zaid@example.com",
    mobile: "+91 9876543210",
    reporting: "Aadil",
    joinDate: "01 Apr 2026",
  };

  const tabs = [
    { id: "basic", label: "Basic Details", icon: User },
    { id: "qualification", label: "Qualification", icon: GraduationCap },
    { id: "personal", label: "Personal", icon: Heart },
    { id: "address", label: "Address & Communication", icon: MapPin },
  ];

  const InfoCard = ({ label, value }) => (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-2 font-semibold text-slate-800">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-2xl font-bold text-white">
                MZ
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">{employee.name}</h1>
                <p className="text-slate-500">{employee.role}</p>
                <p className="text-sm text-slate-400">{employee.employeeId}</p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white"
            >
              <Edit size={16} />
              Edit Profile
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <InfoCard label="Department" value={employee.department} />
          <InfoCard label="Reporting To" value={employee.reporting} />
          <InfoCard label="Join Date" value={employee.joinDate} />
          <InfoCard label="Status" value="Active" />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          {activeTab === "basic" && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <InfoCard label="Employee ID" value="CIPL1917" />
              <InfoCard label="Employee Name" value="Mohammed Zaid B" />
              <InfoCard label="Department" value="React JS" />
              <InfoCard label="Role" value="Trainee Software Engineer" />
              <InfoCard label="Gender" value="Male" />
              <InfoCard label="Reporting Person" value="Aadil" />
            </div>
          )}

          {activeTab === "qualification" && (
            <div className="grid gap-4 md:grid-cols-2">
              <InfoCard label="Qualification" value="Bachelor Degree" />
              <InfoCard label="Experience" value="Fresher" />
              <InfoCard label="Certification" value="React JS" />
              <InfoCard label="Updated CV" value="Available" />
            </div>
          )}

          {activeTab === "personal" && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <InfoCard label="Father Name" value="Not Updated" />
              <InfoCard label="Mother Name" value="Not Updated" />
              <InfoCard label="Blood Group" value="O+" />
              <InfoCard label="DOB" value="01 Jan 2000" />
              <InfoCard label="PAN Number" value="ABCDE1234F" />
              <InfoCard label="Passport" value="Not Updated" />
            </div>
          )}

          {activeTab === "address" && (
            <div className="grid gap-4 md:grid-cols-2">
              <InfoCard label="Email" value={employee.email} />
              <InfoCard label="Mobile" value={employee.mobile} />
              <InfoCard label="Permanent Address" value="Sample Permanent Address" />
              <InfoCard label="Residential Address" value="Sample Residential Address" />
            </div>
          )}
        </div>

        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
              <h2 className="text-xl font-bold">Edit Profile</h2>
              <p className="mt-2 text-sm text-slate-500">
                This is a demo edit modal. Connect your API and form logic here.
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl border px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
