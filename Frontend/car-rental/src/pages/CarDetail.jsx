import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CarDetail = () => {

    const { id } = useParams();   // ✅ gets :id from URL
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/getCarsById/${id}`);
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
            <p>This is the car detail page.</p>
        </>
    )
}

export default CarDetail;