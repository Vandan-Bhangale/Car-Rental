const express = require('express');
const Router = express.Router();
const CarController = require('../controller/carController');
const upload = require('../multerConfig');

Router.post('/postCar', upload.single('image'), CarController.postCar);

module.exports = Router;
