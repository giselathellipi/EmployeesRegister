import React, { useState, useEffect } from "react";
import Card from "../../components/card/Card";
import axios from "axios";
import "./Company.css";
import { Navigate } from "react-router-dom";
import AddImage from "../../assets/add-icon.png";
import { useNavigate } from "react-router-dom";
const CompanyPage = () => {
  const navigate = useNavigate();

  const [companyNames, setCompanyNames] = useState([]);
  console.log(companyNames);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [getCompany, setGetCompany] = useState("");
  useEffect(() => {
    fetchCompanyNamesFromAPI()
      .then((data) => {
        setCompanyNames(data);
      })
      .catch((error) => {
        console.error("Error fetching company names:", error);
      });
    const storedCompanyId = localStorage.getItem("selectedCompanyId");
    setSelectedCompanyId(storedCompanyId);
  }, []);

  const fetchCompanyNamesFromAPI = async () => {
    try {
      const response = await axios.get(
        "http://192.168.10.135:8080/ExpenseReport/company"
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching company names:", error);
      return [];
    }
  };

  const handleAddCompanyClick = () => {
    navigate("/societa");
  };
  const accessToken = sessionStorage.getItem("Token");
  if (!accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <div className="company-page">
      <div className="copmany-content-holder">
        <h1>Scegli societa!</h1>
        <div className="company-grid">
          {companyNames.map((company) => (
            <Card key={company.id} name={company.name} id={company.id} />
          ))}
          <div className="card-container" onClick={handleAddCompanyClick}>
            <p>Aggiungi Societa</p>
            <div className="img-container">
              <img alt="addimage" src={AddImage} className="add-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
