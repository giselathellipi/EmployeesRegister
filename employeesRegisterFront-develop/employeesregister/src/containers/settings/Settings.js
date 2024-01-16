import React, { useState } from "react";
import Navbar from "../../components/genericNavbar/Navbar";
import GenericInput from "../../components/genericInput/GenericInput";
import GenericButton from "../../components/genericButton/GenericButton";
import axios from "axios";
import { Notification } from "../../components/notification/Notification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
const Settings = () => {
  const [ruolo, setRuolo] = useState("");
  const [numero, setNumero] = useState("");
  const [shortName, setShortName] = useState("");
  const selectedCompanyId = localStorage.getItem("selectedCompanyId");
  const registerRuoliHandler = async () => {
    if (!ruolo || !numero) {
      Notification("error", "Please fill in all the required fields!", 3000);
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.10.135:8080/ExpenseReport/position",
        {
          name: ruolo,
          number: numero,
          shortName: shortName,
          companyDTO: { id: selectedCompanyId },
        }
      );

      Notification("success", response.data, 3000);

      setTimeout(() => {
        window.location.href = "/home";
      }, 2000);

      console.log("res", response.data);
    } catch (error) {
      console.log(error);
      Notification("error", error.response.data, 5000);
    }
  };
  const accessToken = sessionStorage.getItem("Token");

  if (!accessToken) {
    return <Navigate to="/" />;
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    registerRuoliHandler();
  };
  return (
    <div>
      <Navbar />
      <div className="register-employee-container">
        <form
          className="registeremployee-content-holder"
          onSubmit={handleSubmit}
        >
          <h1> Qualifica </h1>

          <div style={{ display: "flex" }}>
            {/* <div className="inputs-container" style={{ flex: "1" }}>
              <div className="inputs-content-holder">
              
              </div>
            </div> */}
            <div className="inputs-container" style={{ flex: "1" }}>
              <div className="inputs-content-holder">
                <GenericInput
                  input_label="Codice"
                  type="number"
                  placeholder="1"
                  fontSize="14px"
                  labelWidth="100px"
                  labelFontSize="16px"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  dynamicBorderStyle="none"
                  required
                  asterik="*"
                />
              </div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div className="inputs-container" style={{ flex: "1" }}>
              <div className="inputs-content-holder">
                <GenericInput
                  input_label="Descrizione"
                  placeholder="Developer"
                  fontSize="14px"
                  labelWidth="100px"
                  labelFontSize="16px"
                  value={ruolo}
                  onChange={(e) => setRuolo(e.target.value)}
                  dynamicBorderStyle="none"
                  required
                />
              </div>
            </div>
            <div className="inputs-container" style={{ flex: "1" }}>
              <div className="inputs-content-holder">
                <GenericInput
                  input_label="Nome breve"
                  placeholder="dev"
                  fontSize="14px"
                  labelWidth="100px"
                  labelFontSize="16px"
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                  dynamicBorderStyle="none"
                  required
                />
              </div>
            </div>
          </div>
          <div style={{ margin: "20px 10px 0 10px" }}>
            <GenericButton name="Salva" type="submit" />
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Settings;
