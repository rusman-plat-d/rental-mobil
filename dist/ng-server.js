"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// These are important and needed before anything else
require("zone.js/dist/zone-node");
require("reflect-metadata");
var platform_server_1 = require("@angular/platform-server");
var core_1 = require("@angular/core");
var express = require("express");
var join = require('path').join;
var readFileSync = require('fs').readFileSync;
// Faster server renders w/ Prod mode (dev mode never needed)
core_1.enableProdMode();
// Express server
var app = express();
var PORT = process.env.PORT || 4136;
var DIST_FOLDER = join(__dirname, 'public');
// Our index.html we'll use as our template
var template = readFileSync(join(DIST_FOLDER, 'index.html')).toString();
// * NOTE :: leave this as require() since this file is built Dynamically from webpack
var _a = require('./main.bundle'), Pp2ServerModuleNgFactory = _a.Pp2ServerModuleNgFactory, LAZY_MODULE_MAP = _a.LAZY_MODULE_MAP;
var provideModuleMap = require('@nguniversal/module-map-ngfactory-loader').provideModuleMap;
app.engine('html', function (_, options, callback) {
    platform_server_1.renderModuleFactory(Pp2ServerModuleNgFactory, {
        // Our index.html
        document: template,
        url: options.req.url,
        // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
        extraProviders: [
            provideModuleMap(LAZY_MODULE_MAP)
        ]
    }).then(function (html) {
        callback(null, html);
    });
});
app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER));
// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER)));
// All regular routes use the Universal engine
app.get('*', function (req, res) {
    res.render(join(DIST_FOLDER, 'index.html'), { req: req });
});
// Start up the Node server
app.listen(PORT, function () {
    console.log("Node server listening on http://localhost:" + PORT);
});
