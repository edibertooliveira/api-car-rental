import './container'
import createConnection from './typeorm'

import express from 'express';
import router from './routes';

createConnection()

const app = express()

app.use(express.json())

app.use('/api', router)

export default app