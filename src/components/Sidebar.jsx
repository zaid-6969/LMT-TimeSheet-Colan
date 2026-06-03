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
  ListTodo,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { useLocation, NavLink, useNavigate } from "react-router-dom";

import { useState, useEffect, useRef } from "react";

import image1 from "../assets/colan-logo-main.png";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },

  {
    title: "Task",
    icon: ClipboardList,
    basePath: "/task",
    children: [
      {
        name: "Task List",
        path: "/task/list",
      },
      {
        name: "Calendar View",
        path: "/task/calendar",
      },
    ],
  },

  {
    title: "To Do",
    icon: ListTodo,
    basePath: "/todolist",
    children: [
      {
        name: "To Do List",
        path: "/todolist/todolist",
      },
      {
        name: "To Do Calendar List",
        path: "/todolist/todocalender",
      },
      // {
      //   name: "Add To Do",
      //   path: "/todolist/addtodo",
      // },
    ],
  },

  {
    title: "RFP Estimation",
    icon: FileSpreadsheet,
    basePath: "/rfp",
    children: [
      {
        name: "RFP List",
        path: "/rfp/list",
      },
    ],
  },

  {
    title: "Projects",
    icon: FolderKanban,
    basePath: "/projects",
    children: [
      {
        name: "Project List",
        path: "/projects",
      },
    ],
  },

  {
    title: "Timesheet",
    icon: Clock3,
    basePath: "/timesheet",
    children: [
      {
        name: "View Timesheet",
        path: "/timesheet/view",
      },
      // {
      //   name: "Timesheet Approval",
      //   path: "/timesheet/approval",
      // },
    ],
  },

  {
    title: "Quality Assurance",
    icon: ShieldCheck,
    basePath: "/qa",
    children: [
      {
        name: "QA Project List",
        path: "/qa/list",
      },
    ],
  },

  {
    title: "Final Source",
    icon: Database,
    basePath: "/final-source",
    children: [
      {
        name: "Final Source List",
        path: "/final-source/list",
      },
      // {
      //   name: "Add Final Source",
      //   path: "/final-source/add",
      // },
    ],
  },
];


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

  const userMenuRef = useRef(null);

  const [userMenuOpen, setUserMenuOpen] = useState(false);

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

  useEffect(() => {
    setOpenMenu(getDefaultOpenMenu());

    setMobileOpen(false);
  }, [location.pathname]);

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

  const isCollapsed = isTablet && !mobileOpen;

  const showLabels = !isCollapsed;

  const navigate = useNavigate();

  return (
    <>
      {/* MOBILE BUTTON */}
      {isMobile && !mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className="
            fixed
            top-5
            left-5
            z-[1000]
            w-11
            h-11
            rounded-xl
            bg-white
            border
            border-slate-200
            shadow-sm
            flex
            items-center
            justify-center
          "
        >
          <Menu size={20} className="text-slate-700" />
        </button>
      )}

      {/* OVERLAY */}
      {isMobile && mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="
            fixed
            inset-0
            bg-black/20
            backdrop-blur-sm
            z-[999]
          "
        />
      )}

      {/* SIDEBAR */}
      <aside
        style={{
          width: isMobile
            ? mobileOpen
              ? "270px"
              : "0px"
            : isTablet
              ? "72px"
              : "270px",

          transform:
            isMobile && !mobileOpen ? "translateX(-100%)" : "translateX(0)",

          background: "#FFFFFF",

          borderRight: "1px solid #E2E8F0",

          transition:
            "width 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
        className="
          fixed
          top-0
          left-0
          z-[49]
          h-screen
          flex
          flex-col
          overflow-hidden
        "
      >
        {/* LOGO */}
        <div
          className="shrink-0 flex items-center"
          style={{
            height: "58px",

            padding: isCollapsed ? "0" : "0 22px",

            justifyContent: isCollapsed ? "center" : "flex-start",

            borderBottom: "1px solid #EEF2F7",

            background: "#FFFFFF",
          }}
        >
          <img
            src={image1}
            alt="logo"
            className={`${
              isCollapsed ? "w-9" : "w-[145px]"
            } object-contain transition-all duration-300`}
          />

          {isMobile && (
            <button onClick={() => setMobileOpen(false)}>
              <X size={20} className="text-slate-600" />
            </button>
          )}
        </div>

        {/* NAVIGATION */}
        <nav
          className="flex-1 overflow-y-auto py-4"
          style={{
            padding: isCollapsed ? "10px 8px" : "12px 14px",

            scrollbarWidth: "thin",
          }}
        >
          {/* MENU TITLE */}
          {showLabels && (
            <div
              style={{
                fontSize: "11px",

                fontWeight: "700",

                letterSpacing: "0.08em",

                textTransform: "uppercase",

                color: "#94A3B8",

                padding: "0 12px 14px",
              }}
            >
              MAIN MENU
            </div>
          )}

          {/* MENU ITEMS */}
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;

              const isActive = item.path
                ? location.pathname === item.path
                : location.pathname.startsWith(item.basePath);

              /* DROPDOWN */
              if (item.children) {
                const isOpen = openMenu === item.title;

                return (
                  <div key={item.title}>
                    <button
                      onClick={() => {
                        if (item.children.length === 1) {
                          navigate(item.children[0].path);
                        } else {
                          toggleMenu(item.title);
                        }
                      }}
                      className="
                        w-full
                        rounded
                        flex
                        items-center
                        justify-between
                        transition-all
                        duration-200
                      "
                      style={{
                        padding: isCollapsed ? "12px 0" : "10px 12px",

                        justifyContent: isCollapsed
                          ? "center"
                          : "space-between",

                        background: isActive ? "#F5F9FF" : "transparent",

                        border: "1px solid transparent",

                        borderLeft: isActive
                          ? "3px solid #2563EB"
                          : "3px solid transparent",

                        color: isActive ? "#2563EB" : "#475569",
                      }}
                    >
                      <div
                        className={`flex items-center ${
                          isCollapsed ? "justify-center" : "gap-3"
                        }`}
                      >
                        {/* ICON */}
                        <div
                          style={{
                            width: "32px",

                            height: "32px",

                            borderRadius: "10px",

                            display: "flex",

                            alignItems: "center",

                            justifyContent: "center",

                            background: isActive ? "#EEF4FF" : "transparent",
                          }}
                        >
                          <Icon
                            size={16}
                            style={{
                              color: isActive ? "#2563EB" : "#94A3B8",
                            }}
                          />
                        </div>

                        {/* TEXT */}
                        {showLabels && (
                          <span
                            style={{
                              fontSize: "14px",

                              fontWeight: "500",

                              letterSpacing: "-0.01em",
                            }}
                          >
                            {item.title}
                          </span>
                        )}
                      </div>

                      {/* CHEVRON — only show for items with more than 1 child */}
                      {showLabels && item.children.length > 1 && (
                        <ChevronDown
                          size={15}
                          style={{
                            color: "#94A3B8",

                            transform: isOpen
                              ? "rotate(180deg)"
                              : "rotate(0deg)",

                            transition: "0.2s",
                          }}
                        />
                      )}
                    </button>

                    {/* SUB MENU */}
                    {showLabels && isOpen && item.children.length > 1 && (
                      <div
                        style={{
                          marginLeft: "30px",

                          paddingLeft: "6px",

                          marginTop: "4px",

                          marginBottom: "6px",

                          borderLeft: "1px solid #E2E8F0",

                          display: "flex",

                          flexDirection: "column",

                          gap: "2px",
                        }}
                      >
                        {item.children.map((subItem) => (
                          <NavLink
                            key={subItem.name}
                            to={subItem.path}
                            style={({ isActive }) => ({
                              display: "flex",

                              alignItems: "center",

                              justifyContent: "space-between",

                              padding: "9px 12px",

                              borderRadius: "10px",

                              fontSize: "13px",

                              fontWeight: "500",

                              background: isActive ? "#F7FAFF" : "transparent",

                              color: isActive ? "#2563EB" : "#64748B",

                              textDecoration: "none",

                              transition: "all 0.15s ease",
                            })}
                          >
                            {({ isActive }) => (
                              <>
                                {/* LEFT */}
                                <div className="flex items-center gap-3">
                                  {/* ACTIVE DOT */}
                                  <div
                                    style={{
                                      width: "7px",

                                      height: "7px",

                                      borderRadius: "999px",

                                      background: isActive
                                        ? "#2563EB"
                                        : "#CBD5E1",

                                      transition: "0.2s",

                                      flexShrink: 0,
                                    }}
                                  />

                                  {/* TEXT */}
                                  <span>{subItem.name}</span>
                                </div>

                                {/* RIGHT ICON */}
                                <ChevronRight
                                  size={12}
                                  style={{
                                    opacity: isActive ? 1 : 0.4,

                                    color: isActive ? "#2563EB" : "#94A3B8",

                                    flexShrink: 0,
                                  }}
                                />
                              </>
                            )}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              /* SINGLE ITEM */
              return (
                <NavLink
                  key={item.title}
                  to={item.path}
                  className="
                    group
                    flex
                    items-center
                    rounded-xl
                    transition-all
                    duration-200
                  "
                  style={({ isActive }) => ({
                    padding: isCollapsed ? "12px 0" : "10px 12px",

                    justifyContent: isCollapsed ? "center" : "flex-start",

                    gap: isCollapsed ? "0" : "12px",

                    background: isActive ? "#F5F9FF" : "transparent",

                    border: "1px solid transparent",

                    borderLeft: isActive
                      ? "3px solid #2563EB"
                      : "3px solid transparent",

                    color: isActive ? "#2563EB" : "#475569",
                  })}
                >
                  {({ isActive }) => (
                    <>
                      {/* ICON */}
                      <div
                        style={{
                          width: "32px",

                          height: "32px",

                          borderRadius: "10px",

                          display: "flex",

                          alignItems: "center",

                          justifyContent: "center",

                          background: isActive ? "#EEF4FF" : "transparent",
                        }}
                      >
                        <Icon
                          size={16}
                          style={{
                            color: isActive ? "#2563EB" : "#94A3B8",
                          }}
                        />
                      </div>

                      {/* TEXT */}
                      {showLabels && (
                        <span
                          style={{
                            fontSize: "14px",

                            fontWeight: "500",

                            letterSpacing: "-0.01em",
                          }}
                        >
                          {item.title}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* USER SECTION */}
        <div
          ref={userMenuRef}
          className="
            p-4
            border-t
            border-slate-200
            relative
          "
        >
          {/* DROPDOWN */}
          {userMenuOpen && (
            <div
              className="
                absolute
                bottom-[78px]
                left-4
                right-4
                bg-white
                border
                border-slate-200
                rounded-2xl
                shadow-xl
                overflow-hidden
                z-50
              "
            >
              {/* TOP */}
              <div className="p-4 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-800">
                  Arjun Sharma
                </p>

                <p className="text-xs text-slate-500 mt-1">
                  arjun.sharma@gmail.com
                </p>
              </div>

              {/* PROFILE */}
              <button
                onClick={() => navigate("/employee")}
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-sm
                  text-slate-600
                  hover:bg-slate-50
                  transition-all
                "
              >
                <User size={16} />
                Profile
              </button>

              {/* SETTINGS */}
              <button
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-sm
                  text-slate-600
                  hover:bg-slate-50
                  transition-all
                "
              >
                <Settings size={16} />
                Settings
              </button>

              {/* LOGOUT */}
              <button
                onClick={() => navigate("/")}
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-sm
                  text-red-500
                  hover:bg-red-50
                  transition-all
                "
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}

          {/* USER BUTTON */}
          <button
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="
              w-full
              flex
              items-center
              justify-between
              gap-3
              p-3
              rounded-2xl
              border
              border-slate-200
              bg-white
              hover:bg-slate-50
              transition-all
            "
          >
            <div className="flex items-center gap-3">
              {/* AVATAR */}
              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-blue-600
                  text-white
                  flex
                  items-center
                  justify-center
                  text-sm
                  font-semibold
                "
              >
                MZ
              </div>

              {/* INFO */}
              {showLabels && (
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-800">
                    Mohammed Zaid
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    zaid@gmail.com
                  </p>
                </div>
              )}
            </div>

            {showLabels && (
              <ChevronDown
                size={16}
                className={`text-slate-400 transition-all ${
                  userMenuOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </button>
        </div>
      </aside>
    </>
  );
}