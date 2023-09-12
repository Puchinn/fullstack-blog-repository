import User from '../models/user'

export async function validateLoginUser (req, res, next) {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: 'invalid fields' })
  }
  const user = await User.findOne({ username })
  if (!user) {
    return res.status(404).json({ error: 'user not found' })
  }
  const validPassword = await User.comparePassword(password, user.passwordHash)
  if (!validPassword) {
    return res.status(400).json({ error: 'invalid password' })
  }
  next()
}
