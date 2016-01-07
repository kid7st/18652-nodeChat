var mongoose = require('mongoose');
var Ret = require('./Ret');

var Message = mongoose.model('Message', {
    title : {type : String, default : ''},
    content : {type : String, default : ''},
    author : {type : String, default : ''},
    time : {type : Date, default : Date.now},
    status : {type : Number, default : 1}
});

Message.search = function(filter, sort, page, limit, callback) {
    this.find(filter).sort(sort).skip(page * limit).limit(limit).lean()
        .exec(callback);
};

module.exports = Message;
