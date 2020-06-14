var socket = io.connect('82.64.82.26:8080');

socket.on('connect', function(data) {
	socket.emit('join', 'Hello World from client');
});

$('#msgForm').submit(function (e) {
	e.preventDefault();
	var message = $('#msgInput').val();
	socket.emit('message', message);
	who = "me"; 
	addMsg(who, message); 
	$('#msgInput').val("").focus();
});

function addMsg(who, message){
	if(who == "me"){
		$(".convWindow").append("<div class=\"msgBox meSpeaker\"><span class=\"msg bg-primary\">" + message + "</span></div>");
	}
	else if(who == "lara"){
		$(".convWindow").append("<div class=\"msgBox laraSpeaker\"><span class=\"msg bg-light\">" + message + "</span></div>");
	}
	else{
		console.log('Error');
	}

	$(".convWindow").scrollTop($(".convWindow")[0].scrollHeight);
}

socket.on('newMessage', function(answerFromLARA){
	addMsg("lara", answerFromLARA);
});