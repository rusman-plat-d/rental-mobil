declare var __dirname: any,
			require: any,
			process: any;

// import 'zone.js/dist/zone-node';
// import 'reflect-metadata';
import * as express from 'express';
import * as io from 'socket.io';
const { createServer } = require('http');
const { join } = require('path');

// import { platformServer, renderModuleFactory } from '@angular/platform-server';
// import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
// import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// Import the AOT compiled factory for your AppServerModule.
// const { Pp2ServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./main.bundle`);

const app = express();
const port = process.env.PORT || 4136;
const baseUrl = `http://localhost:${port}`;

// Set the engine
// app.engine('html', ngExpressEngine({
// 	bootstrap: Pp2ServerModuleNgFactory,
// 	providers: [
// 		provideModuleMap(LAZY_MODULE_MAP)
// 	]
// }));

// app.set('view engine', 'html');

app.set('views', join(__dirname, 'public'));
app.get('*.*', express.static(join(__dirname, 'public')));
app.use('/', express.static(join(__dirname, 'public'), { index: false }));
app.get('/api', (req, res) => {
	res.json({ data: 'Content from HTTP request.' });
});

// app.get('*', (req, res) => {
// 	res.render('index', {
// 		req,
// 		res,
// 		providers: [{
// 			provide: 'serverUrl',
// 			useValue: `${req.protocol}://${req.get('host')}`
// 		}]
// 	});
// });

const server = createServer(app);

const SocketIOFileUpload = require('socketio-file-upload');
app.use(SocketIOFileUpload.router)

const $Socket = io(server);

require('./socket.io/core')($Socket)

server.listen(port, () => {
	console.log(`Listening at ${baseUrl}`);
	// console.log('LAZY_MODULE_MAP => ', LAZY_MODULE_MAP)
});
