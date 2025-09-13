import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Featured = () => {
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

  return (
    <>
      <div className="px-6 py-10 bg-gray-50">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Featured Cars</h1>
          <p className="text-gray-600 mt-2">
            Browse our selection of premium vehicles available for your next
            adventure.
          </p>
        </div>

        {/* Car Listing */}

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.slice(0, 3).map((car) => (
            <Link to={`/car-details/${car._id}`} key={car._id}>
              <div
                key={car._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Car Image */}
                {car.image && (
                  <img
                    className="w-full h-40 object-cover"
                    src={`${import.meta.env.VITE_GENERAL_API}/uploads/${
                      car.image
                    }`}
                    alt={car.title}
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
                    ${car.DailyPrice} / day
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link
            to="/cars"
            className="text-indigo-600 hover:underline text-sm sm:text-base font-medium"
          >
            See All Cars
          </Link>
        </div>
      </div>
    </>
  );
};

export default Featured;

// Featured
