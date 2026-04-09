const express = require('express');
const userController = require('../controller/userController');
const Router = express.Router();
const protect = require("../middleware/protect");

Router.get('/profile', userController.getProfile);
Router.put('/updateProfile', userController.updateProfile);
Router.delete('/deleteProfile', userController.deleteProfile);
Router.post('/switch-role', userController.switchRole);

module.exports = Router;