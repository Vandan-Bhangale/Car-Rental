const BookingModel = require("../Models/BookingModel");
const CarModel = require("../Models/CarModel");
const mongoose = require("mongoose");
const Stripe = require("stripe");
require("dotenv").config();
const sendMail = require("../utils/sendMail");
const User = require("../Models/userModel");
const stripe = new Stripe(process.env.STRIPE_API);

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
    const userId = req.session.userId;
    const user = await User.findById(userId);
    console.log("User Id: ", user.email);

    if (!mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({ message: "Invalid car ID format." });
    }

    const car = await CarModel.findById(carId).populate("ownerId"); //Getting car document from carID
    //* Used populate for car object because carId just give Id and populate generates whole car object
    
    if (!car) {
      return res.status(400).json({ message: "Car not found." });
    }

    // Calculate total amount (for simplicity, assuming a fixed rate)
    const ratePerDay = car.DailyPrice;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const formattedStart = new Date(startDate).toISOString().slice(0, 10);
    const formattedEnd = new Date(endDate).toISOString().slice(0, 10);
    const days = Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)) + 1;
    if (days < 1) days = 1; // Minimum one day booking
    const totalAmount = days * ratePerDay;

    const ownerId = car.ownerId; //* Storing the ownerId in booking to know the owner
    console.log("owner email: ", ownerId.email);

    const booking = new BookingModel({
      userId: req.session.userId,
      name,
      carId,
      ownerId,
      startDate: formattedStart,
      endDate: formattedEnd,
      location,
      totalAmount,
      paymentMethod, // Assuming online payment for now
      paymentStatus, // Assuming payment is completed for now
      bookingStatus,
    });

    await booking.save();


    //TODO: Sending mail functionality is disabled for developement and testing
    // await sendMail(
    //   user.email,
    //   "Booking confirmation",
    //   `Your booking for car ${car.name} has been confirmed.`,
    // );

    // await sendMail(
    //   ownerId.email,
    //   "Booking confirmation",
    //   `You have booking for car ${car.name} from user ${user.name} for the date ${formattedStart} to ${formattedEnd}.`,
    // );
    console.log("Mail send successfully");

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.log("Error while booking car: ", error);

    res.status(500).json({ message: "Server error", error });
  }
};

//* Fetching user booking data for user
exports.getUserBookings = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const bookings = await BookingModel.find({
      endDate: { $gte: today },
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
      req.params.bookingId,
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
    const ownerId = req.session.userId;
    const bookingCount = await BookingModel.countDocuments({ ownerId });
    res.status(200).json({ count: bookingCount });
  } catch (error) {
    console.log("Error fetching booking count:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getTotalRevenue = async (req, res) => {
  try {
    const ownerId = req.session.userId;
    const result = await BookingModel.aggregate([
      {
        $match: { ownerId },
      },
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
    console.log("Error while getting total Revenue: ", error);

    res.status(400).json({ message: "Server error", error });
  }
};

//Fetching the booking details for the specified owner
exports.getBookingDetails = async (req, res) => {
  try {
    const ownerId = req.session.userId; // Assuming owner is logged in
    // console.log("Owner ID:", ownerId);

    if (!ownerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const bookings = await BookingModel.find()
      .populate({
        path: "carId",
        match: { ownerId: ownerId }, // Filter cars by owner ID
        select: "Brand Model ownerId", // Add 'ownerId' if you need to debug
      })
      .populate({
        path: "userId",
        select: "name email",
      });

    // Filter out bookings where carId is null (i.e. not owned by this owner)
    const ownerBookings = bookings.filter((booking) => booking.carId);

    res.status(200).json({ bookings: ownerBookings });
  } catch (error) {
    console.error("Error fetching booking details:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.payment = async (req, res) => {
  try {
    const { amount } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "myBooking",
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://car-rental-rho-cyan.vercel.app/success",
      cancel_url: "https://car-rental-rho-cyan.vercel.app/cancel",
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
