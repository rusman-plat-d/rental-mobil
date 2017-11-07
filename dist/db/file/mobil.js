"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/map");
require("rxjs/add/operator/filter");
var writeFile = require('fs').writeFile;
var join = require('path').join;
var Mobil$;
try {
    Mobil$ = require('./mobil.json');
}
catch (e) {
    Mobil$ = [];
}
function save() {
    writeFile(join(__dirname, 'mobil.json'), JSON.stringify(Mobil$), 'utf8', function (err) {
        if (err) {
            throw new Error(err);
        }
        console.log('file saved !!!');
    });
}
function gets() {
    console.log('[db]Mobil: gets');
    return Mobil$;
}
exports.gets = gets;
function get(id) {
    console.log('[db]Mobil: get');
    return Mobil$.filter(function (Mobil) { return Mobil.id === id; })[0];
}
exports.get = get;
function add(mobil) {
    Mobil$.unshift(Object.assign(mobil, {
        _status: 'Tersedia',
        _disewa: 0,
        createdAt: Date.now(),
    }));
    save();
}
exports.add = add;
function update(mobil) {
    console.log('[db]Mobil: update');
    Object.keys(Mobil$).map(function (key) {
        if (Mobil$[key].id == mobil.id) {
            Object.assign(Mobil$[key], Object.assign(mobil, {
                updatedAt: Date.now()
            }));
        }
    });
    save();
}
exports.update = update;
function remove(id) {
    console.log('[db]Mobil: remove');
    Mobil$ = Mobil$.filter(function (Mobil) {
        return id !== Mobil.id;
    });
    save();
}
exports.remove = remove;
