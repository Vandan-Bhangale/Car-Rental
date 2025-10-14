// src/pages/Cancel.jsx
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 px-4">
      <h1 className="text-3xl font-bold text-red-600">Payment Cancelled</h1>
      <p className="text-gray-600">Your payment was not completed.</p>
      <Link
        to="/cars"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
      >
        Go Back to Cars
      </Link>
    </div>
  );
};

export default Cancel;
