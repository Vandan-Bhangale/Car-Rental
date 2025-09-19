import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
    });
  }, []);
  return (
    <div data-aos="fade-in-down" className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
        About Us
      </h1>

      <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10 text-center">
        At <span className="font-semibold text-indigo-600">Car-Rental</span>, we
        are passionate about providing you with reliable, affordable, and
        convenient car rental services. Whether you need a compact car for city
        drives or a spacious SUV for family adventures, we've got you covered.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-700 max-w-2xl">
          To make car rentals simple and accessible for everyone. We believe in
          offering quality vehicles, excellent customer service, and transparent
          pricing — all to ensure your journeys are smooth and stress-free.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          What We Offer
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 max-w-2xl">
          <li>A wide range of vehicles to suit every need and budget</li>
          <li>Flexible rental periods — from hours to weeks</li>
          <li>Easy online booking and quick pick-up/drop-off locations</li>
          <li>24/7 customer support to assist you whenever needed</li>
          <li>Transparent pricing with no hidden fees</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-gray-700">
          <div>
            <h3 className="font-semibold text-lg mb-2">Trusted Fleet</h3>
            <p>
              All our vehicles undergo regular maintenance to guarantee safety
              and performance.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Affordable Rates</h3>
            <p>
              Competitive pricing tailored to provide the best value without
              compromising quality.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Customer First</h3>
            <p>
              Our dedicated support team is always ready to help you 24/7 with
              any questions or concerns.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
