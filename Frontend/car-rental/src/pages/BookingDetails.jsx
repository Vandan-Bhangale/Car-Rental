import { useEffect, useState } from "react";
import axios from "axios";
import "aos/dist/aos.css";
import AOS from "aos";

// This is giving error
const BookingDetails = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_GENERAL_API}/api/totalBookings`,
          { withCredentials: true }
        );
        setBookings(response.data.bookings);
        console.log("Fetched bookings:", response.data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
    });
  }, []);

  return (
    <div data-aos="fade-down" className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Bookings Details
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <ul data-aos="fade-up" className="space-y-6">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="border border-gray-200 rounded-lg shadow-sm p-6 bg-white hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {booking.carId?.Brand}{" "}
                <span className="text-gray-500">({booking.carId?.Model})</span>
              </h3>

              <p className="text-gray-700">
                <span className="font-medium text-gray-900">Customer:</span>{" "}
                {booking.userId?.name}
              </p>

              <p className="text-gray-700">
                <span className="font-medium text-gray-900">Location:</span>{" "}
                {booking.location}
              </p>

              <p className="text-gray-700">
                <span className="font-medium text-gray-900">Start Date:</span>{" "}
                {new Date(booking.startDate).toLocaleDateString()}
              </p>

              <p className="text-gray-700">
                <span className="font-medium text-gray-900">End Date:</span>{" "}
                {new Date(booking.endDate).toLocaleDateString()}
              </p>

              <p className="inline-flex items-center text-gray-700 font-semibold">
                <span className="mr-2 font-medium text-gray-900">Payment:</span>
                <span
                  className={`inline-block mt-1 px-3 rounded-full shadow-sm ${
                    booking.paymentStatus === "Pending"
                      ? "bg-red-300 text-red-800"
                      : booking.paymentStatus === "Completed"
                      ? "bg-green-200 text-green-800"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {booking.paymentStatus}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingDetails;
