import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const selectedCompanyName = localStorage.getItem("selectedCompanyName");
  // const selectedCompanyId = localStorage.getItem("selectedCompanyId");
  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        {selectedCompanyName}
      </a>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
          console.log(isNavExpanded);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          <li>
            <Link to="/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/employee">Dipendenti</Link>
          </li>
          <li>
            <Link to="/settings">Qualifica</Link>
          </li>
         
          <li>
            <Link to="/addhours">Aggiungere Ore</Link>
          </li>
          <li>
            <Link to="/month">Tabella dell'mese</Link>
          </li>
          <li>
            <Link to="/yeartable">Tabella dell'anno</Link>
          </li>
          <li>
            <Link to="/diagram">Diagram</Link>
          </li>
          <li>
            <Link to="/report">Rapporto</Link>
          </li>
          <li>
            <Link to="/finalreport">Final Rapporto</Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={() => [
                sessionStorage.removeItem("Token"),
                sessionStorage.removeItem("Username"),
                sessionStorage.removeItem("UserId"),
                localStorage.clear(),
              ]}
            >
              Uscire
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
