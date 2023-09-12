import Blog from '../models/blog'
import jwt from 'jsonwebtoken'
import * as config from '../config/config'
import User from '../models/user'

export async function validateBlogInUser (req, res, next) {
  const { id } = req.params
  const blog = await Blog.findById(id)
  if (!blog) {
    return res.status(404).json({ error: 'the blog does not exist' })
  }
  const decodedToken = jwt.verify(req.token, config.SECRET_KEY)
  const user = await User.findById(decodedToken.id)
  const userHasBlog = user.blogs.includes(id)
  if (!userHasBlog) {
    return res.status(404).json({ error: "the user doesn't have the blog" })
  }
  next()
}
