"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js/dist/zone-node");
require("reflect-metadata");
var platform_server_1 = require("@angular/platform-server");
var core_1 = require("@angular/core");
var express = require("express");
var join = require('path').join;
var readFileSync = require('fs').readFileSync;
core_1.enableProdMode();
var app = express();
var PORT = process.env.PORT || 4136;
var DIST_FOLDER = join(__dirname, 'public');
var template = readFileSync(join(DIST_FOLDER, 'index.html')).toString();
var _a = require('./main.bundle'), Pp2ServerModuleNgFactory = _a.Pp2ServerModuleNgFactory, LAZY_MODULE_MAP = _a.LAZY_MODULE_MAP;
var provideModuleMap = require('@nguniversal/module-map-ngfactory-loader').provideModuleMap;
app.engine('html', function (_, options, callback) {
    platform_server_1.renderModuleFactory(Pp2ServerModuleNgFactory, {
        document: template,
        url: options.req.url,
        extraProviders: [
            provideModuleMap(LAZY_MODULE_MAP)
        ]
    }).then(function (html) {
        callback(null, html);
    });
});
app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER));
app.get('*.*', express.static(join(DIST_FOLDER)));
app.get('*', function (req, res) {
    res.render(join(DIST_FOLDER, 'index.html'), { req: req });
});
app.listen(PORT, function () {
    console.log("Node server listening on http://localhost:" + PORT);
});
