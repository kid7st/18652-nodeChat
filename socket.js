var app = require('./app');
var http = require('http');
var User = require('./models/User');
var Message = require('./models/Message');
var Session = require('./models/Session');
var Ret = require('./models/Ret');

/**
 * Get port from environment and store in Express.
 */

//var port = normalizePort(process.env.PORT || '3000');
//app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

var io = require('socket.io')(server);

io.use(function(socket, next){
    Session.sessionMid(socket.request, socket.request.res, next);
});

io.on('connection', function(socket){
    var user = null;
    if( Session.socketAuthenticate(socket) ){
        console.log(socket.request.session.user);
        user = socket.request.session.user;
        if( Session.sockConnect(socket) ){
            socket.broadcast.emit( 'broadcast_join',
                new Ret(0, 'Joined User', socket.request.session.user)
            );
            console.log("User " + socket.request.session.user.nickname + " Joins!");
        }

        socket.emit( 'online_users',
            new Ret(0, 'Online Users List', Session.onlineUsers)
        );

        Message.search({}, {time: -1}, 0, 20, function(err, messages){
            if(!err){
                socket.emit('msg_list',
                    new Ret(0, "Messages", messages)
                );
            }else{
                socket.emit('msg_list',
                    new Ret(-1, "Get messages list errors", null)
                );
            }
        });
    }

    socket.on('message', function(data){
        if( Session.socketAuthenticate(socket) ){
            if(Session.socketIn(socket)){
                var message = {
                    author: socket.request.session.user.nickname,
                    content: data.content,
                    status: 0,
                    title: data.title,
                    time: Date.now()
                };

                Message.add(message, function(err){
                    if(!err){
                        io.emit( 'new_message',
                        new Ret(0, "New message", message));
                    }else{
                        io.emit( 'new_message',
                        new Ret(-1, "New message errors"), null);
                    }
                });
            }
        }
    });

    socket.on('disconnect', function(){
        if(Session.socketAuthenticate(socket)){
            if( Session.socketDisconnect(socket) ){
                socket.broadcast.emit('broadcast_leave',
                    socket.request.session.user);
                console.log("User " + socket.request.session.user.nickname + " Leaves!");
            }
        }
    });

});

module.exports = server;
