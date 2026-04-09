const NoCars = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      {/* Icon */}
      <div className="text-6xl mb-4">🚗</div>

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-gray-800">No Cars Found</h2>

      {/* Description */}
      <p className="text-gray-500 mt-2 max-w-md">
        We couldn't find any cars matching your search. Try adjusting your
        filters or explore all available cars.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => window.location.reload()}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          View All Cars
        </button>
      </div>
    </div>
  );
};

export default NoCars;
