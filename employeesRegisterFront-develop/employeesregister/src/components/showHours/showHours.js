import React, { useEffect, useState } from "react";
import "./showHours.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
const ShowHours = () => {
  //   const [date, setDate] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("7");
  const [selectedYear, setSelectedYear] = useState("2021");
  const selectedCompanyId = localStorage.getItem("selectedCompanyId");
  console.log(selectedCompanyId);
  const formatNumberWithCommas = (number) => {
    if (typeof number === 'number') {
      return number.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else {
      return 'N/A'; // Return a placeholder for non-numeric or undefined values
    }
  };

  const Dropdown = () => {
    const handleSelect = (event) => {
      setSelectedOption(event.target.value || "7");
    };

    
    return (
      <div className="dropdown-container">
        <select
          value={selectedOption}
          onChange={handleSelect}
          className="dropdown-select"
        >
          <option value="">Choose a month</option>
          <option value="1">Gennaio</option>
          <option value="2">Febbraio</option>
          <option value="3">Marzo</option>
          <option value="4">Aprile</option>
          <option value="5">Maggio</option>
          <option value="6">Giugno</option>
          <option value="7">Luglio</option>
          <option value="8">Agosto</option>
          <option value="9">Settembre</option>
          <option value="10">Ottobre</option>
          <option value="11">Novembre</option>
          <option value="12">Dicembre</option>
        </select>
        {/* {selectedOption} */}
      </div>
    );
  };
  const DropdownYear = () => {
    const handleSelectYear = (event) => {
      setSelectedYear(event.target.value || "2021");
    };

    return (
      <div className="dropdown-container">
        <select
          value={selectedYear}
          onChange={handleSelectYear}
          className="dropdown-select"
        >
          <option value="">Choose year</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
        {/* {selectedOption} */}
      </div>
    );
  };

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await axios.get(
          `http://192.168.10.135:8080/ExpenseReport/employeeMonth/${selectedCompanyId}/${selectedYear}/${selectedOption}`
        );
        const dataList = response.data;
        setTableData(response.data);
        console.log(tableData);
        const employees = dataList.map((obj) => ({
          firstName: obj.employee.firstName,
          hours: obj.employee.hours.map((hoursObj) => hoursObj.workHours),
          researchHours: obj.employee.hours.map(
            (hoursObj) => hoursObj.researchHours
          ),
          costPerHour: obj.employee.hours.map(
            (hoursObj) => hoursObj.costPerHour
          ),
          totalWorkHours: obj.totalWorkHours,

          //   date: obj.employee.hours.map((hoursObj) => hoursObj.date.slice(-2)),
        }));
        setEmployees(employees);
      } catch (error) {
        console.error("Error fetching names:", error);
      }
    };
    fetchNames();
  }, [selectedOption, selectedYear,selectedCompanyId]);
  const accessToken = sessionStorage.getItem("Token");

  if (!accessToken) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <ToastContainer />
      <div className="add-page">
        <div className="head">
          <DropdownYear />
          <Dropdown />
        </div>
        <div className="table1">
          <div className="table-container">
            <table>
              <colgroup>
                <col/>
              </colgroup>
              <thead>
                <tr>
                <th>Matr.</th>
                  <th>Nome</th>
                  <th>Cognome</th>
                  
                  <th>Ruolo</th>
                  <th>gg-&gt;</th>
                  {Array.from({ length: 31 }, (_, index) => index + 1).map(
                    (date) => (
                      <th key={date}>{date}</th>
                    )
                  )}
                   <th>Tot. Ore</th>
                   <th>Costo orario</th>
                   <th>Valore</th>
                   <th>Tot. Ore mens</th>
                </tr>
              </thead>

              <tbody>
                {tableData.map((obj) => {
                  const { employee } = obj;
                  const { hours } = employee;

                  const researchHoursRowData = Array(31).fill(null);
                  const innHoursRowData = Array(31).fill(null);

                  hours.forEach((hour) => {
                    const { innHours, researchHours, dateIndex } = hour;
                    researchHoursRowData[dateIndex - 1] = researchHours;
                    innHoursRowData[dateIndex - 1] = innHours;
                  });

                  return (
                    <React.Fragment key={employee.id}>
                      <tr>
                      <td>{employee.matricola}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                       
                        <td>{employee.position.shortName}</td>
                        <td>'R&S</td>
                        {researchHoursRowData.map((value, index) => (
                          <td key={index}>{value}</td>
                        ))}
                        
                        <td>{formatNumberWithCommas(obj.totalResearchHours)}</td>
                        <td>€{formatNumberWithCommas(employee.costPerHour)}</td>
                        <td>€{formatNumberWithCommas(obj.totalResearchCost)}</td>
                        <td>{formatNumberWithCommas(obj.totalWorkHours)}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Inn.</td>
                        {innHoursRowData.map((value, index) => (
                          <td key={index}>{value}</td>
                        ))}
                        <td>{formatNumberWithCommas(obj.totalInnHours)}</td>
                        <td></td>
                        <td>€{formatNumberWithCommas(obj.totalInnCost)}</td>
                        <td></td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowHours;
