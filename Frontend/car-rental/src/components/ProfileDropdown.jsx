import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const ProfileDropdown = ({
  setShowProfile,
  dropdownOpen,
  setDropdownOpen,
  isMobile,
}) => {

    const { userType, setUserType,setIsLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

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
  return (
    <div className="relative">
      {/* Profile Picture Trigger */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center focus:outline-none"
      >
        <img
          src={
            userType?.profilePic ||
            `https://ui-avatars.com/api/?name=${userType?.name || "User"}&background=0D8ABC&color=fff`
          }
          alt="Profile"
          className="h-10 w-10 rounded-full border-2 border-blue-500 hover:border-blue-600 transition-all cursor-pointer object-cover shadow-sm"
        />
      </button>

      {/* Dropdown Popup */}
      {dropdownOpen && (
        <div
          className={`${isMobile ? "relative mt-2 w-full" : "absolute right-0 mt-3 w-48"} bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden`}
        >
          <button
            onClick={() => {
              setShowProfile(true);
              setDropdownOpen(false);
            }}
            className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors font-medium cursor-pointer"
          >
            My Profile
          </button>
          <div className="h-[1px] bg-gray-100 mx-2"></div>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
