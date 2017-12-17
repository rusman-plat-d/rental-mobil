"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js/dist/zone-node");
require("reflect-metadata");
var core_1 = require("@angular/core");
var express = require("express");
var io = require("socket.io");
var createServer = require('http').createServer;
var join = require('path').join;
core_1.enableProdMode();
var app = express();
var PORT = process.env.PORT || 4000;
var _a = require('./main.bundle'), Pp2ServerModuleNgFactory = _a.Pp2ServerModuleNgFactory, Pp2ServerModule = _a.Pp2ServerModule, LAZY_MODULE_MAP = _a.LAZY_MODULE_MAP;
var express_engine_1 = require("@nguniversal/express-engine");
var module_map_ngfactory_loader_1 = require("@nguniversal/module-map-ngfactory-loader");
app.engine('html', express_engine_1.ngExpressEngine({
    bootstrap: Pp2ServerModule,
    providers: [
        module_map_ngfactory_loader_1.provideModuleMap(LAZY_MODULE_MAP)
    ]
}));
app.set('view engine', 'html');
app.set('views', join(__dirname, 'public'));
app.get('/api/*', function (req, res) {
    res.status(404).send('data requests are not supported');
});
app.get('*.*', express.static(join(__dirname, 'public')));
app.get('*', function (req, res) {
    res.render(join(__dirname, 'public', 'index.html'), { req: req });
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
server.listen(4136, function () {
    console.log("Listening at http://localhost:4136");
});
