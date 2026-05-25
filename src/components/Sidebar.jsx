import {
  LayoutDashboard,
  Database,
  FolderKanban,
  ClipboardList,
  Clock3,
  FileSpreadsheet,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  LogOut,
  User,
  Settings,
  ListTodo,
} from "lucide-react";

import { useLocation, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import image1 from "../assets/colan-logo-main.png";

const sidebarItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  {
    title: "Task",
    icon: ClipboardList,
    basePath: "/task",
    children: [
      { name: "Task List", path: "/task/list" },
      { name: "Calendar View", path: "/task/calendar" },
    ],
  },
  {
    title: "To Do",
    icon: ListTodo,
    basePath: "/todolist",
    children: [
      { name: "To Do List", path: "/todolist/todolist" },
      { name: "To Do Calender List", path: "/todolist/todocalender" },
      { name: "Add To Do", path: "/todolist/addtodo" },
    ],
  },
  {
    title: "RFP Estimation",
    icon: FileSpreadsheet,
    basePath: "/rfp",
    children: [{ name: "RFP List", path: "/rfp/list" }],
  },
  {
    title: "Projects",
    icon: FolderKanban,
    basePath: "/projects",
    children: [{ name: "Project List", path: "/projects" }],
  },
    {
    title: "Timesheet",
    icon: Clock3,
    basePath: "/timesheet",
    children: [
      { name: "View Timesheet", path: "/timesheet/view" },
      { name: "Timesheet Approval", path: "/timesheet/approval" },
      { name: "Edit Request", path: "/timesheet/edit-request" },
      { name: "Client Approval", path: "/timesheet/client-approval" },
    ],
  },
  {
    title: "Quality Assurance",
    icon: ShieldCheck,
    basePath: "/qa",
    children: [{ name: "QA Project List", path: "/qa/list" }],
  },
  {
    title: "Final Source",
    icon: Database,
    basePath: "/final-source",
    children: [
      { name: "Final Source List", path: "/final-source/list" },
      { name: "Add Final Source", path: "/final-source/add" },
    ],
  },
];

const currentUser = {
  name: "Arjun Sharma",
  email: "arjun.sharma@gmail.com",
};

function getInitial(name) {
  return name ? name.charAt(0).toUpperCase() : "U";
}

// ── Hook: detect if viewport is tablet (md) range ──
function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsTablet(w >= 768 && w < 1280);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isTablet;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function Sidebar() {
  const location = useLocation();
  const isTablet = useIsTablet();
  const isMobile = useIsMobile();

  const getDefaultOpenMenu = () => {
    const path = location.pathname;
    if (path.startsWith("/final-source")) return "Final Source";
    if (path.startsWith("/projects")) return "Projects";
    if (path.startsWith("/task")) return "Task";
    if (path.startsWith("/timesheet")) return "Timesheet";
    if (path.startsWith("/rfp")) return "RFP Estimation";
    if (path.startsWith("/qa")) return "Quality Assurance";
    if (path.startsWith("/todolist")) return "To Do";
    return "";
  };

  const [openMenu, setOpenMenu] = useState(getDefaultOpenMenu());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Auto-open active menu & close drawer on route change
  useEffect(() => {
    setOpenMenu(getDefaultOpenMenu());
    setMobileOpen(false);
  }, [location.pathname]);

  // Close user popup on outside click
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleMenu = (title) => {
    setOpenMenu((prev) => (prev === title ? "" : title));
  };

  // On tablet the sidebar is always visible as a 70px icon rail
  // On mobile it is a hidden drawer toggled by the hamburger button
  // On desktop (xl+) it is the full 270px sidebar
  const isCollapsed = isTablet && !mobileOpen; // icon-only rail
  const showLabels = !isCollapsed; // show text labels & submenus

  const navigate = useNavigate();

  return (
    <>
      {/* ── Mobile hamburger ── */}
      {isMobile && !mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className="
            fixed top-4 left-4 z-[1100]
            flex items-center justify-center
            p-2 rounded-xl
            bg-[#0a0f1e]
            border border-[#2a85d42e]
            text-[#3aa0f0]
            shadow-lg
            transition-all duration-200
            hover:bg-[#122038]
            hover:border-[#3aa0f0]
          "
        >
          <Menu size={20} />
        </button>
      )}

      {/* ── Overlay (mobile only) ── */}
      {isMobile && mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm"
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        style={{
          width: isMobile
            ? mobileOpen
              ? "265px"
              : "0px"
            : isTablet
              ? "70px"
              : "270px",
          transform:
            isMobile && !mobileOpen ? "translateX(-100%)" : "translateX(0)",
        }}
        className="
          fixed top-0 left-0 z-[1000]
          h-screen
          bg-gradient-to-b from-[#060b16] to-[#0a0f1e]
          border-r border-[#2a85d42e]
          flex flex-col
          overflow-hidden
          transition-all duration-300
          shadow-2xl
        "
      >

        {/* ── Logo ── */}
        <div
          className={`
          h-[72px] border-b border-[#2a85d42e]
          flex items-center bg-black/20 shrink-0
          ${isCollapsed ? "justify-center px-2" : "px-5 gap-3"}
        `}
        >
          {isCollapsed ? (
            // Show only the cube part of the logo when collapsed — use initial icon fallback
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1a6aad] to-[#00c8e0] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">C</span>
            </div>
          ) : (
            <img
              src={image1}
              alt="Colan Infotech"
              className="h-10 object-contain"
            />
          )}
        </div>

        {/* ── Nav ── */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1 scrollbar-thin scrollbar-thumb-[#1a6aad] scrollbar-track-transparent">
          {showLabels && (
            <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#5580a0] px-3 mt-2 mb-3">
              Main Menu
            </div>
          )}

          {sidebarItems.map((item, index) => {
            const Icon = item.icon;

            // ── Single item ──
            if (!item.children) {
              return (
                <NavLink
                  key={index}
                  to={item.path}
                  title={isCollapsed ? item.title : undefined}
                  className={({ isActive }) =>
                    `group flex items-center w-full rounded-xl mb-1 text-[13.5px] font-medium transition-all duration-200 border
                    ${isCollapsed ? "justify-center px-0 py-3" : "justify-between px-4 py-3"}
                    ${
                      isActive
                        ? "bg-gradient-to-br from-[#1a6aad59] to-[#3aa0f033] border-[#2585d4] text-[#3aa0f0] shadow-[0_0_12px_rgba(42,133,212,0.15)]"
                        : "border-transparent text-[#8ab4d4] hover:bg-[#2a85d41a] hover:border-[#2a85d42e] hover:text-[#e8f4ff]"
                    }`
                  }
                >
                  <div
                    className={`flex items-center overflow-hidden ${isCollapsed ? "justify-center" : "gap-3"}`}
                  >
                    <Icon
                      size={19}
                      className="shrink-0 text-[#5580a0] group-hover:text-[#3aa0f0] transition-colors duration-200"
                    />
                    {showLabels && (
                      <span className="truncate whitespace-nowrap">
                        {item.title}
                      </span>
                    )}
                  </div>
                </NavLink>
              );
            }

            // ── Dropdown ──
            const isOpen = openMenu === item.title;

            return (
              <div key={index}>
                <button
                  onClick={() => toggleMenu(item.title)}
                  title={isCollapsed ? item.title : undefined}
                  className={`
                    group flex items-center w-full rounded-xl mb-1
                    text-[13.5px] font-medium
                    transition-all duration-200
                    border border-transparent text-[#8ab4d4]
                    hover:bg-[#2a85d41a] hover:border-[#2a85d42e] hover:text-[#e8f4ff]
                    ${isCollapsed ? "justify-center px-0 py-3" : "justify-between px-4 py-3"}
                  `}
                >
                  <div
                    className={`flex items-center overflow-hidden ${isCollapsed ? "justify-center" : "gap-3"}`}
                  >
                    <Icon
                      size={19}
                      className="shrink-0 text-[#5580a0] group-hover:text-[#3aa0f0] transition-colors duration-200"
                    />
                    {showLabels && (
                      <span className="truncate whitespace-nowrap">
                        {item.title}
                      </span>
                    )}
                  </div>
                  {showLabels && (
                    <ChevronDown
                      size={16}
                      className={`shrink-0 transition-all duration-300 text-[#5580a0] ${isOpen ? "rotate-180 text-[#3aa0f0]" : ""}`}
                    />
                  )}
                </button>

                {/* Submenu — only shown when labels visible */}
                {showLabels && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[320px] opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="ml-5 pl-4 border-l border-[#2a85d42e] space-y-1 my-1">
                      {item.children.map((subItem, subIndex) => (
                        <NavLink
                          key={subIndex}
                          to={subItem.path}
                          className={({ isActive }) =>
                            `flex items-center justify-between px-3 py-2.5 rounded-lg text-[12.5px] font-medium border transition-all duration-200
                            ${
                              isActive
                                ? "bg-[#00c8e01a] border-[#00c8e040] text-[#00c8e0]"
                                : "border-transparent text-[#5580a0] hover:bg-[#2a85d41a] hover:border-[#2a85d42e] hover:text-[#e8f4ff]"
                            }`
                          }
                        >
                          <span>{subItem.name}</span>
                          <ChevronRight
                            size={14}
                            className="opacity-60 shrink-0"
                          />
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* ── Footer — User card ── */}
        <div
          className={`p-3 border-t border-[#2a85d42e] shrink-0 relative ${isCollapsed ? "flex justify-center" : ""}`}
          ref={userMenuRef}
        >
          {/* User popup */}
          {userMenuOpen && (
            <div
              className="
              absolute bottom-[88px] left-3 right-3
              bg-[#0d1829]
              border border-[#2a85d42e]
              rounded-xl overflow-hidden
              shadow-[0_-8px_32px_rgba(0,0,0,0.5)]
              z-50
            "
            >
              <div className="px-4 py-3 border-b border-[#2a85d42e] bg-[#0a1220]">
                <p className="text-[12px] font-semibold text-[#e8f4ff] truncate">
                  {currentUser.name}
                </p>
                <p className="text-[11px] text-[#5580a0] truncate">
                  {currentUser.email}
                </p>
              </div>

              <button
                onClick={() => setUserMenuOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-3 text-[12.5px] font-medium text-[#8ab4d4] hover:bg-[#2a85d41a] hover:text-[#e8f4ff] transition-all duration-150"
              >
                <User size={15} className="text-[#3aa0f0] shrink-0" />
                Profile
              </button>

              <button
                onClick={() => setUserMenuOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-3 text-[12.5px] font-medium text-[#8ab4d4] hover:bg-[#2a85d41a] hover:text-[#e8f4ff] transition-all duration-150"
              >
                <Settings size={15} className="text-[#3aa0f0] shrink-0" />
                Account Settings
              </button>

              <div className="border-t border-[#2a85d42e]" />

              <button
                onClick={() => navigate("/")}
                className="w-full flex items-center gap-3 px-4 py-3 text-[12.5px] font-medium text-[#c0365a] hover:bg-[#c0365a1a] transition-all duration-150"
              >
                <LogOut size={15} className="shrink-0" />
                Sign Out
              </button>
            </div>
          )}

          {/* User card button */}
          {isCollapsed ? (
            // Collapsed: just avatar button
            <button
              onClick={() => setUserMenuOpen((prev) => !prev)}
              title={currentUser.name}
              className={`
                w-9 h-9 rounded-lg
                bg-gradient-to-br from-[#1a6aad] to-[#00c8e0]
                flex items-center justify-center
                text-white text-[13px] font-bold
                shadow-[0_0_10px_rgba(42,133,212,0.4)]
                border transition-all duration-200
                ${userMenuOpen ? "border-[#3aa0f0]" : "border-transparent hover:border-[#3aa0f0]"}
              `}
            >
              {getInitial(currentUser.name)}
            </button>
          ) : (
            // Expanded: full user card
            <button
              onClick={() => setUserMenuOpen((prev) => !prev)}
              className={`
                w-full flex items-center justify-between gap-3
                px-3 py-2.5 rounded-xl
                border transition-all duration-200
                ${
                  userMenuOpen
                    ? "bg-[#2a85d41a] border-[#2585d4]"
                    : "bg-[#1a6aad1f] border-[#2a85d42e] hover:bg-[#2a85d41a] hover:border-[#2585d4]"
                }
              `}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div
                  className="
                  w-8 h-8 rounded-lg shrink-0
                  bg-gradient-to-br from-[#1a6aad] to-[#00c8e0]
                  flex items-center justify-center
                  text-white text-[13px] font-bold
                  shadow-[0_0_10px_rgba(42,133,212,0.4)]
                "
                >
                  {getInitial(currentUser.name)}
                </div>
                <div className="overflow-hidden">
                  <p className="text-[12.5px] font-semibold text-[#e8f4ff] truncate leading-tight">
                    {currentUser.name}
                  </p>
                  <p className="text-[11px] text-[#5580a0] truncate leading-tight">
                    {currentUser.email}
                  </p>
                </div>
              </div>
              <ChevronDown
                size={14}
                className={`shrink-0 text-[#5580a0] transition-transform duration-300 ${userMenuOpen ? "rotate-180 text-[#3aa0f0]" : ""}`}
              />
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
