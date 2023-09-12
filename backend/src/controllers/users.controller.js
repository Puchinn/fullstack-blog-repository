import User from '../models/user'

async function getUsers (req, res, next) {
  const users = await User.find()
  res.json(users)
}

async function getUserById (req, res, next) {
  const { id } = req.params
  const user = await User.findById(id).populate('blogs', { user: 0 })
  res.json(user)
}

export { getUsers, getUserById }
