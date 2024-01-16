import React from "react";
import Navbar from "../../components/genericNavbar/Navbar";
import { Navigate } from "react-router-dom";
import ShowHours from "../../components/showHours/showHours"
const Dashboard = () => {
  const accessToken = sessionStorage.getItem("Token");

  if (!accessToken) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Navbar />
      <ShowHours/>
    </div>
  );
};

export default Dashboard;
