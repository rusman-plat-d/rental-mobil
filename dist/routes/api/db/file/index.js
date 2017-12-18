"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mobil_1 = require("./mobil");
var DBFileIndexRouter = express_1.Router();
exports.DBFileIndexRouter = DBFileIndexRouter;
DBFileIndexRouter
    .use('/mobil', mobil_1.MobilRouter);
