"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Supir = require("../../../db/file/supir");
var $SIOFU = require('socketio-file-upload');
var join = require('path').join;
var _a = require('fs'), mkdir = _a.mkdir, unlink = _a.unlink;
var filepath = join(__dirname, '..', '..', '..', 'public', 'uploads', 'supir');
function remove_image(name) {
    unlink(join(filepath, name), function (err) {
        if (err)
            return console.error("err while delete file => ", err);
        return console.log('remove image success');
    });
}
var _Socket;
function update(supir) {
    _Socket.emit('update', supir);
}
exports.update = update;
var $ = function ($Socket) {
    _Socket = $Socket.of('/db/supir');
    _Socket.on('connection', function (Socket) {
        var _SIOFU = new $SIOFU();
        _SIOFU.dir = filepath;
        _SIOFU.listen(Socket);
        _SIOFU.on('saved', function (e) {
            var ext = e.file.name.split('.');
            var filename = e.file.base + '.' + ext[ext.length - 1];
            var $Supir = Object.assign(JSON.parse(JSON.stringify(e.file.meta.data)), {
                image: filename
            });
            if (e.file.meta._type === 'tambah') {
                Supir.add($Supir);
                _Socket.emit('add', $Supir);
            }
            else {
                remove_image(Supir.get($Supir.id).image);
                Supir.update($Supir);
                _Socket.emit('update', $Supir);
            }
        });
        _SIOFU.on('error', function (e) {
            console.log('[db][supir](SIOFU)<ERROR> ', e);
        });
        Socket.on('gets', function (cb) {
            cb(Supir.gets());
        });
        Socket.on('get', function (id, cb) {
            cb(Supir.get(id));
        });
        Socket.on('update', function (supir) {
            Supir.update(supir);
            update(supir);
        });
        Socket.on('remove', function (id) {
            Supir.remove(id);
            _Socket.emit('remove', id);
        });
    });
};
exports.$ = $;
