"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var index_1 = require("./db/index");
var APIIndexRouter = express_1.Router();
exports.APIIndexRouter = APIIndexRouter;
APIIndexRouter
    .use('/db', index_1.DBIndexRouter);
