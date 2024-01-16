import React from "react";
import AccountImage from "../../assets/account-img.png";
import "./Card.css";
import { useNavigate } from "react-router-dom";
const Card = (props) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log("Card clicked:", props.id, props.name);
    localStorage.setItem("selectedCompanyId", props.id);
    localStorage.setItem("selectedCompanyName", props.name);
    navigate("/dashboard");
  };

  return (
    <div className="card-container" onClick={handleCardClick}>
      <p>{props.name}</p>
      <div className="img-container">
        <img alt="accountimage" src={AccountImage} className="account-image" />
      </div>
    </div>
  );
};

export default Card;
