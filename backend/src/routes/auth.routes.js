import { Router } from 'express'
import * as authController from '../controllers/auth.controller'
import { validateLoginUser } from '../middlewares/validateLoginUser'
import { validateToken } from '../middlewares/validateToken'
import { validateSignUpUser } from '../middlewares/validateSignUpUser'
import 'express-async-errors'

const authRouter = Router()

authRouter.post('/signup', validateSignUpUser, authController.signUp)
authRouter.post('/login', validateLoginUser, authController.login)
authRouter.get('/', validateToken, authController.securePath)

export { authRouter }
