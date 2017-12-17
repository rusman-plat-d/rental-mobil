declare var __dirname: any,
			require: any,
			process: any;

import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import * as express from 'express';
import * as io from 'socket.io';
const { createServer } = require('http');
const { join } = require('path');
const { readFileSync } = require('fs');

import { enableProdMode, StaticProvider } from '@angular/core';
enableProdMode()
import { platformServer, renderModuleFactory } from '@angular/platform-server';
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// Import the AOT compiled factory for your AppServerModule.
const { Pp2ServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./main.bundle`);

const app = express();
const port = process.env.PORT || 4136;
const baseUrl = `http://localhost:${port}`;

// Set the engine

app.engine('html', (_, options, callback) => {
	renderModuleFactory(Pp2ServerModuleNgFactory, {
		document: (readFileSync(join(__dirname, 'public', 'index.html'), 'utf8')) as string,
		url: (options.req.url) as string,
		extraProviders: (([
			provideModuleMap(LAZY_MODULE_MAP)
		]) as StaticProvider[])
	}).then(html => {
		callback(null, html);
	});
});

app.set('view engine', 'html');

app.set('views', join(__dirname, 'public'));
app.get('*.*', express.static(join(__dirname, 'public')));
app.use(express.static(join(__dirname, 'public')));

app.get('*', (req, res) => {
	res.set('Content-Type', 'text/html');
	res.sendFile(join(__dirname, 'public', 'index.html'))
});

const server = createServer(app);

// ---------------------------------------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err['status'] = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// render the error page
	res.status(err.status || 500);
	res.set('Content-Type', 'text/html');
	res.sendFile(join(__dirname, 'public', 'index.html'))
});
// ---------------------------------------------

const SocketIOFileUpload = require('socketio-file-upload');
app.use(SocketIOFileUpload.router)

const $Socket = io(server);

require('./socket.io/core')($Socket)

server.listen(port, () => {
	console.log(`Listening at ${baseUrl}`);
	// console.log('LAZY_MODULE_MAP => ', LAZY_MODULE_MAP)
});
