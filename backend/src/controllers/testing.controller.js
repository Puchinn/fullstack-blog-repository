import User from '../models/user'
import Blog from '../models/blog'

async function resetDataBase (req, res, next) {
  await User.deleteMany()
  await Blog.deleteMany()

  res.status(200).end()
}

export { resetDataBase }
