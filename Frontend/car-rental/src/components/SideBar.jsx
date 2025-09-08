import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <div className="w-64 h-screen bg-white border-r shadow-md flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
        </div>
        <ul className="flex flex-col space-y-2 p-4 text-gray-700 text-sm font-medium">
          <li>
            <Link
              to="/dashboard/dashboard"
              className="block px-4 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="block px-4 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition"
            >
              Manage Car
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/cars"
              className="block px-4 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition"
            >
              My Cars
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/my-bookings"
              className="block px-4 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition"
            >
              Bookings
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
