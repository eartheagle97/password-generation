import React from "react";
import { FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <header className="container mx-auto py-7">
      <a
        href="https://github.com/eartheagle97/password-generation"
        target="_blank"
      >
        <p className="flex justify-center items-center">
          <FaGithub className="mr-2" />{" "}
          <span className="text-sm">eartheagle97/password-generation</span>
        </p>
      </a>
    </header>
  );
};

export default Header;
