import React from "react";

const GenericPickist = (props) => {
  const { options = [], selectedValue = "", onChange } = props;
  return (
    <div className="generic-input-container">
      <div className="label_desc">
       {props.label}
        <span className="asterik">*</span>
      </div>
      <div className="input_icon_container">
        <select
          value={props.value}
          id={props.id}
          onChange={props.onChange}
          defaultValue={props.defaultValue}
          className="input-tag with-icon"
          style={{
            fontSize: "inherit",
            borderLeft: "none",
          }}
          required={true}
        >
          <option value="" disabled defaultValue>
            {props.select}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default GenericPickist;
