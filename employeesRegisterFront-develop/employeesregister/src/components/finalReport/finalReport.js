import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/genericNavbar/Navbar";
import "./finalReport.css";
import { Navigate } from "react-router-dom";
const FinalReport = () => {
  const [tableData, setTableData] = useState([]);
  const [yearTableData, setYearTableData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2021");
  const selectedCompanyId = localStorage.getItem("selectedCompanyId");
  const initialRsTax = localStorage.getItem('rsTax') || '20';
  const initialInnTax = localStorage.getItem('innTax') || '10';
  const [rsTax, setRsTax] = useState(parseFloat(initialRsTax));
  const [innTax, setInnTax] = useState(parseFloat(initialInnTax));

  useEffect(() => {

    localStorage.setItem('rsTax', rsTax.toString());
    localStorage.setItem('innTax', innTax.toString());
  }, [rsTax,innTax]);


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

  const formatPercentage = (value) => {
    if (value === null || isNaN(value)) {
      return ""; // Return an empty string if the value is null or not a number
    } else {
      return value + "%"; // Add '%' after the value
    }
  };

  const formatNumberWithCommas = (number) => {
    if (typeof number === "number") {
      return number.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else {
      return "N/A"; // Return a placeholder for non-numeric or undefined values
    }
  };

  //   const handleSubmit = async () => {
  //     try {

  //       const response = await axios.get(`http://192.168.10.135:8080/ExpenseReport/year/${selectedCompanyId}/${selectedYear}`,{
  //         params: {
  //             rsTax: 0.2,
  //             innTax: 0.1,
  //             employeeId: 0
  //           }

  //       });

  //     } catch (error) {

  //       console.error('Error fetching data:', error);
  //     }
  //   };

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await axios.get(
          `http://192.168.10.135:8080/ExpenseReport/year/${selectedCompanyId}/${selectedYear}`,
          {
            params: {
              rsTax: rsTax,
              innTax: innTax,
              employeeId: 0,
            },
          }
        );
        const dataList = response.data;
        setYearTableData(response.data);
        setTableData(response.data.list);
        console.log(tableData);
        console.log(response);
        const employees = dataList.map((obj) => ({
          firstName: obj.employee.firstName,
          costPerYear: obj.employee.costPerYear,
          hours: obj.months.map((monthsObj) => monthsObj.totalInnHours),
          researchHours: obj.months.map(
            (monthsObj) => monthsObj.totalResearchHours
          ),
          costPerHour: obj.employee.map(
            (employeeObj) => employeeObj.costPerHour
          ),
        }));
        setEmployees(employees);
      } catch (error) {
        console.error("Error fetching names:", error);
      }
    };
    fetchNames();
  }, [selectedYear, selectedCompanyId, rsTax, innTax]);
  const accessToken = sessionStorage.getItem("Token");

  if (!accessToken) {
    return <Navigate to="/" />;
  }
  return (
    <div className="allPage">
      <Navbar />

      <div className="add-page">
        <DropdownYear />
        {/* <button onClick={handleSubmit}></button> */}
        <div className="head"></div>
        <div className="table1">
          <div className="table-container">
            <table>
              <colgroup>
                <col />
              </colgroup>
              <thead>
                <tr>
                  <th>Matr.</th>
                  <th>Nome</th>
                  <th>Cognome</th>
                  <th>Ruolo</th>
                  <th>Cost per year</th>
                  <th>Costo orario</th>
                  <th>% R&S</th>
                  <th> % INN</th>
                  <th style={{ backgroundColor: "rgb(114 161 215)" }}>
                    Gennaio
                  </th>
                  <th style={{ backgroundColor: "rgb(114 161 215)" }}>
                    Febbraio
                  </th>
                  <th style={{ backgroundColor: "rgb(114 161 215)" }}>Marzo</th>
                  <th style={{ backgroundColor: "rgb(114 161 215)" }}>
                    Aprile
                  </th>
                  <th style={{ backgroundColor: "rgb(114 161 215)" }}>
                    Maggio
                  </th>
                  <th style={{ backgroundColor: "rgb(114 161 215)" }}>
                    Giugno
                  </th>
                  <th style={{ backgroundColor: "rgb(114 161 215)" }}>
                    Luglio
                  </th>
                  <th style={{ backgroundColor: "rgb(114 161 215)" }}>
                    Agosto
                  </th>
                  <th style={{ backgroundColor: "rgb(114 161 215)" }}>
                    Settembre
                  </th>
                  <th style={{ backgroundColor: "rgb(114 161 215)" }}>
                    Ottobre
                  </th>
                  <th style={{ backgroundColor: "rgb(114 161 215)" }}>
                    Novembre
                  </th>
                  <th style={{ backgroundColor: "rgb(114 161 215)" }}>
                    Dicembre
                  </th>

                  <th>Tot. Ore</th>
                  <th>Valore</th>
                  <th>Cred.Imp Maturato</th>
                  {/* <th>Tot. Ore mens</th> */}
                </tr>
              </thead>

              <tbody>
                {tableData.map((obj) => {
                  const { employee } = obj;
                  const { months } = obj;

                  const researchHoursRowData = Array(12).fill(null);
                  const iHoursRowData = Array(12).fill(null);

                  months.forEach((month) => {
                    const { totalInnHours, totalResearchHours, monthIndex } =
                      month;
                    iHoursRowData[monthIndex - 1] = totalInnHours;
                    researchHoursRowData[monthIndex - 1] = totalResearchHours;
                  });

                  return (
                    <React.Fragment key={employee.id}>
                      <tr>
                        <td>{employee.matricola}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>

                        <td>{employee.position.shortName}</td>
                        <td>€{formatNumberWithCommas(employee.costPerYear)}</td>
                        <td>€{formatNumberWithCommas(employee.costPerHour)}</td>
                        <td>
                          <input
                            className="inputtt"
                            type="text"
                            value={formatPercentage(rsTax)}
                            onChange={(e) => {
                              const inputValue = e.target.value
                                .trim()
                                .replace("%", "");

                              setRsTax(parseFloat(inputValue));
                            }}
                          />
                          {/* {obj.RSTax}% */}
                        </td>
                        <td></td>
                        {researchHoursRowData.map((value, index) => (
                          <td key={index}> {value !== null ? value : "-"}</td>
                        ))}

                        <td>{formatNumberWithCommas(obj.yearResearchHours)}</td>
                        <td>
                          €{formatNumberWithCommas(obj.yearTotalResearchCost)}
                        </td>
                        <td>
                          {" "}
                          €
                          {formatNumberWithCommas(
                            (obj.yearTotalResearchCost * obj.RSTax) / 100
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                        <input
                            className="inputtt"
                            type="text"
                            value={formatPercentage(innTax)}
                            onChange={(e) => {
                              const inputValue = e.target.value
                                .trim()
                                .replace("%", "");

                              setInnTax(parseFloat(inputValue));
                            }}
                          />
                          {/* {obj.InnTax}% */}
                        </td>
                        {iHoursRowData.map((value, index) => (
                          <td key={index}>{value !== null ? value : "-"}</td>
                        ))}

                        <td>{formatNumberWithCommas(obj.yearInnHours)}</td>
                        <td>€{formatNumberWithCommas(obj.yearTotalInnCost)}</td>
                        <td>
                          €
                          {formatNumberWithCommas(
                            (obj.yearTotalInnCost * obj.InnTax) / 100
                          )}
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
              <tr>
                <td style={{ border: "none", backgroundColor: "white" }}></td>
                <td style={{ border: "none", backgroundColor: "white" }}></td>
                <td style={{ border: "none", backgroundColor: "white" }}></td>
                <td
                  style={{
                    backgroundColor: "rgba(71, 121, 173, 9)",
                    color: "white",
                  }}
                >
                  Totali {selectedYear} -----&gt;{" "}
                </td>
                <td
                  style={{
                    backgroundColor: "rgba(71, 121, 173, 9)",
                    color: "white",
                  }}
                >
                  €{formatNumberWithCommas(yearTableData.totalCostPerYear)}
                </td>
                <td
                  style={{
                    backgroundColor: "rgba(71, 121, 173, 9)",
                    color: "white",
                  }}
                ></td>
                <td
                  style={{
                    backgroundColor: "rgba(71, 121, 173, 9)",
                    color: "white",
                  }}
                ></td>
                <td
                  style={{
                    backgroundColor: "rgba(71, 121, 173, 9)",
                    color: "white",
                  }}
                ></td>
                <td
                  style={{
                    backgroundColor: "rgb(114 161 215)",
                    color: "white",
                  }}
                >
                  {formatNumberWithCommas(yearTableData.januaryTotal)}
                </td>
                <td
                  style={{
                    backgroundColor: "rgb(114 161 215)",
                    color: "white",
                  }}
                >
                  {formatNumberWithCommas(yearTableData.februaryTotal)}
                </td>
                <td
                  style={{
                    backgroundColor: "rgb(114 161 215)",
                    color: "white",
                  }}
                >
                  {formatNumberWithCommas(yearTableData.marchTotal)}
                </td>
                <td
                  style={{
                    backgroundColor: "rgb(114 161 215)",
                    color: "white",
                  }}
                >
                  {formatNumberWithCommas(yearTableData.aprilTotal)}
                </td>
                <td
                  style={{
                    backgroundColor: "rgb(114 161 215)",
                    color: "white",
                  }}
                >
                  {formatNumberWithCommas(yearTableData.mayTotal)}
                </td>
                <td
                  style={{
                    backgroundColor: "rgb(114 161 215)",
                    color: "white",
                  }}
                >
                  {formatNumberWithCommas(yearTableData.juneTotal)}
                </td>
                <td
                  style={{
                    backgroundColor: "rgb(114 161 215)",
                    color: "white",
                  }}
                >
                  {formatNumberWithCommas(yearTableData.julyTotal)}
                </td>
                <td
                  style={{
                    backgroundColor: "rgb(114 161 215)",
                    color: "white",
                  }}
                >
                  {formatNumberWithCommas(yearTableData.augustTotal)}
                </td>
                <td
                  style={{
                    backgroundColor: "rgb(114 161 215)",
                    color: "white",
                  }}
                >
                  {formatNumberWithCommas(yearTableData.septemberTotal)}
                </td>
                <td
                  style={{
                    backgroundColor: "rgb(114 161 215)",
                    color: "white",
                  }}
                >
                  {formatNumberWithCommas(yearTableData.octoberTotal)}
                </td>
                <td
                  style={{
                    backgroundColor: "rgb(114 161 215)",
                    color: "white",
                  }}
                >
                  {formatNumberWithCommas(yearTableData.novemberTotal)}
                </td>
                <td
                  style={{
                    backgroundColor: "rgb(114 161 215)",
                    color: "white",
                  }}
                >
                  {formatNumberWithCommas(yearTableData.decemberTotal)}
                </td>
                {/* <td
                  style={{
                    backgroundColor: "rgba(71, 121, 173, 9)",
                    color: "white",
                  }}
                >
                  <input
                    className="inputt"
                    style={{
                      backgroundColor: "rgba(71, 121, 173, 9)",
                      color: "white",
                    }}
                  ></input>
                </td> */}
                <td
                  style={{
                    backgroundColor: "rgba(71, 121, 173, 9)",
                    color: "white",
                  }}
                >
                  {formatNumberWithCommas(yearTableData.totalHours)}
                </td>
                <td
                  style={{
                    backgroundColor: "rgba(71, 121, 173, 9)",
                    color: "white",
                  }}
                >
                  €{formatNumberWithCommas(yearTableData.totalCostCalculated)}
                </td>
                <td
                  style={{
                    backgroundColor: "rgba(71, 121, 173, 9)",
                    color: "white",
                  }}
                >
                  {/* <input
                    className="inputt"
                    style={{
                      backgroundColor: "rgba(71, 121, 173, 9)",
                      color: "white",
                    }}
                  ></input> */}
                   €{formatNumberWithCommas(yearTableData.totalTax/100)}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalReport;
