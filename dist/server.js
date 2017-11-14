"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var io = require("socket.io");
var createServer = require('http').createServer;
var join = require('path').join;
var _a = require("./main.bundle"), Pp2ServerModuleNgFactory = _a.Pp2ServerModuleNgFactory, LAZY_MODULE_MAP = _a.LAZY_MODULE_MAP;
var app = express();
var port = process.env.PORT || 4136;
var baseUrl = "http://localhost:" + port;
app.set('views', join(__dirname, 'public'));
app.get('*.*', express.static(join(__dirname, 'public')));
app.use('/', express.static(join(__dirname, 'public'), { index: false }));
app.get('/api', function (req, res) {
    res.json({ data: 'Content from HTTP request.' });
});
var server = createServer(app);
var SocketIOFileUpload = require('socketio-file-upload');
app.use(SocketIOFileUpload.router);
var $Socket = io(server);
require('./socket.io/core')($Socket);
server.listen(port, function () {
    console.log("Listening at " + baseUrl);
    console.log('LAZY_MODULE_MAP => ', LAZY_MODULE_MAP);
});
