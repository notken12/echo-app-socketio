require('dotenv').config();

// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redis = require('socket.io-redis');
var port = process.env.PORT || 3000;
var serverName = process.env.NAME || 'Unknown';

io.adapter(redis({ host: '127.0.0.1', port: 6379 }));

server.listen(port, function () {
    console.log('Server listening at port %d', port);
    console.log('Hello, I\'m %s, how can I help?', serverName);
});

// Routing
app.use(express.static(__dirname + '/public'));

// Health check
app.head('/health', function (req, res) {
    res.sendStatus(200);
});

app.get('/name', function (req, res) {
    res.send(serverName);
});

// echo socket.io message

io.on('connection', function (socket) {
    // tell client the server they're connected to
    socket.emit('server name', serverName);
    socket.emit('server port', port);
    
    socket.on('send message', function (msg) {
        console.log('message: ' + msg + ' received by ' + serverName);
        io.sockets.emit('echo message', msg);
    });
});