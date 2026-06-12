import { Routes, Route } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import SheetPage from "../pages/SheetPage";

// /* DASHBOARD */
// import DashboardHome from "../pages/Dashboard/DashboardHome";

/* FINAL SOURCE */
// import AddFinalSource from "../pages/FinalSource/AddFinalSource";
import FinalSourceList from "../pages/FinalSource/FinalSourceList";

/* PROJECT */
import ProjectList from "../pages/Project/ProjectList";

/* TASK */
import TaskList from "../pages/Task/ListView";
import CalendarView from "../pages/Task/CalenderView";

/* TIMESHEET */
import ViewTimesheet from "../pages/TimeSheet/ViewTimeSheet";
import TimesheetApproval from "../pages/TimeSheet/TimeSheetApproval";
import EditRequest from "../pages/TimeSheet/TimeSheetRequest";
import FixedPrice from "../pages/TimeSheet/FixedPrice";
import TimeMaterial from "../pages/TimeSheet/TimeMaterial";

/* RFP */
import RFPList from "../pages/REPEstimation/RFPList";

/* QA */
import QAList from "../pages/QualityAssurance/QAProjectList";

//  Loing

import LoginPage from "../pages/LoginPage";

// to do 

import AddToDo from "../pages/ToDo/AddToDo";
import CalenderToDo from "../pages/ToDo/CalenderToDo";
import ListToDo from "../pages/ToDo/ListToDo"

// DashboardPage

import DashboardPage from "../pages/DashBoard";

// employee management 

import EmployeeProfilePage from "../pages/EmployeeProfilePage"
import Retainer from "../pages/TimeSheet/Retainer";
export default function AppRoutes() {
  return (
    <Routes>
      {/* LANDING PAGE */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/sheet" element={<SheetPage />} />

      {/* MAIN LAYOUT */}
      <Route element={<MainLayout />}>
        {/* DASHBOARD */}
      <Route path="/dashboard" element={<DashboardPage />} />
        {/* <Route path="/dashboard" element={<DashboardHome />} /> */}

        {/* FINAL SOURCE */}
        {/* <Route path="/final-source/add" element={<AddFinalSource />} /> */}

        <Route path="/final-source/list" element={<FinalSourceList />} />

        {/* PROJECTS */}
        <Route path="/projects" element={<ProjectList />} />

        {/* TASK */}
        <Route path="/task/list" element={<TaskList />} />

        <Route path="/task/calendar" element={<CalendarView />} />

        {/* TIMESHEET */}
        <Route path="/timesheet/view" element={<ViewTimesheet />} />
        <Route path="/timesheet/approval" element={<TimesheetApproval />} />
        <Route path="/timesheet/edit-request" element={<EditRequest />} />
        <Route path="/timesheet/fixedprice" element={<FixedPrice/>} />
        <Route path="/timesheet/timematerial" element={<TimeMaterial/> } />
        <Route path="/timesheet/retainer" element={<Retainer/> } />
        

        {/* <Route path="/timesheet/client-approval" element={<ClientApproval />} /> */}

        {/* RFP */}
        <Route path="/rfp/list" element={<RFPList />} />

        {/* QA */}
        <Route path="/qa/list" element={<QAList />} />

         {/* Employee Management */}
        <Route path="/employee" element={<EmployeeProfilePage />} />

        {/* To Do */}
        <Route path="/todolist/todolist" element={<ListToDo />} />
        <Route path="/todolist/todocalender" element={<CalenderToDo />} />
        <Route path="/todolist/addtodo" element={<AddToDo />} />
      </Route>
    </Routes>
  );
}
