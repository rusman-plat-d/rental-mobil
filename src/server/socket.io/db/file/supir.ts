import { Server } from '../../../interfaces/socket.io';
import * as Supir from '../../../db/file/supir/supir';
declare var module: any;

module.exports = function($Socket: Server) {
	$Socket.on('connection', _Socket => {
		_Socket.on('gets', cb => {
			cb(Supir.gets());
		})
		_Socket.on('add', (supir: Supir.Supir) => {
			Supir.add(supir);
			_Socket.emit('add', supir);
		});
		_Socket.on('get', (id: string, cb) => {
			cb(Supir.get(id))
		})
		_Socket.on('update', (supir: Supir.Supir) => {
			Supir.update(supir);
			$Socket.emit('update', supir);
		})
		_Socket.on('remove', (id: string) => {
			Supir.remove(id);
			$Socket.emit('remove', id);
		})
	})
}
