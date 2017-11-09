import { Server } from '../interfaces/socket.io';
declare var module: any,
			require: any;
module.exports = function($Socket: Server) {
	require('./db/file/index')($Socket)
}
