import React from "react";
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

const OwnerSpecificActions = () => (
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
);

const GuestSpecificActions = () => (
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
);

const LoginRegisterButtons = () => (
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
);

const UserAuthControls = ({
  userType,
  isLoggedIn,
  handleLogout,
  setShowProfile,
  dropdownOpen,
  setDropdownOpen,
  isMobile,
}) => {
  return (
    <>
      {isLoggedIn ? (
        <>
          {userType?.userType === "owner" && <OwnerSpecificActions />}
          {userType?.userType === "guest" && <GuestSpecificActions />}
          <ProfileDropdown
            userType={userType}
            handleLogout={handleLogout}
            setShowProfile={setShowProfile}
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
            isMobile={isMobile}
          />
        </>
      ) : (
        <LoginRegisterButtons />
      )}
    </>
  );
};

export default UserAuthControls;
