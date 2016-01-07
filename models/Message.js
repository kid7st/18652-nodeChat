var mongoose = require('mongoose');
var Ret = require('./Ret');

var Message = mongoose.model('Message', {
    title : {type : String, default : ''},
    content : {type : String, default : ''},
    author : {type : String, default : ''},
    time : {type : Date, default : Date.now},
    status : {type : Number, default : 0}
});

Message.search = function(filter, sort, page, page_size, callback) {
    this.find(filter).sort(sort).skip(page * page_size).limit(page_size).lean()
        .exec(callback);
};

Message.add = function(data, callback) {
        message = new Message(data);
        message.save(callback);
};

module.exports = Message;
