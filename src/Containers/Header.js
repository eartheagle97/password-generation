import React from "react";
import { FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <header className="container mx-auto py-7">
      <p className="flex justify-center items-center">
        <FaGithub className="mr-2" />{" "}
        <span className="text-sm">eartheagle97/</span>
      </p>
    </header>
  );
};

export default Header;
