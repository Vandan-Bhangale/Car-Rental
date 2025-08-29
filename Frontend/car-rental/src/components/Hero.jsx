import carImage from "../assets/car_image1.png";

const Hero = () => {
    return (
        <>
      <section className="bg-gray-100 text-center py-12 px-6">
        {/* Text content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Rent Your Car Easily
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Affordable hourly & daily rentals with no hidden charges.
          </p>
          <button className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-lg">
            Search Cars
          </button>
        </div>

        {/* Hero image */}
        <div className="mt-10 flex items-center justify-center rounded-lg shadow img">
          <img
            src={carImage}
            alt="Hero car"
            className="w-[800px] object-cover"
          />
        </div>
      </section>
    </>
    )
}

export default Hero;