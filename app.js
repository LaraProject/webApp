// app.js
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var socket = require('socket.io')(server);
var shell = require('shelljs');


app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res,next) {
	res.sendFile(__dirname + '/index.html');
});

socket.on('connection', function(client) {
	console.log('Client connected...');

	client.on('join', function(data) {
		console.log(data);
	});

	client.on('message', function(message) {
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