import { Server } from '../../../interfaces/socket.io';
import * as Supir from '../../../db/file/supir/supir';
declare var module: any,
			__dirname: any,
			require: any;
const $SIOFU = require('socketio-file-upload');
const { join } = require('path');
const { mkdir } = require('fs');
const filepath = join(__dirname, '..', '..', '..', 'public', 'uploads', 'supir');

module.exports = function($Socket: Server) {
	const _Socket = $Socket.of('/db/supir');
	_Socket.on('connection', Socket => {
		const _SIOFU = new $SIOFU();
		_SIOFU.dir = filepath;
		_SIOFU.listen(Socket)
		_SIOFU.on('saved', e => {
			const ext = e.file.name.split('.');
			const filename = e.file.base + '.' + ext[ ext.length - 1 ];
			const $Supir: Supir.Supir = e.file.meta.Supir;
			console.log('filename => ', filename);
			console.log('$supir => ', $Supir);
			console.log('meta => ', e.file.meta);
			$Supir.image = filename;
			if ( e.file.meta._type === 'tambah' ) {
				Supir.add($Supir);
				_Socket.emit('add', $Supir);
			} else {
				Supir.update($Supir);
				_Socket.emit('update', $Supir);
			}
		})
		_SIOFU.on('error', e => {
			console.log('[db][supir](SIOFU)<ERROR> ', e);
		})

		Socket.on('gets', cb => {
			cb(Supir.gets());
		})
		Socket.on('add', (supir: Supir.Supir) => {
			Supir.add(supir);
			Socket.emit('add', supir);
		});
		Socket.on('get', (id: string, cb) => {
			cb(Supir.get(id))
		})
		Socket.on('update', (supir: Supir.Supir) => {
			Supir.update(supir);
			_Socket.emit('update', supir);
		})
		Socket.on('remove', (id: string) => {
			console.log('supir remove')
			Supir.remove(id);
			_Socket.emit('remove', id);
		})
	})
}
