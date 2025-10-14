import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    const saveBooking = async () => {
      try {
        const bookingData = JSON.parse(localStorage.getItem("bookingData"));
        if (!bookingData) return;
        console.log(bookingData);

        await axios.post(
          `${import.meta.env.VITE_GENERAL_API}/api/bookings`,
          bookingData,
          { withCredentials: true }
        );

        localStorage.removeItem("bookingData"); // clean up
      } catch (err) {
        console.error("Error saving booking:", err);
      }
    };

    saveBooking();
  }, []);

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful ✅</h1>
      <p className="text-gray-600 mt-4">Your car has been booked successfully!</p>
      <button
        onClick={() => navigate("/cars")}
        className="mt-4 bg-blue-600 text-white mr-3 px-4 py-2 rounded-lg"
      >
        Go Back to Cars
      </button><button
        onClick={() => navigate("/my-bookings")}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Go to Bookings
      </button>
    </div>
  );
}
