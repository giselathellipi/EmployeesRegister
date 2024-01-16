import "./charts.css";
import React, { useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { useState } from "react";
import Navbar from "../genericNavbar/Navbar";

const Chart = () => {
  const [dataTable, setDataTable] = useState([]);
  const [dataEmployee, setDataEmployee] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2021");
  const [selectedEmployee, setSelectedEmployee] = useState("0");
  const selectedCompanyId = localStorage.getItem("selectedCompanyId");

  


 
  
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
          {/* <option value="">Choose year</option> */}
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      </div>
    );
  };
  console.log(selectedEmployee);
  const DropdownEmployee = ({ employees }) => {
    const handleSelectEmployee = (event) => {
      setSelectedEmployee(event.target.value || 0);
    };

    return (
      <div className="dropdown-container">
        <select
          value={selectedEmployee}
          onChange={handleSelectEmployee}
          className="dropdown-select"
        >
          <option value="">Tutti gli dipendenti</option>
          {employees.map((item) => (
            <option key={item.employee.id} value={item.employee.id}>
              {item.employee.fullName}
            </option>
          ))}
        </select>
      </div>
    );
  };

  useEffect(() => {
    const getAllData = async () => {
      const response = await axios.get(
        `http://192.168.10.135:8080/ExpenseReport/year/${selectedCompanyId}/${selectedYear}/${selectedEmployee}`
      );

      setDataTable(response.data);

      console.log(response.data);
    };

    getAllData();
  }, [selectedCompanyId, selectedYear, selectedEmployee]);

  useEffect(() => {
    const getAllNames = async () => {
      const response = await axios.get(
        `http://192.168.10.135:8080/ExpenseReport/year/${selectedCompanyId}/${selectedYear}/0`
      );

      setDataEmployee(response.data.list);

      console.log(dataEmployee);
    };

    getAllNames();
  }, [selectedCompanyId, selectedYear]);




  const data = [
    {
      name: "Gennaio",
      Ore: dataTable.januaryTotal,
    //   Costo: 900,
    },
    {
      name: "Febbraio",
      Ore: dataTable.februaryTotal,
    //    Costo: 1200,
    },
    {
      name: "Marzo",
      Ore: dataTable.marchTotal,
    //    Costo: 1570,
    },
    {
      name: "Aprile",
      Ore: dataTable.aprilTotal,
    //    Costo: 1200,
    },
    {
      name: "Maggio",
      Ore: dataTable.mayTotal,
    //    Costo: 1200,
    },
    {
      name: "Giugno",
      Ore: dataTable.juneTotal,
    //    Costo: 600,
    },
    {
      name: "Luglio",
      Ore: dataTable.julyTotal,
    //    Costo: 300,
    },
    {
      name: "Agosto",
      Ore: dataTable.augustTotal,
    //    Costo: 400,
    },
    {
      name: "Settembre",
      Ore: dataTable.septemberTotal,
    //  Costo: 100,
    },
    {
      name: "Ottobre",
      Ore: dataTable.octoberTotal,
    //   Costo: 700,
    },
    {
      name: "Novembre",
      Ore: dataTable.novemberTotal,
    //   Costo: 600,
    },
    {
      name: "Dicembre",
      Ore: dataTable.decemberTotal,
    //   Costo: 200,
    },
  ];
  const formatYAxisLabel = (value) => `${value} Ore`;
  return (
    <>
      <Navbar />
      <div className="allpagee">
        <div className="alldropdown">
        <div className="droppdown">
          <div className="dropdown-item">
            <span className="dropdown-label">Scegli un anno:</span>
            <DropdownYear />
          </div>
          <div className="dropdown-item">
            <span className="dropdown-label">Scegli un dipendente:</span>
            <DropdownEmployee employees={dataEmployee} />
          </div>
        </div>
        </div>
        <div className="chart">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              width={730}
              height={250}
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis  tickFormatter={formatYAxisLabel}/>
              <CartesianGrid strokeDasharray="5 5" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="Ore"
                stroke="#8884d8"
                fillOpacity={0.5}
                fill="url(#colorUv)"
              />
              {/* <Area
                type="monotone"
                dataKey="Costo"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorPv)"
              /> */}
            </AreaChart>
          </ResponsiveContainer>
        </div>
       
      </div>
    </>
  );
};

export default Chart;
