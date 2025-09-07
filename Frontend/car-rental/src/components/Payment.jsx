import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const bookingDataFromState = state?.bookingData || {};

  const handleCashPayment = async (e) => {
    e.preventDefault();
    const bookingData = {
      ...bookingDataFromState,
      paymentMethod: "Cash",
      paymentStatus: "Pending",
      bookingStatus: "Booked",
    };
    console.log("Booking data being sent:", bookingData);
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

    const handleOnlinePayment = (e) => {
    e.preventDefault();
    navigate('/onlinePayment', { state: { bookingData: bookingDataFromState } });
    }

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Payment</h1>
        <p className="mb-6 text-gray-600">Please choose your payment method:</p>

        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition mb-4"
          onClick={handleOnlinePayment}
        >
          Pay Now
        </button>

        <p className="text-gray-500 mb-4">or</p>

        <button
          className="w-full bg-green-500 text-white py-3 rounded-lg shadow hover:bg-green-600 transition"
          onClick={handleCashPayment}
        >
          Pay with Cash
        </button>
      </div>
    </>
  );
};

export default Payment;
