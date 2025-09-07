import { useEffect, useState } from "react";
import axios from "axios";

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
        <h1 className="text-2xl font-bold ml-10 mt-10 ">My Bookings</h1>
        <p className="text-lg text-gray-500 mb-4 ml-10">
          View and Manage your bookings here.
        </p>
      </div>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="flex flex-col items-center">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="relative border border-gray-300 w-4/5 p-6 rounded-2xl mb-4 flex"
            >
              <div className="w-60">
                <img
                  className="h-40 w-full object-cover rounded-2xl"
                  src={`${import.meta.env.VITE_GENERAL_API}/uploads/${
                    booking.carId?.image
                  }`}
                  alt={booking.carId?.Brand}
                />
                <h2 className="font-bold">
                  {booking.carId?.Brand} {booking.carId?.Model}
                </h2>

                <ul className="flex gap-2 text-sm text-gray-600">
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

              <div className="ml-6">
                {/* Booking Name */}
                <div className="flex gap-4">
                  <p className={'rounded-2xl px-2 ' + (booking.paymentMethod === "Online" ? "bg-blue-200 text-blue-600" : "bg-yellow-200 text-yellow-600")}>
                    {booking.paymentMethod}
                  </p>
                  <p
                    className={`rounded-2xl px-2 ${
                      booking.paymentStatus === "Completed"
                        ? "bg-green-200 text-green-600"
                        : "bg-red-200 text-red-500"
                    }`}
                  >
                    {booking.paymentStatus}
                  </p>
                  <p className="bg-green-200 text-green-600 rounded-2xl px-2">
                    {booking.bookingStatus}
                  </p>
                </div>
                <br />
                
                {/* Time Period */}
                <p>⏱️ Booking Period</p>
                <p className="ml-6 text-black font-bold font-mono">
                  {new Date(booking.startDate).toLocaleDateString()} -{" "}
                  {new Date(booking.endDate).toLocaleDateString()}
                </p>
                <br />

                {/* Location */}
                <p>📍 Pickup Location</p>
                <p className="ml-6 text-black font-bold font-mono">
                  {booking.location}
                </p>

                <br />

                {/* Total Amount */}
                <p>💰 Total Amount</p>
                <p className="ml-6 font-bold text-2xl text-blue-600">
                  ${booking.totalAmount}
                </p>
              </div>

              <button
                onClick={() => handleCancel(booking._id)}
                className="absolute top-2 right-2 text-sm text-red-600 hover:underline"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MyBookings;
