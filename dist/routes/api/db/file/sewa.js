"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Sewa = require("../../../../db/file/sewa");
exports.SewaRouter = express_1.Router();
exports.SewaRouter
    .post('add', function (req, res, next) {
    Sewa.add(req.body.Sewa);
});
