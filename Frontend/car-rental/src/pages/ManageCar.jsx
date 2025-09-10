import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const ManageCar = () => {
  const [cars, setCars] = useState([]);

  //Fetching all cars from backend
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

  //Delete car function
  const deleteCar = async (carId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_GENERAL_API}/api/deleteCar/${carId}`
      );
      setCars(cars.filter((car) => car._id !== carId));
      toast.success("Car deleted successfully");
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };
  return (
    <>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="flex items-center justify-between mt-1">
                  <p className="text-base font-bold text-indigo-600">
                    ${car.DailyPrice} / day
                  </p>
                  <button onClick={() => deleteCar(car._id)}>
                    <MdDelete className="text-red-600 text-2xl hover:text-red-800" />
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ManageCar;
