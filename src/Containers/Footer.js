import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container p-4 text-center">
        <p className="text-sm">
          <span style={{ color: "#a5f3fc" }}>
            &copy; {new Date().getFullYear()} Password Generator
          </span>{" "}
          | All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
