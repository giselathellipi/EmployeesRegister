import React from "react";
import GenericButton from "../genericButton/GenericButton";
import "./Modal.css";

function Modal(props) {
  const modalSubmit = (m) => {
    props.modalMessage(m);
  };
  return (
    <div className="modal-form">
      <div className="modal-content">
        <p>Are you sure you want to perform this action?</p>
        <div className="modal-buttons">
          <GenericButton
            onClick={() => modalSubmit("yes")}
            name={"Yes"}
            buttonHeight="45px"
            buttonWidth="70px"
            fontSize="16px"
            variant={"primary"}
          ></GenericButton>
          <button
            className="cancel-button"
            onClick={() => modalSubmit("cancel")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
