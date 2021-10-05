import '../container';
import { Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';
import * as OpenApiValidator from 'express-openapi-validator';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import doc from './api.schema.json';
import createConnection from './typeorm';
import errors from './http/middlewares/errorsApi';
import { expressLogger } from '@config/loggerConfig';

import express from 'express';
import router from './http/routes';

createConnection();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);
app.use(expressLogger);

app.use(
  '/docs',
  swaggerUI.serve,
  swaggerUI.setup(doc),
  OpenApiValidator.middleware({
    apiSpec: doc as unknown as OpenAPIV3.Document,
    validateRequests: true,
    validateResponses: true,
  }),
);

app.get('/ping', async (request: Request, response: Response) => {
  response.status(200).send('pong');
});

app.use(errors);

export default app;
