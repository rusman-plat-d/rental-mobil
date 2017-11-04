"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/map");
require("rxjs/add/operator/filter");
var writeFile = require('fs').writeFile;
var join = require('path').join;
var $data;
try {
    $data = require('./supir.json');
}
catch (e) {
    $data = [];
}
function save() {
    console.log($data);
    writeFile(join(__dirname, 'supir.json'), JSON.stringify($data), 'utf8', function (err) {
        if (err) {
            throw new Error(err);
        }
        console.log('file saved !!!');
    });
}
;
function gets() {
    console.log('[db]Supir: gets');
    return $data;
}
exports.gets = gets;
function get(id) {
    console.log('[db]Supir: get');
    return $data.filter(function (supir) { return supir.id === id; })[0];
}
exports.get = get;
function add(supir) {
    $data.unshift(supir);
    save();
}
exports.add = add;
function update(supir) {
    console.log('[db]Supir: update');
    Object.keys($data).map(function (key) {
        if ($data[key].id == supir.id) {
            Object.assign($data[key], supir);
        }
    });
    save();
}
exports.update = update;
function remove(id) {
    console.log('[db]Supir: remove');
    $data = $data.filter(function (Supir) {
        return id !== Supir.id;
    });
    save();
}
exports.remove = remove;
