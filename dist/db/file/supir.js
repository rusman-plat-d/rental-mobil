"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/map");
require("rxjs/add/operator/filter");
var writeFile = require('fs').writeFile;
var join = require('path').join;
var Supir$;
try {
    Supir$ = require('./supir.json');
}
catch (e) {
    Supir$ = [];
}
function save() {
    console.log(Supir$);
    writeFile(join(__dirname, 'supir.json'), JSON.stringify(Supir$), 'utf8', function (err) {
        if (err) {
            throw new Error(err);
        }
        console.log('file saved !!!');
    });
}
function gets() {
    console.log('[db]Supir: gets');
    return Supir$;
}
exports.gets = gets;
function get(id) {
    console.log('[db]Supir: get');
    return Supir$.filter(function (supir) { return supir.id === id; })[0];
}
exports.get = get;
function add(supir) {
    Supir$.unshift(Object.assign(supir, {
        id: ((Math.random() * Math.random() * 1000).toString() + Date.now()).replace('.', '').replace('.', ''),
        _status: 'Tersedia',
        _disewa: 0,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }));
    save();
}
exports.add = add;
function update(supir) {
    console.log('[db]Supir: update');
    Object.keys(Supir$).map(function (key) {
        if (Supir$[key].id == supir.id) {
            Object.assign(Supir$[key], Object.assign(supir, {
                updatedAt: Date.now()
            }));
        }
    });
    save();
    return supir;
}
exports.update = update;
function remove(id) {
    console.log('[db]Supir: remove');
    Supir$ = Supir$.filter(function (Supir) {
        return id !== Supir.id;
    });
    save();
}
exports.remove = remove;
