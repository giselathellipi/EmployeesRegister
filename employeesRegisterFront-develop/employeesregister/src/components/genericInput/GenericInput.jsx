import React from "react";
import "./GenericInput.css";
function GenericInput(props) {
  const handleClick = () => {
    if (props.onClickIcon) {
      props.onClickIcon(props.value);
    }
  };

  const containerStyle = {
    width: props.divWidth || "100%",
    height: props.divHeight || "auto",
  };

  const inputStyle = {
    fontSize: props.fontSize || "inherit",
    inputWidth: props.inputWidth || "auto",
    inputHeight: props.inputHeight || "auto",
  };

  const labelStyle = {
    width: props.labelWidth || "auto",
    fontSize: props.labelFontSize || "inherit",
  };

  return (
    <div className="generic-input-container" style={containerStyle}>
      <div
        className={props.input_label_style || "label_desc"}
        style={labelStyle}
      >
        {props.input_label}
        <span className="asterik">{props.asterik}</span>
      </div>
      <div className={props.className_input_icon || "input_icon_container"}>
        {props.icon && (
          <div className="icon-div">
            <img src={props.icon} alt="Icon" className="img-tag" />
          </div>
        )}
        <input
        id={props.id}
        type={props.type}
        name={props.name}
        className={`input-tag ${props.icon ? "with-icon" : ""} ${
          props.isSmall ? "small-input" : ""
        }`}
        onChange={props.onChange}
        onBlur={props.handleFocus}
        label={props.label}
        placeholder={props.placeholder}
        value={props.value}
        pattern={props.pattern}
        readOnly={props.readOnly}
        required={props.required}
        disabled={props.disabled}
        ref={props.inputRef}
        step={props.step}
        style={{ ...inputStyle, borderLeft: props.dynamicBorderStyle }}
      />
        {props.isCenter && (
          <div className="icon-div-center">
            <img src={props.centerIcon} alt="Icon" className="img-tag" />
          </div>
        )}
        {props.isPassword && (
          <div className="icon-div-password">
            <img
              onClick={handleClick}
              src={props.passwordIcon}
              alt="Icon"
              className="img-tag"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default GenericInput;
