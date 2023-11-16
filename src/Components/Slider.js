import React from "react";

const Slider = ({ passwordLength, setPasswordLength, min, max }) => {
  return (
    <div className="flex items-center">
      <input
        type="range"
        min={min}
        max={max}
        value={passwordLength}
        onChange={(e) => setPasswordLength(e.target.value)}
      />
      <output>{passwordLength}</output>
    </div>
  );
};

export default Slider;
