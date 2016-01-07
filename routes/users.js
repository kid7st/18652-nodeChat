var express = require('express');
var User = require('../models/User');
var Ret = require('../models/Ret');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    if( typeof req.query.page === 'undefined' ||
        typeof req.query.page_size === 'undefined') {

        res.send( (new Ret(-1, "Undefined parameters", {})).toJSON() );
    }

    var page = req.query.page;
    var page_size = req.query.page_size;
    User.search({}, {status : -1}, page, page_size, function(err, users){
        if(err){
            console.log("Search for Users list errors!");
            res.send( (new Ret(-1, "Search for Users list errors!", {})).toJSON() );
        }else{
            res.send( (new Ret(0, "Success", users)).toJSON() );
        }
    });
});

module.exports = router;
