"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var index_1 = require("./api/index");
var IndexRouter = express_1.Router();
exports.IndexRouter = IndexRouter;
IndexRouter
    .use('/api', index_1.APIIndexRouter);
