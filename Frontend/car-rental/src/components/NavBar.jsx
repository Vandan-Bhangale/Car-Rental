import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.webp";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi"; // Icons for menu toggle
import Profile from "./Profile";
import { AuthContext } from "../context/authContext";
import Logo from "./Logo";
import MobileMenuToggleButton from "./MobileMenuToggleButton";
import NavLinksList from "./NavLinksList";
import UserAuthControls from "./UserAuthControls";

const NavBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu toggle
  const [showProfile, setShowProfile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // User dropdown toggle
  const { setIsLoggedIn, isLoggedIn, userType, setUserType } =
    useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_GENERAL_API}/api/logout`,
        {},
        { withCredentials: true },
      );
      Cookies.remove("isLoggedIn");
      setIsLoggedIn(false);
      localStorage.removeItem("user");
      setUserType(null);
      setDropdownOpen(false);
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
      <div className="hidden md:flex items-center w-full">
        {/* Left - Logo */}
        <div className="flex-1">
          <Logo />
        </div>

        {/* Center - Nav Links */}
        <div className="flex-1 flex justify-center gap-8">
          <NavLinksList />
        </div>

        {/* Right - Auth/Profile */}
        <div className="flex-1 flex justify-end gap-4">
          <UserAuthControls
            userType={userType}
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            setShowProfile={setShowProfile}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
            isMobile={false}
          />
        </div>
      </div>

      <MobileMenuToggleButton menuOpen={menuOpen} toggleMenu={toggleMenu} />

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-start px-6 py-4 md:hidden z-40 gap-4">
          <NavLinksList onClick={toggleMenu} />
          <UserAuthControls
            userType={userType}
            isLoggedIn={isLoggedIn}
            handleLogout={() => {
              handleLogout();
              toggleMenu();
            }}
            setShowProfile={setShowProfile}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
            isMobile={true}
          />
        </div>
      )}
      {/* Global Profile Modal */}
      {showProfile && <Profile setShowProfile={setShowProfile} />}
    </nav>
  );
};

export default NavBar;
