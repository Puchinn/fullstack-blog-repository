"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.blogsRouter = void 0;
var _express = require("express");
var blogsController = _interopRequireWildcard(require("../controllers/blogs.controller"));
var _validateToken = require("../middlewares/validateToken");
var _validateUserInDb = require("../middlewares/validateUserInDb");
var _validateBlogAtPost = require("../middlewares/validateBlogAtPost");
var _validateBlogInUser = require("../middlewares/validateBlogInUser");
require("express-async-errors");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var blogsRouter = (0, _express.Router)();
exports.blogsRouter = blogsRouter;
blogsRouter.get('/', blogsController.getBlogs);
blogsRouter.get('/:id', blogsController.getBlogById);
blogsRouter.post('/', [_validateToken.validateToken, _validateUserInDb.validateUserInDb, _validateBlogAtPost.validateBlogAtPost], blogsController.postBlog);
blogsRouter["delete"]('/:id', [_validateToken.validateToken, _validateUserInDb.validateUserInDb, _validateBlogInUser.validateBlogInUser], blogsController.deleteBlogById);
blogsRouter.put('/:id', [_validateToken.validateToken, _validateUserInDb.validateUserInDb, _validateBlogInUser.validateBlogInUser], blogsController.updateLikes);