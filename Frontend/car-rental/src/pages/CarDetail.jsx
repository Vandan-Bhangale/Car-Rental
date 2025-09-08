import axios from "axios";
import { use, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import BookingForm from "../components/BookingForm";

const CarDetail = ({isLoggedIn,userType}) => {
  const { id } = useParams(); // ✅ gets :id from URL
  const [car, setCar] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_GENERAL_API}/api/getCarsById/${id}`
        );
        setCar(res.data);
        console.log("Fetched car details:", res.data);
      } catch (err) {
        console.error("Error fetching car:", err);
      }
    };
    fetchCar();
  }, [id]);

  return (
    <>
      <div className="flex flex-col gap-8 mt-10 px-4 items-center">
        {/* Back to cars */}
        <div className="w-full max-w-3xl">
          <Link to="/cars" className="text-blue-500 hover:underline">
            ← Back to Cars
          </Link>
        </div>

        {/* Car detail */}
        {car ? (
          <>
            {/* Image */}
            <div className="w-full max-w-3xl">
              <img
                src={`${import.meta.env.VITE_GENERAL_API}/uploads/${car.image}`}
                alt={car.title}
                className="w-full h-[350px] object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Text + details aligned left */}
            <div className="w-full max-w-3xl flex flex-col items-start gap-6">
              <div>
                <h2 className="text-3xl font-bold mb-1">
                  {car.Brand} / {car.Model}
                </h2>
                <p className="text-gray-600 text-lg">
                  {car.Year} • {car.Category}
                </p>
              </div>

              {/* Info tags */}
              <div className="flex flex-wrap gap-3">
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full">
                  📍 {car.Location}
                </div>
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full">
                  🪑 {car.SeatingCapacity} Seats
                </div>
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full">
                  ⚙️ {car.Transmission}
                </div>
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full">
                  ⛽ {car.FuelType}
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {car.Description}
                </p>
              </div>

              {/* Price + Button */}
              <div className="flex flex-col gap-4">
                <p className="text-xl font-semibold text-gray-800">
                  Price:{" "}
                  <span className="text-blue-600">${car.DailyPrice}</span> / day
                </p>
                {userType?.userType === "guest" && (
                  <button
                  onClick={() => {
                    if (isLoggedIn) {
                        setShowBookingForm(true)
                    } else {
                        toast.error("Please login to book a car")
                    }
                }}
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-lg"
                >
                  Book Now
                </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>Loading car details...</p>
        )}
      </div>

      {showBookingForm && (
        <BookingForm showBookingForm={showBookingForm} setShowBookingForm={setShowBookingForm} />
      )}
      
      <Footer></Footer>
    </>
  );
};

export default CarDetail;
