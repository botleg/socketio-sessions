var app = require('koa')(),
	session = require('koa-session'),
	cookie = require('cookie'),
	serve = require('koa-static');

const PORT = process.env.OPENSHIFT_NODEJS_PORT || 8000;
const IP = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.keys = ['my secret key'];
app.use(session(app));

app.use(function *(next) {
	if (typeof this.session.name === 'undefined') {
		this.session.name = Math.round(Math.random() * 10000);
	}
	yield next;
});

app.use(serve('./public'));

var server = require('http').Server(app.callback()),
	io = require('socket.io')(server);

io.set("authorization", function(data, accept) {
	if (data.headers.cookie && data.headers.cookie.indexOf('koa:sess') > -1) {
		data.cookie = cookie.parse(data.headers.cookie)['koa:sess'];
		data.name = JSON.parse(new Buffer(data.cookie, 'base64')).name;
	} else {
		return accept('No cookie transmitted.', false);
	}
	accept(null, true);
});

io.on('connection', function(socket) {
	socket.on('send chat', function(data) {
		data.msg = socket.request.name + ": " + data.msg;
		io.emit('new chat', data);
	});
});

server.listen(PORT, IP);