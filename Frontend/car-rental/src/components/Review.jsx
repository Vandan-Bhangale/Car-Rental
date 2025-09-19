import 'aos/dist/aos.css'; 
import AOS from "aos";
import { useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Customer",
    feedback:
      "Booking a car was super easy and the process was smooth. The car was clean and well-maintained.",
    image: "https://i.pravatar.cc/100?img=1", // placeholder avatar
  },
  {
    id: 2,
    name: "Priya Mehta",
    role: "Customer",
    feedback:
      "I loved the flexible hourly rental option. Affordable prices with no hidden charges!",
    image: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Customer",
    feedback:
      "Great experience! Customer support was very helpful when I needed assistance.",
    image: "https://i.pravatar.cc/100?img=3",
  },
];

const Testimonials = () => {
  useEffect(() => {
      AOS.init ({
        duration: 1000,
        easing: "ease",
        once: true
      })
    },[])
  return (
    <section className="bg-gray-50 py-16 px-6">
      <h2 data-aos="fade-up" className="text-3xl font-bold text-center text-gray-900 mb-12">
        What Our Customers Say
      </h2>

      <div data-aos="fade-up" className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
          >
            {/* User Image */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>

            {/* Feedback */}
            <p className="text-gray-600">{testimonial.feedback}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
