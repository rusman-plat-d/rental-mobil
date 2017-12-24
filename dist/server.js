"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js/dist/zone-node");
require("reflect-metadata");
var core_1 = require("@angular/core");
var express = require("express");
var index_1 = require("./routes/index");
var createServer = require('http').createServer;
var join = require('path').join;
core_1.enableProdMode();
var app = express();
app.use(function (req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE'
    });
    next();
});
app.use('/', index_1.IndexRouter);
var PORT = process.env.PORT || 80 || 4136;
var _a = require('./main.bundle'), Pp2ServerModuleNgFactory = _a.Pp2ServerModuleNgFactory, Pp2ServerModule = _a.Pp2ServerModule, LAZY_MODULE_MAP = _a.LAZY_MODULE_MAP;
var express_engine_1 = require("@nguniversal/express-engine");
var module_map_ngfactory_loader_1 = require("@nguniversal/module-map-ngfactory-loader");
app.engine('html', express_engine_1.ngExpressEngine({
    bootstrap: Pp2ServerModuleNgFactory,
    providers: [
        module_map_ngfactory_loader_1.provideModuleMap(LAZY_MODULE_MAP)
    ]
}));
app.set('view engine', 'html');
app.set('views', join(__dirname, 'public'));
app.get('*.*', express.static(join(__dirname, 'public')));
app.get('/', function (req, res) {
    res.render('index', { req: req });
});
app.get('*', function (req, res) {
    res.render('index', { req: req });
});
app.listen(PORT, function () {
    console.log("Node server listening on http://localhost:" + PORT);
});
