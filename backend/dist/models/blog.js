"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var blogSchema = new _mongoose["default"].Schema({
  title: String,
  url: String,
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  author: String,
  likes: {
    type: Number,
    "default": 0
  }
});
blogSchema.set('toJSON', {
  transform: function transform(doc, obj) {
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
  }
});
var Blog = _mongoose["default"].model('Blog', blogSchema);
var _default = Blog;
exports["default"] = _default;