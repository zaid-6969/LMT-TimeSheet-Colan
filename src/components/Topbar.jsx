import {
  Bell,
  ChevronRight,
  Search,
  ChevronDown,
  Home,
} from "lucide-react";

import { useLocation } from "react-router-dom";

export default function Topbar() {
  const location = useLocation();

  // ROUTE NAME MAP
  const routeNameMap = {
    dashboard: "Dashboard",

    "final-source": "Final Source",
    add: "Add",
    list: "List",

    projects: "Projects",

    task: "Task",
    calendar: "Calendar View",

    timesheet: "Timesheet",
    view: "View",
    approval: "Approval",
    "edit-request": "Edit Request",

    rfp: "RFP Estimation",

    qa: "Quality Assurance",

    todolist: "To Do",
    todocalender: "Calendar",
    addtodo: "Add To Do",
  };

  // SPLIT PATH
  const pathnames = location.pathname
    .split("/")
    .filter(Boolean);

  // GENERATE BREADCRUMB
  const breadcrumbs = pathnames.map((item) => ({
    label:
      routeNameMap[item] ||
      item.charAt(0).toUpperCase() +
        item.slice(1),
  }));

  // PAGE TITLE
  const pageTitle =
    breadcrumbs.length > 0
      ? breadcrumbs[breadcrumbs.length - 1]
          .label
      : "Dashboard";

  return (
    <header
      className="
        sticky
        top-0
        z-40
        h-[58px]
        border-b
        border-slate-200
        bg-white
        px-6
        md:px-8
        flex
        items-center
        justify-between
      "
    >
      {/* LEFT */}
      <div className="flex flex-col gap-2">
        {/* BREADCRUMB */}
        <div
          className="
            flex
            items-center
            gap-2
            text-sm
            text-slate-400
            font-medium
          "
        >
          <Home size={14} />

          {breadcrumbs.map(
            (crumb, index) => (
              <div
                key={index}
                className="flex items-center gap-2"
              >
                <ChevronRight size={13} />

                <span
                  className={
                    index ===
                    breadcrumbs.length - 1
                      ? "text-slate-700 font-semibold"
                      : "text-slate-400"
                  }
                >
                  {crumb.label}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5">
        {/* SEARCH */}
        <div
          className="
            hidden
            lg:flex
            items-center
            gap-3
            w-[320px]
            h-[46px]
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            px-4
            transition-all
            focus-within:border-blue-500
            focus-within:bg-white
          "
        >
          <Search
            size={18}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search tasks, projects..."
            className="
              w-full
              bg-transparent
              outline-none
              text-sm
              text-slate-700
              placeholder:text-slate-400
            "
          />
        </div>

        {/* NOTIFICATION */}
        <button
          className="
            relative
            w-11
            h-11
            rounded-xl
            border
            border-slate-200
            bg-white
            flex
            items-center
            justify-center
            hover:bg-slate-50
            transition-all
          "
        >
          <Bell
            size={19}
            className="text-slate-600"
          />

          <span
            className="
              absolute
              top-2
              right-2
              w-2
              h-2
              rounded-full
              bg-red-500
            "
          ></span>
        </button>

      </div>
    </header>
  );
}