const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['Online', 'Cash'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed'],
        required: true,
    },
    bookingStatus: {
        type: String,
        enum: ['Booked', 'Completed'],
        required: true,
    }
})

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;