const BookingModel = require("../Models/BookingModel");
const CarModel = require("../Models/CarModel");
const mongoose = require("mongoose");

exports.createBooking = async (req, res) => {
  try {
    const {
      name,
      carId,
      startDate,
      endDate,
      location,
      paymentMethod,
      paymentStatus,
      bookingStatus,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({ message: "Invalid car ID format." });
    }

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
      paymentMethod, // Assuming online payment for now
      paymentStatus, // Assuming payment is completed for now
      bookingStatus,
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
    }).populate({
      path: "carId",
      select: "Brand Model image Year Location Category",
    });
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    console.log(
      "Cancel Booking Request Body:",
      req.session.userId,
      req.params.bookingId
    );
    const cancelBooking = await BookingModel.findOneAndDelete({
      _id: req.params.bookingId,
      userId: req.session.userId,
    });

    if (!cancelBooking) {
      return res.status(404).json({
        message:
          "Booking not found or you are not authorized to cancel this booking.",
      });
    }
    res.status(200).json({ message: "Booking cancelled successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getBookingCount = async (req, res) => {
  try {
    const bookingCount = await BookingModel.countDocuments();
    res.status(200).json({ count: bookingCount });
  } catch (error) {
    console.log("Error fetching booking count:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getTotalRevenue = async (req, res) => {
  try {
    const result = await BookingModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const revenue = (await result[0]?.totalRevenue) || 0;
    res.status(200).json({ revenue });
  } catch (error) {
    res.status(400).json({ message: "Server error", error });
  }
};

//Fetching the total bookings for the specified owner
// This is giving error
exports.getBookingDetails = async (req, res) => {
  try {
    const ownerId = req.session.userId;
    console.log("Owner ID:", ownerId);
    if (!ownerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const bookings = await BookingModel.aggregate([
      {
        $lookup: {
          from: "car",
          localField: "carId",
          foreignField: "_id",
          as: "carDetails",
        },
      },
      { $unwind: "$carDetails" },
      { $match: { "carDetails.ownerId": mongoose.Types.ObjectId(ownerId) } },
      {
        $lookup: {
          from: "user",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: 0,
          bookingId: "$_id",
          customerName: "$userDetails.name",
          carName: "$carDetails.Brand",
          startDate: 1,
          endDate: 1,
        },
      },
      { $sort: { startDate: -1 } },
    ]);

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
