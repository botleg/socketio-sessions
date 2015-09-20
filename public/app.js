var socket = io.connect();
socket.on('server event', function (data) {
	console.log(data);
	socket.emit('client event', { my: 'data' });
});