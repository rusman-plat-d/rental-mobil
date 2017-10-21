"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Sewa = require("../../../../db/file/sewa");
var SewaRouter = express_1.Router();
exports.SewaRouter = SewaRouter;
SewaRouter
    .post('/post', function (req, res) {
    console.log('POST: /api/db/file/sewa/post');
    var sewa = req.body.data;
    Sewa.add(sewa);
    res.json({ success: true });
})
    .get('/get/:id', function (req, res) {
    var id = req.params.id;
    console.log('GET: /api/db/file/sewa/get/' + id);
    res.json(Sewa.get(id));
})
    .get('/gets', function (req, res) {
    console.log('GET: /api/db/file/sewa/gets');
    res.json(Sewa.gets());
})
    .put('/put', function (req, res) {
    console.log('PUT: /api/db/file/sewa/put');
    var sewa = req.body.data;
    Sewa.update(sewa);
    res.json({ success: true });
})
    .delete('/delete/:id', function (req, res) {
    var id = req.params.id;
    console.log('DELETE: /api/db/file/sewa/delete/' + id);
    Sewa.remove(id);
    res.json({ success: true });
});
