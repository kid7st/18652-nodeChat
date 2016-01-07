var mongoose = require('mongoose');

var Message = mongoose.model('Message', {
    title : {type : String, default : ''},
    content : {type : String, default : ''},
    author : {type : String, default : ''},
    time : {type : Date, default : Date.now},
    status : {type : Number, default : 1}
});

module.exports = Message;
