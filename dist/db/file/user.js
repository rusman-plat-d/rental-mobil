"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("rxjs/add/operator/map");
require("rxjs/add/operator/filter");
var writeFile = require('fs').writeFile;
var join = require('path').join;
var User$;
try {
    User$ = require('./User.json');
}
catch (e) {
    User$ = [];
}
function save() {
    writeFile(join(__dirname, 'user.json'), JSON.stringify(User$), 'utf8', function (err) {
        if (err) {
            throw new Error(err);
        }
        console.log('file saved !!!');
    });
}
function gets() {
    console.log('[db]User: gets');
    return User$;
}
exports.gets = gets;
function get(id) {
    console.log('[db]User: get');
    return User$.filter(function (User) { return User.id === id; })[0];
}
exports.get = get;
function add(User) {
    console.log('[db]User: add');
    User$.unshift(Object.assign(User, {
        createdAt: Date.now(),
    }));
    save();
}
exports.add = add;
function update(User) {
    console.log('[db]User: update');
    Object.keys(User$).map(function (key) {
        if (User$[key].id == User.id) {
            Object.assign(User$[key], Object.assign(User, {
                updatedAt: Date.now()
            }));
        }
    });
    save();
}
exports.update = update;
function remove(id) {
    console.log('[db]User: remove');
    User$ = User$.filter(function (User) {
        return id !== User.id;
    });
    save();
}
exports.remove = remove;
