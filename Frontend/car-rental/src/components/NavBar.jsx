import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi"; // Icons for menu toggle
import Profile from "./Profile";

const NavBar = ({ setIsLoggedIn, isLoggedIn, userType, setUserType }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu toggle
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_GENERAL_API}/api/logout`,
        {},
        { withCredentials: true }
      );
      Cookies.remove("isLoggedIn");
      setIsLoggedIn(false);
      localStorage.removeItem("user");
      setUserType(null);
      toast.success("Logout Successful");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Try again!");
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white/70 backdrop-blur-md shadow-md rounded-b-2xl px-6 md:px-8 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
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

      {/* Hamburger menu for mobile */}

      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-700 text-3xl focus:outline-none"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Nav Links (Desktop) */}
      <div className="hidden md:flex gap-8">
        <NavLinks isLoggedIn={isLoggedIn} setShowProfile={setShowProfile} showProfile={showProfile}/>
      </div>

      {/* Auth Buttons (Desktop) */}
      <div className="hidden md:flex items-center gap-4">
        <ActionButtons
          userType={userType}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        />
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-start px-6 py-4 md:hidden z-40 gap-4">
          <NavLinks onClick={toggleMenu} showProfile={showProfile} setShowProfile={setShowProfile} isLoggedIn={isLoggedIn}/>
          <ActionButtons
            userType={userType}
            isLoggedIn={isLoggedIn}
            handleLogout={() => {
              handleLogout();
              toggleMenu();
            }}
          />
        </div>
      )}
    </nav>
  );
};

// Reusable NavLinks component
const NavLinks = ({ onClick,isLoggedIn,setShowProfile,showProfile }) => (
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
    {isLoggedIn && (
      <button
        onClick={() => {
          setShowProfile(true);
        }}
        className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
      >
        Profile
      </button>
    )}

    {/* Render the modal inside Navbar */}
      {showProfile && <Profile setShowProfile={setShowProfile} />}
  </>
);

// Reusable Buttons (Login/Register/AddCar etc.)
const ActionButtons = ({ userType, isLoggedIn, handleLogout }) => (
  <>
    {isLoggedIn && userType?.userType === "owner" && (
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

    {isLoggedIn && userType?.userType === "guest" && (
      <>
        <Link
          to="/cars"
          className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-medium transition-all duration-300 shadow-sm"
        >
          Search Car
        </Link>
        <Link
          to="/my-bookings"
          className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-medium transition-all duration-300 shadow-sm"
        >
          My Bookings
        </Link>
      </>
    )}

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
  </>
);

export default NavBar;
