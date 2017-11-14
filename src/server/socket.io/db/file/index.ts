import { Server } from '../../../interfaces/socket.io';
declare var module: any,
			require: any;
module.exports = function($Socket: Server) {
	require('./supir')($Socket)
	require('./mobil')($Socket)
	require('./user')($Socket)
	require('./sewa')($Socket)
}
