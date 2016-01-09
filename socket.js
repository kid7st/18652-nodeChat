var app = require('./app');
var http = require('http');
var User = require('./models/User');
var Message = require('./models/Message');
var Session = require('./models/Session');

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
        user = socket.request.session.user;
        if( Session.sockConnect(socket) ){
            socket.broadcast.emit('broadcast_join',
                socket.request.session.user);

            Message.search({}, {time: -1}, 0, 20, function(err, messages){
                if(!err){
                    socket.broadcast.emit('broadcast_msg',
                        messages);
                }
            });

            console.log("User " + socket.request.session.user.nickname + " Joins!");
        }
    }

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
