import React, { useState, useEffect } from "react";
import Navbar from "../../components/genericNavbar/Navbar";
import "./Home.css";
import GenericInput from "../../components/genericInput/GenericInput";
import GenericButton from "../../components/genericButton/GenericButton";
import axios from "axios";
import { Notification } from "../../components/notification/Notification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GenericPickist from "../../components/genericPickList/GenericPickist";
import { Navigate } from "react-router-dom";
const options = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "PM", label: "PM" },
];
const Home = () => {
  const selectedCompanyId = localStorage.getItem("selectedCompanyId");

  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [matricolo, setMatricolo] = useState("");
  const [allData, setAllData] = useState([]);
  const [ruoloOptions, setRuoloOptions] = useState([]);
  const [selectedRuolo, setSelectedRuolo] = useState("");
  const [costoOrario, setCostoOrario] = useState("");
  const [retrio, setRetrio] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [status, setStatus] = useState("");
  console.log(status);
  const [selectedFilter, setSelectedFilter] = useState("");
  console.log(selectedFilter);
  const registerEmployeeHandler = async () => {
    if (!matricolo || !cognome || !nome) {
      Notification("error", "Please fill in all the required fields!", 3000);
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.10.135:8080/ExpenseReport/employee",
        {
          firstName: nome,
          lastName: cognome,
          matricola: matricolo,
          position: { id: selectedRuolo },
          costPerHour: costoOrario,
          costPerYear: retrio,
          company: { id: selectedCompanyId },
          roleEnumEnum: status,
        }
      );

      Notification("success", response.data, 3000);

      setTimeout(() => {
        window.location.href = "/employee";
      }, 4000);

      console.log("res", response.data);
    } catch (error) {
      console.log(error.response.data);
      Notification("error", error.response.data, 6000);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    registerEmployeeHandler();
  };

  const handleRuoloChange = (event) => {
    setSelectedRuolo(event.target.value);
  };
  const handleNumberChange = (event) => {
    const number = parseInt(event.target.value); // Convert to number if needed
    setSelectedNumber(number);

    const selectedRuoloOption = ruoloOptions.find(
      (option) => option.number === number
    );

    if (selectedRuoloOption) {
      setSelectedRuolo(selectedRuoloOption.id.toString());
    } else {
      setSelectedRuolo("");
    }
  };
  useEffect(() => {
    const fetchRuoloOptions = async () => {
      try {
        const response = await axios.get(
          `http://192.168.10.135:8080/ExpenseReport/position/${selectedCompanyId}`
        );
        const dataList = response.data;
        setAllData(response.data);
        // const roles = dataList.map((obj) => obj.name);
        setRuoloOptions(dataList);
        // console.log(roles);
      } catch (error) {
        console.log(error);
        Notification("error", "Failed to fetch ruolo options", 3000);
      }
    };

    fetchRuoloOptions();
  }, []);
  // Filter ruolo options based on the selected number
  const filteredRuoloOptions = ruoloOptions.filter(
    (option) => option.number === selectedNumber
  );
  const accessToken = sessionStorage.getItem("Token");
  const handleOptionChange = (event) => {
    setStatus(event.target.value);
    // setSelectedOption(event.target.value);
    setSelectedFilter(event.target.value);
  };
  if (!accessToken) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Navbar />
      <div className="register-employee-container">
        <form
          className="registeremployee-content-holder"
          onSubmit={handleSubmit}
        >
          <h1>Registro dei dipendenti</h1>
          <div className="inputs-container">
            <div className="inputs-content-holder">
              <GenericInput
                input_label="Matricola"
                type="number"
                placeholder="1"
                fontSize="14px"
                labelWidth="100px"
                labelFontSize="16px"
                value={matricolo}
                onChange={(e) => setMatricolo(e.target.value)}
                dynamicBorderStyle="none"
                required
              />
            </div>
            <div style={{ flex: "1", padding: "5px " }}>
              <GenericPickist
                options={options}
                value={status || ""}
                onChange={handleOptionChange}
                label="Category"
                select="Select category"
              />
            </div>
          </div>
          <div className="inputs-container">
            <div className="inputs-content-holder">
              <GenericInput
                input_label="Cognome"
                placeholder="Thellipi"
                fontSize="14px"
                labelWidth="100px"
                labelFontSize="16px"
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
                dynamicBorderStyle="none"
                required
              />
            </div>
            <div className="inputs-content-holder">
              <GenericInput
                input_label="Nome"
                placeholder="Gisela"
                fontSize="14px"
                labelWidth="100px"
                labelFontSize="16px"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                dynamicBorderStyle="none"
                required
              />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ flex: "1", padding: "5px " }}>
              <GenericInput
                input_label="Codice"
                type="number"
                placeholder="1"
                fontSize="14px"
                labelWidth="100px"
                labelFontSize="16px"
                value={selectedNumber}
                onChange={handleNumberChange}
                dynamicBorderStyle="none"
                required
              />
            </div>
            <div style={{ flex: "1", padding: "5px " }}>
              <GenericPickist
                options={filteredRuoloOptions.map((option) => ({
                  value: option.id.toString(),
                  label: option.name,
                }))}
                value={selectedRuolo || ""}
                onChange={handleRuoloChange}
                label="Ruolo"
                select="Select ruolo"
              />
            </div>
          </div>
          <div className="inputs-container">
            <div className="inputs-content-holder">
              <GenericInput
                input_label="Costo Orario"
                placeholder="costo orario"
                fontSize="14px"
                labelWidth="100px"
                labelFontSize="16px"
                value={costoOrario}
                onChange={(e) => setCostoOrario(e.target.value)}
                dynamicBorderStyle="none"
                required
                type="number"
              />
            </div>
            <div className="inputs-content-holder">
              <GenericInput
                input_label="Retrio Ann"
                placeholder="1200"
                fontSize="14px"
                labelWidth="100px"
                labelFontSize="16px"
                value={retrio}
                onChange={(e) => setRetrio(e.target.value)}
                dynamicBorderStyle="none"
                required
                type="number"
              />
            </div>
          </div>

          <div style={{ margin: "20px 10px 0 10px" }}>
            <GenericButton name="Add" type="submit" />
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
