import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OnlinePayment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const bookingDataFromState = state?.bookingData || {};

  const handleOnlinePayment = async (e) => {
    e.preventDefault();
    const bookingData = {
      ...bookingDataFromState,
      paymentMethod: "Online",
      paymentStatus: "Completed",
      bookingStatus: "Booked",
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_GENERAL_API}/api/bookings`,
        bookingData,
        { withCredentials: true }
      );
      console.log("Booking successful:", response.data);
      toast.success("Booking successful!");
      navigate("/my-bookings");
    } catch (error) {
      console.error("Error during booking:", error);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Online Payment
      </h2>
      <form onSubmit={handleOnlinePayment} className="space-y-4">
        <input
          type="text"
          placeholder="Name on Card"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Card Number"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Expiry Date (MM/YY)"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="CVV"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default OnlinePayment;
