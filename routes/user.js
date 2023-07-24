const express = require('express');
const userController = require('../controller/user');
const middlewareAuthenticate = require('../middleware/auth');

const router = express.Router();

router.post('/signup', userController.signUp);

router.post('/login', userController.logIn);

module.exports = router;
