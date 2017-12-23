"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
require("rxjs/add/operator/map");
require("rxjs/add/operator/filter");
var Mobil = require("./mobil");
var Supir = require("./supir");
var Pengguna = require("./pengguna");
var writeFile = require('fs').writeFile;
var join = require('path').join;
var Sewa$;
try {
    Sewa$ = require('./sewa.json');
}
catch (e) {
    Sewa$ = [];
}
function save() {
    writeFile(join(__dirname, 'sewa.json'), JSON.stringify(Sewa$), 'utf8', function (err) {
        if (err) {
            throw new Error(err);
        }
        console.log('file saved !!!');
    });
}
function gets() {
    console.log('[db]Sewa: gets');
    var Sewa$_ = Sewa$;
    for (var key in Sewa$_) {
        Sewa$_[key].mobil = Mobil.get(Sewa$_[key].id_mobil);
        Sewa$_[key].pengguna = Pengguna.get(Sewa$_[key].id_pengguna);
        if (Sewa$_[key].id_supir) {
            Sewa$_[key].supir = Supir.get(Sewa$_[key].id_supir);
        }
    }
    return Sewa$_.filter(function (sewa) {
        return sewa.mobil;
    });
}
exports.gets = gets;
function get(id) {
    console.log('[db]Sewa: get');
    return Sewa$.filter(function (sewa) { return sewa.id === id; })[0];
}
exports.get = get;
function add(sewa) {
    console.log('[db]Sewa: add');
    Sewa$.unshift(Object.assign(sewa, {
        id: uuid_1.v4(),
        createdAt: Date.now(),
        updatedAt: Date.now()
    }));
    save();
}
exports.add = add;
function update(sewa) {
    console.log('[db]Sewa: update');
    for (var i in Sewa$) {
        if (Sewa$[i].id == sewa.id) {
            Object.assign(Sewa$[i], sewa, { updatedAt: Date.now() });
        }
    }
    save();
}
exports.update = update;
function remove(id) {
    console.log('[db]Sewa: remove');
    var sewa = get(id);
    Mobil.update(Object.assign(Mobil.get(sewa.id_mobil), { _status: 'Tersedia' }));
    if (sewa.id_supir) {
        Supir.update(Object.assign(Supir.get(sewa.id_supir), { _status: 'Tersedia' }));
    }
    Sewa$ = Sewa$.filter(function (sewa) {
        return id !== sewa.id;
    });
    save();
}
exports.remove = remove;
