import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";

const Cars = ({ isLoggedIn, userType }) => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    try {
      const fetchCars = async () => {
        const response = await axios.get(
          `${import.meta.env.VITE_GENERAL_API}/api/getCars`
        );
        setCars(response.data);
        // console.log("Fetched cars:", response.data);
      };
      fetchCars();
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
    });
  }, []);

  let heading = "";
  let text = "";

  if (!isLoggedIn) {
    heading = "Search Cars";
    text = "Explore our collection and find your perfect ride.";
  } else if (userType?.userType === "guest") {
    heading = "Available Cars";
    text =
      "Browse our selection of premium vehicles available for your next adventure.";
  } else {
    heading = "My Cars";
    text = "Track and manage your registered vehicles.";
  }

  return (
    <>
      <div className="px-6 py-10 bg-gray-50 min-h-screen">
        <div className="flex justify-center flex-col items-center mb-10">
          <h1 data-aos="fade-up" className="text-3xl font-bold text-gray-800">
            {heading}
          </h1>
          <p data-aos="fade-up" className="text-gray-600 mt-2">
            {text}
          </p>
        </div>

        {/* Car Listing */}

        <div
          data-aos="fade-up"
          data-aos-duration="2000"
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cars.slice(0, 6).map((car) => (
            <Link to={`/car-details/${car._id}`} key={car._id}>
              <div
                key={car._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Car Image */}
                {car.image && (
                  <img
                    className="w-full h-40 object-cover"
                    src={car.image} // 👈 use directly
                    alt={car.Brand}
                  />
                )}

                {/* Car Details */}
                <div className="p-4">
                  {/* Brand & Model */}
                  <div className="space-y-1">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {car.Brand}
                    </h2>
                    <p className="text-gray-500 text-sm">{car.Model}</p>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="bg-gray-200 px-2 py-0.5 rounded-full text-xs">
                      {car.SeatingCapacity} Seats
                    </span>
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs">
                      {car.Transmission}
                    </span>
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                      {car.FuelType}
                    </span>
                  </div>

                  {/* Location */}
                  <p className="text-gray-600 text-sm mt-2">{car.Location}</p>

                  {/* Price */}
                  <p className="text-base font-bold text-indigo-600 mt-1">
                    ₹{car.DailyPrice} / day
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default Cars;
