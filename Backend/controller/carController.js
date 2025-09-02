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