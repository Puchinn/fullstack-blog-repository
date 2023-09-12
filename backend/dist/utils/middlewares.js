"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = errorHandler;
exports.unknowEndpoint = unknowEndpoint;
function errorHandler(error, req, res, next) {
  res.status(404).json({
    error: error.message
  });
  next(error);
}
function unknowEndpoint(req, res) {
  res.status(404).send('page not found').end();
}