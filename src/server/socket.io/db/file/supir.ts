import { Server } from '../../../interfaces/socket.io';
import * as Supir from '../../../db/file/supir';
declare var module: any,
			__dirname: any,
			require: any;
const $SIOFU = require('socketio-file-upload');
const { join } = require('path');
const { mkdir, unlink } = require('fs');
const filepath = join(__dirname, '..', '..', '..', 'public', 'uploads', 'supir');

function remove_image(name: string) {
	unlink(join(filepath,name), (err) => {
		if (err)
			return console.error(`err while delete file => `, err);
		return console.log('remove image success')
	})
}

let _Socket;

function update(supir: Supir.Supir): void {
	_Socket.emit('update', supir);
}

let $ = function($Socket: Server) {
	_Socket = $Socket.of('/db/supir');
	_Socket.on('connection', Socket => {
		const _SIOFU = new $SIOFU();
		_SIOFU.dir = filepath;
		_SIOFU.listen(Socket)
		_SIOFU.on('saved', e => {
			const ext = e.file.name.split('.');
			const filename = e.file.base + '.' + ext[ ext.length - 1 ];
			let $Supir: Supir.Supir = Object.assign(JSON.parse(JSON.stringify(e.file.meta.data)), {
				image: filename
			});
			if ( e.file.meta._type === 'tambah' ) {
				Supir.add($Supir);
				_Socket.emit('add', $Supir);
			} else {
				remove_image(Supir.get($Supir.id).image);
				Supir.update($Supir);
				_Socket.emit('update', $Supir);
			}
		})
		_SIOFU.on('error', e => {
			console.log('[db][supir](SIOFU)<ERROR> ', e);
		})
		//-----------------------------------------------
		Socket.on('gets', cb => {
			cb(Supir.gets());
		})
		Socket.on('get', (id: string, cb) => {
			cb(Supir.get(id))
		})
		Socket.on('update', (supir: Supir.Supir) => {
			Supir.update(supir);
			update(supir)
		})
		Socket.on('remove', (id: string) => {
			Supir.remove(id);
			_Socket.emit('remove', id);
		})
	})
}

export { $, update }
