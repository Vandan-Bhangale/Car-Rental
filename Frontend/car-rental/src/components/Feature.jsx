import carImage1 from '../assets/car_image2.webp';
import carImage2 from '../assets/car_image3.webp';
import carImage3 from '../assets/car_image4.png';

const Featured = () => {
  return (
    <section className="py-12 px-6 flex justify-center items-center flex-col bg-white">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Featured vehicles
      </h2>
      <p className="text-lg text-gray-600">
        We offer a wide range of vehicles to suit your needs. Whether you need a
        car for a day or a month, we've got you covered.
      </p>

      {/* car details card */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300">
          <img
            src={carImage1}
            alt="Car 1"
            className="w-full h-48 object-cover mb-4 rounded-2xl"
          />
          <h3 className="text-xl font-semibold mb-2">Toyota Camry</h3>
          <p className="text-gray-600 mb-2">
            Comfortable midsize sedan, perfect for city driving.
          </p>
          <p className="text-gray-800 font-bold">$50/day</p>
        </div>
        <div className="rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300">
          <img
            src={carImage2}
            alt="Car 2"
            className="w-full h-48 object-cover mb-4 rounded-2xl"
          />
          <h3 className="text-xl font-semibold mb-2">Ford Explorer</h3>
          <p className="text-gray-600 mb-2">
            Spacious SUV, ideal for family trips and off-road adventures.
          </p>
          <p className="text-gray-800 font-bold">$80/day</p>
        </div>
        <div className="rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-300">
          <img
            src={carImage3}
            alt="Car 3"
            className="w-full h-48 object-cover mb-4 rounded-2xl"
          />
          <h3 className="text-xl font-semibold mb-2">BMW 3 Series</h3>
          <p className="text-gray-600 mb-2">
            Luxury sedan with top-notch performance and style.
          </p>
          <p className="text-gray-800 font-bold">$120/day</p>
        </div>
      </div>
    </section>
  );
};

export default Featured;
