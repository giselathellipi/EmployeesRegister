import "./App.css";
import Login from "./containers/login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BasicTable from "./employeeTable/EmployeeTable";
import Dashboard from "./containers/dashboard/Dashboard";
import EmployeeForm from "./containers/home/Home";
import Settings from "./containers/settings/Settings";
import AddHours from "./components/addHours/AddHourse";
import Report from "./containers/report/Report";
import YearTable from "./components/yearTable/yearTable";
import Societa from "./containers/societa/Societa";
import CompanyPage from "./containers/company/Company";
import Diagram from "./containers/diagram/Diagram";
import Chart from "./components/charts/charts";
import FinalReport from "./components/finalReport/finalReport";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Chart />} />
          <Route path="/employee" element={<BasicTable />} />
          <Route path="/home" element={<EmployeeForm />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/report" element={<Report />} />
          <Route path="/addhours" element={<AddHours />} />
          <Route path="/yeartable" element={<YearTable />} />
          <Route path="/societa" element={<Societa />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/month" element={<Dashboard/>} />
          <Route path="/finalreport" element={< FinalReport/>} />
          <Route path="/diagram" element={<Diagram />} />

        </Routes>
      </Router>
    </div>
  );
}
export default App;
