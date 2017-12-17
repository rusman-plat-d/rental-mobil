"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js/dist/zone-node");
require("reflect-metadata");
var express = require("express");
var io = require("socket.io");
var createServer = require('http').createServer;
var join = require('path').join;
var readFileSync = require('fs').readFileSync;
var core_1 = require("@angular/core");
core_1.enableProdMode();
var platform_server_1 = require("@angular/platform-server");
var module_map_ngfactory_loader_1 = require("@nguniversal/module-map-ngfactory-loader");
var _a = require("./main.bundle"), Pp2ServerModuleNgFactory = _a.Pp2ServerModuleNgFactory, LAZY_MODULE_MAP = _a.LAZY_MODULE_MAP;
var app = express();
var port = process.env.PORT || 4136;
var baseUrl = "http://localhost:" + port;
app.engine('html', function (_, options, callback) {
    platform_server_1.renderModuleFactory(Pp2ServerModuleNgFactory, {
        document: (readFileSync(join(__dirname, 'public', 'index.html'), 'utf8')),
        url: (options.req.url),
        extraProviders: ([
            module_map_ngfactory_loader_1.provideModuleMap(LAZY_MODULE_MAP)
        ])
    }).then(function (html) {
        callback(null, html);
    });
});
app.set('view engine', 'html');
app.set('views', join(__dirname, 'public'));
app.get('*.*', express.static(join(__dirname, 'public')));
app.use(express.static(join(__dirname, 'public')));
app.get('*', function (req, res) {
    res.set('Content-Type', 'text/html');
    res.sendFile(join(__dirname, 'public', 'index.html'));
});
var server = createServer(app);
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.set('Content-Type', 'text/html');
    res.sendFile(join(__dirname, 'public', 'index.html'));
});
var SocketIOFileUpload = require('socketio-file-upload');
app.use(SocketIOFileUpload.router);
var $Socket = io(server);
require('./socket.io/core')($Socket);
server.listen(port, function () {
    console.log("Listening at " + baseUrl);
});
