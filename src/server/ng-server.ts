declare var __dirname: any,
			require: any,
			process: any;

// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
const { join } = require('path');
const { readFileSync } = require('fs');


// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4136;
const DIST_FOLDER = join(__dirname, 'public');

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'index.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { Pp2ServerModuleNgFactory, LAZY_MODULE_MAP } = require('./main.bundle');

const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

app.engine('html', (_, options, callback) => {
  renderModuleFactory(Pp2ServerModuleNgFactory, {
    // Our index.html
    document: template,
    url: options.req.url,
    // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }).then(html => {
    callback(null, html);
  });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER));

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER)));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'index.html'), { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});