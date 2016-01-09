var express = require('express');
var User = require('../models/User');
var Ret = require('../models/Ret');
var Session = require('../models/Session');
var router = express.Router();


router.get('/', Session.loginRequired);
/* GET users listing. */
router.get('/', function(req, res, next) {
    if( typeof req.query.page === 'undefined' ||
        typeof req.query.page_size === 'undefined') {

        res.json(new Ret(-1, "Undefined parameters", null));
    }

    var page = req.query.page;
    var page_size = req.query.page_size;
    User.search({}, {status : -1}, page, page_size, function(err, users){
        if(err){
            console.log("Search for Users list errors!");
            res.json(new Ret(-1, "Search for Users list errors!", null));
        }else{
            res.json(new Ret(0, "Success", users));
        }
    });
});

module.exports = router;
