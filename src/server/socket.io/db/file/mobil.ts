import { Server } from '../../../interfaces/socket.io';
import * as Mobil from '../../../db/file/mobil';
declare var module: any,
			__dirname: any,
			require: any;
const $SIOFU = require('socketio-file-upload');
const { join } = require('path');
const { mkdir, unlink } = require('fs');
const filepath = join(__dirname, '..', '..', '..', 'public', 'uploads', 'mobil');

function remove_image(name: string) {
	unlink(join(filepath,name), (err) => {
		if (err)
			return console.error(`err while delete file => `, err);
		return console.log('remove image success')
	})
}

module.exports = function($Socket: Server) {
	const _Socket = $Socket.of('/db/mobil');
	_Socket.on('connection', Socket => {
		const _SIOFU = new $SIOFU();
		_SIOFU.dir = filepath;
		_SIOFU.listen(Socket)
		_SIOFU.on('start', e => {
			console.log('[db][mobil](SIOFU)<START> ', e);
		})
		_SIOFU.on('saved', e => {
			const ext = e.file.name.split('.');
			const filename = e.file.base + '.' + ext[ ext.length - 1 ];
			console.log('saved => ', e.file.meta)
			let $Mobil: Mobil.Mobil = Object.assign(e.file.meta.data, {
				image: filename
			});
			if ( e.file.meta._type === 'tambah' ) {
				Mobil.add($Mobil);
				_Socket.emit('add', $Mobil);
			} else {
				remove_image(Mobil.get($Mobil.id).image);
				Mobil.update($Mobil);
				_Socket.emit('update', $Mobil);
			}
		})
		_SIOFU.on('error', e => {
			console.log('[db][mobil](SIOFU)<ERROR> ', e);
		})
		//-----------------------------------------------
		Socket.on('gets', cb => {
			cb(Mobil.gets());
		})
		Socket.on('get', (id: string, cb) => {
			cb(Mobil.get(id))
		})
		Socket.on('update', (mobil: Mobil.Mobil) => {
			Mobil.update(mobil);
			_Socket.emit('update', Mobil);
		})
		Socket.on('remove', (id: string) => {
			Mobil.remove(id);
			_Socket.emit('remove', id);
		})
	})
}
