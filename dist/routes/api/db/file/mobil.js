"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer = require("multer");
var Mobil = require("../../../../db/file/mobil");
var join = require('path').join;
var mkdirSync = require('fs').mkdirSync;
var MobilRouter = express_1.Router();
exports.MobilRouter = MobilRouter;
var dest = join(__dirname, '..', '..', '..', '..', 'public', 'uploads', 'mobil');
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
MobilRouter
    .use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    next();
})
    .post('/post', upload.single('photo'), function (req, res) {
    console.log('POST: /api/db/file/mobil/post');
    var mobil = JSON.parse(req.body.data);
    mobil.image = req.file.filename;
    Mobil.add(mobil);
    res.json({ success: true });
})
    .get('/get/:id', function (req, res) {
    var id = req.params.id;
    console.log('GET: /api/db/file/mobil/get/' + id);
    res.json(Mobil.get(id));
})
    .get('/gets', function (req, res) {
    console.log('GET: /api/db/file/mobil/gets');
    res.json(Mobil.gets());
})
    .put('/put', upload.single('photo'), function (req, res) {
    console.log('PUT: /api/db/file/mobil/put');
    var mobil = JSON.parse(req.body.data);
    if (req.file) {
        mobil.image = req.file.filename;
    }
    Mobil.update(mobil);
    res.json({ success: true });
})
    .delete('/delete/:id', function (req, res) {
    var id = req.params.id;
    console.log('DELETE: /api/db/file/mobil/delete/' + id);
    Mobil.remove(id);
    res.json({ success: true });
});
