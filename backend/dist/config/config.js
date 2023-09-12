"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.URL = exports.SECRET_KEY = exports.PORT = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var MDB_TEST = 'mongodb://127.0.0.1/my-test';
var MDB_URL = process.env.MONGODB;
var NODE_ENV = process.env.NODE_ENV;
var PORT = process.env.PORT || 3001;
exports.PORT = PORT;
var URL = NODE_ENV === 'test' ? MDB_TEST : MDB_URL;
exports.URL = URL;
var SECRET_KEY = process.env.SECRET_KEY;
exports.SECRET_KEY = SECRET_KEY;