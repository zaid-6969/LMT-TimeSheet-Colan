import { Bell, LogOut } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
      {/* LEFT */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Employee Portal
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Manage workflow efficiently
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        {/* NOTIFICATION */}
        <button className="relative">
          <Bell
            size={22}
            className="text-slate-600 hover:text-slate-900 transition"
          />

          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* USER */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">
              John Doe
            </p>

            <p className="text-xs text-slate-500">
              Software Engineer
            </p>
          </div>

          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white font-semibold shadow-md">
            J
          </div>
        </div>

        {/* LOGOUT */}
        <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-red-500 transition">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}