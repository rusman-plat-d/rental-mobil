"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/map");
require("rxjs/add/operator/filter");
var writeFile = require('fs').writeFile;
var join = require('path').join;
var Pengguna$;
try {
    Pengguna$ = require('./pengguna.json');
}
catch (e) {
    Pengguna$ = [];
}
function save() {
    writeFile(join(__dirname, 'pengguna.json'), JSON.stringify(Pengguna$), 'utf8', function (err) {
        if (err) {
            throw new Error(err);
        }
        console.log('file saved !!!');
    });
}
function gets() {
    console.log('[db]Pengguna: gets');
    return Pengguna$;
}
exports.gets = gets;
function get(id) {
    console.log('[db]Pengguna: get');
    return Pengguna$.filter(function (Pengguna) { return Pengguna.id === id; })[0];
}
exports.get = get;
function add(Pengguna) {
    console.log('[db]Pengguna: add');
    Pengguna$.unshift(Object.assign(Pengguna, {
        id: ((Math.random() * Math.random() * 1000).toString() + Date.now()).replace('.', '').replace('.', ''),
        createdAt: Date.now(),
        updatedAt: Date.now()
    }));
    save();
}
exports.add = add;
function update(pengguna) {
    console.log('[db]Pengguna: update');
    for (var i in Pengguna$) {
        if (Pengguna$[i].id == pengguna.id) {
            Object.assign(Pengguna$[i], pengguna, { updatedAt: Date.now() });
        }
    }
    save();
}
exports.update = update;
function remove(id) {
    console.log('[db]Pengguna: remove');
    Pengguna$ = Pengguna$.filter(function (pengguna) {
        return id !== pengguna.id;
    });
    save();
}
exports.remove = remove;
