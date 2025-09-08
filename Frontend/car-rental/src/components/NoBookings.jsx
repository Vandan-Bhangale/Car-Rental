import React from 'react';
import { Link } from 'react-router-dom';

const NoBookings = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          No Bookings Yet
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          You haven’t booked any cars yet. Once you do, they’ll appear here.
        </p>
        <Link
          to="/cars"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
        >
          Browse Cars
        </Link>
      </div>
    </>
  );
};

export default NoBookings;
