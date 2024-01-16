import React from "react";
import "./GenericButton.css";

function GenericButton(props) {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick(props.value);
    }
  };
  return (
    <div className="container-button">
      <button
        className={props.className || "generic_button"}
        onClick={handleClick}
        name={props.name}
        disabled={props.disabled}
      >
        {props.name}
      </button>
    </div>
  );
}

export default GenericButton;
