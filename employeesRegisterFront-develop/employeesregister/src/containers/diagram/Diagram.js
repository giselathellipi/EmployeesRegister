import React, { useEffect, useState } from "react";
import axios from "axios";
import Tree from "react-d3-tree";
import Navbar from "../../components/genericNavbar/Navbar";
import { Navigate } from "react-router-dom";
// import "react-d3-tree/lib/styles.css";

const Diagram = () => {
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(treeData);
  useEffect(() => {
    const selectedCompanyId = localStorage.getItem("selectedCompanyId");
    axios
      .get(
        `http://192.168.10.135:8080/ExpenseReport/employee/${selectedCompanyId}`
      )
      .then((res) => {
        console.log(res.data);
        // const employees = res.data;

        const categoryA = [];
        const categoryB = [];
        const categoryC = [];
        const roleEnumMap = {
          PM: "Project Manager",
        };

        const employeesWithExpandedRoles = res.data.map((employee) => ({
          ...employee,
          roleEnumEnum:
            roleEnumMap[employee.roleEnumEnum] || employee.roleEnumEnum,
        }));
        employeesWithExpandedRoles.forEach((employee) => {
          if (employee.roleEnumEnum === "A") {
            categoryA.push(employee.fullName);
          } else if (employee.roleEnumEnum === "B") {
            categoryB.push(employee.fullName);
          } else if (employee.roleEnumEnum === "C") {
            categoryC.push(employee.fullName);
          }
        });
        const projectManager = employeesWithExpandedRoles.find(
          (employee) => employee.roleEnumEnum === "Project Manager"
        );
        const root = {
          name: projectManager ? projectManager.fullName : roleEnumMap["PM"],
          children: [
            {
              name: roleEnumMap["A"],
              children: categoryA.map((name) => ({ name })),
            },
            {
              name: roleEnumMap["B"],
              children: categoryB.map((name) => ({ name })),
            },
            {
              name: roleEnumMap["C"],
              children: categoryC.map((name) => ({ name })),
            },
          ],
        };

        setTreeData(root);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const containerStyle = {
    width: "100%",
    height: "calc(100vh - 50px)", // Adjust the height to account for the Navbar height (assuming the Navbar is 64px in height)
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  };

  const treeConfig = {
    nodeSize: { x: 200, y: 50 },
    separation: { siblings: 1.2, nonSiblings: 1.2 },
    orientation: "horizontal",
    collapsible: false,
  };

  const accessToken = sessionStorage.getItem("Token");

  if (!accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar />
      {/* Check if treeData is not null before rendering the Tree component */}
      {!loading && treeData && (
        <div style={containerStyle}>
          <Tree data={treeData} {...treeConfig} />
        </div>
      )}
    </>
  );
};

export default Diagram;
