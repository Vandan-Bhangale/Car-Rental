const mongoose = require("mongoose");
const carModel = require("../Models/CarModel");
require("dotenv").config();

const mongodbURI = process.env.MONGODB_URI;

mongoose.connect(mongodbURI)
.then(() => console.log('Connected to mongodb'))
.catch((err) => console.log('Error while connecting to DB: ',err));

const owners = [
    "69a560b2a5a9807a184fc1ec",
    "69a560f0a5a9807a184fc1f1",
    "69a5610ea5a9807a184fc1f3",
    "69a56124a5a9807a184fc1f5",
    "69a5613ba5a9807a184fc1f7"
];

const brands = [
  { Brand: "Toyota", Model: "Fortuner", Category: "SUV" },
  { Brand: "Hyundai", Model: "Creta", Category: "SUV" },
  { Brand: "Honda", Model: "City", Category: "Sedan" },
  { Brand: "Tata", Model: "Punch", Category: "SUV" },
  { Brand: "Maruti", Model: "Swift", Category: "Hatchback" },
  { Brand: "Kia", Model: "Seltos", Category: "SUV" },
  { Brand: "Mahindra", Model: "Thar", Category: "Jeep" },
  { Brand: "BMW", Model: "X5", Category: "Luxury" },
  { Brand: "Audi", Model: "A4", Category: "Luxury" },
  { Brand: "Mercedes", Model: "C-Class", Category: "Luxury" }
];

const fuelTypes = ["Petrol", "Diesel"];
const transmissions = ["Manual", "Automatic"];
const locations = ["Ahmedabad", "Vadodara", "Surat", "Rajkot"];

const images = [
 "https://res.cloudinary.com/dfnt4y1nb/image/upload/v1773250171/car1_ojjqnm.jpg",
 "https://res.cloudinary.com/dfnt4y1nb/image/upload/v1773250187/car2_vpeuej.jpg",
 "https://res.cloudinary.com/dfnt4y1nb/image/upload/v1773250190/car3_xqenxz.jpg",
 "https://res.cloudinary.com/dfnt4y1nb/image/upload/v1773250207/car4_oylokq.jpg",
 "https://res.cloudinary.com/dfnt4y1nb/image/upload/v1773250211/car5_auirpv.jpg",
 "https://res.cloudinary.com/dfnt4y1nb/image/upload/v1773250226/car6_jpn5ur.jpg",
 "https://res.cloudinary.com/dfnt4y1nb/image/upload/v1773250248/car8_asas0v.jpg",
 "https://res.cloudinary.com/dfnt4y1nb/image/upload/v1773250248/car9_nojp5s.jpg",
 "https://res.cloudinary.com/dfnt4y1nb/image/upload/v1773250251/car10_xro6zh.jpg"
];

let cars = [];

for(let i = 0;i < 50;i++) {
    const car = brands[Math.floor(Math.random() * brands.length)];
    const owner = owners[Math.floor(Math.random() * owners.length)];

    cars.push({
        Brand:car.Brand,
        Model:car.Model,
        Year: 2020 + Math.floor(Math.random()*4),
        DailyPrice: 1500 + Math.floor(Math.random()*3500),
        Category: car.Category,
        Transmission: transmissions[Math.floor(Math.random()*transmissions.length)],
        FuelType: fuelTypes[Math.floor(Math.random()*fuelTypes.length)],
        SeatingCapacity: car.Category==="SUV"?7:5,
        Location: locations[Math.floor(Math.random()*locations.length)],
        Description: `Well maintained ${car.Brand} ${car.Model} available for rent.`,
        ownerId: owner,
        image: images[Math.floor(Math.random() * images.length)]
    })
}

async function seedCars(){
 await carModel.insertMany(cars);
 console.log("50 Cars Inserted Successfully");
 mongoose.connection.close();
}

seedCars();