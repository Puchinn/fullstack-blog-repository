import User from '../models/user'
import jwt from 'jsonwebtoken'
import * as config from '../config/config'

async function login (req, res, next) {
  const { username } = req.body
  const user = await User.findOne({ username }).populate('blogs', { user: 0 })
  const userForToken = {
    username: user.username,
    id: user.id
  }
  const token = jwt.sign(JSON.stringify(userForToken), config.SECRET_KEY)
  res.status(200).json({ token, ...userForToken })
}

async function signUp (req, res, next) {
  const { user, username, password } = req.body
  const newUser = new User({
    user,
    username,
    passwordHash: await User.savePasswordHash(password)
  })
  const savedUser = await newUser.save()
  res.json(savedUser)
}

async function securePath (req, res, next) {
  const { token } = req
  const decodedToken = jwt.verify(token, config.SECRET_KEY)
  res.status(200).json({ mensaje: 'podes pasar capo', ...decodedToken })
}

export { login, signUp, securePath }
