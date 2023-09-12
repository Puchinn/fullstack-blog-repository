import { Router } from 'express'
import { resetDataBase } from '../controllers/testing.controller'
const testingRouter = Router()

testingRouter.get('/reset', resetDataBase)

export { testingRouter }
