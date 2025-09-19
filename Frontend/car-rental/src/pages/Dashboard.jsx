import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

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
        setTotalRevenue(data.revenue);
      });
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
    });
  }, []);

  return (
    <>
      <div className="mt-15 md:mt-0">
        <h2 data-aos="fade-down" className="text-2xl font-bold">
          Admin Dashboard
        </h2>
        <p data-aos="fade-down" className="text-gray-600 text-sm">
          Monitor overall performance including total cars, bookings
        </p>
        <p data-aos="fade-down" className="text-gray-600 text-sm">
          and revenue.
        </p>

        <div
          data-aos="fade-right"
          className="flex flex-col md:flex-row flex-wrap gap-4 mt-4"
        >
          {/* Total Cars */}
          <div className="flex-1 md:max-w-[196px] p-4 bg-white rounded shadow">
            <p className="inline-block">
              Total Cars <span className="text-2xl">🚗</span>
            </p>
            <p className="text-xl font-semibold mt-1">{carCount}</p>
          </div>

          {/* Total Bookings */}
          <div className="flex-1 md:max-w-[196px] p-4 bg-white rounded shadow">
            <p className="inline-block">Total Bookings</p>{" "}
            <span className="text-2xl">🗒️</span>
            <p className="text-xl font-semibold mt-1">{bookingCount}</p>
          </div>

          {/* Total Revenue */}
          <div className="flex-1 md:max-w-[196px] p-4 bg-white rounded shadow">
            <p className="inline-block">Total Revenue</p>{" "}
            <span className="text-2xl">💵</span>
            <p className="text-xl font-bold mt-1 text-blue-500">
              ₹ {totalRevenue}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
