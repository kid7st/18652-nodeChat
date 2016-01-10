var express = require('express');
var User = require('../models/User');
var Ret = require('../models/Ret');
var Session = require('../models/Session');
var router = express.Router();


/* GET user profile */
router.get('/', Session.loginRequired);
router.get('/', function(req, res, next) {
    User.get(req.session.user.username, function(err, user) {
        if(err){
            console.log("Wrong Id to get the User!");
            res.json(new Ret(-1, "Wrong Id to get the User!", null));
        }else{
            if(user){
                var profile = {
                    id: user._id,
                    username: user.username,
                    nickname: user.nickname,
                    status: user.status
                };
                res.json(new Ret(0, "Success", profile));
            }else{
                res.json(new Ret(-1, "Failed to Get the User: Wrong User Id", null));
            }
        }
    });
});

router.get('/signup', function(req, res, next){
    var options = {
        root: __dirname + '/../views/',
    };

    res.sendFile('signup.html', options);
});

/* PUT : Signup User */
router.put('/signup', function(req, res, next) {
    if( typeof req.body.username === 'undefined' ||
        typeof req.body.password === 'undefined' ||
        typeof req.body.nickname === 'undefined') {
        res.json(new Ret(-1, "Undefined parameters errors!", null));
    }

    User.add({
        username : req.body.username,
        password : req.body.password,
        nickname : req.body.nickname,
        status : 0
    }, function(err){
        if(err){
            console.log("The Username or the Nickname have existed!");
            res.json(new Ret(-1, "The Username or the Nickname have existed!", null));
        }else{
            User.get(req.body.username, function(err, user){
                if(err){
                    res.json(new Ret(-1, "Login Error", null));
                }else{
                    Session.login(req, user);
                    res.json(new Ret(0, "Success", null));
                }
            });
        }
    });
});

router.get('/test_session', function(req, res, next){
    res.json(req.session.user);
});


router.get('/login', function(req, res, next){
    var options = {
        root: __dirname + '/../views/',
    };
    res.sendFile('login.html', options);
});

/* Login User to server */
router.post('/login', function(req, res, next) {
    if( typeof req.body.username === 'undefined' ||
        typeof req.body.password === 'undefined' ){
        //res.send( (new Ret(-1, "Undefined parameters errors!", null)).toJSON() );
        res.json(new Ret(-1, "Undefined parameters errors!", null));
    }else{
        var username = req.body.username;
        var password = req.body.password;
        User.get(username, function(err, user){
            if(err){
                console.log("findOne user from database errors!");
                res.json(new Ret(-1, "findOne user from database errors!", null));
            }else{
                if(!user){
                    res.json(new Ret(1, "Login Error : No User!", null));
                }else{
                    if(user.password != password){
                        res.json(new Ret(2, "Login Error : Wrong Password!", null));
                    }else{
                        Session.login(req, user);
                        res.json(new Ret(0, "Success", null));
                    }
                }
            }

        });
    }
});

/* Check Session */
router.get('/logout', Session.loginRequired);
/* Logout User from server */
router.get('/logout', function(req, res, next) {
    Session.logout(req);
    //res.send( (new Ret(0, "Success", {})).toJSON() );
    res.redirect('/user/login');
});

module.exports = router;
