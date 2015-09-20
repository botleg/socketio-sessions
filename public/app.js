var socket = io.connect(),
	form = document.getElementById('chatForm'),
	msgBox = document.getElementById('msgBox'),
	chatBox = document.getElementById('chatBox');

socket.on('new chat', function (data) {
	chatBox.innerHTML = data.msg + '<hr/>' + chatBox.innerHTML;
});

function newMsg(e) {
	e.preventDefault();
	if (msgBox.value.trim() !== '') {
		socket.emit('send chat', { msg: msgBox.value.trim() });
		msgBox.value = '';
	}
}

if(form.addEventListener){
	form.addEventListener("submit", newMsg, false);
} else if(form.attachEvent){
	form.attachEvent('onsubmit', newMsg);
}