declare var __dirname: any,
			require: any,
			process: any;

// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import * as io from 'socket.io';
import { IndexRouter } from './routes/index';

const { createServer } = require('http');
const { join } = require('path');

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();
app.use('/', IndexRouter);

const PORT = process.env.PORT || 4000;

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { Pp2ServerModuleNgFactory, Pp2ServerModule, LAZY_MODULE_MAP } = require('./main.bundle');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

app.engine('html', ngExpressEngine({
  bootstrap: Pp2ServerModule,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(__dirname, 'public'));

// TODO: implement data requests securely
app.get('/api/*', (req, res) => {
  res.status(404).send('data requests are not supported');
});

// Server static files from /browser
app.get('*.*', express.static(join(__dirname, 'public')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
	// res.sendFile(join(__dirname, 'public', 'index.html'))
  res.render(join(__dirname, 'public', 'index.html'), { req });
});

// // Start up the Node server
// app.listen(PORT, () => {
//   console.log(`Node server listening on http://localhost:${PORT}`);
// });

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
	res.status(200);
	res.set('Content-Type', 'text/html');
	res.sendFile(join(__dirname, 'public', 'index.html'))
});
// ---------------------------------------------

const SocketIOFileUpload = require('socketio-file-upload');
app.use(SocketIOFileUpload.router)

const $Socket = io(server);

require('./socket.io/core')($Socket)

server.listen(4136, () => {
	console.log(`Listening at http://localhost:4136`);
	// console.log('LAZY_MODULE_MAP => ', LAZY_MODULE_MAP)
});