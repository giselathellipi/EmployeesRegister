import React, { useEffect, useState } from "react";
import Navbar from "../../components/genericNavbar/Navbar";
import "./AddHours.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "@mui/material";
import { Navigate } from "react-router-dom";

const AddHours = () => {
  const [names, setNames] = useState([]);
  const [id, setId] = useState([]);
  const [allData, setAlldata] = useState([]);
  const [inputs, setInputs] = useState(["", "", "", "", ""]);
  const [iHours,setIHours]=useState(["","","","",""]);
  const [rHours, setRHours] = useState(["", "", "", "", ""]);
  const [picklist, setPicklist] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [isValidInput, setIsValidInput] = useState([]);
  const [isValidRHours, setIsValidRHours] = useState([]);
  const selectedCompanyId = localStorage.getItem("selectedCompanyId");
  const [isValidIHours, setIsValidIHours] = useState([]); 

  const isWeekendDisabled = (date) => {
    const day = dayjs(date).day(); // 0: Sunday, 1: Monday, ..., 6: Saturday
    return day === 0 || day === 6; // Disable Sundays (0) and Saturdays (6)
  };

  useEffect(() => {
    if (selectedDate) {
      const formatted = dayjs(selectedDate).format("DD/MM/YYYY");
      const stringified = formatted.toString();
      setFormattedDate(stringified);
    }
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatDate = (date) => {
    return dayjs(date).format("DD/MM/YYYY");
  };

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await axios.get(
          `http://192.168.10.135:8080/ExpenseReport/employee/${selectedCompanyId}`
        );
        const dataList = response.data;
        setAlldata(response.data);

        const names = dataList.map((obj) => obj.fullName);
        const employeeId = dataList.map((obj) => obj.id);
        setId(employeeId);
        setNames(names);
        setIsValidInput([...Array(names.length)].fill(true));
        setIsValidRHours([...Array(names.length)].fill(true));
        setIsValidIHours([...Array(names.length)].fill(true));
      } catch (error) {
        console.error("Error fetching names:", error);
      }
    };
    fetchNames();
  }, []);

  const handleInputChange = (index, value, name) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = { name, value };
    setInputs(updatedInputs);
    // const isValid = value === "" || /^([0-8](\.\d{1,2})?)$/.test(value);
    const isValid = value === "" || /^(?:[0-9]|[1-6][0-9]|70)(\.\d{1,2})?$/.test(value);

    setIsValidInput((prev) => {
      const updatedValidations = [...prev];
      updatedValidations[index] = isValid;
      return updatedValidations;
    });
  };
  const handleInput2Change = (index, value, name) => {
    const updatedRHours = [...rHours];
    updatedRHours[index] = { name, value };
    setRHours(updatedRHours);
    const isValid = value === "" || /^([0-8](\.\d{1,2})?)$/.test(value);
    setIsValidRHours((prev) => {
      const updatedValidations = [...prev];
      updatedValidations[index] = isValid;
      return updatedValidations;
    });
  };


  const handleInput3Change = (index, value, name) => {
    const updatedIHours = [...iHours];
    updatedIHours[index] = { name, value };
    setIHours(updatedIHours);
    const isValid = value === "" || /^([0-8](\.\d{1,2})?)$/.test(value);
    setIsValidIHours((prev) => {
      const updatedValidations = [...prev];
      updatedValidations[index] = isValid;
      return updatedValidations;
    });
  }



  const handleResearchChange = (index, value, name) => {
    const updatedPicklist = [...picklist];
    updatedPicklist[index] = { name, dropdownValue: value };

    const updatedInputs = [...inputs];
    const updatedRHours = [...rHours];
    const updatedIHours=[...iHours];

    if (value === "F") {
      updatedInputs[index] = { name, value: "0" };
      updatedRHours[index] = { name, value: "0" };
      updatedIHours[index] = { name, value: "0" };
    } else if (value === "M") {
      updatedInputs[index] = { name, value: "0" };
      updatedRHours[index] = { name, value: "0" };
      updatedIHours[index] = { name, value: "0" };
    } else if (value === "P") {
      updatedInputs[index] = { name, value: "0" };
      updatedRHours[index] = { name, value: "0" };
      updatedIHours[index] = { name, value: "0" };
    } else {
      updatedInputs[index] = { name, value: inputs[index]?.value || "" };
      updatedRHours[index] = { name, value: rHours[index]?.value || "" };
      updatedIHours[index] = { name, value: iHours[index]?.value || "" };
    }

    setPicklist(updatedPicklist);
    setInputs(updatedInputs);
    setRHours(updatedRHours);
    setIHours(updatedIHours);
  };

  const handleSubmit = () => {
    const data = names.map((name, index, id) => {
      const researchHoursValue = rHours[index]?.value || "";
      const workHoursValue = inputs[index]?.value || "";
      const innHoursValue=iHours[index]?.value || "";
      const isFestivoSelected = picklist[index]?.dropdownValue === "F";
      const isMalatieSelected = picklist[index]?.dropdownValue === "M";
      const isPermesoSelected = picklist[index]?.dropdownValue === "P";

    

      return {
        workHours:
          isFestivoSelected || isMalatieSelected || isPermesoSelected
            ? "0"
            : workHoursValue,
        date: formattedDate,
        festivo: isFestivoSelected,
        permeso: isPermesoSelected,
        malatie: isMalatieSelected,
        ferie: false,
        employeeId: allData[index].id,
        researchHours:
          isFestivoSelected || isMalatieSelected || isPermesoSelected
            ? "0"
            : researchHoursValue,
        innHours:
            isFestivoSelected || isMalatieSelected || isPermesoSelected
              ? "0"
              : innHoursValue,
      };
    });

    console.log(data);

    axios
      .post(
        `http://192.168.10.135:8080/ExpenseReport/employeeHours/${selectedCompanyId}/all`,

        data
      )

      .then((response) => {
        console.log("Assignment successful:", response.data);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        toast.success("Hours saved successful!", {
          autoClose: 1500, // Set autoClose to 1.5 seconds
          hideProgressBar: true, // Hide the progress bar
        });
      })
      .catch((error) => {
        console.error("Error assigning values:", error);
        toast.error("Missing information or wrong information!");
      });
    console.log(data);
  };
  const accessToken = sessionStorage.getItem("Token");

  if (!accessToken) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div>
        <Navbar />
      </div>
      <ToastContainer />
      <div className="add-page">
        <div className="head">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Choose date"
                value={selectedDate}
                onChange={handleDateChange}
                shouldDisableDate={isWeekendDisabled}
              />
            </DemoContainer>
          </LocalizationProvider>

          <button className="button" onClick={handleSubmit}>
            Save
          </button>
        </div>
        <div className="table2">
          <div className="table-container">
            <table>
              <colgroup>
                <col style={{ width: "60%" }} />
                <col style={{ width: "20%" }} />
                <col style={{ width: "20%" }} />
              </colgroup>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Work Hours</th>
                  <th>Research Hours</th>
                  <th>Innovacione Hours</th>
                  <th>Picklist</th>
                </tr>
              </thead>
              <tbody>
                {names.map((name, index) => (
                  <tr key={index}>
                    <td>{name}</td>
                    <td>
                      <Tooltip
                        open={!isValidInput[index] && inputs[index] !== ""}
                        title="Invalid value! Please enter a number between 0 and 8."
                        placement="top-start"
                      >
                        <input
                          className={`inputt ${
                            !isValidInput[index] && inputs[index]?.value !== ""
                              ? "invalid-input"
                              : ""
                          }`}
                          type="text"
                          required
                          value={inputs[index]?.value || ""}
                          onChange={(e) =>
                            handleInputChange(index, e.target.value, name)
                          }
                        />
                      </Tooltip>
                    </td>
                    <td>
                      <Tooltip
                        open={!isValidRHours[index] && rHours[index] !== ""}
                        title="Invalid value! Please enter a number between 0 and 8."
                        placement="top-start"
                      >
                        <input
                          className={`inputt ${
                            !isValidRHours[index] && rHours[index]?.value !== ""
                              ? "invalid-input"
                              : ""
                          }`}
                          type="text"
                          required
                          value={rHours[index]?.value || ""}
                          onChange={(e) =>
                            handleInput2Change(index, e.target.value, name)
                          }
                        />
                      </Tooltip>
                    </td>
                    <td>
                    <Tooltip
                      open={!isValidInput[index] && inputs[index] !== ""}
                      title="Invalid value! Please enter a number between 0 and 8."
                      placement="top-start"
                    >
                      <input
                        className={`inputt ${!isValidIHours[index] && iHours[index]?.value !== "" ? "invalid-input" : ""}`}
                        type="text"
                        required
                        value={iHours[index]?.value || ""}
                        onChange={(e) =>
                          handleInput3Change(index, e.target.value, name)
                        }
                      />
                       </Tooltip>
                    </td>
                    <td>
                      <div
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <div
                          style={{
                            top: "0",
                            right: "0",
                            display: "flex",
                            alignItems: "center",
                            height: "100%",
                            paddingRight: "5px",
                          }}
                        >
                          <select
                            style={{ border: "none", cursor: "pointer" }}
                            value={picklist[index]?.dropdownValue || ""}
                            onChange={(e) =>
                              handleResearchChange(index, e.target.value, name)
                            }
                          >
                            <option value="">Select</option>
                            <option value="F">F</option>
                            <option value="M">M</option>
                            <option value="P">P</option>
                          </select>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddHours;
