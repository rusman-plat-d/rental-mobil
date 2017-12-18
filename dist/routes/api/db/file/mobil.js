"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var express_1 = require("express");
var multer = require("multer");
var Mobil = require("../../../../db/file/mobil");
var MobilRouter = express_1.Router();
exports.MobilRouter = MobilRouter;
var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path_1.join(__dirname, '..', '..', '..', '..', 'public', 'uploads', 'mobil'));
        },
        filename: function (req, file, cb) {
            var _a = file.originalname.split('.'), name = _a[0], ext = _a[1];
            cb(null, name.replace(/\s/g, '-') + '-' + Date.now() + '.' + ext);
        }
    })
});
MobilRouter
    .post('/post', upload.single('photo'), function (req, res) {
    console.log('POST: /api/db/file/mobil/post');
    var mobil = req.body.mobil;
    mobil.image = req.file.filename;
    Mobil.add(mobil);
    res.send('post success');
})
    .get('/get/:id', function (req, res) {
    res.json(Mobil.get(req.params.id));
})
    .get('/gets', function (req, res) {
    console.log('GET: /api/db/file/mobil/gets');
    res.json(Mobil.gets());
})
    .put('/put', upload.single('photo'), function (req, res) {
    console.log('PUT: /api/db/file/mobil/put');
    var mobil = req.body.mobil;
    if (req.file) {
        mobil.image = req.file.filename;
    }
    Mobil.update(mobil);
    res.send('put success');
})
    .delete('/delete/:id', function (req, res) {
    Mobil.remove(req.params.id);
    res.send('delete success');
});
