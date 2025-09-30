import carImage from "../assets/car_image1.png";
import { Link, useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

const Hero = ({ userType, isLoggedIn }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
    });
  }, []);

  return (
    <>
      <section className="bg-gray-100 text-center py-12 px-6">
        {/* Text content */}
        <div>
          <h1
            data-aos="fade-up"
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            Rent Your Car Easily
          </h1>
          <p
            data-aos="fade-up"
            className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Affordable hourly & daily rentals with no hidden charges.
          </p>
          {userType?.userType !== "owner" && (
              <Link
              to="/cars"
              data-aos="fade-up"
              className="mt-6 inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg"
            >
              Search Cars
            </Link>
          )}
          {userType?.userType === "owner" && (
            <Link
              to="/add-car"
              className="mt-6 inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg"
            >
              Add Car
            </Link>
          )}
        </div>

        {/* Hero image */}
        <div
          data-aos="zoom-in"
          className="mt-10 flex items-center justify-center rounded-lg shadow img"
        >
          <img
            src={carImage}
            alt="Hero car"
            className="w-[800px] object-cover"
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
