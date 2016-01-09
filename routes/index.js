var express = require('express');
var router = express.Router();
var Session = require('../models/Session');


/* GET home page. */
router.get('/', Session.loginRequired);
router.get('/', function(req, res, next) {
    var options = {
        root: __dirname + '/../public/',
    };
    res.sendFile('main.html', options);
});


module.exports = router;
