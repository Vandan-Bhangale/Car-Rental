const express = require('express');
const userController = require('../controller/userController');
const Router = express.Router();

Router.get('/profile', userController.getProfile);
Router.put('/updateProfile', userController.updateProfile);
Router.delete('/deleteProfile', userController.deleteProfile);

module.exports = Router;