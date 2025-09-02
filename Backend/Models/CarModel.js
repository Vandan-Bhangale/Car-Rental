const mongoose = require('mongoose');
// const User = require('./userModel');

const CarSchema = mongoose.Schema({
    Brand: { type: String, required: true },
    Model: { type: String, required: true },
    Year: { type: Number, required: true, min: 1900, max: new Date().getFullYear() },
    DailyPrice: { type: Number, required: true, min: 0 },
    Category: { type: String, required: true },
    Transmission: { type: String, required: true },
    FuelType: { type: String, required: true },
    SeatingCapacity: { type: Number, required: true, min: 1, max: 7 },
    Location: { type: String, required: true },
    Description: { type: String, required: true },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

const CarModel = mongoose.model('Car', CarSchema);

module.exports = CarModel;