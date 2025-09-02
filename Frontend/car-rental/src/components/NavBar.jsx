import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.webp';
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const NavBar = ({ setIsLoggedIn, isLoggedIn,userType,setUserType }) => {
  const navigate = useNavigate();
 
  const handleLogout = async () => {
    try {
      await axios.post(`http://localhost:3001/api/logout`, {}, { withCredentials: true });
      Cookies.remove('isLoggedIn'); // Remove cookie
      setIsLoggedIn(false);         // Update state
      localStorage.removeItem("user"); // Remove user info from localStorage
      setUserType(null);
      toast.success("Logout Successful");
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error("Logout failed. Try again!");
    }
  };

  return (
    <nav className="bg-white/70 backdrop-blur-md shadow-md rounded-b-2xl px-8 py-3 flex items-center justify-between sticky top-0 z-50">
    {/* Logo */}
    <Link to="/" className="flex items-center gap-3 group">
      <img
        src={logo}
        alt="CarRental Logo"
        className="h-12 w-12 rounded-full border border-gray-300 group-hover:scale-110 transition-transform duration-300"
      />
      <span className="font-bold text-2xl font-serif text-gray-700 tracking-wide group-hover:text-blue-600 transition-colors duration-300">
        CarRental
      </span>
    </Link>

    {/* Nav Links */}
    <div className="hidden md:flex gap-8">
      <Link
        to="/ "
        className="relative text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 after:content-[''] after:block after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
      >
        Home
      </Link>
      <Link
        to="/cars"
        className="relative text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 after:content-[''] after:block after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
      >
        Cars
      </Link>
      <Link
        to="/about"
        className="relative text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 after:content-[''] after:block after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
      >
        About
      </Link>
    </div>

    {/* Conditional Buttons */}
    <div className="flex items-center gap-4">
      {userType?.userType === "owner" && (
        <>
          <Link
            to="/add-car"
            className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-medium transition-all duration-300 shadow-sm"
          >
            Add Car
          </Link>
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-medium transition-all duration-300 shadow-sm"
          >
            Dashboard
          </Link>
        </>
      )}

      {userType?.userType === "guest" && (
        <>
          <Link
            to="/search"
            className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-medium transition-all duration-300 shadow-sm"
          >
            Search Car
          </Link>
          <Link
            to="/bookings"
            className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-medium transition-all duration-300 shadow-sm"
          >
            My Bookings
          </Link>
        </>
      )}

      {/* Auth Buttons */}
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 font-semibold shadow-md transition-all duration-300"
        >
          Logout
        </button>
      ) : (
        <>
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold shadow-md transition-all duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-semibold shadow-md transition-all duration-300"
          >
            Register
          </Link>
        </>
      )}
    </div>
  </nav>
  );
};

export default NavBar;
