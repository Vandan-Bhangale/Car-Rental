import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const bookingDataFromState = state?.bookingData || {};
  const { totalAmount } = state;

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

  const handleOnlinePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const userId = storedUser?.id;   //Taking out userId from localstorage to save it on DB

    try {
      const bookingData = {
        ...bookingDataFromState,
        userId: userId,
        totalAmount: totalAmount,     //Saving amount because stripe is redirecting so it can be vanished
        paymentMethod: "Online",
        paymentStatus: "Completed",
        bookingStatus: "Booked",
      };

      localStorage.setItem("bookingData", JSON.stringify(bookingData));   //Storing bookingdata because stripe is
                                                                          //Redirecting

      const response = await axios.post(
        `${import.meta.env.VITE_GENERAL_API}/api/payment`,
        { amount: totalAmount },
        { withCredentials: true }
      );

      if (response && response.status === 200) {
        window.location.href = response.data.url;
      }
    } catch (err) {
      console.log("Error while making payment.", err);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Payment</h1>
        <p className="mb-6 text-gray-600">Please choose your payment method:</p>

        <button
          className={`w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition mb-4
                       ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          onClick={handleOnlinePayment}
          disabled={loading}
        > 
          {loading ? "Processing..." : "Pay Now"} 
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
