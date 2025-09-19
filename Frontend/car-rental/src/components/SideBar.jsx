import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import 'aos/dist/aos.css';
import AOS from 'aos';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
        AOS.init({
          duration: 1000,
          easing: "ease",
          once: true
        })
      },[]);

  return (
    <>
      {/* Hamburger toggle - below navbar */}
      <div data-aos="fade-down" data-aos-duration="500" className="md:hidden fixed top-16 left-0 w-full z-30 bg-white shadow-sm px-4 py-2 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Dashboard Menu</h2>
        <button onClick={() => setIsOpen(true)}>
          <HiMenu className="text-2xl text-gray-700" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div data-aos="fade-down" className="hidden md:flex fixed top-16 left-0 w-64 h-[calc(100vh-64px)] bg-white border-r border-r-gray-400 shadow-md z-20 flex-col">
        <div className="p-6 border-b border-b-gray-400">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
        </div>
        <ul className="flex flex-col space-y-2 p-4 text-gray-700 text-sm font-medium">
          <SidebarLinks />
        </ul>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-64px)] w-64 bg-white border-r shadow-md z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center p-6 border-b border-b-gray-500">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
          <button onClick={() => setIsOpen(false)}>
            <HiX className="text-2xl text-gray-700" />
          </button>
        </div>
        <ul className="flex flex-col space-y-2 p-4 text-gray-700 text-sm font-medium">
          <SidebarLinks onLinkClick={() => setIsOpen(false)} />
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

const SidebarLinks = ({ onLinkClick = () => {} }) => (
  <>
    <li>
      <Link
        to="/dashboard/dashboard"
        onClick={onLinkClick}
        className="block px-4 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition"
      >
        Dashboard
      </Link>
    </li>
    <li>
      <Link
        to="/dashboard/manage-car"
        onClick={onLinkClick}
        className="block px-4 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition"
      >
        Manage Car
      </Link>
    </li>
    <li>
      <Link
        to="/dashboard/cars"
        onClick={onLinkClick}
        className="block px-4 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition"
      >
        My Cars
      </Link>
    </li>
    <li>
      <Link
        to="/dashboard/booking-details"
        onClick={onLinkClick}
        className="block px-4 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition"
      >
        Bookings
      </Link>
    </li>
  </>
);

export default SideBar;
