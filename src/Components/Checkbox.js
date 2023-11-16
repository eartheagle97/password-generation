import React from "react";

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center checkbox-container">
      <input
        type="checkbox"
        id="customCheckbox"
        checked={checked}
        onChange={onChange}
      />{" "}
      <span className="checkmark" />
      {label}
    </label>
  );
};

export default Checkbox;
