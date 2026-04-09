import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.webp";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <img
        src={logo}
        alt="CarRental Logo"
        className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-gray-300 group-hover:scale-110 transition-transform duration-300"
      />
      <span className="font-bold text-xl md:text-2xl font-serif text-gray-700 tracking-wide group-hover:text-blue-600 transition-colors duration-300">
        CarRental
      </span>
    </Link>
  );
};

export default Logo;
