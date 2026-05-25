import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-[#f0f5fb] overflow-hidden">

      {/* SIDEBAR — fixed, so we add margin to push content right */}
      <Sidebar />

      {/* MAIN — offset matches sidebar widths:
            mobile  (< md):  no offset, sidebar is a drawer
            tablet  (md):    70px icon rail
            desktop (xl):    270px full sidebar
      */}
      <div className="
        flex-1 flex flex-col overflow-hidden
        md:ml-[70px]
        xl:ml-[270px]
        transition-all duration-300
      ">
        {/* TOPBAR */}
        <Topbar />

        {/* PAGE */}
        <main className="flex-1 overflow-y-auto p-3">
          <div className="
            bg-[#f0f5fb]  rounded-2xl
            border border-[rgba(26,106,173,0.1)]
            min-h-full p-4
            shadow-sm
          ">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
}