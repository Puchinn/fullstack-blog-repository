"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _morgan = _interopRequireDefault(require("morgan"));
var config = _interopRequireWildcard(require("./config/config"));
var _auth = require("./routes/auth.routes");
var _blogs = require("./routes/blogs.routes");
var _users = require("./routes/users.routes");
var _testing = require("./routes/testing.routes");
var middlewares = _interopRequireWildcard(require("./utils/middlewares"));
var _cors = _interopRequireDefault(require("cors"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
_mongoose["default"].connect(config.URL, {
  useNewUrlParser: true
}).then(function () {
  return console.log('conexion exitosa');
})["catch"](function () {
  return console.log('no capo, no pudimos conectar');
});
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use((0, _morgan["default"])('dev'));
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', _testing.testingRouter);
}
app.use('/auth', _auth.authRouter);
app.use('/api/users', _users.usersRouter);
app.use('/api/blogs', _blogs.blogsRouter);
app.use(middlewares.unknowEndpoint);
app.use(middlewares.errorHandler);
var _default = app;
exports["default"] = _default;