import React, { useState } from "react";
import GenericInput from "../../components/genericInput/GenericInput";
import GenericButton from "../../components/genericButton/GenericButton";
import Navbar from "../../components/genericNavbar/Navbar";
import { Notification } from "../../components/notification/Notification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Societa.css";
import axios from "axios";
const Societa = () => {
  const [aziendaNumero, setAziendaNumero] = useState("");
  const [societa, setSocieta] = useState("");
  const [descrizioneProgetto, setDescrizioneProgetto] = useState("");

  const societaHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://192.168.10.141:8080/ExpenseReport/company",
        { name: societa, description: descrizioneProgetto }
      );
      console.log(response);
      Notification("success", response?.data.message, 6000);
    } catch (error) {
      console.log(error.response);
      Notification("error", error.response?.data.message, 6000);
    }
    setTimeout(() => {
      window.location.href = "/company";
    }, 2000);
  };
  
  return (
    <div>
      <Navbar />
      <div className="registero-del-azienda-container">
        <form
          className="registero-del-azienda-content-holder"
          onSubmit={societaHandler}
        >
          <h1>Registro del azienda</h1>
          <div className="registero-del-azienda-inputs-container">
            <div className="registero-del-azienda-inputs-content-holder">
              <GenericInput
                input_label="Partita IVA"
                type="number"
                placeholder="1"
                fontSize="14px"
                labelWidth="100px"
                labelFontSize="16px"
                value={aziendaNumero}
                onChange={(e) => setAziendaNumero(e.target.value)}
                dynamicBorderStyle="none"
                required
              />
            </div>
            <div className="registero-del-azienda-inputs-content-holder">
              <GenericInput
                input_label="Societa"
                placeholder="societa"
                fontSize="14px"
                labelWidth="100px"
                labelFontSize="16px"
                value={societa}
                onChange={(e) => setSocieta(e.target.value)}
                dynamicBorderStyle="none"
                required
              />
            </div>
          </div>
          <div className="registero-del-azienda-inputs-content-holder">
            <GenericInput
              input_label="Descrizione del progetto"
              placeholder="descrizione"
              fontSize="14px"
              //   labelWidth="100px"
              labelFontSize="16px"
              value={descrizioneProgetto}
              onChange={(e) => setDescrizioneProgetto(e.target.value)}
              dynamicBorderStyle="none"
              required
            />
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

export default Societa;
