"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var index_1 = require("./file/index");
var DBIndexRouter = express_1.Router();
exports.DBIndexRouter = DBIndexRouter;
DBIndexRouter
    .use('/file', index_1.DBFileIndexRouter);
