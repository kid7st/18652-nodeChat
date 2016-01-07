var mongoose = require('mongoose');
var Ret = require('./Ret');

var User = mongoose.model('User', {
    username : {type : String, default : '', unique : true},
    password : {type : String, default : ''},
    nickname : {type : String, default : '', unique : true},
    status : {type : Number, default : 0}
});


User.search = function(filter, sort, page, page_size, callback) {
    this.find(filter).sort(sort).skip(page * page_size).limit(page_size)
        .lean().exec(callback);
};

User.get = function(id, callback) {
    this.findById(id).exec(callback);
};

User.add = function(data, callback) {
    user = new User(data);
    user.save(callback);
};

User.update = function(id, data, callback){
    User.findById(id).exec(function(err, user){
        if( !(typeof data.nickname === 'undefined') ) {
            user.nickname = data.nickname;
        }
        if( !(typeof data.password === 'undefined') ) {
            user.password = data.password;
        }
        if( !(typeof data.status === 'undefined') ) {
            user.status = data.status;
        }

        user.save(callback);
    });
}

module.exports = User;
