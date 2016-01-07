var express = require('express');
var User = require('../models/User');
var Ret = require('../models/Ret');
var router = express.Router();

/* GET user profile */
router.get('/', function(req, res, next) {
    if(typeof req.query.id === 'undefined'){
        ret.send( (new Ret(-1, 'Undefined parameters errors!')).toJSON() );
    }

    User.get(req.query.id, function(err, user) {
        if(err){
            console.log("Wrong Id to get the User!");
            res.send( (new Ret(-1, "Wrong Id to get the User!", {})).toJSON() );
        }else{
            res.send( (new Ret(0, "Success", user)).toJSON() );
        }
    });
});

/* PUT : Signup User */
router.put('/signup', function(req, res, next) {
    if( typeof req.body.username === 'undefined' ||
        typeof req.body.password === 'undefined' ||
        typeof req.body.nickname === 'undefined') {
        res.send( (new Ret(-1, "Undefined parameters errors!", {})).toJSON() );
    }

    User.add({
        username : req.body.username,
        password : req.body.password,
        nickname : req.body.nickname,
        status : 0
    }, function(err){
        if(err){
            console.log("The Username or the Nickname have existed!");
            res.send( (new Ret(-1, "The Username or the Nickname have existed!", {})).toJSON() );
        }else{
            res.send( (new Ret(0, "Success", {})).toJSON() );
        }
    });
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
