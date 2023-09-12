import { config } from 'dotenv'
config()

const MDB_TEST = 'mongodb://127.0.0.1/my-test'
const MDB_URL = process.env.MONGODB
const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT || 3001
const URL = NODE_ENV === 'test' ? MDB_TEST : MDB_URL
const SECRET_KEY = process.env.SECRET_KEY

export { PORT, URL, SECRET_KEY }
