const car = require('../Models/CarModel');

exports.postCar = async (req,res) => {
    try {
        console.log("Session data at /postCar:", req.session);
        const newCar = new car({
            ...req.body,
            ownerId: req.session.userId,
            image: req.file ? req.file.filename : null,
        });
        await newCar.save();
        // console.log('Owner ID:', newCar.ownerId);
        res.status(201).json({ message: "Car posted successfully", car: newCar });
    } catch (error) {
        console.error("Error posting car:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getCars = async (req, res) => {
    try {
        const cars = await car.find();
        res.status(200).json(cars);
    } catch (error) {
        console.error("Error fetching cars:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getCarsById = async (req, res) => {
    try {
        const carId = req.params.id;
        const Car = await car.findById(carId);
        if(!Car) {
            return res.status(400).json({ message: "Car is not found" });
        } else {
            return res.status(200).json(Car);
        }
    } catch (error) {
        console.error("Error fetching car by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.getCarCount = async (req,res) => {
    try {
        const count = await car.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        console.error("Error fetching car count:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}