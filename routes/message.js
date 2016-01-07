var express = require('express');
var router = express.Router();
var Message = require('../models/Message');
var Ret = require('../models/Ret');

/* Get Messages List
 * Args:
 */
router.get('/', function(req, res, next) {
    if( typeof req.query.page === 'undefined' ||
        typeof req.query.page_size === 'undefined') {

        res.send( (new Ret(-1, "Undefined parameters", {})).toJSON() );
    }

    var page_size = req.query.page_size;
    Message.search({}, {time: -1}, page, page_size, function(err, messages){
        if(err){
            console.log("Search for the messages error!");
            res.send( (new Ret(-1, "Search the Message Error", [])).toJSON() );
        }else{
            res.send( (new Ret(0, "Success", messages)).toJSON() );
        }
    });
});

/* Put Message to update a new message */
router.put('/', function(req, res, next) {
    if( typeof req.body.title === 'undefined' ||
        typeof req.body.content === 'undefined' ||
        typeof req.body.author === 'undefined') {
            res.send( (new Ret(-1, "Undefined parameters Error", {})).toJSON() );
    }

    Message.add({
        title : req.body.title,
        content : req.body.content,
        author : req.body.author,
        status : 0
    }, function(err){
        if(err){
            console.log("Put message Error!");
            res.send( (new Ret(-1, "Update message to database happens error", {})).toJSON() );
        }else{
            res.send( (new Ret(0, "Success", {})).toJSON() );
        }
    });
});


module.exports = router;
