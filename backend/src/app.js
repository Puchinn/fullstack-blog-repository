import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import * as config from './config/config'
import { authRouter } from './routes/auth.routes'
import { blogsRouter } from './routes/blogs.routes'
import { usersRouter } from './routes/users.routes'
import { testingRouter } from './routes/testing.routes'
import * as middlewares from './utils/middlewares'
import cors from 'cors'

const app = express()

mongoose
  .connect(config.URL, { useNewUrlParser: true })
  .then(() => console.log('conexion exitosa'))
  .catch(() => console.log('no capo, no pudimos conectar'))

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', testingRouter)
}
app.use('/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

app.use(middlewares.unknowEndpoint)
app.use(middlewares.errorHandler)

export default app
