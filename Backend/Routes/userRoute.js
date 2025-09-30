const express = require('express');
const userController = require('../controller/userController');
const Router = express.Router();

Router.post('/register', userController.postSignup);
Router.post('/login', userController.postLogin);
Router.get('/status', userController.getStatus);
Router.post('/logout', userController.postLogout);
Router.get('/profile', userController.getProfile);
Router.put('/updateProfile', userController.updateProfile);
Router.delete('/deleteProfile', userController.deleteProfile);

module.exports = Router;