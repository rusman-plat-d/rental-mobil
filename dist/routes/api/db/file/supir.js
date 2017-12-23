"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer = require("multer");
var Supir = require("../../../../db/file/supir");
var join = require('path').join;
var _a = require('fs'), mkdirSync = _a.mkdirSync, unlinkSync = _a.unlinkSync;
var SupirRouter = express_1.Router();
exports.SupirRouter = SupirRouter;
var dest = join(__dirname, '..', '..', '..', '..', 'public', 'uploads', 'supir');
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
SupirRouter
    .post('/post', upload.single('photo'), function (req, res) {
    console.log('POST: /api/db/file/supir/post');
    var supir = JSON.parse(req.body.data);
    supir.image = req.file.filename;
    res.json({
        data: Supir.add(supir),
        success: true
    });
})
    .get('/get/:id', function (req, res) {
    var id = req.params.id;
    console.log('GET: /api/db/file/supir/get/' + id);
    res.json(Supir.get(id));
})
    .get('/gets', function (req, res) {
    console.log('GET: /api/db/file/supir/gets');
    res.json(Supir.gets());
})
    .put('/put', upload.single('photo'), function (req, res) {
    console.log('PUT: /api/db/file/supir/put');
    var supir = JSON.parse(req.body.data);
    if (req.file)
        supir.image = req.file.filename;
    res.json({
        data: Supir.update(supir),
        success: true
    });
})
    .delete('/delete/:id', function (req, res) {
    var id = req.params.id;
    console.log('DELETE: /api/db/file/supir/delete/' + id);
    unlinkSync(join(dest, Supir.remove(id).image));
    res.json({ success: true });
});
