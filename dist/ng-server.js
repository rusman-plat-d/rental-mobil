"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js/dist/zone-node");
require("reflect-metadata");
var core_1 = require("@angular/core");
var uuid_1 = require("uuid");
var csp = require("helmet-csp");
var express = require("express");
var io = require("socket.io");
var join = require('path').join;
var createServer = require('http').createServer;
core_1.enableProdMode();
var app = express();
app.use(function (req, res, next) {
    res.locals.nonce = uuid_1.v4();
    next();
});
app.use(csp({
    directives: {
        scriptSrc: ["'self'", function (req, res) { return "'nonce-" + res.locals.nonce + "'"; }]
    }
}));
var PORT = process.env.PORT || 4136;
var PUBLIC = join(__dirname, 'public');
var _a = require('./main.bundle'), Pp2ServerModuleNgFactory = _a.Pp2ServerModuleNgFactory, LAZY_MODULE_MAP = _a.LAZY_MODULE_MAP;
var express_engine_1 = require("@nguniversal/express-engine");
var module_map_ngfactory_loader_1 = require("@nguniversal/module-map-ngfactory-loader");
app.engine('html', express_engine_1.ngExpressEngine({
    bootstrap: Pp2ServerModuleNgFactory,
    providers: [
        module_map_ngfactory_loader_1.provideModuleMap(LAZY_MODULE_MAP)
    ]
}));
app.set('view engine', 'html');
app.set('views', join(PUBLIC));
app.get('/api/*', function (req, res) {
    res.status(404).send('data requests are not supported');
});
app.get('*.*', express.static(join(PUBLIC)));
app.get('*', function (req, res) {
    res.render(join(PUBLIC, 'index.html'), {
        req: req,
        res: res,
        providers: [
            module_map_ngfactory_loader_1.provideModuleMap(LAZY_MODULE_MAP)
        ]
    }, function (err, html) {
        console.log('err => ', err);
        console.log('html => ', html);
        res.send(html);
    });
});
// app.listen(PORT, function () {
//     console.log("Node server listening on http://localhost:" + PORT);
// });
var server = createServer(app);
var SocketIOFileUpload = require('socketio-file-upload');
app.use(SocketIOFileUpload.router);
var $Socket = io(server);
require('./socket.io/core')($Socket);
server.listen(PORT, function () {
    console.log("Listening at " + PORT);
});
