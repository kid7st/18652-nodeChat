var app = require('./app');
var http = require('http');

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


io.on('connection', function(socket){
    console.log("A user connected");
});

module.exports = server;
