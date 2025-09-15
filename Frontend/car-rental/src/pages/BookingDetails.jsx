import { useEffect, useState } from "react";
import axios from "axios";

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
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-center text-gray-800">
        Bookings Details
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col"
            >
              {/* Car Info */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {booking.carId?.Brand}
                </h3>
                <p className="text-sm text-gray-600">{booking.carId?.Model}</p>
              </div>

              {/* Customer & Location */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">Customer:</span>
                  <span className="text-gray-600">
                    {booking.userId?.name || "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">Location:</span>
                  <span className="text-gray-600">
                    {booking.location || "N/A"}
                  </span>
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">Start Date:</span>
                  <span className="text-gray-600">
                    {new Date(booking.startDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">End Date:</span>
                  <span className="text-gray-600">
                    {new Date(booking.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Payment Status */}
              <div className="mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Payment Status:
                  </span>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      booking.paymentStatus === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : booking.paymentStatus === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {booking.paymentStatus || "Unknown"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingDetails;