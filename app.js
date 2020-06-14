// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var shell = require('shelljs');


app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res,next) {
	res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
	console.log('Client connected...');

	socket.on('join', function(data) {
		console.log(data);
	});

	socket.on('reqMessage', function(message) {
		console.log(message);
		var stdout = shell.exec('./send.sh "' + message + '"').trim(); //DANGER RCE
		console.log('----------');
		console.log(stdout.length);
		var answerFromLARA = stdout.substr(44 + message.length, stdout.length - 48);
		console.log(answerFromLARA);

		socket.emit('newMessage', answerFromLARA);
	});
});


server.listen(8080); 