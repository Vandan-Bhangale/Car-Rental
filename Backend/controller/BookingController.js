const BookingModel = require("../Models/BookingModel");
const CarModel = require("../Models/CarModel");

exports.createBooking = async (req, res) => {
  try {
    const { name, carId, startDate, endDate, location } = req.body;

    const car = await CarModel.findById(carId); //Getting car document from carID
    if (!car) {
      return res.status(400).json({ message: "Car not found." });
    }

    // Calculate total amount (for simplicity, assuming a fixed rate)
    const ratePerDay = car.DailyPrice;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const formattedStart = new Date(startDate).toISOString().slice(0, 10);
    const formattedEnd = new Date(endDate).toISOString().slice(0, 10);
    const days = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24));
    const totalAmount = days * ratePerDay;

    const booking = new BookingModel({
      userId: req.session.userId,
      name,
      carId,
      startDate: formattedStart,
      endDate: formattedEnd,
      location,
      totalAmount,
    });

    await booking.save();
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//Remaining this functionality to be tested
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await BookingModel.find({
      userId: req.session.userId,
    }).populate({ path: "carId", select: "Brand Model image Year Location Category" });
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.cancelBooking = async (req, res) => {
    try {
           console.log('Cancel Booking Request Body:', req.session.userId, req.params.bookingId);
        const cancelBooking = await BookingModel.findOneAndDelete({_id: req.params.bookingId,userId: req.session.userId});
     
        if(!cancelBooking){
            return res.status(404).json({message: "Booking not found or you are not authorized to cancel this booking."});
        }
        res.status(200).json({message: "Booking cancelled successfully."});
    } catch (error) {
        res.status(500).json({message: "Server error", error});
    }
}
