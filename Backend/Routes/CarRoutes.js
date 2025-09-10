const express = require('express');
const Router = express.Router();
const CarController = require('../controller/carController');
const upload = require('../multerConfig');

Router.post('/postCar', upload.single('image'), CarController.postCar);
Router.get('/getCars', CarController.getCars);
Router.get('/getCarsById/:id', CarController.getCarsById);
Router.get('/carCount', CarController.getCarCount);
Router.put('/updateCar/:id', CarController.updateCar);
Router.delete('/deleteCar/:id', CarController.deleteCar);

module.exports = Router;
