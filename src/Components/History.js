import React from "react";
import { FaRegCopy, FaCheckCircle } from "react-icons/fa";

const History = ({ passwordHistory, clearHistory, copyToClipboard }) => {
  console.log(passwordHistory);
  return (
    <>
      <ul className="password-history-list">
        {[...passwordHistory].reverse().slice(1).map((entry, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>{entry.password}</span>
            <button
              onClick={() => copyToClipboard(entry.password, index)}
              className="ml-2 py-2"
            >
              {entry.copied ? <FaCheckCircle style={{color: "#ffef3a"}} /> : <FaRegCopy />}
            </button>
          </li>
        ))}
      </ul>
      <button className="my-4" style={{ color: "#ffef3a" }} onClick={clearHistory}>
        Clear History
      </button>
    </>
  );
};

export default History;
