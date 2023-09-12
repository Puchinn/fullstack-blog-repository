export async function validateSignUpUser (req, res, next) {
  const { user, username, password } = req.body
  if (!user || !username || !password) {
    return res.status(400).json({ error: 'bad request, missing data fields' })
  }
  next()
}
