"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js/dist/zone-node");
require("reflect-metadata");
var express = require("express");
var io = require("socket.io");
var createServer = require('http').createServer;
var join = require('path').join;
// Import the AOT compiled factory for your AppServerModule.
var _a = require("./main.bundle"), Pp2ServerModuleNgFactory = _a.Pp2ServerModuleNgFactory, LAZY_MODULE_MAP = _a.LAZY_MODULE_MAP;
var app = express();
var port = process.env.PORT || 4136;
var baseUrl = "http://localhost:" + port;
// Set the engine
// app.engine('html', ngExpressEngine({
// 	bootstrap: Pp2ServerModuleNgFactory,
// 	providers: [
// 		provideModuleMap(LAZY_MODULE_MAP)
// 	]
// }));
// app.set('view engine', 'html');
app.set('views', join(__dirname, 'public'));
app.get('*.*', express.static(join(__dirname, 'public')));
app.use('/', express.static(join(__dirname, 'public'), { index: false }));
app.get('/api', function (req, res) {
    res.json({ data: 'Content from HTTP request.' });
});
// app.get('*', (req, res) => {
// 	res.render('index', {
// 		req,
// 		res,
// 		providers: [{
// 			provide: 'serverUrl',
// 			useValue: `${req.protocol}://${req.get('host')}`
// 		}]
// 	});
// });
var server = createServer(app);
var SocketIOFileUpload = require('socketio-file-upload');
app.use(SocketIOFileUpload.router);
var $Socket = io(server);
require('./socket.io/core')($Socket);
server.listen(port, function () {
    console.log("Listening at " + baseUrl);
    console.log('LAZY_MODULE_MAP => ', LAZY_MODULE_MAP);
});
