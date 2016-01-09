var express = require('express');
var router = express.Router();
var Session = require('../models/Session');


/* GET home page. */
router.get('/', Session.loginRequired);
router.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

module.exports = router;
