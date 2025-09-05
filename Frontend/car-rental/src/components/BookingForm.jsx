import { useState } from "react";
import axios from "axios";
import { Link, useParams,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BookingForm = ({ setShowBookingForm }) => {
  //The variable name 'id' in useParams should match the parameter name defined in your route in frontend.
  const { id } = useParams();      
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_GENERAL_API}/api/bookings`,
        { name, startDate, endDate, location, carId: id },
        { withCredentials: true }
      );
      console.log("Booking successful:", response.data);
      toast.success("Booking successful!");
      navigate("/my-bookings");
      setShowBookingForm(false);
    } catch (error) {
      console.error("Error during booking:", error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/20 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-2xl w-[400px] relative">
          <button
            onClick={() => setShowBookingForm(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>

          {/* Booking form goes here */}
          <h2 className="text-xl font-bold mb-4">Book This Car</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border p-2 w-full rounded"
            />
            <input
              type="date"
              placeholder="Start Date"
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
              className="border p-2 w-full rounded"
            />
            <input
              type="date"
              placeholder="End Date"
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}
              className="border p-2 w-full rounded"
            />
            <input
              type="text"
              placeholder="Enter Location"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              className="border p-2 w-full rounded"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-600 inline-block text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
