import { Server } from '../../../interfaces/socket.io';
declare var module: any,
			__filename: any,
			require: any;
module.exports = function($Socket: Server) {
	console.log(__filename)
	require('./supir')($Socket)
}
