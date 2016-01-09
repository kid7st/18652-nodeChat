var session = require("express-session");

var Session = {
    onlineUsers: {}
};

/* Session Check for Express */
Session.loginRequired = function(req, res, next){
    if(!req.session.user){
        //res.send( (new Ret(-10, "Permission Errors, Login Required", {})).toJSON() );
        res.redirect("/user/login");
    }else{
        next();
    }
};

/* Socket.io Session Manager */
Session.socketAuthenticate = function(socket){
    if(socket.request.session.user){
        return true;
    }else{
        return false;
    }
};

Session.socketIn = function(socket){
    if(this.onlineUsers[socket.request.session.user.username] > 1){
        return true;
    }else{
        return false;
    }
};

Session.sockConnect = function(socket){
    if( !this.onlineUsers[socket.request.session.user.username] ){
        var loginUserSocketIds = 1;
        this.onlineUsers[socket.request.session.user.username] = loginUserSocketIds;
        return true;
    }else{
        this.onlineUsers[socket.request.session.user.username] += 1;
        return false;
    }
};

Session.socketDisconnect = function(socket){
    if(socket.request.session.user){
        if( this.onlineUsers[socket.request.session.user.username] == 1){
            delete this.onlineUsers[socket.request.session.user.username];
            return true;
        }else{
            this.onlineUsers[socket.request.session.user.username] -= 1;
            return false;
        }
    }else{
        return false;
    }
};

Session.login = function(req, user){
    req.session.user = {
        id: user._id,
        username: user.username,
        nickname: user.nickname
    };
};

Session.logout = function(req){
    req.session.user = null;
};

/* Session Middleware Setting */
Session.sessionMid = session({
    store: new session.MemoryStore(),
    secret: "testtestSession",
    saveUninitialized: true,
    resave: true
});

module.exports = Session;
