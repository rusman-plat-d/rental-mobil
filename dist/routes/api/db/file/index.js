"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mobil_1 = require("./mobil");
var pengguna_1 = require("./pengguna");
var sewa_1 = require("./sewa");
var supir_1 = require("./supir");
var FileIndexRouter = express_1.Router();
exports.FileIndexRouter = FileIndexRouter;
FileIndexRouter
    .use('/mobil', mobil_1.MobilRouter)
    .use('/pengguna', pengguna_1.PenggunaRouter)
    .use('/sewa', sewa_1.SewaRouter)
    .use('/supir', supir_1.SupirRouter);
