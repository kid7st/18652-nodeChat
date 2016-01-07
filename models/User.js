var mongoose = require('mongoose');
var Ret = require('./Ret');

var User = mongoose.model('User', {
    username : {type : String, default : ''},
    password : {type : String, default : ''},
    nickname : {type : String, default : ''},
    status : {type : Number, default : 0}
});
