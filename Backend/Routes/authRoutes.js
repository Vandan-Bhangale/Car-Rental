const express = require('express');
const authController = require('../controller/authController');
const Router = express.Router();

Router.post('/register', authController.postSignup);
Router.post('/login', authController.postLogin);
Router.get('/status', authController.getStatus);
Router.post('/logout', authController.postLogout);

module.exports = Router;