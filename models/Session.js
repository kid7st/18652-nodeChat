var session = require("express-session");

var Session = {
    onlineUsers: {},
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
    if(!socket.request.session.user){
        return false;
    }

    console.log(this.onlineUsers[socket.request.session.user.username]);

    if( typeof this.onlineUsers[socket.request.session.user.username] === undefined){
        return false;
    }else{
        return true;
    }
};

Session.socketIn = function(socket){
    if(this.onlineUsers[socket.request.session.user.username] >= 1){
        return true;
    }else{
        return false;
    }
};

Session.sockConnect = function(socket){
    this.onlineUsers[socket.request.session.user.username] += 1;
    if( this.onlineUsers[socket.request.session.user.username] == 1 ){
        return true;
    }else{
        return false;
    }
};

Session.socketDisconnect = function(socket){
    if( typeof this.onlineUsers[socket.request.session.user.username] === 'undefined'){
        return true;
    }else{
        this.onlineUsers[socket.request.session.user.username] -= 1;
        if( this.onlineUsers[socket.request.session.user.username] == 0){
            return true;
        }else{
            return false;
        }
    }
};

Session.login = function(req, user){
    req.session.user = {
        id: user._id,
        username: user.username,
        nickname: user.nickname
    };

    Session.onlineUsers[req.session.user.username] = 0;
};

Session.logout = function(req){
    delete Session.onlineUsers[req.session.user.username];
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
