"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testingRouter = void 0;
var _express = require("express");
var _testing = require("../controllers/testing.controller");
var testingRouter = (0, _express.Router)();
exports.testingRouter = testingRouter;
testingRouter.get('/reset', _testing.resetDataBase);