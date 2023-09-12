import User from '../models/user'
import jwt from 'jsonwebtoken'
import * as config from '../config/config'

export async function validateUserInDb (req, res, next) {
  const { token } = req
  const decodedToken = jwt.verify(token, config.SECRET_KEY)
  const user = await User.findById(decodedToken.id)
  if (!user) {
    return res.status(404).json({ error: 'user not found' })
  }
  next()
}
