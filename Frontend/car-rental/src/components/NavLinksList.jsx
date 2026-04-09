import React from "react";
import { Link } from "react-router-dom";

const NavLinksList = ({ onClick }) => {
  return (
    <>
      <Link
        to="/"
        onClick={onClick}
        className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
      >
        Home
      </Link>
      <Link
        to="/cars"
        onClick={onClick}
        className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
      >
        Cars
      </Link>
      <Link
        to="/about"
        onClick={onClick}
        className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
      >
        About
      </Link>
    </>
  );
};

export default NavLinksList;
