import { Router } from 'express'
import * as usersController from '../controllers/users.controller'
import 'express-async-errors'

const usersRouter = Router()

usersRouter.get('/', usersController.getUsers)
usersRouter.get('/:id', usersController.getUserById)

export { usersRouter }
