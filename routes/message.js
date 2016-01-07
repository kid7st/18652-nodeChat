var express = require('express');
var router = express.Router();
var Message = require('../models/Message');
var Ret = require('../models/Ret');

/* Get Messages List
 * Args:
 */
router.get('/', function(req, res, next) {
    var page = req.query.page;
    var page_size = req.query.page_size;
    Message.search({}, {time: -1}, page, page_size, function(err, messages){
        if(err){
            console.log("Search for the messages error!");
            Ret(-1, "Search the Message Error", []);
            res.send( new Ret(-1, "Search the Message Error", []) );
        }else{
            res.send( new Ret(0, "Success", messages) );
        }
    });
});

/* Put Message to update a new message */
router.put('/', function(req, res, next) {
    Message.add({
        title : req.body.title,
        content : req.body.content,
        author : req.body.author,
        status : 1
    }, function(err){
        if(err){
            console.log("Put message Error!");
            res.send(JSON.stringify(new Ret(-1, "Update message to database happens error" {})));
        }else{
            res.send(JSON.stringify(new Ret(0, "Success", {})));
        }
    });
});


module.exports = router;
