import './container';
import { Request, Response } from 'express'
import createConnection from './typeorm';

import express from 'express';
import router from './routes';

createConnection();

const app = express();

app.use(router);

app.get('/ping', async (request: Request, response: Response) => {
  response.status(200).send('pong')
})

app.use(express.json());

export default app;
