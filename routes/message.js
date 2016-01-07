var express = require('express');
var router = express.Router();
var Message = require('../models/Message');
var Ret = require('../models/Ret');

/* Get Messages List
 * Args:
 */
router.get('/', function(req, res, next) {
    var page = req.query.page;
    Message.find({}).sort({time : -1}).skip(page * 10).limit(10).lean().exec(function(err, messages) {
        console.log(JSON.stringify(messages));
        var ret = new Ret(0, messages);
        res.send(JSON.stringify(ret));
    });
});

/* Put Message to update a new message */
router.put('/', function(req, res, next) {
    var message = new Message({
        title : req.body.title,
        content : req.body.content,
        author : req.body.author,
        status : 1
    });

    message.save(function(err) {
        if(err){
            console.log("Put message Error!");
            res.send(JSON.stringify(new Ret(1, {})));
        }
    });

    res.send(JSON.stringify(new Ret(0, {})));
});

module.exports = router;
