import jwt from 'jsonwebtoken'
import * as config from '../config/config'

export async function validateToken (req, res, next) {
  const headerAuth = req.headers.authorization ?? ''
  const token = headerAuth.substring(7)
  if (!token) {
    return res.status(400).json({ error: 'no token provided' })
  }
  const validToken = jwt.verify(token, config.SECRET_KEY)
  if (!validToken) {
    return res.status(401).json('invalid token')
  }
  req.token = token
  next()
}
