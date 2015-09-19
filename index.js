var app = require('koa')(),
	serve = require('koa-static');

const PORT = process.env.OPENSHIFT_NODEJS_PORT || 8000;
const IP = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(serve('./public'));

var server = require('http').Server(app.callback()),
	io = require('socket.io')(server);

io.on('connection', function(socket) {
	socket.emit('server event', { hello: 'world' });

	socket.on('client event', function (data) {
		console.log(data);
	});
});

server.listen(PORT, IP);