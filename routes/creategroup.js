const express = require('express');

const groupController = require('../controller/creategroup');
const middlewareAuthentication = require('../middleware/auth');

const router = express.Router();

router.post('/creategroup', middlewareAuthentication.authenticate, groupController.createGroup);

router.get('/getallgroups', middlewareAuthentication.authenticate, groupController.getAllGroups);

module.exports = router;