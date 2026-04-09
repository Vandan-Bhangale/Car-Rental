import React from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Logo from "./Logo";

const MobileMenuToggleButton = ({ menuOpen, toggleMenu }) => {
  return (
    <div className="md:hidden flex items-center justify-between w-full">
      
      {/* Left - Logo */}
      <Logo />

      {/* Right - Hamburger */}
      <button
        onClick={toggleMenu}
        className="text-gray-700 text-3xl focus:outline-none"
      >
        {menuOpen ? <HiX /> : <HiMenu />}
      </button>

    </div>
  );
};

export default MobileMenuToggleButton;
