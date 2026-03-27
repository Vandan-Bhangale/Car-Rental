import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(6);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    try {
      const fetchCars = async () => {
        const response = await axios.get(
          `${import.meta.env.VITE_GENERAL_API}/api/getCars`,
        );
        setCars(response.data);
        // console.log("Fetched cars:", response.data);
      };
      fetchCars();
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredCars = cars.filter((car) => {
    const text = searchTerm.toLowerCase();

    return (
      car.Brand.toLowerCase().includes(text) ||
      car.Model.toLowerCase().includes(text)
    );
  });

  // pagination logic
  const indexOfLastCar = currentPage * postPerPage;
  const indexOfFirstCar = indexOfLastCar - postPerPage;

  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const totalPages = Math.ceil(filteredCars.length / postPerPage);

  return (
    <CarContext.Provider
      value={{
        cars: currentCars,
        currentPage,
        setCurrentPage,
        totalPages,
        loading,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};
