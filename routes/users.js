var express = require('express');
var User = require('../models/User');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    if( typeof req.query.page === 'undefined' ) {
        res.send( (new Ret(-1, "Undefined parameters", {})).toJSON() );
    }

    if( typeof req.query.page_size === 'undefined' ) {
        res.send( (new Ret(-1, "Undefined parameters", {})).toJSON() );
    }

    User.search({}, {status : -1}, page, page_size, function(err, users){
        if(err){
            console.log("Search for Users list errors!");
            res.send( (new Ret(-1, "Search for Users list errors!", {})) );
        }else{
            res.send( (new Ret(0, "Success", users)) );
        }
    });
});

module.exports = router;
