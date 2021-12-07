var socket = io();

var serverNameEl = document.getElementById('server-name');
var messagesEl = document.getElementById('messages');
var messageInputEl = document.getElementById('message-input');
var messageFormEl = document.getElementById('message-form');

socket.on('server name', function (name) {
    serverNameEl.innerHTML = "Connected to " + name;
});

socket.on('server port', function (port) {
    serverNameEl.innerHTML += "\nConnected to " + port;
});

socket.on('echo message', function (msg) {
    messagesEl.innerHTML += '<p>' + msg + '</p>';
});

messageFormEl.addEventListener('submit', function (e) {
    e.preventDefault();
    socket.emit('send message', messageInputEl.value);
    messageInputEl.value = '';
});