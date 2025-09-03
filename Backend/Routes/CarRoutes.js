const express = require('express');
const Router = express.Router();
const CarController = require('../controller/carController');
const upload = require('../multerConfig');

Router.post('/postCar', upload.single('image'), CarController.postCar);
Router.get('/getCars', CarController.getCars);
Router.get('/getCarsById/:id', CarController.getCarsById);

module.exports = Router;
