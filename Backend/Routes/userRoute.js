const express = require('express');
const userController = require('../controller/userController');
const Router = express.Router();

Router.post('/register', userController.postSignup);
Router.post('/login', userController.postLogin);

module.exports = Router;