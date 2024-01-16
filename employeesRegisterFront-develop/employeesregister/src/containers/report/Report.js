import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import "./Report.css";
import { Paper } from "@mui/material";
import generatePDF from "../../components/services/generatePDF";
import Navbar from "../../components/genericNavbar/Navbar";
import { Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TransparentDatePicker({ value, onChange }) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.setFocus(true);
  };

  return (
    <div className="transparent-datepicker-wrapper">
      {!value && (
        <span className="datepicker-label" onClick={handleClick}>
          Date
        </span>
      )}
      <DatePicker
        ref={inputRef}
        selected={value}
        onChange={onChange}
        dateFormat="dd/MM"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={15}
        customInput={
          <input type="text" className="transparent-datepicker" readOnly />
        }
        popperModifiers={{
          preventOverflow: {
            enabled: true,
            escapeWithReference: false,
            boundariesElement: "viewport",
          },
        }}
      />
    </div>
  );
}

function Report(props) {
  const { state } = useLocation();
  const [reportData, setReportData] = useState([]);
  const [actualDate, setActualDate] = useState(null); // State variable for actual date
  const [companyName, setCompanyName] = useState("");
  const selectedCompanyId = localStorage.getItem("selectedCompanyId");
  useEffect(() => {
    axios
      .get(
        `http://192.168.10.135:8080/ExpenseReport/employee/${selectedCompanyId}`
      )
      .then((res) => {
        const reportData = res.data.map((item) => ({
          Cognome: item.lastName,
          Nome: item.firstName,
          Firma: "",
          companyName: item.company.name,
        }));
        setReportData(reportData);
        if (reportData.length > 0) {
          setCompanyName(reportData[0].companyName);
        }
      })
      .catch((err) => console.log(err));
  }, [selectedCompanyId]);

  const accessToken = sessionStorage.getItem("Token");

  if (!accessToken) {
    return <Navigate to="/" />;
  }

  const handleDateChange = (date) => {
    setActualDate(date);
  };

  const handleDownloadPDF = () => {
    if (actualDate) {
      generatePDF(reportData, actualDate, companyName);
    }
  };

  return (
    <div className="containerr">
      <Navbar />
      <div style={{ marginTop: "50px" }}>
        <div
          style={{
            margin: "10px",
            paddingRight: "40px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            onClick={handleDownloadPDF}
            style={{ background: "#b15a5a" }}
            disabled={!actualDate} // Disable the button when actualDate is null
          >
            Download PDF
          </Button>
        </div>

        <Paper
          style={{
            width: "100%",
            maxWidth: "95%",
            margin: "auto",
            marginTop: "20px",
            overflowX: "auto", // Add this line to enable horizontal scrolling on smaller screens
          }}
        >
          <div style={{ overflowX: "auto" }}>
            {/* Add this div for horizontal scrolling */}
            <table style={{ tableLayout: "fixed", width: "100%" }}>
              <colgroup>
                <col style={{ width: "25%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "25%" }} />
                <col style={{ width: "25%" }} />
              </colgroup>
              <thead
                style={{ background: "rgba(71, 121, 173, 1)", color: "#fff" }}
              >
                <tr>
                  <th className="table-cell">Cognome</th>
                  <th className="table-cell">Nome</th>
                  <th className="table-cell table-header-date">
                    <TransparentDatePicker
                      value={actualDate}
                      onChange={handleDateChange}
                    />
                  </th>
                  <th className="table-cell">Firma</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((item, index) => (
                  <tr key={index}>
                    <td className="table-cell">{item.Cognome}</td>
                    <td className="table-cell">{item.Nome}</td>
                    <td className="table-cell"></td>
                    <td className="table-cell">{item.Firma}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default Report;
