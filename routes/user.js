var express = require('express');
var router = express.Router();

/* GET user profile */
router.get('/', function(req, res, next) {
  res.send('Get User profile');
});

/* PUT : Signup User */
router.put('/signup', function(req, res, next) {
    res.send("Put User Signup");
});

/* Login User to server */
router.post('/login', function(req, res, next) {
    res.send("Post User login");
});

/* Logout User from server */
router.post('/logout', function(req, res, next) {
    res.send("Get User logout");
});

module.exports = router;
