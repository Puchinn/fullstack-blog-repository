export async function validateBlogAtPost (req, res, next) {
  const { title, url, author } = req.body
  if (!title || !url || !author) {
    return res.status(400).json({ error: 'invalid fields' })
  }
  next()
}
