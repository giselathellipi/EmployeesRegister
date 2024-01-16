import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import axios from "axios";
import "./employee.css";
import Navbar from "../components/genericNavbar/Navbar";
import { Link, Navigate } from "react-router-dom";
export default function BasicTable() {
  const [employees, setEmployees] = useState([]);
  const selectedCompanyId = localStorage.getItem("selectedCompanyId");
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
  useEffect(() => {
    axios
      .get(
        `http://192.168.10.135:8080/ExpenseReport/employee/${selectedCompanyId}`
      )
      .then((response) => {
        setEmployees(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedCompanyId]);
  const accessToken = sessionStorage.getItem("Token");

  if (!accessToken) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Navbar />

      <div className="table">
        <div className="addemployee">
          <Button variant="contained" style={{ background: "#b15a5a" }}>
            <Link
              to="/home"
              style={{
                textDecoration: "none",
                color: "#ffff",
              }}
            >
              Add employee
            </Link>
          </Button>
        </div>
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 630 }} aria-label="simple table">
              <TableHead style={{ background: "rgba(71, 121, 173, 9)" }}>
                <TableRow>
                  <TableCell
                    style={{
                      color: "#ffff",
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                    align="left"
                  >
                    Matricola
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#ffff",
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                    align="left"
                  >
                    Cognome
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#ffff",
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                    align="left"
                  >
                    Nome
                  </TableCell>

                  <TableCell
                    style={{
                      color: "#ffff",
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                    sx={{ border: "none !important" }}
                    align="left"
                  >
                    Ruolo
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#ffff",
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                    align="left"
                  >
                    Short Name
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#ffff",
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                    align="left"
                  >
                    Costo Orario
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#ffff",
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "16px",
                      textAlign: "center",
                    }}
                    align="left"
                  >
                    Retrio Ann.
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow
                    key={employee.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        color: "black",
                        backgroundColor: "white",
                        fontFamily: "Space Grotesk, sans-serif",
                        fontSize: "15px",
                        textAlign: "center",
                        border: "1px solid rgba(224, 224, 224, 1)",
                      }}
                      align="left"
                    >
                      {employee.matricola}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        fontFamily: "Space Grotesk, sans-serif",
                        fontSize: "15px",
                        border: "1px solid rgba(224, 224, 224, 1)",
                      }}
                      align="left"
                    >
                      {employee.lastName}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        fontFamily: "Space Grotesk, sans-serif",
                        fontSize: "15px",
                        border: "1px solid rgba(224, 224, 224, 1)",
                      }}
                      align="left"
                    >
                      {employee.firstName}
                    </TableCell>

                    <TableCell
                      align="left"
                      style={{
                        color: "black",
                        fontFamily: "Space Grotesk, sans-serif",
                        fontSize: "15px",
                        border: "1px solid rgba(224, 224, 224, 1)",
                      }}
                    >
                      {employee.position.name}
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        color: "black",
                        fontFamily: "Space Grotesk, sans-serif",
                        fontSize: "15px",
                        border: "1px solid rgba(224, 224, 224, 1)",
                      }}
                    >
                      {employee.position.shortName}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        fontFamily: "Space Grotesk, sans-serif",
                        fontSize: "15px",
                        textAlign: "center",
                        border: "1px solid rgba(224, 224, 224, 1)",
                      }}
                      align="left"
                    >
                      €{employee.costPerHour}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        backgroundColor: "white",
                        color: "black",
                        fontFamily: "Space Grotesk, sans-serif",
                        fontSize: "15px",
                        textAlign: "center",
                        border: "1px solid rgba(224, 224, 224, 1)",
                      }}
                      align="left"
                    >
                      €{formatNumberWithCommas(employee.costPerYear)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
