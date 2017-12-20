"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer = require("multer");
var Pengguna = require("../../../../db/file/pengguna");
var join = require('path').join;
var mkdirSync = require('fs').mkdirSync;
var PenggunaRouter = express_1.Router();
exports.PenggunaRouter = PenggunaRouter;
var dest = join(__dirname, '..', '..', '..', '..', 'public', 'uploads', 'pengguna');
var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, dest);
        },
        filename: function (req, file, cb) {
            var _a = file.originalname.split('.'), name = _a[0], ext = _a[1];
            cb(null, name.replace(/\s/g, '-') + '-' + Date.now() + '.' + ext);
        }
    })
});
try {
    mkdirSync(dest);
}
catch (e) { }
PenggunaRouter
    .use(function (req, res, next) {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE'
    });
    next();
})
    .post('/post', upload.single('photo'), function (req, res) {
    console.log('POST: /api/db/file/pengguna/post');
    var pengguna = req.body.pengguna;
    pengguna.image = req.file.filename;
    Pengguna.add(pengguna);
    res.json({ success: true });
})
    .get('/get/:id', function (req, res) {
    var id = req.params.id;
    console.log('GET: /api/db/file/pengguna/get/' + id);
    res.json(Pengguna.get(id));
})
    .get('/gets', function (req, res) {
    console.log('GET: /api/db/file/pengguna/gets');
    res.json(Pengguna.gets());
})
    .put('/put', upload.single('photo'), function (req, res) {
    console.log('PUT: /api/db/file/pengguna/put');
    var pengguna = req.body.data;
    if (req.file) {
        pengguna.image = req.file.filename;
    }
    Pengguna.update(pengguna);
    res.json({ success: true });
})
    .delete('/delete/:id', function (req, res) {
    var id = req.params.id;
    console.log('DELETE: /api/db/file/pengguna/delete/' + id);
    Pengguna.remove(id);
    res.json({ success: true });
});
