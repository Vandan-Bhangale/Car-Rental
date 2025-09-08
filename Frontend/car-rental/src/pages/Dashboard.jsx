import { useEffect, useState } from "react";

const Dashboard = () => {
  const [carCount, setCarCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Fetch car count from backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_GENERAL_API}/api/carCount`)
      .then((response) => response.json())
      .then((data) => {
        setCarCount(data.count);
      });
  }, []);

  // Fetch booking count from backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_GENERAL_API}/api/bookingCount`)
      .then((response) => response.json())
      .then((data) => {
        setBookingCount(data.count);
      });
  }, []);

  // Fetch total revenue from backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_GENERAL_API}/api/totalRevenue`)
      .then((response) => response.json())
      .then((data) => {
        setTotalRevenue(data.totalRevenue);
      });
  }, []);

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <p className="text-gray-600 text-sm">
          Monitor overall performance including total cars, bookings
        </p>
        <p className="text-gray-600 text-sm">and revenue.</p>

        <div className="flex flex-col md:flex-row flex-wrap gap-4 mt-4">
          {/* Total Cars */}
          <div className="flex-1 md:max-w-[196px] p-4 bg-white rounded shadow">
            <p className="inline-block">
              Total Cars <span className="text-2xl">🚗</span>
            </p>
            <p className="text-xl font-semibold mt-1">{carCount}</p>
          </div>

          {/* Total Bookings */}
          <div className="flex-1 md:max-w-[196px] p-4 bg-white rounded shadow">
            <p className="inline-block">Total Bookings</p> <span className="text-2xl">🗒️</span>
            <p className="text-xl font-semibold mt-1">{bookingCount}</p>
          </div>

          {/* Total Revenue */}
          <div className="flex-1 md:max-w-[196px] p-4 bg-white rounded shadow">
            <p className="inline-block">Total Revenue</p> <span className="text-2xl">💵</span>
            <p className="text-xl font-semibold mt-1">$ {totalRevenue}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
