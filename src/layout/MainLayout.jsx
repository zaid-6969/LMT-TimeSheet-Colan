import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT WRAPPER */}
      <div
        className="
          flex-1
          flex
          flex-col
          overflow-hidden
          ml-0
          md:ml-[72px]
          xl:ml-[270px]
          transition-all
          duration-300
        "
      >
        {/* TOPBAR */}
        <Topbar />

        {/* PAGE CONTENT */}
        <main
          className="
            flex-1
            overflow-y-auto
            bg-[#F8FAFC]
          "
        >
          {/* CONTENT CONTAINER */}
          <div
            className="
              min-h-full
              p-6
            "
          >
            {/* INNER CONTENT */}
            <div>
              <Outlet />
            </div>
          </div>
        <Footer />
        </main>
      </div>
    </div>
  );
}