"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = require("../../../db/file/user");
var $SIOFU = require('socketio-file-upload');
var join = require('path').join;
var _a = require('fs'), mkdir = _a.mkdir, unlink = _a.unlink;
var filepath = join(__dirname, '..', '..', '..', 'public', 'uploads', 'user');
function remove_image(name) {
    unlink(join(filepath, name), function (err) {
        if (err)
            return console.error("err while delete file => ", err);
        return console.log('remove image success');
    });
}
module.exports.$ = function ($Socket) {
    var _Socket = $Socket.of('/db/user');
    _Socket.on('connection', function (Socket) {
        var _SIOFU = new $SIOFU();
        _SIOFU.dir = filepath;
        _SIOFU.listen(Socket);
        _SIOFU.on('start', function (e) {
            console.log('[db][user](SIOFU)<START> ', e);
        });
        _SIOFU.on('saved', function (e) {
            var ext = e.file.name.split('.');
            var filename = e.file.base + '.' + ext[ext.length - 1];
            console.log('saved => ', e.file.meta);
            var $User = Object.assign(e.file.meta.data, {
                image: filename
            });
            if (e.file.meta._type === 'tambah') {
                User.add($User);
                _Socket.emit('add', $User);
            }
            else {
                remove_image(User.get($User.id).image);
                User.update($User);
                _Socket.emit('update', $User);
            }
        });
        _SIOFU.on('error', function (e) {
            console.log('[db][User](SIOFU)<ERROR> ', e);
        });
        Socket.on('gets', function (cb) {
            cb(User.gets());
        });
        Socket.on('get', function (id, cb) {
            cb(User.get(id));
        });
        Socket.on('update', function (user) {
            User.update(user);
            _Socket.emit('update', User);
        });
        Socket.on('remove', function (id) {
            User.remove(id);
            _Socket.emit('remove', id);
        });
    });
};
