import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Datepicker(props) {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClick = () => {
    if (props.onClickIcon) {
      props.onClickIcon(props.value);
    }
  };
  return (
    <div className="generic-input-container" style={{ width: props.divWidth }}>
      <div className={props.input_label_style || "label_desc"}>
        {props.input_label}
        <span className="asterik">{props.asterik}</span>
      </div>
      <div className={props.className_input_icon || "input_icon_container"}>
        <div className="icon-div">
          <img src={props.icon} alt="Icon" className="img-tag" />
        </div>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          placeholderText={props.placeholder}
          className={props.className || "input-tag"}
          id={props.id}
          name={props.name}
          pattern={props.pattern}
          readOnly={props.readOnly}
          required={props.required}
          disabled={props.disabled}
          ref={props.inputRef}
        />
        {props.isCentertoAssociate === true ? (
          <div className="icon-div-center">
            <img src={props.centerIcon} alt="Icon" className="img-tag" />
          </div>
        ) : null}
        {props.isPasswordInput === true ? (
          <div className="icon-div-password">
            <img
              onClick={handleClick}
              src={props.passwordIcon}
              alt="Icon"
              className="img-tag"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Datepicker;
