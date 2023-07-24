const express = require('express');
const middlewareAuthentication = require('../middleware/auth');
const messageController = require('../controller/message');
const router = express.Router();

router.post('/send',middlewareAuthentication.authenticate, messageController.sendMessage);

router.get('/getallmessages',middlewareAuthentication.authenticate ,messageController.getAllMessage);

// router.get('/getusers', messageController.getUsers);

module.exports = router;