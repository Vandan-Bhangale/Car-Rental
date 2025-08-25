import { Link } from "react-router-dom";
import logo from '../assets/logo.webp';

const NavBar = () => {
    return (
        <nav className="bg-white shadow-lg rounded-b-xl px-8 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
                <img src={logo} alt="CarRental Logo" className="h-12 w-12 rounded-full" />
                <span className="font-bold text-2xl font-serif text-gray-600 tracking-wide">CarRental</span>
            </Link>

            <div className="flex gap-8">
                <Link to="/Home" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">Home</Link>
                <Link to="/cars" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">Cars</Link>
                <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">About</Link>
            </div>

            <div className="flex gap-4">
                <Link to="/login" className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold transition-colors duration-200">Login</Link>
                <Link to="/register" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold transition-colors duration-200">Register</Link>
            </div>
        </nav>
    );
};

export default NavBar;