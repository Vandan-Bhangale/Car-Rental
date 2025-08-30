import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.webp';
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const NavBar = ({ setIsLoggedIn, isLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`http://localhost:3001/api/logout`, {}, { withCredentials: true });
      Cookies.remove('isLoggedIn'); // Remove cookie
      setIsLoggedIn(false);         // Update state
      toast.success("Logout Successful");
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error("Logout failed. Try again!");
    }
  };

  return (
    <nav className="bg-white shadow-lg rounded-b-xl px-6 py-2 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="CarRental Logo" className="h-12 w-12 rounded-full" />
        <span className="font-bold text-2xl font-serif text-gray-600 tracking-wide">
          CarRental
        </span>
      </Link>

      {/* Nav Links */}
      <div className="flex gap-8">
        <Link to="/home" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">Home</Link>
        <Link to="/cars" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">Cars</Link>
        <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">About</Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 font-semibold transition-colors duration-200"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold transition-colors duration-200"
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
