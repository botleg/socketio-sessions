var socket = io.connect(),
	chatForm = document.getElementById('chatForm'),
	msgBox = document.getElementById('msgBox'),
	chatBox = document.getElementById('chatBox');

socket.on('new chat', function(data) {
	chatBox.innerHTML = data.msg + '<hr/>' + chatBox.innerHTML;
});

function newMsg(e) {
	e.preventDefault();
	if (msgBox.value.trim() !== '') {
		socket.emit('send chat', {
			msg: msgBox.value.trim()
		});
		msgBox.value = '';
	}
}

if (chatForm.addEventListener) {
	chatForm.addEventListener("submit", newMsg, false);
} else if (chatForm.attachEvent) {
	chatForm.attachEvent('onsubmit', newMsg);
}