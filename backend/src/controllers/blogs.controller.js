import Blog from '../models/blog'
import jwt from 'jsonwebtoken'
import * as config from '../config/config'
import User from '../models/user'

async function getBlogs (req, res, next) {
  const blogs = await Blog.find().populate('user', { blogs: 0 })
  res.json(blogs)
}

async function getBlogById (req, res, next) {
  const { id } = req.params
  const blog = await Blog.findById(id).populate('user', { blogs: 0 })
  res.json(blog)
}

async function postBlog (req, res, next) {
  const { token } = req
  const { title, url, author } = req.body
  const decodedToken = jwt.verify(token, config.SECRET_KEY)
  const user = await User.findById(decodedToken.id)
  const newBlog = new Blog({
    title,
    url,
    author,
    user: user._id
  })
  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()
  res.json(savedBlog)
}

async function deleteBlogById (req, res, next) {
  const { id } = req.params
  const deletedBlog = await Blog.findByIdAndRemove(id)
  res.json(deletedBlog)
}

async function updateLikes (req, res, next) {
  const { id } = req.params
  const blog = await Blog.findById(id)
  blog.likes = blog.likes + 1
  const savedBlog = await blog.save()
  res.status(200).json(savedBlog)
}

async function commentBlogById (req, res, next) {
  const { id } = req.params
  const { comment } = req.body
  const blog = await Blog.findById(id)
  blog.comments = blog.comments.concat(comment)
  const savedBlog = await blog.save()
  res.json(savedBlog)
}

export { getBlogs, getBlogById, postBlog, deleteBlogById, updateLikes, commentBlogById }
