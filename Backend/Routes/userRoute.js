const express = require('express');
const userController = require('../controller/userController');
const Router = express.Router();

Router.post('/register', userController.postSignup);
Router.post('/login', userController.postLogin);
Router.get('/status', userController.getStatus);
Router.post('/logout', userController.postLogout);

module.exports = Router;