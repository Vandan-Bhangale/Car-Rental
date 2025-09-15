import { useState } from "react";
import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";
import { HiOutlineMenu, HiX } from "react-icons/hi"; // Hamburger and Close Icons

function NavBar({ isLoggedIn, userType, handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white/70 backdrop-blur-md shadow-md rounded-b-2xl px-6 py-3 flex items-center justify-between sticky top-0 z-50">
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

      {/* Hamburger Icon - Mobile Only */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 text-3xl">
          {menuOpen ? <HiX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex gap-8">
        <NavLinks />
      </div>

      {/* Auth Buttons - Desktop */}
      <div className="hidden md:flex items-center gap-4">
        <AuthButtons isLoggedIn={isLoggedIn} userType={userType} handleLogout={handleLogout} />
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-[100%] left-0 w-full bg-white shadow-md rounded-b-2xl px-6 py-4 flex flex-col gap-4 z-40">
          <NavLinks />
          <AuthButtons isLoggedIn={isLoggedIn} userType={userType} handleLogout={handleLogout} />
        </div>
      )}
    </nav>
  );
}

// Extracted Nav Links
function NavLinks() {
  return (
    <>
      <Link
        to="/"
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
    </>
  );
}

// Extracted Auth Buttons (owner/guest/unauth)
function AuthButtons({ isLoggedIn, userType, handleLogout }) {
  return (
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
}

export default NavBar;
