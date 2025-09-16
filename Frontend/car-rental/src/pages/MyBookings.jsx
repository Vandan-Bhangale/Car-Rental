import { useEffect, useState } from "react";
import axios from "axios";
import NoBookings from "../components/NoBookings";
import { FiTrash2 } from "react-icons/fi"; // Import the cancel icon

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_GENERAL_API}/api/mybookings`,
          {
            method: "GET",
            credentials: "include", // Include cookies for session management
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched bookings:", data);
        setBookings(data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    try {
      console.log("Attempting to cancel booking with ID:", bookingId);

      const response = await axios.delete(
        `${import.meta.env.VITE_GENERAL_API}/api/cancelbooking/${bookingId}`,
        { withCredentials: true }
      );
      setBookings(bookings.filter((b) => b._id !== bookingId));
      console.log("Booking cancelled:", response.data);
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold ml-4 mt-10 md:ml-10">My Bookings</h1>
        <p className="text-lg text-gray-500 mb-4 ml-4 md:ml-10">
          View and Manage your bookings here.
        </p>
      </div>

      {bookings.length === 0 ? (
        <NoBookings />
      ) : (
        <div className="flex flex-col items-center">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="relative border border-gray-300 w-11/12 md:w-4/5 p-4 md:p-6 rounded-2xl mb-6 flex flex-col md:flex-row"
            >
              {/* Car Info Section */}
              <div className="md:w-60 w-full flex-shrink-0">
                <img
                  className="h-40 w-full object-cover rounded-2xl"
                  src={booking.carId?.image}
                  alt={booking.carId?.Brand}
                />
                <h2 className="font-bold mt-3 text-center md:text-left">
                  {booking.carId?.Brand} {booking.carId?.Model}
                </h2>
                <ul className="flex flex-wrap justify-center md:justify-start gap-2 text-sm text-gray-600 mt-1">
                  <li className="relative before:content-['•'] before:mr-1 text-m before:text-black">
                    {booking.carId?.Year}
                  </li>
                  <li className="relative before:content-['•'] before:mr-1 text-m before:text-black uppercase">
                    {booking.carId?.Category}
                  </li>
                  <li className="relative before:content-['•'] before:mr-1 text-m before:text-black">
                    {booking.carId?.Location}
                  </li>
                </ul>
              </div>

              {/* Booking Details Section */}
              <div className="mt-5 md:mt-0 md:ml-6 flex-1">
                {/* Booking Status Tags */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <p
                    className={
                      "rounded-2xl px-3 py-1 " +
                      (booking.paymentMethod === "Online"
                        ? "bg-blue-200 text-blue-600"
                        : "bg-yellow-200 text-yellow-600")
                    }
                  >
                    {booking.paymentMethod}
                  </p>
                  <p
                    className={`rounded-2xl px-3 py-1 ${
                      booking.paymentStatus === "Completed"
                        ? "bg-green-200 text-green-600"
                        : "bg-red-200 text-red-500"
                    }`}
                  >
                    {booking.paymentStatus}
                  </p>
                  <p className="bg-green-200 text-green-600 rounded-2xl px-3 py-1">
                    {booking.bookingStatus}
                  </p>
                </div>

                {/* Booking Period */}
                <p>⏱️ Booking Period</p>
                <p className="ml-0 md:ml-6 text-black font-bold font-mono">
                  {new Date(booking.startDate).toLocaleDateString()} -{" "}
                  {new Date(booking.endDate).toLocaleDateString()}
                </p>
                <br />

                {/* Pickup Location */}
                <p>📍 Pickup Location</p>
                <p className="ml-0 md:ml-6 text-black font-bold font-mono">
                  {booking.location}
                </p>
                <br />

                {/* Total Amount */}
                <p>💰 Total Amount</p>
                <p className="ml-0 md:ml-6 font-bold text-2xl text-blue-600">
                  ${booking.totalAmount}
                </p>
              </div>

              {/* Cancel Button */}
              <div className="mt-4 md:mt-0 md:absolute md:top-4 md:right-4 self-end md:self-start">
                <button
                  onClick={() => handleCancel(booking._id)}
                  className="flex items-center gap-1 text-sm text-red-600 hover:underline"
                >
                  <FiTrash2 size={18} />
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MyBookings;
