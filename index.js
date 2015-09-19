var app = require('koa')(),
	server = require('http').createServer(app.callback()),
	io = require('socket.io')(server),
	router = require('koa-router')();

const PORT = process.env.OPENSHIFT_NODEJS_PORT || 8000;
const IP = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

router.get('/', function*(next) {
	this.body = process.versions.node;
});

io.on('connection', function() {
	console.log("connection established.");
});

app.use(router.routes())
	.use(router.allowedMethods());

app.listen(PORT, IP);