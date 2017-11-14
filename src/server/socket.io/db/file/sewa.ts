import { Server } from '../../../interfaces/socket.io';
import * as Sewa from '../../../db/file/sewa';

declare var module: any,
			__dirname: any,
			require: any;

const $SIOFU = require('socketio-file-upload');
const { join } = require('path');

module.exports = function($Socket: Server) {
	const _Socket = $Socket.of('/db/sewa');
	_Socket.on('connection', Socket => {
		Socket.on('gets', cb => {
			cb(Sewa.gets());
		})
		Socket.on('get', (id: string, cb) => {
			cb(Sewa.get(id))
		})
		Socket.on('add', (sewa: Sewa.Sewa) => {
			Sewa.add(sewa);
			_Socket.emit('add', Sewa);
		})
		Socket.on('update', (sewa: Sewa.Sewa) => {
			Sewa.update(sewa);
			_Socket.emit('update', Sewa);
		})
		Socket.on('remove', (id: string) => {
			Sewa.remove(id);
			_Socket.emit('remove', id);
		})
	})
}
