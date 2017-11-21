"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mobil = require("../../../db/file/mobil");
var Sewa = require("../../../db/file/sewa");
var Supir = require("../../../db/file/supir");
var $Mobil = require("./mobil");
var $Supir = require("./supir");
var $SIOFU = require('socketio-file-upload');
var join = require('path').join;
module.exports.$ = function ($Socket) {
    var _Socket = $Socket.of('/db/sewa');
    _Socket.on('connection', function (Socket) {
        Socket.on('gets', function (cb) {
            cb(Sewa.gets());
        });
        Socket.on('get', function (id, cb) {
            cb(Sewa.get(id));
        });
        Socket.on('add', function (sewa) {
            Sewa.add(sewa);
            $Mobil.update(Mobil.update(Object.assign(Mobil.get(sewa.id_mobil), { _status: 'Disewa' })));
            if (sewa.id_supir) {
                $Supir.update(Supir.update(Object.assign(Supir.get(sewa.id_supir), { _status: 'Disewa' })));
            }
            _Socket.emit('add', Sewa);
        });
        Socket.on('update', function (sewa) {
            Sewa.update(sewa);
            _Socket.emit('update', Sewa);
        });
        Socket.on('remove', function (id) {
            Sewa.remove(id);
            _Socket.emit('remove', id);
        });
    });
};
