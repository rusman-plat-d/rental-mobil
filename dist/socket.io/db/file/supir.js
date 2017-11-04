"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Supir = require("../../../db/file/supir/supir");
var $SIOFU = require('socketio-file-upload');
var join = require('path').join;
var mkdir = require('fs').mkdir;
var filepath = join(__dirname, '..', '..', '..', 'public', 'uploads', 'supir');
module.exports = function ($Socket) {
    var _Socket = $Socket.of('/db/supir');
    _Socket.on('connection', function (Socket) {
        var _SIOFU = new $SIOFU();
        _SIOFU.dir = filepath;
        _SIOFU.listen(Socket);
        _SIOFU.on('saved', function (e) {
            var ext = e.file.name.split('.');
            var filename = e.file.base + '.' + ext[ext.length - 1];
            var $Supir = Object.assign(JSON.parse(JSON.stringify(e.file.meta.Supir)), {
                image: filename
            });
            if (e.file.meta._type === 'tambah') {
                Supir.add($Supir);
                _Socket.emit('add', $Supir);
            }
            else {
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
        Socket.on('add', function (supir) {
            Supir.add(supir);
            Socket.emit('add', supir);
        });
        Socket.on('get', function (id, cb) {
            cb(Supir.get(id));
        });
        Socket.on('update', function (supir) {
            Supir.update(supir);
            _Socket.emit('update', supir);
        });
        Socket.on('remove', function (id) {
            Supir.remove(id);
            _Socket.emit('remove', id);
        });
    });
};
