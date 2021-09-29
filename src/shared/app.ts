import './container';
import { Request, Response } from 'express';
import cors from 'cors';
import createConnection from './typeorm';

import express from 'express';
import router from './routes';

createConnection();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.get('/ping', async (request: Request, response: Response) => {
  response.status(200).send('pong');
});

export default app;
