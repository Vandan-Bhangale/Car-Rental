const BookingForm = ({ setShowBookingForm }) => {

    return (
        <>
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/20 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl w-[400px] relative">
            <button
              onClick={() => setShowBookingForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            {/* Booking form goes here */}
            <h2 className="text-xl font-bold mb-4">Book This Car</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="border p-2 w-full rounded"
              />
              <input
                type="date"
                placeholder="Start Date"
                className="border p-2 w-full rounded"
              />
              <input
                type="date"
                placeholder="End Date"
                className="border p-2 w-full rounded"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
        </>
    )
}

export default BookingForm;