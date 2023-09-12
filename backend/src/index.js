import app from './app'
import * as config from './config/config'
import { createServer } from 'node:http'

const server = createServer(app)

server.listen(config.PORT, () => {
  console.log('Servidor funcionando')
})
