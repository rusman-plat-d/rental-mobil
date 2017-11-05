import { Server } from '../../../interfaces/socket.io';
import * as User from '../../../db/file/user';
declare var module: any,
			__dirname: any,
			require: any;
const $SIOFU = require('socketio-file-upload');
const { join } = require('path');
const { mkdir, unlink } = require('fs');
const filepath = join(__dirname, '..', '..', '..', 'public', 'uploads', 'user');

function remove_image(name: string) {
	unlink(join(filepath,name), (err) => {
		if (err)
			return console.error(`err while delete file => `, err);
		return console.log('remove image success')
	})
}

module.exports = function($Socket: Server) {
	const _Socket = $Socket.of('/db/user');
	_Socket.on('connection', Socket => {
		const _SIOFU = new $SIOFU();
		_SIOFU.dir = filepath;
		_SIOFU.listen(Socket)
		_SIOFU.on('start', e => {
			console.log('[db][user](SIOFU)<START> ', e);
		})
		_SIOFU.on('saved', e => {
			const ext = e.file.name.split('.');
			const filename = e.file.base + '.' + ext[ ext.length - 1 ];
			console.log('saved => ', e.file.meta)
			let $User: User.User = Object.assign(e.file.meta.data, {
				image: filename
			});
			if ( e.file.meta._type === 'tambah' ) {
				User.add($User);
				_Socket.emit('add', $User);
			} else {
				remove_image(User.get($User.id).image);
				User.update($User);
				_Socket.emit('update', $User);
			}
		})
		_SIOFU.on('error', e => {
			console.log('[db][User](SIOFU)<ERROR> ', e);
		})
		//-----------------------------------------------
		Socket.on('gets', cb => {
			cb(User.gets());
		})
		Socket.on('get', (id: string, cb) => {
			cb(User.get(id))
		})
		Socket.on('update', (user: User.User) => {
			User.update(user);
			_Socket.emit('update', User);
		})
		Socket.on('remove', (id: string) => {
			User.remove(id);
			_Socket.emit('remove', id);
		})
	})
}
