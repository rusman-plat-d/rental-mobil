"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mobil = require("../../../db/file/mobil");
var $SIOFU = require('socketio-file-upload');
var join = require('path').join;
var _a = require('fs'), mkdir = _a.mkdir, unlink = _a.unlink;
var filepath = join(__dirname, '..', '..', '..', 'public', 'uploads', 'mobil');
function remove_image(name) {
    unlink(join(filepath, name), function (err) {
        if (err)
            return console.error("err while delete file => ", err);
        return console.log('remove image success');
    });
}
var _Socket;
function update(mobil) {
    _Socket.emit('update', mobil);
}
exports.update = update;
var $ = function ($Socket) {
    _Socket = $Socket.of('/db/mobil');
    _Socket.on('connection', function (Socket) {
        var _SIOFU = new $SIOFU();
        _SIOFU.dir = filepath;
        _SIOFU.listen(Socket);
        _SIOFU.on('start', function (e) {
            console.log('[db][mobil](SIOFU)<START> ', e);
        });
        _SIOFU.on('saved', function (e) {
            var ext = e.file.name.split('.');
            var filename = e.file.base + '.' + ext[ext.length - 1];
            console.log('saved => ', e.file.meta);
            var $Mobil = Object.assign(e.file.meta.data, {
                image: filename
            });
            if (e.file.meta._type === 'tambah') {
                Mobil.add($Mobil);
                _Socket.emit('add', $Mobil);
            }
            else {
                remove_image(Mobil.get($Mobil.id).image);
                Mobil.update($Mobil);
                _Socket.emit('update', $Mobil);
            }
        });
        _SIOFU.on('error', function (e) {
            console.log('[db][mobil](SIOFU)<ERROR> ', e);
        });
        Socket.on('gets', function (cb) {
            cb(Mobil.gets());
        });
        Socket.on('get', function (id, cb) {
            cb(Mobil.get(id));
        });
        Socket.on('update', function (mobil) {
            Mobil.update(mobil);
            update(mobil);
        });
        Socket.on('remove', function (id) {
            Mobil.remove(id);
            _Socket.emit('remove', id);
        });
    });
};
exports.$ = $;
